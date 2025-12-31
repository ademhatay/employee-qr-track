import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useKioskStore, useAuthStore } from '@/lib/store'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import { Icons } from '@/lib/icons'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export function KioskDisplay() {
    const { currentKiosk, qrCode, generateQRCode } = useKioskStore()
    const company = useAuthStore((state) => state.company)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [countdown, setCountdown] = useState(30)
    const [isRefreshing, setIsRefreshing] = useState(false)

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
            // Clear any pending timeouts
            setIsRefreshing(false)
        }
    }, [generateQRCode])

    // Progress percentage for circular indicator
    const progressPercentage = (countdown / 30) * 100

    return (
        <div className="min-h-screen bg-sketchy-bg-primary relative overflow-hidden">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-texture-adaptive-paper opacity-40 pointer-events-none" />
            
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-10 w-40 h-40 bg-sketchy-accent-blue/5 rounded-[40%] rotate-12 blur-3xl" />
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-sketchy-accent-green/5 rounded-[35%] -rotate-6 blur-3xl" />
                <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-sketchy-accent-purple/5 rounded-[30%] rotate-45 blur-2xl" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col p-4 lg:p-6">
                {/* Header */}
                <header className="w-full max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sketchy-accent-blue border-organic-md shadow-sketchy-md">
                            <Icons.building className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="heading-organic-4 text-sketchy-primary">
                                {company?.name || 'Şirket'}
                            </h1>
                            <p className="body-organic-small text-sketchy-text-secondary">
                                {currentKiosk?.name || 'Terminal'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge 
                            variant="secondary" 
                            className="border-organic-sm text-xs bg-sketchy-accent-green/10 text-sketchy-accent-green"
                        >
                            <Icons.checkCircle className="w-3 h-3 mr-1" />
                            Aktif
                        </Badge>
                        <Badge 
                            variant="secondary" 
                            className="border-organic-sm text-xs bg-sketchy-accent-blue/10 text-sketchy-accent-blue"
                        >
                            <Icons.qrCode className="w-3 h-3 mr-1" />
                            QR Modu
                        </Badge>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 w-full max-w-6xl mx-auto grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
                    {/* Left Section - Time & Instructions */}
                    <section className="space-y-6">
                        {/* Time Card */}
                        <Card sketchy texture="paper" className="shadow-sketchy-lg">
                            <CardContent sketchy className="pt-6">
                                <p className="body-organic-small text-sketchy-text-muted uppercase tracking-wide mb-2">
                                    {format(currentTime, 'EEEE', { locale: tr })}
                                </p>
                                <time className="block heading-organic-1 text-sketchy-primary tabular-nums tracking-tight">
                                    {format(currentTime, 'HH:mm')}
                                    <span className="text-sketchy-text-muted">:</span>
                                    <span className="text-sketchy-text-secondary">
                                        {format(currentTime, 'ss')}
                                    </span>
                                </time>
                                <p className="body-organic text-sketchy-text-secondary mt-2">
                                    {format(currentTime, 'd MMMM yyyy', { locale: tr })}
                                </p>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Right Section - QR Code */}
                    <section className="flex flex-col items-center justify-center gap-4">
                        <Card 
                            sketchy 
                            texture="paper" 
                            className={`shadow-sketchy-lg transition-all duration-300 ${isRefreshing ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}
                        >
                            <CardContent sketchy className="pt-6 pb-4">
                                <QRCodeSVG
                                    value={qrCode || 'LOADING'}
                                    size={240}
                                    level="H"
                                    includeMargin={false}
                                    className="w-60 h-60 lg:w-72 lg:h-72"
                                />
                            </CardContent>
                        </Card>

                        {/* Refresh Indicator */}
                        <div className="w-full max-w-xs space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-sketchy-bg-secondary/50 border border-sketchy-border-muted border-dashed">
                                <span className="body-organic-small text-sketchy-text-secondary flex items-center gap-2">
                                    <Icons.caretRight className="w-4 h-4" />
                                    Yenileniyor
                                </span>
                                <span className="flex items-center gap-2">
                                    <Icons.spinner 
                                        className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} 
                                    />
                                    <span className="body-organic text-sketchy-primary font-semibold tabular-nums">
                                        {countdown}s
                                    </span>
                                </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="h-2 w-full rounded-full bg-sketchy-bg-secondary overflow-hidden border border-sketchy-border-muted border-dashed">
                                <div
                                    className="h-full bg-gradient-to-r from-sketchy-accent-blue to-sketchy-accent-green transition-all duration-1000 ease-linear rounded-full"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="text-center mt-6">
                    <p className="body-organic-small text-sketchy-text-muted">
                        Employee QR Track • Kiosk v1.0
                    </p>
                </footer>
            </div>
        </div>
    )
}
