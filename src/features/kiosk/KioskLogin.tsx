import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from '@tanstack/react-router'
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useKioskStore } from '@/lib/store'
import { toast } from 'sonner'
import { Icons } from '@/lib/icons'
import { Badge } from '@/components/ui/badge'
import { Link } from '@tanstack/react-router'

const kioskLoginSchema = z.object({
    companyCode: z.string().min(1, 'Şirket ID gerekli'),
    pin: z.string().min(4, 'PIN en az 4 karakter olmalı'),
})

type KioskLoginFormValues = z.infer<typeof kioskLoginSchema>

export function KioskLogin() {
    const navigate = useNavigate()
    const loginKiosk = useKioskStore((state) => state.loginKiosk)

    const form = useForm<KioskLoginFormValues>({
        resolver: zodResolver(kioskLoginSchema),
        defaultValues: {
            companyCode: '',
            pin: '',
        },
    })

    const onSubmit = async (data: KioskLoginFormValues) => {
        const success = loginKiosk(data.pin, data.companyCode)

        if (success) {
            toast.success('Kiosk girişi başarılı!')
            navigate({ to: '/kiosk' })
        } else {
            toast.error('Geçersiz şirket kodu veya PIN')
        }
    }

    return (
        <div className="min-h-screen bg-sketchy-bg-primary relative overflow-hidden">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-texture-adaptive-paper opacity-40 pointer-events-none" />
            
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 bg-sketchy-accent-blue/5 rounded-[40%] rotate-12 blur-3xl" />
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-sketchy-accent-green/5 rounded-[35%] -rotate-6 blur-3xl" />
                <div className="absolute top-1/2 left-10 w-24 h-24 bg-sketchy-accent-purple/5 rounded-[30%] rotate-45 blur-2xl" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-md space-y-6">
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        {/* Logo */}
                        <div className="inline-flex items-center justify-center mb-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sketchy-accent-blue border-organic-lg shadow-sketchy-lg hover:scale-105 transition-transform">
                                <Icons.qrCode className="w-10 h-10 text-white" />
                            </div>
                        </div>

                        {/* Title and Description */}
                        <div className="space-y-2">
                            <h1 className="heading-organic-2 text-sketchy-primary">
                                Kiosk Girişi
                            </h1>
                            <p className="body-organic text-sketchy-text-secondary">
                                Terminali aktif etmek için bilgileri girin
                            </p>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            <Badge 
                                variant="secondary" 
                                className="border-organic-sm text-xs py-1.5"
                            >
                                <Icons.lock className="w-3 h-3 mr-1" />
                                Güvenli Giriş
                            </Badge>
                            <Badge 
                                variant="secondary" 
                                className="border-organic-sm text-xs py-1.5"
                            >
                                <Icons.qrCode className="w-3 h-3 mr-1" />
                                QR Terminal
                            </Badge>
                        </div>
                    </div>

                    {/* Login Card */}
                    <Card sketchy texture="paper" className="shadow-sketchy-lg">
                        <CardHeader sketchy className="space-y-2 pb-4">
                            <CardTitle sketchy className="heading-organic-4 text-sketchy-primary flex items-center gap-2">
                                <Icons.building className="w-5 h-5 text-sketchy-accent-blue" />
                                Kiosk Bilgileri
                            </CardTitle>
                            <CardDescription sketchy className="body-organic-small text-sketchy-text-secondary">
                                Şirket ID ve PIN kodunu giriniz
                            </CardDescription>
                        </CardHeader>
                        <CardContent sketchy className="pt-0 space-y-5">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    {/* Company Code Field */}
                                    <FormField
                                        control={form.control}
                                        name="companyCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 body-organic-small text-sketchy-primary">
                                                    <Icons.building className="w-4 h-4 text-sketchy-accent-blue" />
                                                    Şirket ID
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Örn: DEMO-KIOSK"
                                                        className="h-12 border-organic-md"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* PIN Field */}
                                    <FormField
                                        control={form.control}
                                        name="pin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 body-organic-small text-sketchy-primary">
                                                    <Icons.lock className="w-4 h-4 text-sketchy-accent-blue" />
                                                    Kiosk PIN
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="•••••"
                                                        className="h-12 border-organic-md tracking-widest text-center text-2xl font-mono"
                                                        maxLength={4}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        variant="sketchy"
                                        size="lg"
                                        className="w-full h-12 shadow-sketchy-md hover:shadow-sketchy-lg transition-all"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Icons.spinner className="w-5 h-5 animate-spin" />
                                                Giriş yapılıyor...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Terminali Başlat
                                                <Icons.arrowRight className="w-5 h-5" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Info Section */}
                    <Card sketchy texture="paper" className="shadow-sketchy-md bg-sketchy-bg-secondary/50">
                        <CardContent sketchy className="pt-4 space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sketchy-accent-blue/10 border-organic-sm shrink-0">
                                    <Icons.info className="w-5 h-5 text-sketchy-accent-blue" />
                                </div>
                                <div className="space-y-1">
                                    <p className="body-organic-small text-sketchy-primary font-medium">
                                        Demo Bilgileri
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-sketchy-bg-primary border border-sketchy-border-muted border-dashed">
                                            <span className="body-organic-small text-sketchy-text-secondary">
                                                Şirket ID:
                                            </span>
                                            <Badge variant="secondary" className="border-organic-sm text-xs">
                                                DEMO-KIOSK
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-2 rounded-lg bg-sketchy-bg-primary border border-sketchy-border-muted border-dashed">
                                            <span className="body-organic-small text-sketchy-text-secondary">
                                                PIN:
                                            </span>
                                            <Badge variant="secondary" className="border-organic-sm text-xs">
                                                1234
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Back to Admin */}
                    <div className="text-center">
                        <Link
                            to="/auth/login"
                            className="body-organic-small text-sketchy-text-muted hover:text-sketchy-accent-blue transition-colors inline-flex items-center gap-1"
                        >
                            <Icons.arrowLeft className="w-4 h-4" />
                            Yönetici Paneline Dön
                        </Link>
                    </div>

                    {/* Footer Info */}
                    <p className="text-center body-organic-small text-sketchy-text-muted">
                        Kiosk giriş bilgileri yalnızca yetkili kullanıcılar içindir.
                    </p>
                </div>
            </div>
        </div>
    )
}
