import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDataStore, useAuthStore } from '@/lib/store'
import { format, startOfMonth, endOfMonth, differenceInMinutes, isWithinInterval, subMonths } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Icons } from '@/lib/icons'
import { toast } from 'sonner'

export function ReportsPage() {
    // Initialize with last month's date range
    const lastMonth = subMonths(new Date(), 1)
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
    })

    const company = useAuthStore((state) => state.company)
    const employees = useDataStore((state) => state.employees)
    const attendances = useDataStore((state) => state.attendances)
    const addEmployee = useDataStore((state) => state.addEmployee)
    const addAttendance = useDataStore((state) => state.addAttendance)

    // Ensure demo data exists for demo company
    useEffect(() => {
        if (company?.id === 'demo-company') {
            const demoCompanyId = 'demo-company'
            const hasDemoEmployees = employees.some((e) => e.companyId === demoCompanyId)
            const hasDemoAttendances = attendances.some((a) => a.companyId === demoCompanyId)

            if (!hasDemoEmployees || !hasDemoAttendances) {
                // Generate demo data
                const lastMonthDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
                const demoMonth = lastMonthDate.getMonth()
                const demoYear = lastMonthDate.getFullYear()
                const daysInMonth = new Date(demoYear, demoMonth + 1, 0).getDate()
                const workDays: Array<number> = []
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(demoYear, demoMonth, day)
                    const dayOfWeek = date.getDay()
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                        workDays.push(day)
                    }
                }

                const demoEmployees = [
                    { id: 'emp-001', name: 'Ahmet Yılmaz', email: 'ahmet@demo.com', role: 'employee' as const, position: 'Yazılım Geliştirici', companyId: demoCompanyId, isActive: true, createdAt: new Date('2024-01-15').toISOString() },
                    { id: 'emp-002', name: 'Ayşe Demir', email: 'ayse@demo.com', role: 'employee' as const, position: 'Tasarım Direktörü', companyId: demoCompanyId, isActive: true, createdAt: new Date('2024-02-20').toISOString() },
                    { id: 'emp-003', name: 'Mehmet Kaya', email: 'mehmet@demo.com', role: 'manager' as const, position: 'Proje Yöneticisi', companyId: demoCompanyId, isActive: true, createdAt: new Date('2024-03-10').toISOString() },
                    { id: 'emp-004', name: 'Zeynep Arslan', email: 'zeynep@demo.com', role: 'employee' as const, position: 'İnsan Kaynakları', companyId: demoCompanyId, isActive: true, createdAt: new Date('2024-04-05').toISOString() },
                    { id: 'emp-005', name: 'Can Öztürk', email: 'can@demo.com', role: 'employee' as const, position: 'Satış Temsilcisi', companyId: demoCompanyId, isActive: true, createdAt: new Date('2024-05-18').toISOString() },
                ]

                if (!hasDemoEmployees) {
                    demoEmployees.forEach((emp) => addEmployee(emp))
                }

                if (!hasDemoAttendances) {
                    demoEmployees.forEach((employee) => {
                        const workPercentage = 0.7 + Math.random() * 0.1
                        const daysWorked = Math.floor(workDays.length * workPercentage)
                        const shuffledDays = [...workDays].sort(() => Math.random() - 0.5)
                        const employeeWorkDays = shuffledDays.slice(0, daysWorked)

                        employeeWorkDays.forEach((day) => {
                            const checkInHour = 8 + Math.floor(Math.random() * 2)
                            const checkOutHour = 17 + Math.floor(Math.random() * 2)
                            const checkInMinute = Math.floor(Math.random() * 60)
                            const checkOutMinute = Math.floor(Math.random() * 60)

                            const checkInDate = new Date(demoYear, demoMonth, day, checkInHour, checkInMinute)
                            const checkOutDate = new Date(demoYear, demoMonth, day, checkOutHour, checkOutMinute)

                            addAttendance({
                                id: crypto.randomUUID(),
                                employeeId: employee.id,
                                companyId: demoCompanyId,
                                type: 'check-in',
                                timestamp: checkInDate.toISOString(),
                                device: 'kiosk',
                            })
                            addAttendance({
                                id: crypto.randomUUID(),
                                employeeId: employee.id,
                                companyId: demoCompanyId,
                                type: 'check-out',
                                timestamp: checkOutDate.toISOString(),
                                device: 'kiosk',
                            })
                        })
                    })
                }
            }
        }
    }, [company?.id, employees, attendances, addEmployee, addAttendance])

    const downloadExcel = () => {
        try {
            // Create CSV content with BOM for Excel compatibility
            const BOM = '\uFEFF'
            let csvContent = 'Çalışan Adı,Pozisyon,Toplam Gün,Çalışma Saati,İşlem Sayısı\n'

            employeeReports.forEach((report) => {
                csvContent += `"${report.employee.name}",`
                csvContent += `"${report.employee.position || ''}",`
                csvContent += `${report.daysWorked},`
                csvContent += `"${report.hours}s ${report.minutes}dk",`
                csvContent += `${report.totalAttendances}\n`
            })

            // Add summary row
            csvContent += '\n'
            csvContent += `,,,,\n`
            csvContent += `"ÖZET",,,,\n`
            csvContent += `"Toplam Çalışma:",,,"${totalHours.toFixed(1)} saat",\n`
            csvContent += `"Toplam Çalışan:",,,"${companyEmployees.length}",\n`
            csvContent += `"Toplam İşlem:",,,"${employeeReports.reduce((sum, r) => sum + r.totalAttendances, 0)}",\n`

            // Create and download file
            const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `Rapor_${format(dateRange.from, 'dd_MM_yyyy')}_${format(dateRange.to, 'dd_MM_yyyy')}.csv`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)

            toast.success('Excel dosyası başarıyla indirildi!')
        } catch (error) {
            console.error('Export error:', error)
            toast.error('Dosya indirilirken hata oluştu')
        }
    }

    const companyEmployees = employees.filter((e) => e.companyId === company?.id)

    // Calculate hours for each employee in date range
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

        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        const daysWorked = new Set(
            empAttendances.map((a) => new Date(a.timestamp).toDateString())
        ).size

        return {
            employee,
            totalMinutes,
            hours,
            minutes,
            daysWorked,
            totalAttendances: empAttendances.length,
        }
    })

    const totalHours = employeeReports.reduce((sum, r) => sum + r.totalMinutes, 0) / 60

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Raporlar</h1>
                    <p className="text-muted-foreground">
                        Çalışan devam ve performans raporları
                    </p>
                </div>
                <Button variant="outline" onClick={downloadExcel}>
                    <Icons.download className="mr-2 h-4 w-4" />
                    Excel İndir
                </Button>
            </div>

            {/* Date Range Picker */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Tarih Aralığı:</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="justify-start text-left font-normal">
                                        <Icons.calendar className="mr-2 h-4 w-4" />
                                        {format(dateRange.from, 'dd MMM', { locale: tr })} -{' '}
                                        {format(dateRange.to, 'dd MMM yyyy', { locale: tr })}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={{ from: dateRange.from, to: dateRange.to }}
                                        onSelect={(range) => {
                                            if (range?.from && range?.to) {
                                                setDateRange({ from: range.from, to: range.to })
                                            }
                                        }}
                                        numberOfMonths={2}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Çalışma</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalHours.toFixed(1)} saat</div>
                        <p className="text-xs text-muted-foreground">
                            {companyEmployees.length} çalışan
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Ortalama/Çalışan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {companyEmployees.length > 0
                                ? (totalHours / companyEmployees.length).toFixed(1)
                                : 0}{' '}
                            saat
                        </div>
                        <p className="text-xs text-muted-foreground">Dönem ortalaması</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Giriş-Çıkış</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {employeeReports.reduce((sum, r) => sum + r.totalAttendances, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">İşlem sayısı</p>
                    </CardContent>
                </Card>
            </div>

            {/* Employee Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Çalışan Detayları</CardTitle>
                    <CardDescription>
                        {format(dateRange.from, 'dd MMMM', { locale: tr })} -{' '}
                        {format(dateRange.to, 'dd MMMM yyyy', { locale: tr })} arası
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Çalışan</TableHead>
                                <TableHead>Pozisyon</TableHead>
                                <TableHead className="text-right">Gün Sayısı</TableHead>
                                <TableHead className="text-right">Toplam Süre</TableHead>
                                <TableHead className="text-right">İşlem</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeeReports.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        Henüz çalışan verisi yok
                                    </TableCell>
                                </TableRow>
                            ) : (
                                employeeReports.map((report) => (
                                    <TableRow key={report.employee.id}>
                                        <TableCell className="font-medium">{report.employee.name}</TableCell>
                                        <TableCell>{report.employee.position || '-'}</TableCell>
                                        <TableCell className="text-right">{report.daysWorked}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Icons.clock className="h-3 w-3 text-muted-foreground" />
                                                {report.hours}s {report.minutes}dk
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{report.totalAttendances}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
