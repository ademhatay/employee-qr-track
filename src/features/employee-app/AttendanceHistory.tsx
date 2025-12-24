import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDataStore, useAuthStore } from '@/lib/store'
import { format, differenceInMinutes, startOfMonth, endOfMonth } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Clock, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'

export function AttendanceHistory() {
    const user = useAuthStore((state) => state.user)
    const attendances = useDataStore((state) => state.attendances)

    // Get user's attendance, sorted by date descending
    const userAttendances = attendances
        .filter((a) => a.employeeId === user?.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Group by date
    const groupedByDate = userAttendances.reduce((acc, att) => {
        const date = new Date(att.timestamp).toDateString()
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(att)
        return acc
    }, {} as Record<string, typeof userAttendances>)

    // Calculate monthly total
    const now = new Date()
    const monthStart = startOfMonth(now)
    const monthEnd = endOfMonth(now)

    const monthlyAttendances = userAttendances.filter((a) => {
        const date = new Date(a.timestamp)
        return date >= monthStart && date <= monthEnd
    })

    let monthlyMinutes = 0
    const sortedMonthly = [...monthlyAttendances].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )

    for (let i = 0; i < sortedMonthly.length - 1; i += 2) {
        if (sortedMonthly[i].type === 'check-in' && sortedMonthly[i + 1]?.type === 'check-out') {
            const checkIn = new Date(sortedMonthly[i].timestamp)
            const checkOut = new Date(sortedMonthly[i + 1].timestamp)
            monthlyMinutes += differenceInMinutes(checkOut, checkIn)
        }
    }

    const totalHours = Math.floor(monthlyMinutes / 60)
    const remainingMinutes = monthlyMinutes % 60

    return (
        <div className="space-y-6 p-4">
            <div>
                <h1 className="text-2xl font-bold">Geçmiş</h1>
                <p className="text-muted-foreground">Giriş-çıkış kayıtlarınız</p>
            </div>

            {/* Monthly Summary */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                {format(now, 'MMMM yyyy', { locale: tr })} Toplam
                            </p>
                            <p className="text-2xl font-bold">
                                {totalHours} saat {remainingMinutes} dk
                            </p>
                        </div>
                        <Clock className="h-10 w-10 text-primary/50" />
                    </div>
                </CardContent>
            </Card>

            {/* Daily Records */}
            <div className="space-y-4">
                {Object.entries(groupedByDate).map(([date, records]) => {
                    // Calculate daily total
                    const sortedRecords = [...records].sort(
                        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
                    )

                    let dailyMinutes = 0
                    for (let i = 0; i < sortedRecords.length - 1; i += 2) {
                        if (sortedRecords[i].type === 'check-in' && sortedRecords[i + 1]?.type === 'check-out') {
                            dailyMinutes += differenceInMinutes(
                                new Date(sortedRecords[i + 1].timestamp),
                                new Date(sortedRecords[i].timestamp)
                            )
                        }
                    }

                    return (
                        <Card key={date}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium flex items-center justify-between">
                                    <span>{format(new Date(date), 'dd MMMM yyyy, EEEE', { locale: tr })}</span>
                                    <span className="text-muted-foreground">
                                        {Math.floor(dailyMinutes / 60)}s {dailyMinutes % 60}dk
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {sortedRecords.reverse().map((record) => (
                                    <div
                                        key={record.id}
                                        className="flex items-center justify-between py-2 border-b last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            {record.type === 'check-in' ? (
                                                <ArrowDownCircle className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <ArrowUpCircle className="h-5 w-5 text-red-500" />
                                            )}
                                            <span className="font-medium">
                                                {record.type === 'check-in' ? 'Giriş' : 'Çıkış'}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground">
                                            {format(new Date(record.timestamp), 'HH:mm')}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )
                })}

                {Object.keys(groupedByDate).length === 0 && (
                    <Card>
                        <CardContent className="p-8 text-center text-muted-foreground">
                            Henüz kayıt bulunmuyor
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
