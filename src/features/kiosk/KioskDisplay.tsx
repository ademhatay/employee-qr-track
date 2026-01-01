import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useKioskStore, useAuthStore } from '@/lib/store'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export function KioskDisplay() {
    const { currentKiosk, qrCode, generateQRCode } = useKioskStore()
    const company = useAuthStore((state) => state.company)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [countdown, setCountdown] = useState(30)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [lastCheckin, setLastCheckin] = useState<{ name: string; time: string } | null>(null)

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Rotate QR code every 30 seconds with countdown
    useEffect(() => {
        generateQRCode()

        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    setIsRefreshing(true)
                    setTimeout(() => {
                        generateQRCode()
                        setIsRefreshing(false)
                    }, 300)
                    return 30
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            clearInterval(countdownInterval)
            setIsRefreshing(false)
        }
    }, [generateQRCode])

    // Simulate a check-in for demo
    useEffect(() => {
        const demoCheckins = [
            { name: 'Sarah', time: '09:42' },
            { name: 'Mike', time: '09:38' },
            { name: 'Emma', time: '09:30' },
        ]
        setLastCheckin(demoCheckins[0])
    }, [])

    const progressPercentage = (countdown / 30) * 100

    return (
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display flex flex-col kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-8 py-6 flex justify-between items-start relative z-20">
                {/* Logo Area - Sketchy Border */}
                <div className="sketch-border-sm bg-white px-6 py-3 transform -rotate-1 flex items-center gap-3">
                    <span className="material-symbols-outlined text-charcoal text-3xl">local_mall</span>
                    <div>
                        <h2 className="font-bold text-lg leading-tight tracking-tight">
                            {company?.name || 'Company'} - {currentKiosk?.name || 'Terminal'}
                        </h2>
                        <span className="text-xs text-gray-500 font-hand">Kiosk Mode Active</span>
                    </div>
                </div>

                {/* System Status (Sticky Note Style) */}
                <div className="relative group cursor-pointer transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="absolute inset-0 bg-yellow-200 border-2 border-charcoal shadow-md transform rotate-1 rounded-sm"></div>
                    <div className="relative bg-[#fff9c4] border-2 border-charcoal px-5 py-2 flex items-center gap-2 rounded-sm shadow-sm">
                        <span className="flex size-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full size-3 bg-green-500 border border-charcoal"></span>
                        </span>
                        <span className="font-hand font-bold text-lg">System Online</span>
                    </div>
                    {/* Tape visual */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/40 border border-white/50 transform -rotate-2"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 gap-12 lg:gap-24 w-full max-w-[1400px] mx-auto relative">
                {/* Decorative Background Elements */}
                {/* Paperclip */}
                <div className="absolute top-10 left-10 lg:left-40 opacity-20 pointer-events-none transform -rotate-45 hidden lg:block">
                    <span className="material-symbols-outlined text-[120px]">attachment</span>
                </div>

                {/* Coffee Stain/Mug */}
                <div className="absolute bottom-10 left-10 pointer-events-none opacity-80 hidden lg:block transform rotate-12">
                    <div className="relative w-32 h-32">
                        <svg className="text-charcoal w-full h-full drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24">
                            <path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" opacity="0.1" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M9.5 3C7 3 4 5 4 9C4 13 6 15 9 15H14C17 15 19 13 19 9C19 7 18 5 17 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                            <path d="M19 8H20C21.1046 8 22 8.89543 22 10V11C22 12.1046 21.1046 13 20 13H19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                            <path d="M5 16C5 16 6 19 11.5 19C17 19 18 16 18 16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                        </svg>
                    </div>
                </div>

                {/* Left Column: Time & Info */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-lg z-10">
                    {/* Date & Time */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 justify-center lg:justify-start">
                            <span className="material-symbols-outlined text-4xl text-charcoal">schedule</span>
                            <h2 className="text-2xl font-bold font-hand text-charcoal">Current Time</h2>
                        </div>
                        <h1 className="text-[80px] lg:text-[120px] leading-[0.9] font-hand font-bold text-charcoal tracking-tighter wiggle-slow">
                            {format(currentTime, 'HH:mm')}
                            <span className="text-4xl lg:text-5xl align-top pt-4 inline-block">
                                {format(currentTime, 'a')}
                            </span>
                        </h1>
                        <div className="pt-4">
                            <span className="marker-highlight-yellow text-2xl lg:text-4xl font-hand font-bold text-charcoal inline-block transform -rotate-1">
                                {format(currentTime, 'EEEE, MMM d, yyyy', { locale: tr })}
                            </span>
                        </div>
                    </div>

                    {/* Welcome Message (Speech Bubble) */}
                    {lastCheckin && (
                        <div className="relative mt-8 group transform transition-transform hover:scale-105 duration-300">
                            {/* Speech bubble tail */}
                            <div className="absolute -top-4 left-10 w-6 h-6 bg-white border-l-2 border-t-2 border-charcoal transform rotate-45 z-0"></div>
                            <div className="relative z-10 bg-white sketch-border p-6 max-w-md">
                                <div className="absolute inset-0 bg-blue-50/50 z-0 pointer-events-none rounded-lg"></div>
                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="size-12 rounded-full border-2 border-charcoal overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shrink-0 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl text-charcoal">person</span>
                                    </div>
                                    <div>
                                        <h3 className="font-hand font-bold text-2xl text-charcoal">Welcome, {lastCheckin.name}! ✨</h3>
                                        <p className="font-display text-sm text-gray-600 mt-1">You're on time. Have a great day!</p>
                                    </div>
                                </div>
                                {/* Blue Scribble Background for emphasis */}
                                <div className="absolute -bottom-2 -right-2 w-24 h-4 bg-primary/20 -z-10 rounded-full blur-sm transform rotate-3"></div>
                            </div>
                        </div>
                    )}

                    {/* Hand drawn arrow pointing to QR */}
                    <div className="hidden lg:block relative left-60 top-10 transform rotate-12 opacity-80">
                        <svg fill="none" height="80" viewBox="0 0 150 80" width="150" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 40 C 40 10, 80 10, 130 40" fill="none" stroke="#2D2D2D" strokeDasharray="10 5" strokeLinecap="round" strokeWidth="3"></path>
                            <path d="M130 40 L 115 25 M 130 40 L 115 55" stroke="#2D2D2D" strokeLinecap="round" strokeWidth="3"></path>
                            <text fill="#2D2D2D" fontFamily="Kalam" fontSize="18" transform="rotate(-5 30,70)" x="30" y="70">Scan me!</text>
                        </svg>
                    </div>
                </div>

                {/* Right Column: Scanner */}
                <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-md">
                    {/* QR Frame */}
                    <div className={`relative bg-white p-6 sketch-border sketch-box-shadow w-full aspect-square flex flex-col items-center justify-center gap-6 transform rotate-1 hover:rotate-0 transition-transform duration-500 ${isRefreshing ? 'scale-95 opacity-80' : ''}`}>
                        {/* Inner Border */}
                        <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center relative bg-white">
                            {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-charcoal rounded-tl-lg -translate-x-1 -translate-y-1"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-charcoal rounded-tr-lg translate-x-1 -translate-y-1"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-charcoal rounded-bl-lg -translate-x-1 translate-y-1"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-charcoal rounded-br-lg translate-x-1 translate-y-1"></div>

                            {/* QR Code */}
                            <QRCodeSVG
                                value={qrCode || 'LOADING'}
                                size={280}
                                level="H"
                                includeMargin={false}
                                className="w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Timer & Progress */}
                    <div className="w-full mt-6 px-4">
                        <div className="flex justify-between items-end mb-2 font-hand font-bold text-charcoal">
                            <span className="text-xl">Refreshing code...</span>
                            <span className="text-2xl">{countdown}s</span>
                        </div>
                        {/* Sketchy Progress Bar Container */}
                        <div className="w-full h-6 border-2 border-charcoal rounded-full p-1 bg-white shadow-sm relative overflow-hidden">
                            {/* Scribble Fill */}
                            <div
                                className="h-full scribble-bar rounded-l-full relative overflow-hidden transition-all duration-1000 ease-linear"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                {/* Animation overlay to simulate drawing */}
                                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="text-right mt-1">
                            <span className="text-xs font-display text-gray-500 italic">
                                Code ID: #{qrCode?.slice(-8) || 'LOADING'}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center relative z-10">
                <p className="font-hand text-charcoal/60 text-sm">
                    Powered by <span className="font-bold text-charcoal">QR Track</span> • Secure Kiosk Mode v2.0
                </p>
            </footer>
        </div>
    )
}
