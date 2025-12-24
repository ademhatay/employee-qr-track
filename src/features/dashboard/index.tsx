import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDataStore, useAuthStore } from '@/lib/store'
import { Users, Clock, QrCode, TrendingUp, UserCheck } from 'lucide-react'
import { format, isToday } from 'date-fns'

export function DashboardOverview() {
    const company = useAuthStore((state) => state.company)
    const employees = useDataStore((state) => state.employees)
    const attendances = useDataStore((state) => state.attendances)
    const kioskAccounts = useDataStore((state) => state.kioskAccounts)

    // Filter employees by company
    const companyEmployees = employees.filter((e) => e.companyId === company?.id)

    // Today's attendance
    const todayAttendances = attendances.filter(
        (a) => a.companyId === company?.id && isToday(new Date(a.timestamp))
    )

    // Currently checked in (odd number of check-ins today)
    const employeeCheckIns = new Map<string, number>()
    todayAttendances.forEach((a) => {
        const count = employeeCheckIns.get(a.employeeId) || 0
        employeeCheckIns.set(a.employeeId, count + 1)
    })
    const currentlyCheckedIn = Array.from(employeeCheckIns.entries()).filter(
        ([_, count]) => count % 2 === 1
    ).length

    const stats = [
        {
            title: 'Toplam Çalışan',
            value: companyEmployees.length,
            icon: Users,
            description: 'Aktif çalışanlar',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'Şu An İçeride',
            value: currentlyCheckedIn,
            icon: UserCheck,
            description: 'Giriş yapmış',
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
        },
        {
            title: 'Bugünkü Giriş',
            value: todayAttendances.filter((a) => a.type === 'check-in').length,
            icon: Clock,
            description: format(new Date(), 'dd MMMM yyyy'),
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        },
        {
            title: 'Aktif Kiosklar',
            value: kioskAccounts.filter((k) => k.companyId === company?.id).length,
            icon: QrCode,
            description: 'QR terminalleri',
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Hoş geldiniz, {company?.name} için genel bakış
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Son Hareketler
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {todayAttendances.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">
                            Bugün henüz giriş-çıkış kaydı yok
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {todayAttendances.slice(-5).reverse().map((attendance) => {
                                const employee = companyEmployees.find((e) => e.id === attendance.employeeId)
                                return (
                                    <div key={attendance.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${attendance.type === 'check-in' ? 'bg-green-500' : 'bg-red-500'
                                                }`} />
                                            <div>
                                                <p className="font-medium">{employee?.name || 'Bilinmeyen'}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {attendance.type === 'check-in' ? 'Giriş yaptı' : 'Çıkış yaptı'}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {format(new Date(attendance.timestamp), 'HH:mm')}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
