import { useState } from 'react'
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
import { format, startOfMonth, endOfMonth, differenceInMinutes, isWithinInterval } from 'date-fns'
import { tr } from 'date-fns/locale'
import { CalendarIcon, Download, Clock } from 'lucide-react'

export function ReportsPage() {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
    })

    const company = useAuthStore((state) => state.company)
    const employees = useDataStore((state) => state.employees)
    const attendances = useDataStore((state) => state.attendances)

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
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
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
                                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                                                <Clock className="h-3 w-3 text-muted-foreground" />
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
