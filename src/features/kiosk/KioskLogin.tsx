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
import { useKioskStore } from '@/lib/store'
import { toast } from 'sonner'
import { Link } from '@tanstack/react-router'

const kioskLoginSchema = z.object({
    kioskId: z.string().min(1, 'Kiosk ID gerekli'),
    pin: z.string().min(4, 'PIN en az 4 karakter olmalı'),
})

type KioskLoginFormValues = z.infer<typeof kioskLoginSchema>

export function KioskLogin() {
    const navigate = useNavigate()
    const loginKiosk = useKioskStore((state) => state.loginKiosk)

    const form = useForm<KioskLoginFormValues>({
        resolver: zodResolver(kioskLoginSchema),
        defaultValues: {
            kioskId: '',
            pin: '',
        },
    })

    const onSubmit = async (data: KioskLoginFormValues) => {
        const success = loginKiosk(data.pin, data.kioskId)

        if (success) {
            toast.success('Kiosk girişi başarılı!')
            navigate({ to: '/kiosk' })
        } else {
            toast.error('Geçersiz kiosk ID veya PIN')
        }
    }

    return (
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display flex flex-col kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-8 py-6 flex justify-between items-center relative z-20">
                {/* Logo */}
                <div className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-charcoal text-2xl">qr_code_scanner</span>
                    <span className="font-hand font-bold text-lg">QR Track</span>
                </div>

                {/* Back Link */}
                <Link
                    to="/auth/login"
                    className="sketch-border-sm bg-white px-4 py-2 transform rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                    <span className="material-symbols-outlined text-charcoal text-lg">arrow_back</span>
                    <span className="font-hand font-bold text-sm">Admin Panel</span>
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
                                <span className="material-symbols-outlined text-6xl text-charcoal">terminal</span>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <h1 className="text-4xl lg:text-5xl font-hand font-bold text-charcoal wiggle-slow">
                                Kiosk Login
                            </h1>
                            <p className="font-display text-gray-600">
                                Enter terminal credentials to activate
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
                                    <span className="material-symbols-outlined text-blue-600">lock</span>
                                </div>
                                <div>
                                    <h2 className="font-hand font-bold text-xl text-charcoal">Terminal Access</h2>
                                    <p className="text-sm text-gray-500 font-display">Secure authentication required</p>
                                </div>
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    {/* Kiosk ID Field */}
                                    <FormField
                                        control={form.control}
                                        name="kioskId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-blue-600">badge</span>
                                                    Kiosk ID
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            placeholder="KIOSK-001"
                                                            className="h-14 text-lg font-mono uppercase border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pl-12"
                                                            {...field}
                                                        />
                                                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">qr_code</span>
                                                    </div>
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
                                                <FormLabel className="flex items-center gap-2 font-hand font-bold text-charcoal">
                                                    <span className="material-symbols-outlined text-lg text-blue-600">pin</span>
                                                    PIN Code
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type="password"
                                                            placeholder="••••"
                                                            className="h-14 text-2xl font-mono tracking-[0.5em] text-center border-2 border-charcoal rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                                            maxLength={8}
                                                            {...field}
                                                        />
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
                                                Connecting...
                                            </>
                                        ) : (
                                            <>
                                                Start Terminal
                                                <span className="material-symbols-outlined">arrow_forward</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            </Form>
                        </div>
                    </div>

                    {/* Demo Info - Sticky Note Style */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-200 border-2 border-charcoal transform rotate-1 rounded-sm"></div>
                        <div className="relative bg-[#fff9c4] border-2 border-charcoal p-5 rounded-sm">
                            {/* Tape visual */}
                            <div className="absolute -top-3 left-8 w-12 h-4 bg-white/60 border border-white/80 transform -rotate-3"></div>

                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-2xl text-charcoal flex-shrink-0">lightbulb</span>
                                <div className="space-y-3">
                                    <p className="font-hand font-bold text-lg text-charcoal">Demo Credentials</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-2 bg-white/50 rounded border border-charcoal/20">
                                            <span className="font-display text-sm text-gray-600">Kiosk ID:</span>
                                            <code className="font-mono font-bold text-charcoal bg-white px-2 py-0.5 rounded border border-charcoal/30">KIOSK-001</code>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-white/50 rounded border border-charcoal/20">
                                            <span className="font-display text-sm text-gray-600">PIN:</span>
                                            <code className="font-mono font-bold text-charcoal bg-white px-2 py-0.5 rounded border border-charcoal/30">1234</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <p className="text-center font-display text-sm text-gray-500">
                        🔒 Kiosk access is restricted to authorized personnel only
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center relative z-10">
                <p className="font-hand text-charcoal/60 text-sm">
                    Powered by <span className="font-bold text-charcoal">QR Track</span> • Secure Kiosk Mode v2.0
                </p>
            </footer>
        </div>
    )
}
