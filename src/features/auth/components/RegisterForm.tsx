import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from '@tanstack/react-router'
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
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import { Icons } from '@/lib/icons'
import { Badge } from '@/components/ui/badge'

const registerSchema = z.object({
    name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
    email: z.string().email('Geçerli bir e-posta adresi girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm() {
    const navigate = useNavigate()
    const register = useAuthStore((state) => state.register)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: RegisterFormValues) => {
        const success = await register(data.name, data.email, data.password)

        if (success) {
            toast.success('Kayıt başarılı! Şirketinizi oluşturun.')
            navigate({ to: '/onboarding' })
        } else {
            toast.error('Bu e-posta adresi zaten kayıtlı')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-sketchy-bg-primary relative overflow-hidden">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-texture-adaptive-paper opacity-40 pointer-events-none" />

            <div className="relative z-10 w-full max-w-lg p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="text-center mb-6 space-y-3">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sketchy-accent-green border-organic-md shadow-sketchy-md">
                            <Icons.userPlus className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-1">
                        <h1 className="heading-organic-2 text-sketchy-primary">
                            Hesap Oluştur
                        </h1>
                        <p className="body-organic-small text-sketchy-text-secondary">
                            Çalışan takip sisteminize katılın
                        </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Badge variant="secondary" className="border-organic-sm text-xs">
                            <Icons.heart className="w-3 h-3 mr-1" />
                            Ücretsiz Deneme
                        </Badge>
                        <Badge variant="secondary" className="border-organic-sm text-xs">
                            14 Gün
                        </Badge>
                    </div>
                </div>

                {/* Register Card */}
                <Card sketchy texture="paper" className="shadow-sketchy-lg">
                    <CardHeader sketchy className="space-y-1 pb-4">
                        <CardTitle sketchy className="heading-organic-4">
                            Kayıt Ol
                        </CardTitle>
                        <CardDescription sketchy className="body-organic-small">
                            Bilgilerinizi doldurarak hesap oluşturun
                        </CardDescription>
                    </CardHeader>
                    <CardContent sketchy className="pt-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 body-organic-small">
                                                <Icons.user className="w-4 h-4 text-sketchy-accent-green" />
                                                Ad Soyad
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ahmet Yılmaz"
                                                    className="border-organic-md h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 body-organic-small">
                                                <Icons.mail className="w-4 h-4 text-sketchy-accent-green" />
                                                E-posta
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="ornek@sirket.com"
                                                    className="border-organic-md h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 body-organic-small">
                                                <Icons.lock className="w-4 h-4 text-sketchy-accent-green" />
                                                Şifre
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="border-organic-md h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 body-organic-small">
                                                <Icons.lock className="w-4 h-4 text-sketchy-accent-green" />
                                                Şifre Tekrar
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="border-organic-md h-10"
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
                                    className="w-full h-11"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <Icons.spinner className="w-4 h-4 animate-spin" />
                                            Kayıt yapılıyor...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Kayıt Ol
                                            <Icons.arrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </Form>

                        {/* Divider */}
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-sketchy-border-muted border-dashed" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-sketchy-text-muted">
                                    veya
                                </span>
                            </div>
                        </div>

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="body-organic-small text-sketchy-text-secondary">
                                Zaten hesabınız var mı?{' '}
                                <Link
                                    to="/auth/login"
                                    className="text-sketchy-accent-green hover:text-sketchy-accent-green/80 transition-colors font-medium inline-flex items-center gap-1"
                                >
                                    Giriş Yap
                                    <Icons.arrowRight className="w-3 h-3" />
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Features */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="text-center space-y-1">
                        <div className="flex justify-center">
                            <div className="h-9 w-9 rounded-xl bg-sketchy-accent-blue/10 flex items-center justify-center border-organic-sm">
                                <Icons.qrCode className="w-4 h-4 text-sketchy-accent-blue" />
                            </div>
                        </div>
                        <p className="body-organic-small text-sketchy-text-muted text-[10px]">
                            QR Kod
                        </p>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="flex justify-center">
                            <div className="h-9 w-9 rounded-xl bg-sketchy-accent-green/10 flex items-center justify-center border-organic-sm">
                                <Icons.trending className="w-4 h-4 text-sketchy-accent-green" />
                            </div>
                        </div>
                        <p className="body-organic-small text-sketchy-text-muted text-[10px]">
                            Raporlar
                        </p>
                    </div>
                    <div className="text-center space-y-1">
                        <div className="flex justify-center">
                            <div className="h-9 w-9 rounded-xl bg-sketchy-accent-purple/10 flex items-center justify-center border-organic-sm">
                                <Icons.lock className="w-4 h-4 text-sketchy-accent-purple" />
                            </div>
                        </div>
                        <p className="body-organic-small text-sketchy-text-muted text-[10px]">
                            Güvenli
                        </p>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-4 text-center">
                    <Link
                        to="/"
                        className="body-organic-small text-sketchy-text-muted hover:text-sketchy-primary transition-colors inline-flex items-center gap-1 text-xs"
                    >
                        <Icons.arrowLeft className="w-3 h-3" />
                        Ana sayfaya dön
                    </Link>
                </div>
            </div>
        </div>
    )
}
