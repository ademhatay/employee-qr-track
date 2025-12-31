import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDataStore, useAuthStore } from '@/lib/store'
import { Icons } from '@/lib/icons'
import { format, isToday } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

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
            icon: Icons.users,
            description: 'Aktif çalışanlar',
            color: 'blue',
            trend: companyEmployees.length > 0 ? '+2 bu ay' : null,
        },
        {
            title: 'Şu An İçeride',
            value: currentlyCheckedIn,
            icon: Icons.userCheck,
            description: 'Giriş yapmış',
            color: 'green',
            trend: currentlyCheckedIn > 0 ? 'Çevrimiçi' : null,
        },
        {
            title: 'Bugünkü Giriş',
            value: todayAttendances.filter((a) => a.type === 'check-in').length,
            icon: Icons.clock,
            description: format(new Date(), 'dd MMMM yyyy'),
            color: 'orange',
            trend: todayAttendances.length > 0 ? 'Yeni kayıtlar' : null,
        },
        {
            title: 'Aktif Kiosklar',
            value: kioskAccounts.filter((k) => k.companyId === company?.id).length,
            icon: Icons.qrCode,
            description: 'QR terminalleri',
            color: 'purple',
            trend: kioskAccounts.length > 0 ? 'Aktif' : 'Ayarla',
        },
    ]

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: {
                bg: 'bg-sketchy-accent-blue/10',
                text: 'text-sketchy-accent-blue',
                border: 'border-sketchy-accent-blue/30',
            },
            green: {
                bg: 'bg-sketchy-accent-green/10',
                text: 'text-sketchy-accent-green',
                border: 'border-sketchy-accent-green/30',
            },
            orange: {
                bg: 'bg-sketchy-accent-red/10',
                text: 'text-sketchy-accent-red',
                border: 'border-sketchy-accent-red/30',
            },
            purple: {
                bg: 'bg-sketchy-accent-purple/10',
                text: 'text-sketchy-accent-purple',
                border: 'border-sketchy-accent-purple/30',
            },
        }
        return colorMap[color as keyof typeof colorMap] || colorMap.blue
    }

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="space-y-4">
                <div>
                    <h1 className="heading-organic-2 text-sketchy-primary mb-2">
                        Hoş Geldiniz! 👋
                    </h1>
                    <p className="body-organic text-sketchy-text-secondary">
                        {company?.name} için genel bakış
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3">
                    <Button
                        variant="sketchy"
                        size="lg"
                        className="shadow-sketchy-md hover:shadow-sketchy-lg transition-shadow"
                    >
                        <Icons.add className="w-5 h-5 mr-2" />
                        Yeni Çalışan Ekle
                    </Button>
                    <Link to="/kiosk">
                        <Button
                            variant="sketchy"
                            size="lg"
                            className="shadow-sketchy-md hover:shadow-sketchy-lg transition-shadow"
                        >
                            <Icons.qrCode className="w-5 h-5 mr-2" />
                            Kiosk Yönetimi
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const colorClasses = getColorClasses(stat.color)
                    return (
                        <Card 
                            key={stat.title}
                            sketchy
                            texture="paper"
                            className="shadow-sketchy-md hover:shadow-sketchy-lg transition-all duration-300 hover:scale-105"
                        >
                            <CardHeader sketchy className="space-y-3 pb-3">
                                <div className="flex items-start justify-between">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colorClasses.bg} border-organic-sm`}>
                                        <stat.icon className={`w-6 h-6 ${colorClasses.text}`} />
                                    </div>
                                    {stat.trend && (
                                        <Badge 
                                            variant="secondary" 
                                            className="border-organic-sm text-xs ${colorClasses.text} ${colorClasses.bg}"
                                        >
                                            {stat.trend}
                                        </Badge>
                                    )}
                                </div>
                                <div>
                                    <CardTitle sketchy className="body-organic text-sketchy-text-secondary text-xs uppercase tracking-wide mb-1">
                                        {stat.title}
                                    </CardTitle>
                                    <div className="flex items-baseline gap-2">
                                        <div className="heading-organic-3 text-sketchy-primary">
                                            {stat.value}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent sketchy className="pt-0">
                                <p className="body-organic-small text-sketchy-text-secondary">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Content Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card sketchy texture="paper" className="shadow-sketchy-lg">
                    <CardHeader sketchy className="space-y-2 pb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sketchy-accent-blue/10 border-organic-sm">
                                    <Icons.trending className="w-5 h-5 text-sketchy-accent-blue" />
                                </div>
                                <div>
                                    <CardTitle sketchy className="heading-organic-4 text-sketchy-primary">
                                        Son Hareketler
                                    </CardTitle>
                                    <CardDescription sketchy className="body-organic-small text-sketchy-text-secondary">
                                        Bugünkü giriş-çıkış kayıtları
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge 
                                variant="secondary" 
                                className="border-organic-sm"
                            >
                                {todayAttendances.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent sketchy className="pt-0">
                        {todayAttendances.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sketchy-accent-blue/10 border-organic-md">
                                    <Icons.clock className="w-8 h-8 text-sketchy-accent-blue" />
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="body-organic text-sketchy-text-secondary">
                                        Bugün henüz giriş-çıkış kaydı yok
                                    </p>
                                    <p className="body-organic-small text-sketchy-text-muted">
                                        Çalışanlar kiosk ile giriş yapabilir
                                    </p>
                                </div>
                                <Link to="/kiosk">
                                    <Button variant="sketchy" size="sm">
                                        Kiosku Yönet
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {todayAttendances.slice(-5).reverse().map((attendance) => {
                                    const employee = companyEmployees.find((e) => e.id === attendance.employeeId)
                                    const isCheckIn = attendance.type === 'check-in'
                                    return (
                                        <div 
                                            key={attendance.id}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-sketchy-border-muted hover:border-sketchy-accent-blue/30 transition-all duration-300 hover:shadow-sketchy-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border-organic-sm ${
                                                    isCheckIn 
                                                        ? 'bg-sketchy-accent-green/10 text-sketchy-accent-green' 
                                                        : 'bg-sketchy-accent-red/10 text-sketchy-accent-red'
                                                }`}>
                                                    {isCheckIn ? (
                                                        <Icons.signIn className="w-5 h-5" />
                                                    ) : (
                                                        <Icons.signOut className="w-5 h-5" />
                                                    )}
                                                </div>
                                                <div className="space-y-0.5">
                                                    <p className="label-organic text-sketchy-primary font-medium">
                                                        {employee?.name || 'Bilinmeyen'}
                                                    </p>
                                                    <p className="body-organic-small text-sketchy-text-secondary">
                                                        {isCheckIn ? 'Giriş yaptı' : 'Çıkış yaptı'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Badge 
                                                    variant={isCheckIn ? "secondary" : "outline"}
                                                    className={`border-organic-sm text-xs ${
                                                        isCheckIn 
                                                            ? 'bg-sketchy-accent-green/10 text-sketchy-accent-green' 
                                                            : 'bg-sketchy-accent-red/10 text-sketchy-accent-red'
                                                    }`}
                                                >
                                                    {format(new Date(attendance.timestamp), 'HH:mm')}
                                                </Badge>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions & Info */}
                <div className="space-y-6">
                    {/* Getting Started */}
                    <Card sketchy texture="paper" className="shadow-sketchy-lg">
                        <CardHeader sketchy className="space-y-2 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sketchy-accent-purple/10 border-organic-sm">
                                    <Icons.rocket className="w-5 h-5 text-sketchy-accent-purple" />
                                </div>
                                <div>
                                    <CardTitle sketchy className="heading-organic-4 text-sketchy-primary">
                                        Hızlı Başlangıç
                                    </CardTitle>
                                    <CardDescription sketchy className="body-organic-small text-sketchy-text-secondary">
                                        Sistemi kurma adımları
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent sketchy className="pt-0 space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-sketchy-bg-secondary/50 border border-sketchy-border-muted border-dashed">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sketchy-accent-blue/10 text-sketchy-accent-blue font-bold border-organic-sm shrink-0">
                                    1
                                </div>
                                <div className="space-y-1">
                                    <p className="label-organic text-sketchy-primary font-medium">
                                        Çalışan Ekle
                                    </p>
                                    <p className="body-organic-small text-sketchy-text-secondary">
                                        Takip edilecek çalışanları sisteme ekleyin
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-sketchy-bg-secondary/50 border border-sketchy-border-muted border-dashed">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sketchy-accent-green/10 text-sketchy-accent-green font-bold border-organic-sm shrink-0">
                                    2
                                </div>
                                <div className="space-y-1">
                                    <p className="label-organic text-sketchy-primary font-medium">
                                        Kiosk Kur
                                    </p>
                                    <p className="body-organic-small text-sketchy-text-secondary">
                                        Giriş terminali oluşturun
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-sketchy-bg-secondary/50 border border-sketchy-border-muted border-dashed">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sketchy-accent-purple/10 text-sketchy-accent-purple font-bold border-organic-sm shrink-0">
                                    3
                                </div>
                                <div className="space-y-1">
                                    <p className="label-organic text-sketchy-primary font-medium">
                                        Takip Başlat
                                    </p>
                                    <p className="body-organic-small text-sketchy-text-secondary">
                                        QR kod ile giriş-çıkış kaydı alın
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Company Status */}
                    <Card sketchy texture="paper" className="shadow-sketchy-lg">
                        <CardHeader sketchy className="space-y-2 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sketchy-accent-blue/10 border-organic-sm">
                                    <Icons.building className="w-5 h-5 text-sketchy-accent-blue" />
                                </div>
                                <div>
                                    <CardTitle sketchy className="heading-organic-4 text-sketchy-primary">
                                        Şirket Durumu
                                    </CardTitle>
                                    <CardDescription sketchy className="body-organic-small text-sketchy-text-secondary">
                                        Plan ve özellikler
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent sketchy className="pt-0 space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-sketchy-bg-secondary/50 border border-sketchy-border-muted border-dashed">
                                <div className="flex items-center gap-2">
                                    <Icons.star className="w-5 h-5 text-sketchy-accent-orange" />
                                    <span className="body-organic text-sketchy-primary">
                                        {company?.plan === 'pro' ? 'Pro Plan' : 'Ücretsiz Plan'}
                                    </span>
                                </div>
                                <Badge 
                                    variant="secondary"
                                    className="border-organic-sm text-xs bg-sketchy-accent-green/10 text-sketchy-accent-green"
                                >
                                    Aktif
                                </Badge>
                            </div>
                            <Link to="/dashboard/settings">
                                <Button 
                                    variant="sketchy"
                                    className="w-full"
                                    size="lg"
                                >
                                    Ayarları Yönet
                                    <Icons.chevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
