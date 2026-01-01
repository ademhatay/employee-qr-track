import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useDataStore, useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import type { Attendance } from '@/types'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export function QRScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const [lastScan, setLastScan] = useState<{ type: 'check-in' | 'check-out'; time: Date } | null>(null)
    const [currentTime, setCurrentTime] = useState(new Date())
    const scannerRef = useRef<Html5Qrcode | null>(null)

    const user = useAuthStore((state) => state.user)
    const addAttendance = useDataStore((state) => state.addAttendance)
    const attendances = useDataStore((state) => state.attendances)

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Determine if user is currently checked in
    const todayAttendances = attendances.filter(
        (a) => a.employeeId === user?.id &&
            new Date(a.timestamp).toDateString() === new Date().toDateString()
    )
    const isCheckedIn = todayAttendances.length % 2 === 1

    const startScanner = async () => {
        try {
            const html5QrCode = new Html5Qrcode('qr-reader')
            scannerRef.current = html5QrCode

            await html5QrCode.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                (decodedText) => {
                    handleScan(decodedText)
                    stopScanner()
                },
                () => { } // Ignore errors during scanning
            )
            setIsScanning(true)
        } catch (err) {
            console.error('Scanner error:', err)
            toast.error('Camera could not be opened. Please check permissions.')
        }
    }

    const stopScanner = async () => {
        if (scannerRef.current) {
            await scannerRef.current.stop()
            scannerRef.current = null
        }
        setIsScanning(false)
    }

    const handleScan = (qrData: string) => {
        // Validate QR code format (should start with QRT-)
        if (!qrData.startsWith('QRT-')) {
            toast.error('Invalid QR code')
            return
        }

        const type: 'check-in' | 'check-out' = isCheckedIn ? 'check-out' : 'check-in'

        const newAttendance: Attendance = {
            id: crypto.randomUUID(),
            employeeId: user?.id || '',
            companyId: user?.companyId || '',
            type,
            timestamp: new Date().toISOString(),
            device: 'mobile',
        }

        addAttendance(newAttendance)
        setLastScan({ type, time: new Date() })

        if (type === 'check-in') {
            toast.success('Checked in! Have a great day.')
        } else {
            toast.success('Checked out! See you tomorrow.')
        }
    }

    useEffect(() => {
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop()
            }
        }
    }, [])

    return (
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-6 py-4 flex justify-between items-center relative z-20">
                {/* Logo */}
                <div className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-charcoal text-2xl">qr_code_scanner</span>
                    <span className="font-hand font-bold text-lg">QR Track</span>
                </div>

                {/* Current Time - Sticky Note */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-yellow-200 border-2 border-charcoal transform rotate-2 rounded-sm"></div>
                    <div className="relative bg-[#fff9c4] border-2 border-charcoal px-4 py-2 rounded-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-charcoal">schedule</span>
                        <span className="font-hand font-bold text-lg">
                            {format(currentTime, 'HH:mm')}
                        </span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-4 max-w-lg mx-auto space-y-6">
                {/* Welcome Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-hand font-bold text-charcoal wiggle-slow">
                        {isCheckedIn ? 'Ready to Leave?' : 'Good Morning!'} 👋
                    </h1>
                    <p className="font-display text-gray-600">
                        {isCheckedIn ? 'Scan QR code to check out' : 'Scan QR code to check in'}
                    </p>
                    <div className="marker-highlight-yellow inline-block">
                        <span className="font-hand font-bold text-lg text-charcoal">
                            {format(currentTime, 'EEEE, MMM d', { locale: tr })}
                        </span>
                    </div>
                </div>

                {/* Status Card */}
                <div className="relative">
                    <div className={`absolute inset-0 ${isCheckedIn ? 'bg-green-300' : 'bg-orange-300'} border-2 border-charcoal transform translate-x-1 translate-y-1 rounded-lg`}></div>
                    <div className={`relative ${isCheckedIn ? 'bg-green-100 border-green-400' : 'bg-orange-100 border-orange-400'} border-2 border-charcoal p-5 rounded-lg flex items-center gap-4`}>
                        <div className={`p-3 ${isCheckedIn ? 'bg-green-500' : 'bg-orange-500'} rounded-full border-2 border-charcoal`}>
                            <span className="material-symbols-outlined text-white text-2xl">
                                {isCheckedIn ? 'check_circle' : 'schedule'}
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="font-hand font-bold text-xl text-charcoal">
                                {isCheckedIn ? "You're Checked In ✓" : "Not Checked In Yet"}
                            </p>
                            {todayAttendances.length > 0 && (
                                <p className="font-display text-sm text-gray-600">
                                    Last action: {new Date(todayAttendances[todayAttendances.length - 1].timestamp).toLocaleTimeString('tr-TR')}
                                </p>
                            )}
                        </div>
                        <span className={`material-symbols-outlined text-4xl ${isCheckedIn ? 'text-green-600' : 'text-orange-600'} opacity-30`}>
                            {isCheckedIn ? 'trending_up' : 'pending'}
                        </span>
                    </div>
                </div>

                {/* Scanner Card */}
                <div className="relative">
                    {/* Card Shadow */}
                    <div className="absolute inset-0 bg-charcoal transform translate-x-2 translate-y-2 rounded-lg"></div>

                    {/* Main Card */}
                    <div className="relative bg-white sketch-border p-6 space-y-4">
                        {/* Header */}
                        <div className="flex items-center gap-3 pb-4 border-b-2 border-dashed border-gray-200">
                            <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                                <span className="material-symbols-outlined text-blue-600">photo_camera</span>
                            </div>
                            <div>
                                <h2 className="font-hand font-bold text-xl text-charcoal">QR Scanner</h2>
                                <p className="text-sm text-gray-500 font-display">Point camera at QR code</p>
                            </div>
                        </div>

                        {/* Scanner Area */}
                        <div className="relative">
                            <div id="qr-reader" className="w-full rounded-lg overflow-hidden bg-gray-100 min-h-[200px]" />

                            {/* Corner Brackets (when not scanning) */}
                            {!isScanning && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                                    <div className="relative w-48 h-48">
                                        {/* Corner Brackets */}
                                        <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-charcoal rounded-tl-lg"></div>
                                        <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-charcoal rounded-tr-lg"></div>
                                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-charcoal rounded-bl-lg"></div>
                                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-charcoal rounded-br-lg"></div>

                                        {/* Center Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-6xl text-gray-300">qr_code_2</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Scan Button */}
                        {!isScanning ? (
                            <button
                                onClick={startScanner}
                                className="w-full h-14 bg-blue-600 text-white rounded-lg font-hand font-bold text-xl hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 hover:shadow-lg border-2 border-blue-700 flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">photo_camera</span>
                                Start Scanning
                            </button>
                        ) : (
                            <button
                                onClick={stopScanner}
                                className="w-full h-14 bg-red-600 text-white rounded-lg font-hand font-bold text-xl hover:bg-red-700 transition-all transform hover:-translate-y-0.5 hover:shadow-lg border-2 border-red-700 flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">stop_circle</span>
                                Stop Scanning
                            </button>
                        )}
                    </div>
                </div>

                {/* Last Scan Result - Success Card */}
                {lastScan && (
                    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="absolute inset-0 bg-green-300 border-2 border-charcoal transform translate-x-1 translate-y-1 rounded-lg"></div>
                        <div className="relative bg-green-100 border-2 border-green-400 p-6 rounded-lg text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-full border-2 border-charcoal mb-3">
                                <span className="material-symbols-outlined text-white text-3xl">
                                    {lastScan.type === 'check-in' ? 'login' : 'logout'}
                                </span>
                            </div>
                            <p className="font-hand font-bold text-2xl text-charcoal">
                                {lastScan.type === 'check-in' ? 'Checked In! ✓' : 'Checked Out! 👋'}
                            </p>
                            <p className="font-display text-gray-600 mt-1">
                                {lastScan.time.toLocaleTimeString('tr-TR')}
                            </p>
                        </div>
                    </div>
                )}

                {/* Today's Activity */}
                {todayAttendances.length > 0 && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-purple-200 border-2 border-charcoal transform rotate-1 rounded-sm"></div>
                        <div className="relative bg-purple-100 border-2 border-charcoal p-5 rounded-sm">
                            {/* Tape visual */}
                            <div className="absolute -top-3 left-8 w-12 h-4 bg-white/60 border border-white/80 transform -rotate-3"></div>

                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-2xl text-purple-600 flex-shrink-0">history</span>
                                <div className="flex-1 space-y-2">
                                    <p className="font-hand font-bold text-lg text-charcoal">Today's Activity</p>
                                    <div className="space-y-1">
                                        {todayAttendances.slice(-3).map((attendance, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-white/50 rounded border border-charcoal/20">
                                                <span className="font-display text-sm text-gray-600 flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-base">
                                                        {attendance.type === 'check-in' ? 'login' : 'logout'}
                                                    </span>
                                                    {attendance.type === 'check-in' ? 'Check In' : 'Check Out'}
                                                </span>
                                                <code className="font-mono text-sm text-charcoal bg-white px-2 py-0.5 rounded border border-charcoal/30">
                                                    {new Date(attendance.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                                </code>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Text */}
                <div className="text-center space-y-2 pb-8">
                    <p className="font-display text-sm text-gray-500 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-base">info</span>
                        Point your camera at the kiosk QR code
                    </p>
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
