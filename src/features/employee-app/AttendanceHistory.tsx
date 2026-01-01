import { useDataStore, useAuthStore } from '@/lib/store'
import { format, differenceInMinutes, startOfMonth, endOfMonth } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Link } from '@tanstack/react-router'

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
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-6 py-4 flex justify-between items-center relative z-20">
                {/* Back Button */}
                <Link to="/app" className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <span className="material-symbols-outlined text-charcoal">arrow_back</span>
                    <span className="font-hand font-bold text-sm">Back</span>
                </Link>

                {/* Logo */}
                <div className="sketch-border-sm bg-white px-4 py-2 transform rotate-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-charcoal text-2xl">qr_code_scanner</span>
                    <span className="font-hand font-bold text-lg">QR Track</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-4 max-w-lg mx-auto space-y-6 pb-20">
                {/* Title Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-hand font-bold text-charcoal wiggle-slow">
                        Activity History 📋
                    </h1>
                    <p className="font-display text-gray-600">
                        Your check-in and check-out records
                    </p>
                </div>

                {/* Monthly Summary */}
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform translate-x-1 translate-y-1 rounded-lg"></div>
                    <div className="relative bg-blue-100 border-2 border-charcoal p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-display text-sm text-gray-600">
                                    {format(now, 'MMMM yyyy', { locale: tr })} Total
                                </p>
                                <p className="text-3xl font-hand font-bold text-charcoal">
                                    {totalHours}h {remainingMinutes}m
                                </p>
                            </div>
                            <div className="p-3 bg-blue-200 rounded-full border-2 border-charcoal">
                                <span className="material-symbols-outlined text-3xl text-blue-600">timer</span>
                            </div>
                        </div>
                    </div>
                </div>

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

                        const isToday = new Date(date).toDateString() === new Date().toDateString()

                        return (
                            <div key={date} className="relative">
                                {/* Card Shadow */}
                                <div className={`absolute inset-0 ${isToday ? 'bg-green-200' : 'bg-gray-200'} border-2 border-charcoal transform translate-x-1 translate-y-1 rounded-lg`}></div>

                                {/* Main Card */}
                                <div className={`relative ${isToday ? 'bg-green-50' : 'bg-white'} sketch-border p-4 rounded-lg`}>
                                    {/* Date Header */}
                                    <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-gray-200 mb-3">
                                        <div className="flex items-center gap-2">
                                            {isToday && (
                                                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-hand font-bold rounded border border-green-600">
                                                    Today
                                                </span>
                                            )}
                                            <span className="font-hand font-bold text-charcoal">
                                                {format(new Date(date), 'MMM d, EEEE', { locale: tr })}
                                            </span>
                                        </div>
                                        <code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded border border-charcoal/30 text-charcoal">
                                            {Math.floor(dailyMinutes / 60)}h {dailyMinutes % 60}m
                                        </code>
                                    </div>

                                    {/* Records */}
                                    <div className="space-y-2">
                                        {sortedRecords.reverse().map((record) => (
                                            <div
                                                key={record.id}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-charcoal/10"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full border-2 border-charcoal ${record.type === 'check-in' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                        <span className={`material-symbols-outlined text-lg ${record.type === 'check-in' ? 'text-green-600' : 'text-red-600'}`}>
                                                            {record.type === 'check-in' ? 'login' : 'logout'}
                                                        </span>
                                                    </div>
                                                    <span className="font-hand font-bold text-charcoal">
                                                        {record.type === 'check-in' ? 'Check In' : 'Check Out'}
                                                    </span>
                                                </div>
                                                <code className="font-mono text-base text-charcoal bg-white px-3 py-1 rounded border border-charcoal/30">
                                                    {format(new Date(record.timestamp), 'HH:mm')}
                                                </code>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {Object.keys(groupedByDate).length === 0 && (
                        <div className="relative">
                            <div className="absolute inset-0 bg-gray-200 border-2 border-charcoal transform rotate-1 rounded-sm"></div>
                            <div className="relative bg-gray-100 border-2 border-charcoal p-8 rounded-sm text-center">
                                <span className="material-symbols-outlined text-5xl text-gray-400 mb-3">history_toggle_off</span>
                                <p className="font-hand font-bold text-xl text-gray-600">No records yet</p>
                                <p className="font-display text-sm text-gray-500 mt-1">
                                    Start by scanning a QR code
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-4 text-center fixed bottom-0 bg-background-light/80 backdrop-blur-sm">
                <p className="font-hand text-charcoal/60 text-sm">
                    <span className="font-bold text-charcoal">QR Track</span> • Employee Mobile App
                </p>
            </footer>
        </div>
    )
}
