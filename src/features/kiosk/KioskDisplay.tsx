import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useKioskStore, useAuthStore } from '@/lib/store'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import {
    ArrowsClockwise,
    SignIn,
    SignOut,
    Buildings
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function KioskDisplay() {
    const { currentKiosk, qrCode, generateQRCode } = useKioskStore()
    const company = useAuthStore((state) => state.company)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [countdown, setCountdown] = useState(30)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [statusBanner, setStatusBanner] = useState<{
        type: 'in' | 'out'
        name: string
    } | null>(null)

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

        return () => clearInterval(countdownInterval)
    }, [generateQRCode])

    // Progress percentage for circular indicator
    const progressPercentage = (countdown / 30) * 100

    useEffect(() => {
        if (!statusBanner) {
            return
        }

        const timer = window.setTimeout(() => {
            setStatusBanner(null)
        }, 3500)

        return () => window.clearTimeout(timer)
    }, [statusBanner])

    const triggerDemoStatus = (type: 'in' | 'out') => {
        setStatusBanner({
            type,
            name: 'Demo Kullanıcı',
        })
    }

    return (
        <div className="min-h-screen bg-[#0f1115] text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                    backgroundSize: '72px 72px',
                }}
            />

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-5 py-8">
                <header className="w-full max-w-5xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <span className="text-[11px] uppercase tracking-[0.35em] text-white/40">
                            Kiosk Terminal
                        </span>
                        <div className="mt-2 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                                <Buildings size={20} weight="duotone" className="text-white/80" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                                    {company?.name || 'Şirket'}
                                </h1>
                                <p className="text-sm text-white/50">
                                    {currentKiosk?.name || 'Terminal'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                            Bağlı
                        </Badge>
                        <Badge className="border-white/10 bg-white/5 text-white/70">
                            QR Aktif
                        </Badge>
                    </div>
                </header>

                <main className="w-full max-w-5xl grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <section className="space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                                {format(currentTime, 'EEEE', { locale: tr })}
                            </p>
                            <time className="mt-3 block text-5xl sm:text-6xl md:text-7xl font-light tracking-tight tabular-nums">
                                {format(currentTime, 'HH:mm')}
                                <span className="text-white/30">:</span>
                                <span className="text-white/60">{format(currentTime, 'ss')}</span>
                            </time>
                            <p className="text-sm text-white/50 mt-2">
                                {format(currentTime, 'd MMMM yyyy', { locale: tr })}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm font-medium text-white/70">
                                QR kodu telefonunuzla tarayın ve işlemi seçin.
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                                    Kullanıcı Etiketleri
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                                    <SignIn size={14} weight="duotone" />
                                    Giriş
                                </Badge>
                                <Badge className="border-rose-400/30 bg-rose-400/10 text-rose-200">
                                    <SignOut size={14} weight="duotone" />
                                    Çıkış
                                </Badge>
                            </div>
                            <div className="pt-2 flex flex-wrap items-center gap-3">
                                <Button
                                    type="button"
                                    className="h-11 rounded-full bg-emerald-300/20 text-emerald-100 hover:bg-emerald-300/30 border border-emerald-400/30"
                                    onClick={() => triggerDemoStatus('in')}
                                >
                                    Demo Giriş
                                </Button>
                                <Button
                                    type="button"
                                    className="h-11 rounded-full bg-rose-300/20 text-rose-100 hover:bg-rose-300/30 border border-rose-400/30"
                                    onClick={() => triggerDemoStatus('out')}
                                >
                                    Demo Çıkış
                                </Button>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col items-center gap-4">
                        <div className={`rounded-3xl border border-white/10 bg-white p-5 shadow-xl shadow-black/30 transition-all duration-300 ${isRefreshing ? 'scale-95 opacity-60' : 'scale-100 opacity-100'}`}>
                            <QRCodeSVG
                                value={qrCode || 'LOADING'}
                                size={220}
                                level="H"
                                includeMargin={false}
                                className="w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64"
                            />
                        </div>
                        <div className="w-full max-w-xs space-y-2">
                            <div className="flex items-center justify-between text-xs text-white/50">
                                <span>Yenileniyor</span>
                                <span className="flex items-center gap-1">
                                    <ArrowsClockwise
                                        size={12}
                                        weight="bold"
                                        className={isRefreshing ? 'animate-spin' : ''}
                                    />
                                    {countdown}s
                                </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className="h-full bg-emerald-300/70 transition-all duration-1000 ease-linear"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="text-center">
                    <p className="text-xs text-white/25 font-medium tracking-wide">
                        Employee QR Track • Kiosk v1.0
                    </p>
                </footer>
            </div>

            <div
                className={`fixed inset-0 z-20 flex items-center justify-center px-6 transition-all duration-500 ${
                    statusBanner ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
            >
                <div className={`absolute inset-0 ${
                    statusBanner?.type === 'in'
                        ? 'bg-emerald-500/15'
                        : 'bg-rose-500/15'
                }`} />
                <div className={`relative w-full max-w-3xl rounded-[32px] border bg-[#0b0d11]/95 px-8 py-10 text-center shadow-2xl backdrop-blur-xl ${
                    statusBanner?.type === 'in'
                        ? 'border-emerald-400/30'
                        : 'border-rose-400/30'
                }`}>
                    <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] ${
                        statusBanner?.type === 'in'
                            ? 'bg-emerald-300/15 text-emerald-200'
                            : 'bg-rose-300/15 text-rose-200'
                    }`}>
                        {statusBanner?.type === 'in' ? 'Giriş' : 'Çıkış'}
                    </span>
                    <p className="mt-5 text-[clamp(2.4rem,4vw,3.8rem)] font-semibold tracking-tight text-white">
                        {statusBanner?.name}
                    </p>
                    <p className="mt-3 text-base sm:text-lg text-white/60">
                        {statusBanner?.type === 'in' ? 'Hoş geldiniz, iyi çalışmalar.' : 'Güle güle, iyi dinlenmeler.'}
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/35">
                        QR tarandı
                    </p>
                </div>
            </div>
        </div>
    )
}
