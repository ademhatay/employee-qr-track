import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDataStore, useAuthStore } from '@/lib/store'
import { Link } from '@tanstack/react-router'
import { Icons } from '@/lib/icons'
import { format, differenceInMinutes } from 'date-fns'

export function EmployeeHome() {
    const user = useAuthStore((state) => state.user)
    const attendances = useDataStore((state) => state.attendances)

    // Get user's attendance for today
    const today = new Date().toDateString()
    const todayAttendances = attendances
        .filter((a) => a.employeeId === user?.id && new Date(a.timestamp).toDateString() === today)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    const isCheckedIn = todayAttendances.length % 2 === 1

    // Calculate today's worked time
    let todayMinutes = 0
    for (let i = 0; i < todayAttendances.length - 1; i += 2) {
        const checkIn = new Date(todayAttendances[i].timestamp)
        const checkOut = new Date(todayAttendances[i + 1]?.timestamp || new Date())
        todayMinutes += differenceInMinutes(checkOut, checkIn)
    }
    if (isCheckedIn && todayAttendances.length > 0) {
        const lastCheckIn = new Date(todayAttendances[todayAttendances.length - 1].timestamp)
        todayMinutes += differenceInMinutes(new Date(), lastCheckIn)
    }

    const hours = Math.floor(todayMinutes / 60)
    const minutes = todayMinutes % 60

    return (
        <div className="space-y-6 p-4">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold">Merhaba, {user?.name?.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">
                    {format(new Date(), 'dd MMMM yyyy, EEEE')}
                </p>
            </div>

            {/* Status */}
            <Card className={isCheckedIn ? 'border-green-500 bg-green-500/10' : ''}>
                <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isCheckedIn ? 'bg-green-500' : 'bg-muted'
                        }`}>
                        <Icons.clock className={`h-8 w-8 ${isCheckedIn ? 'text-white' : 'text-muted-foreground'}`} />
                    </div>
                    <h2 className="text-xl font-semibold mb-1">
                        {isCheckedIn ? 'Şu an çalışıyorsunuz' : 'Henüz giriş yapmadınız'}
                    </h2>
                    {isCheckedIn && todayAttendances.length > 0 && (
                        <p className="text-muted-foreground">
                            Giriş: {format(new Date(todayAttendances[todayAttendances.length - 1].timestamp), 'HH:mm')}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Today's Stats */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4 text-center">
                        <Icons.trending className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{hours}s {minutes}dk</p>
                        <p className="text-sm text-muted-foreground">Bugünkü Süre</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <Icons.history className="h-6 w-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{todayAttendances.length}</p>
                        <p className="text-sm text-muted-foreground">İşlem Sayısı</p>
                    </CardContent>
                </Card>
            </div>

            {/* Scan Button */}
            <Link to="/app/scan">
                <Button size="lg" className="w-full h-16 text-lg">
                    <Icons.qrCode className="mr-3 h-6 w-6" />
                    {isCheckedIn ? 'Çıkış Yap' : 'Giriş Yap'}
                </Button>
            </Link>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
                <Link to="/app/history">
                    <Card className="hover:bg-accent transition-colors cursor-pointer">
                        <CardContent className="p-4 text-center">
                            <Icons.history className="h-6 w-6 mx-auto mb-2" />
                            <p className="font-medium">Geçmiş</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    )
}
