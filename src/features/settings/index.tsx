import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useDataStore, useAuthStore, type KioskAccount } from '@/lib/store'
import { toast } from 'sonner'
import { Plus, QrCode, Building2, CreditCard, Trash2, Copy, Eye, EyeOff, Info } from 'lucide-react'

const kioskSchema = z.object({
    name: z.string().min(2, 'Kiosk adı en az 2 karakter olmalı'),
    pin: z.string().min(4, 'PIN en az 4 karakter olmalı').max(8, 'PIN en fazla 8 karakter olabilir'),
})

type KioskFormValues = z.infer<typeof kioskSchema>

export function SettingsPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [showPins, setShowPins] = useState<Record<string, boolean>>({})
    const company = useAuthStore((state) => state.company)
    const kioskAccounts = useDataStore((state) => state.kioskAccounts)
    const addKioskAccount = useDataStore((state) => state.addKioskAccount)

    const companyKiosks = kioskAccounts.filter((k) => k.companyId === company?.id)

    const form = useForm<KioskFormValues>({
        resolver: zodResolver(kioskSchema),
        defaultValues: {
            name: '',
            pin: '',
        },
    })

    const onSubmit = (data: KioskFormValues) => {
        const newKiosk: KioskAccount = {
            id: crypto.randomUUID(),
            name: data.name,
            companyId: company?.id || '',
            pin: data.pin,
            createdAt: new Date().toISOString(),
        }

        addKioskAccount(newKiosk)
        toast.success('Kiosk hesabı oluşturuldu!')
        setIsOpen(false)
        form.reset()
    }

    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast.success(`${label} kopyalandı!`)
    }

    const togglePinVisibility = (kioskId: string) => {
        setShowPins((prev) => ({ ...prev, [kioskId]: !prev[kioskId] }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Ayarlar</h1>
                <p className="text-muted-foreground">
                    Şirket ve kiosk ayarlarını yönetin
                </p>
            </div>

            {/* Company Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Şirket Bilgileri
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">{company?.name}</p>
                            <p className="text-sm text-muted-foreground">Şirket Adı</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                            <p className="font-mono font-medium text-lg">{company?.id}</p>
                            <p className="text-sm text-muted-foreground">Şirket ID (Kiosk girişi için gerekli)</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(company?.id || '', 'Şirket ID')}
                        >
                            <Copy className="h-4 w-4 mr-2" />
                            Kopyala
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Plan Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Abonelik Planı
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <p className="font-medium capitalize">{company?.plan} Plan</p>
                                <Badge variant={company?.plan === 'pro' ? 'default' : 'secondary'}>
                                    {company?.plan === 'pro' ? 'Pro' : 'Ücretsiz'}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                                {company?.plan === 'free'
                                    ? 'Maksimum 5 çalışan, 1 kiosk'
                                    : 'Sınırsız çalışan ve kiosk'}
                            </p>
                        </div>
                        {company?.plan === 'free' && (
                            <Button variant="outline">Pro'ya Yükselt</Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Kiosk Accounts */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5" />
                            Kiosk Hesapları
                        </CardTitle>
                        <CardDescription>
                            QR kod terminalleri için hesaplar
                        </CardDescription>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Kiosk Ekle
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Yeni Kiosk Hesabı</DialogTitle>
                                <DialogDescription>
                                    QR kod terminali için yeni bir hesap oluşturun
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Kiosk Adı</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ana Giriş" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>PIN Kodu</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1234" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full">
                                        Oluştur
                                    </Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {companyKiosks.length === 0 ? (
                        <div className="text-center py-8">
                            <QrCode className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-2">
                                Henüz kiosk hesabı yok
                            </p>
                            <p className="text-sm text-muted-foreground">
                                "Kiosk Ekle" butonuna tıklayarak ilk kiosk hesabınızı oluşturun
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Instructions */}
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Kiosk Nasıl Açılır?</AlertTitle>
                                <AlertDescription>
                                    Kiosk cihazında <code className="bg-muted px-1 rounded">/kiosk/login</code> adresine gidin.
                                    <strong> Şirket ID</strong> ve <strong>PIN</strong> bilgilerini girin.
                                </AlertDescription>
                            </Alert>

                            {companyKiosks.map((kiosk) => (
                                <div
                                    key={kiosk.id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <QrCode className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{kiosk.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-sm text-muted-foreground">PIN:</span>
                                                <code className="bg-muted px-2 py-0.5 rounded text-sm font-mono">
                                                    {showPins[kiosk.id] ? kiosk.pin : '••••'}
                                                </code>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => togglePinVisibility(kiosk.id)}
                                                >
                                                    {showPins[kiosk.id] ? (
                                                        <EyeOff className="h-3 w-3" />
                                                    ) : (
                                                        <Eye className="h-3 w-3" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => copyToClipboard(kiosk.pin, 'PIN')}
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
