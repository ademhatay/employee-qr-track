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
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import {
    UserPlus,
    User,
    Envelope,
    Lock,
    ArrowRight,
    Sparkle
} from '@phosphor-icons/react'
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
        <div className="min-h-screen bg-[#0f1115] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),transparent_60%)]" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                    backgroundSize: '72px 72px',
                }}
            />

            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
                <div className="w-full max-w-sm space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-white/5 mb-5">
                            <UserPlus size={30} weight="duotone" className="text-white/80" />
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Kayıt Ol
                        </h1>
                        <p className="text-sm text-white/50 mt-2">
                            Yeni bir hesap oluşturun ve başlayın.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <Badge className="border-white/10 bg-white/5 text-white/70">
                                Ücretsiz Deneme
                            </Badge>
                            <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                                <Sparkle size={12} weight="duotone" />
                                14 Gün
                            </Badge>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/70 text-sm font-medium flex items-center gap-2">
                                                <User size={16} weight="duotone" />
                                                Ad Soyad
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ahmet Yılmaz"
                                                    className="h-12 bg-transparent border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-emerald-300/40 focus:ring-emerald-300/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-rose-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/70 text-sm font-medium flex items-center gap-2">
                                                <Envelope size={16} weight="duotone" />
                                                E-posta
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="ornek@sirket.com"
                                                    className="h-12 bg-transparent border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-emerald-300/40 focus:ring-emerald-300/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-rose-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/70 text-sm font-medium flex items-center gap-2">
                                                <Lock size={16} weight="duotone" />
                                                Şifre
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="h-12 bg-transparent border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-emerald-300/40 focus:ring-emerald-300/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-rose-400" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/70 text-sm font-medium flex items-center gap-2">
                                                <Lock size={16} weight="duotone" />
                                                Şifre Tekrar
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    className="h-12 bg-transparent border-white/15 text-white placeholder:text-white/30 rounded-xl focus:border-emerald-300/40 focus:ring-emerald-300/20"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-rose-400" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-white text-black hover:bg-white/90 font-medium rounded-xl transition-all duration-200 mt-2"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        'Kayıt yapılıyor...'
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Kayıt Ol
                                            <ArrowRight size={18} weight="bold" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-center text-white/50">
                        Zaten hesabınız var mı?{' '}
                        <Link
                            to="/auth/login"
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
