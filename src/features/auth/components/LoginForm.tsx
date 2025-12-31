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

const loginSchema = z.object({
    email: z.string().email('Geçerli bir e-posta adresi girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data: LoginFormValues) => {
        const success = await login(data.email, data.password)

        if (success) {
            const user = useAuthStore.getState().user
            toast.success('Giriş başarılı!')

            // Check if user has a company, if not redirect to onboarding
            if (!user?.companyId) {
                navigate({ to: '/onboarding' })
            } else {
                navigate({ to: '/dashboard' })
            }
        } else {
            toast.error('E-posta veya şifre hatalı')
        }
    }

    return (
        <>
            {/* Header Section */}
            <div className="text-center mb-6 space-y-3">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sketchy-accent-blue border-organic-md shadow-sketchy-md">
                        <Icons.building className="w-7 h-7 text-white" />
                    </div>
                </div>

                {/* Title and Description */}
                <div className="space-y-1">
                    <h1 className="heading-organic-2 text-sketchy-primary">
                        Hoş Geldiniz
                    </h1>
                    <p className="body-organic-small text-sketchy-text-secondary">
                        Çalışan takip sisteminize giriş yapın
                    </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <Badge variant="secondary" className="border-organic-sm text-xs">
                        <Icons.lock className="w-3 h-3 mr-1" />
                        Güvenli Giriş
                    </Badge>
                    <Badge variant="secondary" className="border-organic-sm text-xs">
                        QR Kod Takibi
                    </Badge>
                </div>
            </div>

                {/* Login Card */}
                <Card sketchy texture="paper" className="shadow-sketchy-lg">
                    <CardHeader sketchy className="space-y-1 pb-4">
                        <CardTitle sketchy className="heading-organic-4">
                            Giriş Yap
                        </CardTitle>
                        <CardDescription sketchy className="body-organic-small">
                            E-posta ve şifrenizle hesabınıza erişin
                        </CardDescription>
                    </CardHeader>
                    <CardContent sketchy className="pt-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2 body-organic-small">
                                                <Icons.mail className="w-4 h-4 text-sketchy-accent-blue" />
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
                                                <Icons.lock className="w-4 h-4 text-sketchy-accent-blue" />
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
                                            Giriş yapılıyor...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Giriş Yap
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

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="body-organic-small text-sketchy-text-secondary">
                                Hesabınız yok mu?{' '}
                                <Link
                                    to="/auth/register"
                                    className="text-sketchy-accent-blue hover:text-sketchy-accent-blue/80 transition-colors font-medium inline-flex items-center gap-1"
                                >
                                    Kayıt Ol
                                    <Icons.arrowRight className="w-3 h-3" />
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Demo Access */}
                <div className="mt-6 text-center space-y-2">
                    <p className="body-organic-small text-sketchy-text-muted text-xs">
                        Demo hesaplarla deneyin:
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <Badge
                            variant="outline"
                            onClick={() => {
                                form.setValue('email', 'admin@demo.com')
                                form.setValue('password', 'demo123')
                                form.handleSubmit(onSubmit)()
                            }}
                            className="border-organic-sm cursor-pointer hover:bg-sketchy-bg-secondary transition-colors text-xs py-1 hover:scale-105 transform"
                        >
                            Admin: admin@demo.com
                        </Badge>
                        <Badge
                            variant="outline"
                            onClick={() => {
                                form.setValue('email', 'user@demo.com')
                                form.setValue('password', 'demo123')
                                form.handleSubmit(onSubmit)()
                            }}
                            className="border-organic-sm cursor-pointer hover:bg-sketchy-bg-secondary transition-colors text-xs py-1 hover:scale-105 transform"
                        >
                            User: user@demo.com
                        </Badge>
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
        </>
    )
}
