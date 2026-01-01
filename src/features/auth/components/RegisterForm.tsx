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
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display flex flex-col kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-8 py-6 flex justify-between items-center relative z-20">
                {/* Logo */}
                <Link to="/" className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <span className="material-symbols-outlined text-charcoal text-2xl">qr_code_scanner</span>
                    <span className="font-hand font-bold text-lg">QR Track</span>
                </Link>

                {/* Login Link */}
                <Link
                    to="/auth/login"
                    className="sketch-border-sm bg-white px-4 py-2 transform rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                    <span className="material-symbols-outlined text-charcoal text-lg">login</span>
                    <span className="font-hand font-bold text-sm">Sign In</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Title Section */}
                    <div className="text-center space-y-4">
                        {/* Icon with Sticky Note Style */}
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-green-200 border-2 border-charcoal transform rotate-3 rounded-lg"></div>
                            <div className="relative bg-green-100 border-2 border-charcoal p-6 rounded-lg">
                                <span className="material-symbols-outlined text-6xl text-charcoal">person_add</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <h1 className="text-4xl lg:text-5xl font-hand font-bold text-charcoal wiggle-slow">
                                Create Account
                            </h1>
                            <p className="font-display text-gray-600">
                                Join our employee tracking platform
                            </p>
                        </div>

                        {/* Trial Badge */}
                        <div className="inline-flex items-center gap-2 bg-green-100 border-2 border-green-300 rounded-full px-4 py-2">
                            <span className="material-symbols-outlined text-green-600">stars</span>
                            <span className="font-hand font-bold text-green-800">14-Day Free Trial</span>
                        </div>
                    </div>

                    {/* Register Form Card */}
                    <div className="relative">
                        {/* Card Shadow */}
                        <div className="absolute inset-0 bg-charcoal transform translate-x-2 translate-y-2 rounded-lg"></div>

                        {/* Main Card */}
                        <div className="relative bg-white sketch-border p-8 space-y-6">
                            {/* Form Header */}
                            <div className="flex items-center gap-3 pb-4 border-b-2 border-dashed border-gray-200">
                                <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                                    <span className="material-symbols-outlined text-green-600">how_to_reg</span>
                                </div>
                                <div>
                                    <h2 className="font-hand font-bold text-xl text-charcoal">Sign Up</h2>
                                    <p className="text-sm text-gray-500 font-display">Fill in your details</p>
                                </div>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Name Field */}
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-green-600">person</span>
                                                    Full Name
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="John Doe"
                                                            className="h-12 text-lg border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 pl-12"
                                                            {...field}
                                                        />
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">badge</span>
                                                    </div>
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
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-green-600">email</span>
                                                    Email Address
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="email"
                                                            placeholder="you@company.com"
                                                            className="h-12 text-lg border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 pl-12"
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
                                                    <span className="material-symbols-outlined text-lg text-green-600">lock</span>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            className="h-12 text-lg border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 pl-12"
                                                            {...field}
                                                        />
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">password</span>
                                                    </div>
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
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-green-600">lock_reset</span>
                                                    Confirm Password
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••"
                                                            className="h-12 text-lg border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-green-400 focus:border-green-400 pl-12"
                                                            {...field}
                                                        />
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">verified_user</span>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={form.formState.isSubmitting}
                                            className="w-full h-14 bg-green-600 text-white rounded-lg font-hand font-bold text-xl hover:bg-green-700 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-charcoal flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {form.formState.isSubmitting ? (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    Create Account
                                                    <span className="material-symbols-outlined">arrow_forward</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </Form>

                            {/* Login Link */}
                            <div className="text-center pt-6 border-t-2 border-dashed border-gray-200 mt-6">
                                <p className="font-display text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        to="/auth/login"
                                        className="text-green-600 hover:text-green-700 font-bold inline-flex items-center gap-1 transition-colors"
                                    >
                                        Sign In
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features - Three Columns */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform rotate-2 rounded-lg"></div>
                            <div className="relative bg-blue-100 border-2 border-charcoal p-4 rounded-lg text-center">
                                <span className="material-symbols-outlined text-3xl text-blue-600 mb-2">qr_code_scanner</span>
                                <p className="font-hand font-bold text-charcoal text-sm">QR Scanning</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-purple-200 border-2 border-charcoal transform -rotate-1 rounded-lg"></div>
                            <div className="relative bg-purple-100 border-2 border-charcoal p-4 rounded-lg text-center">
                                <span className="material-symbols-outlined text-3xl text-purple-600 mb-2">analytics</span>
                                <p className="font-hand font-bold text-charcoal text-sm">Reports</p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-200 border-2 border-charcoal transform rotate-1 rounded-lg"></div>
                            <div className="relative bg-orange-100 border-2 border-charcoal p-4 rounded-lg text-center">
                                <span className="material-symbols-outlined text-3xl text-orange-600 mb-2">security</span>
                                <p className="font-hand font-bold text-charcoal text-sm">Secure</p>
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
