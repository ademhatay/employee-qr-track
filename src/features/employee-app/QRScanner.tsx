import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDataStore, useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import { Icons } from '@/lib/icons'
import type { Attendance } from '@/types'

export function QRScanner() {
    const [isScanning, setIsScanning] = useState(false)
    const [lastScan, setLastScan] = useState<{ type: 'check-in' | 'check-out'; time: Date } | null>(null)
    const scannerRef = useRef<Html5Qrcode | null>(null)

    const user = useAuthStore((state) => state.user)
    const addAttendance = useDataStore((state) => state.addAttendance)
    const attendances = useDataStore((state) => state.attendances)

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
            toast.error('Kamera açılamadı. Lütfen izinleri kontrol edin.')
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
            toast.error('Geçersiz QR kod')
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
            toast.success('Giriş yapıldı! İyi çalışmalar.')
        } else {
            toast.success('Çıkış yapıldı! Güle güle.')
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
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold">QR Kod Tara</h1>
                <p className="text-muted-foreground">
                    {isCheckedIn ? 'Çıkış yapmak için' : 'Giriş yapmak için'} QR kodu tarayın
                </p>
            </div>

            {/* Status Card */}
            <Card className={isCheckedIn ? 'border-green-500 bg-green-500/10' : 'border-orange-500 bg-orange-500/10'}>
                <CardContent className="p-4 flex items-center gap-4">
                    <div className={`p-3 rounded-full ${isCheckedIn ? 'bg-green-500' : 'bg-orange-500'}`}>
                        {isCheckedIn ? (
                            <Icons.checkCircle className="h-6 w-6 text-white" />
                        ) : (
                            <Icons.clock className="h-6 w-6 text-white" />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">
                            {isCheckedIn ? 'Şu an içeridesiniz' : 'Henüz giriş yapmadınız'}
                        </p>
                        {todayAttendances.length > 0 && (
                            <p className="text-sm text-muted-foreground">
                                Son işlem: {new Date(todayAttendances[todayAttendances.length - 1].timestamp).toLocaleTimeString('tr-TR')}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Scanner */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Icons.camera className="h-5 w-5" />
                        Kamera
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div id="qr-reader" className="w-full rounded-lg overflow-hidden" />

                    {!isScanning ? (
                        <Button onClick={startScanner} className="w-full mt-4" size="lg">
                            <Icons.camera className="mr-2 h-5 w-5" />
                            Taramayı Başlat
                        </Button>
                    ) : (
                        <Button onClick={stopScanner} variant="outline" className="w-full mt-4" size="lg">
                            <Icons.xCircle className="mr-2 h-5 w-5" />
                            Taramayı Durdur
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* Last Scan Result */}
            {lastScan && (
                <Card className="border-primary">
                    <CardContent className="p-4 text-center">
                        <Icons.checkCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                        <p className="text-lg font-semibold">
                            {lastScan.type === 'check-in' ? 'Giriş Yapıldı!' : 'Çıkış Yapıldı!'}
                        </p>
                        <p className="text-muted-foreground">
                            {lastScan.time.toLocaleTimeString('tr-TR')}
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
