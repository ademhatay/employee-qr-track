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
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'

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
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display flex flex-col kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-8 py-6 flex justify-between items-center relative z-20">
                {/* Logo */}
                <Link to="/" className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <span className="material-symbols-outlined text-charcoal text-2xl">qr_code_scanner</span>
                    <span className="font-hand font-bold text-lg">QR Track</span>
                </Link>

                {/* Kiosk Link */}
                <Link
                    to="/kiosk/login"
                    className="sketch-border-sm bg-white px-4 py-2 transform rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                    <span className="material-symbols-outlined text-charcoal text-lg">terminal</span>
                    <span className="font-hand font-bold text-sm">Kiosk Mode</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Title Section */}
                    <div className="text-center space-y-4">
                        {/* Icon with Sticky Note Style */}
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform rotate-3 rounded-lg"></div>
                            <div className="relative bg-blue-100 border-2 border-charcoal p-6 rounded-lg">
                                <span className="material-symbols-outlined text-6xl text-charcoal">login</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <h1 className="text-4xl lg:text-5xl font-hand font-bold text-charcoal wiggle-slow">
                                Welcome Back
                            </h1>
                            <p className="font-display text-gray-600">
                                Sign in to your employee tracking system
                            </p>
                        </div>
                    </div>

                    {/* Login Form Card */}
                    <div className="relative">
                        {/* Card Shadow */}
                        <div className="absolute inset-0 bg-charcoal transform translate-x-2 translate-y-2 rounded-lg"></div>

                        {/* Main Card */}
                        <div className="relative bg-white sketch-border p-8 space-y-6">
                            {/* Form Header */}
                            <div className="flex items-center gap-3 pb-4 border-b-2 border-dashed border-gray-200">
                                <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                                    <span className="material-symbols-outlined text-blue-600">mail</span>
                                </div>
                                <div>
                                    <h2 className="font-hand font-bold text-xl text-charcoal">Sign In</h2>
                                    <p className="text-sm text-gray-500 font-display">Enter your credentials</p>
                                </div>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    {/* Email Field */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-blue-600">email</span>
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="email"
                                                            placeholder="you@company.com"
                                                            className="h-14 text-lg border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pl-12"
                                                            {...field}
                                                        />
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">alternate_email</span>
                                                    </div>
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
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-blue-600">lock</span>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            className="h-14 text-lg border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pl-12"
                                                            {...field}
                                                        />
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">password</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                        className="w-full h-14 bg-charcoal text-white rounded-lg font-hand font-bold text-xl hover:bg-charcoal/90 transition-all transform hover:-translate-y-0.5 hover:shadow-lg border-2 border-charcoal flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {form.formState.isSubmitting ? (
                                            <>
                                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                Signing in...
                                            </>
                                        ) : (
                                            <>
                                                Sign In
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </Form>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t-2 border-dashed border-gray-200" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-4 text-sm text-gray-500 font-hand">or</span>
                                </div>
                            </div>

                            {/* Register Link */}
                            <div className="text-center">
                                <p className="font-display text-gray-600">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/auth/register"
                                        className="text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1 transition-colors"
                                    >
                                        Sign Up
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Demo Credentials - Sticky Note */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-200 border-2 border-charcoal transform rotate-1 rounded-sm"></div>
                        <div className="relative bg-[#fff9c4] border-2 border-charcoal p-5 rounded-sm">
                            {/* Tape visual */}
                            <div className="absolute -top-3 left-8 w-12 h-4 bg-white/60 border border-white/80 transform -rotate-3"></div>

                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-2xl text-charcoal flex-shrink-0">lightbulb</span>
                                <div className="space-y-3 flex-1">
                                    <p className="font-hand font-bold text-lg text-charcoal">Demo Accounts</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => {
                                                form.setValue('email', 'admin@demo.com')
                                                form.setValue('password', 'demo123')
                                                form.handleSubmit(onSubmit)()
                                            }}
                                            className="p-2 bg-white/50 rounded border border-charcoal/20 text-left hover:bg-white/80 transition-colors"
                                        >
                                            <p className="font-hand font-bold text-charcoal text-sm">Admin</p>
                                            <code className="text-xs text-gray-600">admin@demo.com</code>
                                        </button>
                                        <button
                                            onClick={() => {
                                                form.setValue('email', 'user@demo.com')
                                                form.setValue('password', 'demo123')
                                                form.handleSubmit(onSubmit)()
                                            }}
                                            className="p-2 bg-white/50 rounded border border-charcoal/20 text-left hover:bg-white/80 transition-colors"
                                        >
                                            <p className="font-hand font-bold text-charcoal text-sm">User</p>
                                            <code className="text-xs text-gray-600">user@demo.com</code>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center relative z-10">
                <p className="font-hand text-charcoal/60 text-sm">
                    Powered by <span className="font-bold text-charcoal">QR Track</span> • Employee Tracking System
                </p>
            </footer>
        </div>
    )
}
