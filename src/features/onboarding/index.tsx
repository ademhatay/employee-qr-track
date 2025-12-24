import { useState } from 'react'
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
import { useAuthStore } from '@/lib/store'
import { toast } from 'sonner'
import type { Company } from '@/types'
import {
    Buildings,
    ArrowRight,
    CheckCircle,
    Rocket,
    Confetti
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

const companySchema = z.object({
    name: z.string().min(2, 'Şirket adı en az 2 karakter olmalı'),
})

type CompanyFormValues = z.infer<typeof companySchema>

export function OnboardingWizard() {
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const setCompany = useAuthStore((state) => state.setCompany)
    const [step, setStep] = useState(1)

    const form = useForm<CompanyFormValues>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: '',
        },
    })

    const onSubmit = async (data: CompanyFormValues) => {
        const newCompany: Company = {
            id: crypto.randomUUID(),
            name: data.name,
            plan: 'free',
            kioskCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
            ownerId: user?.id || '',
            createdAt: new Date().toISOString(),
        }

        setCompany(newCompany)
        setStep(2)

        setTimeout(() => {
            toast.success('Şirketiniz oluşturuldu!')
            navigate({ to: '/dashboard' })
        }, 1500)
    }

    if (step === 2) {
        return (
            <div className="min-h-screen bg-[#0f1115] text-white relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.15),transparent_50%)]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                        backgroundSize: '72px 72px',
                    }}
                />

                <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
                    <div className="w-full max-w-sm text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 mb-2">
                            <CheckCircle size={48} weight="duotone" className="text-emerald-400" />
                        </div>
                        <div>
                            <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200 mb-4">
                                <Confetti size={14} weight="duotone" />
                                Başarılı
                            </Badge>
                            <h2 className="text-3xl font-semibold tracking-tight">Tebrikler!</h2>
                            <p className="text-white/50 mt-3">
                                Şirketiniz başarıyla oluşturuldu.<br />
                                Dashboard'a yönlendiriliyorsunuz...
                            </p>
                        </div>
                        <div className="pt-4">
                            <div className="h-1.5 w-32 mx-auto rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-emerald-400 animate-pulse rounded-full" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                            <Buildings size={30} weight="duotone" className="text-white/80" />
                        </div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Şirketinizi Oluşturun
                        </h1>
                        <p className="text-sm text-white/50 mt-2">
                            Çalışanlarınızı takip etmeye başlamak için şirket bilgilerinizi girin.
                        </p>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                            <Badge className="border-white/10 bg-white/5 text-white/70">
                                1. Adım
                            </Badge>
                            <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                                <Rocket size={12} weight="duotone" />
                                Başlangıç
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
                                                <Buildings size={16} weight="duotone" />
                                                Şirket Adı
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Örnek Şirket A.Ş."
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
                                        'Oluşturuluyor...'
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Devam Et
                                            <ArrowRight size={18} weight="bold" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-center text-white/30">
                        Şirket oluşturduktan sonra kiosk terminallerinizi ayarlayabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    )
}
