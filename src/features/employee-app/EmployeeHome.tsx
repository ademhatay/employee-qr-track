import { useDataStore, useAuthStore } from '@/lib/store'
import { Link } from '@tanstack/react-router'
import { format, differenceInMinutes } from 'date-fns'
import { tr } from 'date-fns/locale'
import { useState, useEffect } from 'react'

export function EmployeeHome() {
    const user = useAuthStore((state) => state.user)
    const attendances = useDataStore((state) => state.attendances)
    const [currentTime, setCurrentTime] = useState(new Date())

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

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
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-6 py-4 flex justify-between items-center relative z-20">
                {/* Logo */}
                <div className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-charcoal text-2xl">qr_code_scanner</span>
                    <span className="font-hand font-bold text-lg">QR Track</span>
                </div>

                {/* User Avatar */}
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform rotate-2 rounded-full"></div>
                    <div className="relative bg-blue-100 border-2 border-charcoal w-12 h-12 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-charcoal text-2xl">person</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-4 max-w-lg mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-hand font-bold text-charcoal wiggle-slow">
                        Hello, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <div className="marker-highlight-yellow inline-block">
                        <span className="font-hand font-bold text-lg text-charcoal">
                            {format(currentTime, 'EEEE, MMM d, yyyy', { locale: tr })}
                        </span>
                    </div>
                </div>

                {/* Current Time - Large Display */}
                <div className="text-center">
                    <h2 className="text-6xl font-hand font-bold text-charcoal tracking-tight">
                        {format(currentTime, 'HH:mm')}
                    </h2>
                </div>

                {/* Status Card */}
                <div className="relative">
                    <div className={`absolute inset-0 ${isCheckedIn ? 'bg-green-300' : 'bg-gray-300'} border-2 border-charcoal transform translate-x-1 translate-y-1 rounded-lg`}></div>
                    <div className={`relative ${isCheckedIn ? 'bg-green-100 border-green-400' : 'bg-white border-gray-400'} border-2 border-charcoal p-6 rounded-lg text-center`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-charcoal ${isCheckedIn ? 'bg-green-500' : 'bg-gray-200'}`}>
                            <span className={`material-symbols-outlined text-4xl ${isCheckedIn ? 'text-white' : 'text-gray-500'}`}>
                                {isCheckedIn ? 'check_circle' : 'schedule'}
                            </span>
                        </div>
                        <h2 className="text-2xl font-hand font-bold text-charcoal mb-1">
                            {isCheckedIn ? "You're Working ✓" : "Not Checked In"}
                        </h2>
                        {isCheckedIn && todayAttendances.length > 0 && (
                            <p className="font-display text-gray-600">
                                Started at {format(new Date(todayAttendances[todayAttendances.length - 1].timestamp), 'HH:mm')}
                            </p>
                        )}
                    </div>
                </div>

                {/* Today's Stats */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Work Time */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform rotate-1 rounded-lg"></div>
                        <div className="relative bg-blue-100 border-2 border-charcoal p-4 rounded-lg text-center">
                            <span className="material-symbols-outlined text-3xl text-blue-600 mb-2">timer</span>
                            <p className="text-2xl font-hand font-bold text-charcoal">{hours}h {minutes}m</p>
                            <p className="text-sm text-gray-600 font-display">Today's Time</p>
                        </div>
                    </div>

                    {/* Activity Count */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-200 border-2 border-charcoal transform -rotate-1 rounded-lg"></div>
                        <div className="relative bg-purple-100 border-2 border-charcoal p-4 rounded-lg text-center">
                            <span className="material-symbols-outlined text-3xl text-purple-600 mb-2">history</span>
                            <p className="text-2xl font-hand font-bold text-charcoal">{todayAttendances.length}</p>
                            <p className="text-sm text-gray-600 font-display">Activities</p>
                        </div>
                    </div>
                </div>

                {/* Scan Button */}
                <Link to="/app/scan" className="block">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-charcoal transform translate-x-2 translate-y-2 rounded-lg group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"></div>
                        <button className={`relative w-full h-20 ${isCheckedIn ? 'bg-orange-500 border-orange-600' : 'bg-green-500 border-green-600'} text-white rounded-lg font-hand font-bold text-2xl border-2 border-charcoal flex items-center justify-center gap-4 transition-all group-hover:-translate-y-0.5`}>
                            <span className="material-symbols-outlined text-3xl">qr_code_scanner</span>
                            {isCheckedIn ? 'Check Out' : 'Check In'}
                        </button>
                    </div>
                </Link>

                {/* Quick Links */}
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/app/history">
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-amber-200 border-2 border-charcoal transform rotate-1 rounded-lg"></div>
                            <div className="relative bg-amber-100 border-2 border-charcoal p-4 rounded-lg text-center hover:bg-amber-50 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-amber-600 mb-2">history</span>
                                <p className="font-hand font-bold text-charcoal">History</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/app/profile">
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform -rotate-1 rounded-lg"></div>
                            <div className="relative bg-blue-100 border-2 border-charcoal p-4 rounded-lg text-center hover:bg-blue-50 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-blue-600 mb-2">person</span>
                                <p className="font-hand font-bold text-charcoal">Profile</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Last Activity - Sticky Note */}
                {todayAttendances.length > 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-200 border-2 border-charcoal transform rotate-1 rounded-sm"></div>
                        <div className="relative bg-[#fff9c4] border-2 border-charcoal p-5 rounded-sm">
                            {/* Tape visual */}
                            <div className="absolute -top-3 left-8 w-12 h-4 bg-white/60 border border-white/80 transform -rotate-3"></div>

                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-2xl text-charcoal flex-shrink-0">schedule</span>
                                <div className="flex-1">
                                    <p className="font-hand font-bold text-lg text-charcoal">Last Activity</p>
                                    <p className="font-display text-gray-600">
                                        {todayAttendances[todayAttendances.length - 1].type === 'check-in' ? 'Checked In' : 'Checked Out'} at{' '}
                                        <code className="font-mono bg-white px-2 py-0.5 rounded border border-charcoal/30">
                                            {format(new Date(todayAttendances[todayAttendances.length - 1].timestamp), 'HH:mm')}
                                        </code>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="w-full py-4 text-center mt-8">
                <p className="font-hand text-charcoal/60 text-sm">
                    <span className="font-bold text-charcoal">QR Track</span> • Employee Mobile App
                </p>
            </footer>
        </div>
    )
}
