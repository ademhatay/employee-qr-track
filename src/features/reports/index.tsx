import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useDataStore, useAuthStore } from '@/lib/store'
import { format, differenceInMinutes, isWithinInterval, subMonths } from 'date-fns'
import { tr } from 'date-fns/locale'
import { toast } from 'sonner'

export function ReportsPage() {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: subMonths(new Date(), 1),
        to: new Date(),
    })

    const [isSeeding, setIsSeeding] = useState(false)

    const company = useAuthStore((state) => state.company)
    const employees = useDataStore((state) => state.employees)
    const attendances = useDataStore((state) => state.attendances)
    const addAttendance = useDataStore((state) => state.addAttendance)
    const addEmployee = useDataStore((state) => state.addEmployee)

    const companyEmployees = employees.filter((e) => e.companyId === company?.id)

    const seedData = () => {
        if (!company) return

        setIsSeeding(true)
        const now = new Date()
        let seededCount = 0

        // 1. Önce çalışanları kontrol et, yoksa oluştur
        let targetEmployees = companyEmployees
        if (targetEmployees.length === 0) {
            const demoNames = ['Sarah Jenkins', 'Mike Ross', 'Harvey Specter', 'Donna Paulsen', 'Rachel Zane']
            demoNames.forEach((name, idx) => {
                const newEmp = {
                    id: `seed-emp-${idx}-${Date.now()}`,
                    name,
                    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
                    role: 'employee' as const,
                    position: 'Consultant',
                    companyId: company.id,
                    isActive: true,
                    createdAt: new Date().toISOString()
                }
                addEmployee(newEmp)
            })
            // Eklenen çalışanları hemen al
            targetEmployees = useDataStore.getState().employees.filter(e => e.companyId === company.id)
        }

        // 2. Son 30 günlük veri üret
        for (let i = 30; i >= 0; i--) {
            const currentDate = new Date(now)
            currentDate.setDate(now.getDate() - i)
            const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6

            targetEmployees.forEach((employee) => {
                if (isWeekend && Math.random() > 0.1) return
                if (!isWeekend && Math.random() > 0.9) return

                const cin = new Date(currentDate)
                cin.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60))

                const cout = new Date(currentDate)
                cout.setHours(17 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60))

                addAttendance({
                    id: crypto.randomUUID(),
                    employeeId: employee.id,
                    companyId: company.id,
                    type: 'check-in',
                    timestamp: cin.toISOString(),
                    device: 'kiosk',
                })

                addAttendance({
                    id: crypto.randomUUID(),
                    employeeId: employee.id,
                    companyId: company.id,
                    type: 'check-out',
                    timestamp: cout.toISOString(),
                    device: 'kiosk',
                })
                seededCount += 2
            })
        }

        setIsSeeding(false)
        toast.success(`${targetEmployees.length} çalışan için ${seededCount} kayıt oluşturuldu!`)
    }

    const employeeReports = companyEmployees.map((employee) => {
        const empAttendances = attendances
            .filter(
                (a) =>
                    a.employeeId === employee.id &&
                    isWithinInterval(new Date(a.timestamp), { start: dateRange.from, end: dateRange.to })
            )
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

        let totalMinutes = 0
        for (let i = 0; i < empAttendances.length - 1; i += 2) {
            if (empAttendances[i].type === 'check-in' && empAttendances[i + 1]?.type === 'check-out') {
                totalMinutes += differenceInMinutes(
                    new Date(empAttendances[i + 1].timestamp),
                    new Date(empAttendances[i].timestamp)
                )
            }
        }

        return {
            employee,
            hours: Math.floor(totalMinutes / 60),
            minutes: totalMinutes % 60,
            daysWorked: new Set(empAttendances.map((a) => new Date(a.timestamp).toDateString())).size,
            totalAttendances: empAttendances.length,
            totalMinutes
        }
    })

    const totalHours = employeeReports.reduce((sum, r) => sum + r.totalMinutes, 0) / 60

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white wiggly-border sketch-shadow">
                <div>
                    <h1 className="font-hand text-3xl font-bold text-charcoal">Reports & Analytics 📊</h1>
                    <p className="text-charcoal/60 text-sm">Attendance data for your company</p>
                </div>
                <div className="flex items-center gap-3">
                    {companyEmployees.length === 0 && (
                        <button
                            onClick={seedData}
                            disabled={isSeeding}
                            className="font-hand font-bold bg-yellow-400 text-charcoal px-4 py-2 wiggly-border-sm sketch-shadow hover:-translate-y-1 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">{isSeeding ? 'sync' : 'database'}</span>
                            {isSeeding ? 'Generating...' : 'Seed Data'}
                        </button>
                    )}
                </div>
            </div>

            {/* Date Range & Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                    <p className="font-hand font-bold text-charcoal mb-2">Select Range</p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="w-full font-dashboard-display text-sm bg-background-light px-4 py-2 wiggly-border-sm flex items-center justify-between">
                                <span>{format(dateRange.from, 'dd MMM')} - {format(dateRange.to, 'dd MMM')}</span>
                                <span className="material-symbols-outlined text-sm">calendar_month</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white wiggly-border">
                            <Calendar mode="range" selected={{ from: dateRange.from, to: dateRange.to }} onSelect={(r) => r?.from && r?.to && setDateRange({ from: r.from, to: r.to })} />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                        <p className="text-charcoal/60 text-xs uppercase font-bold">Total Hours</p>
                        <p className="text-2xl font-bold font-dashboard-display">{totalHours.toFixed(1)}h</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                        <p className="text-charcoal/60 text-xs uppercase font-bold">Active Employees</p>
                        <p className="text-2xl font-bold font-dashboard-display">{companyEmployees.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                        <p className="text-charcoal/60 text-xs uppercase font-bold">Total Scans</p>
                        <p className="text-2xl font-bold font-dashboard-display">
                            {employeeReports.reduce((sum, r) => sum + r.totalAttendances, 0)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg wiggly-border sketch-shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-background-light border-b-2 border-charcoal">
                        <tr className="font-hand text-lg">
                            <th className="px-6 py-3">Employee</th>
                            <th className="px-6 py-3 text-center">Days</th>
                            <th className="px-6 py-3 text-center">Total Hours</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-dashed divide-charcoal/10">
                        {employeeReports.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-10 text-center font-hand text-xl text-charcoal/40">No data available. Click "Seed Data" above!</td></tr>
                        ) : (
                            employeeReports.map((report) => (
                                <tr key={report.employee.id} className="hover:bg-yellow-50/50">
                                    <td className="px-6 py-4 font-bold">{report.employee.name}</td>
                                    <td className="px-6 py-4 text-center">{report.daysWorked}</td>
                                    <td className="px-6 py-4 text-center">{report.hours}h {report.minutes}m</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-dashboard-primary material-symbols-outlined">visibility</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
