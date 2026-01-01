import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
import { useDataStore, useAuthStore, type KioskAccount } from '@/lib/store'
import { toast } from 'sonner'

const kioskSchema = z.object({
    name: z.string().min(2, 'Kiosk adı en az 2 karakter olmalı'),
    kioskId: z.string().min(6, 'Kiosk ID en az 6 karakter olmalı').max(12, 'Kiosk ID en fazla 12 karakter olabilir'),
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
            kioskId: '',
            pin: '',
        },
    })

    const onSubmit = (data: KioskFormValues) => {
        const newKiosk: KioskAccount = {
            id: crypto.randomUUID(),
            name: data.name,
            kioskId: data.kioskId.toUpperCase(),
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
        <div className="space-y-8">
            {/* Page Header with Hand-drawn Style */}
            <div className="relative">
                <h1 className="font-hand text-4xl font-bold text-charcoal mb-2">
                    Settings{' '}
                    <span className="material-symbols-outlined text-3xl align-middle ml-2 text-charcoal/40">
                        settings
                    </span>
                </h1>
                <p className="font-dashboard-display text-charcoal/60 text-lg">
                    Manage your company and kiosk configurations
                </p>
            </div>

            {/* Stats Grid - Quick Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Company Card */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="material-symbols-outlined text-4xl text-blue-500">business</span>
                    </div>
                    <p className="font-hand text-sm text-charcoal/70 font-bold mb-1 uppercase tracking-wide">Company</p>
                    <div className="flex items-end gap-2">
                        <span className="font-dashboard-display text-2xl font-bold text-charcoal">{company?.name}</span>
                    </div>
                    <p className="font-dashboard-display text-xs text-charcoal/50 mt-2">Active Organization</p>
                </div>

                {/* Plan Card */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="material-symbols-outlined text-4xl text-purple-500">workspace_premium</span>
                    </div>
                    <p className="font-hand text-sm text-charcoal/70 font-bold mb-1 uppercase tracking-wide">Plan</p>
                    <div className="flex items-end gap-2">
                        <span className="font-dashboard-display text-2xl font-bold text-charcoal capitalize">{company?.plan}</span>
                        <span className={`font-hand text-xs px-2 py-0.5 rounded-full border ${company?.plan === 'pro'
                            ? 'bg-purple-100 text-purple-800 border-purple-200'
                            : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                            {company?.plan === 'pro' ? 'Premium' : 'Free'}
                        </span>
                    </div>
                    <p className="font-dashboard-display text-xs text-charcoal/50 mt-2">
                        {company?.plan === 'free' ? 'Max 5 employees, 1 kiosk' : 'Unlimited access'}
                    </p>
                </div>

                {/* Kiosks Card */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="material-symbols-outlined text-4xl text-green-500">qr_code_scanner</span>
                    </div>
                    <p className="font-hand text-sm text-charcoal/70 font-bold mb-1 uppercase tracking-wide">Kiosks</p>
                    <div className="flex items-end gap-2">
                        <span className="font-dashboard-display text-2xl font-bold text-charcoal">{companyKiosks.length}</span>
                        <span className="font-hand text-sm text-green-600 mb-1 font-bold">Active</span>
                    </div>
                    <p className="font-dashboard-display text-xs text-charcoal/50 mt-2">QR Terminal Devices</p>
                </div>
            </div>

            {/* Company Details Section */}
            <div className="bg-white rounded-lg wiggly-border sketch-shadow overflow-hidden">
                <div className="p-6 border-b-2 border-charcoal/10 border-dashed flex justify-between items-center bg-background-light/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg border border-blue-200">
                            <span className="material-symbols-outlined text-blue-600">business</span>
                        </div>
                        <div>
                            <h3 className="font-hand text-xl font-bold text-charcoal">Company Information</h3>
                            <p className="font-dashboard-display text-sm text-charcoal/60">Your organization details</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 bg-background-light/50 rounded-lg border border-charcoal/10 border-dashed">
                        <div>
                            <p className="font-hand text-sm text-charcoal/60 font-bold mb-1">Company Name</p>
                            <p className="font-dashboard-display text-lg font-bold text-charcoal">{company?.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-200 border-dashed">
                        <div className="flex-1">
                            <p className="font-hand text-sm text-charcoal/60 font-bold mb-1">Company ID</p>
                            <code className="font-mono text-base font-bold text-charcoal bg-white px-3 py-1 rounded border border-blue-200">
                                {company?.id}
                            </code>
                        </div>
                        <button
                            onClick={() => copyToClipboard(company?.id || '', 'Company ID')}
                            className="ml-4 px-4 py-2 border-2 border-charcoal rounded-lg font-hand font-bold hover:bg-charcoal hover:text-white transition-colors text-sm uppercase tracking-wide flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-base">content_copy</span>
                            Copy
                        </button>
                    </div>
                </div>
            </div>

            {/* Subscription Plan Section */}
            <div className="bg-white rounded-lg wiggly-border sketch-shadow overflow-hidden">
                <div className="p-6 border-b-2 border-charcoal/10 border-dashed flex justify-between items-center bg-background-light/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg border border-purple-200">
                            <span className="material-symbols-outlined text-purple-600">workspace_premium</span>
                        </div>
                        <div>
                            <h3 className="font-hand text-xl font-bold text-charcoal">Subscription Plan</h3>
                            <p className="font-dashboard-display text-sm text-charcoal/60">Current plan and limits</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-hand text-3xl font-bold text-charcoal capitalize">{company?.plan} Plan</span>
                                <span className={`inline-block px-4 py-1.5 ${company?.plan === 'pro'
                                    ? 'bg-purple-200 text-purple-900 border-purple-300'
                                    : 'bg-gray-200 text-gray-900 border-gray-300'
                                    } rounded-md font-bold font-hand transform -rotate-1 border shadow-sm`}>
                                    {company?.plan === 'pro' ? '⭐ Premium' : '🆓 Free Tier'}
                                </span>
                            </div>
                            <p className="font-dashboard-display text-charcoal/70">
                                {company?.plan === 'free'
                                    ? '📊 Maximum 5 employees • 🖥️ 1 kiosk terminal'
                                    : '🚀 Unlimited employees • 🖥️ Unlimited kiosks'}
                            </p>
                        </div>
                        {company?.plan === 'free' && (
                            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-hand font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all border-2 border-purple-700 flex items-center gap-2">
                                <span className="material-symbols-outlined">upgrade</span>
                                Upgrade to Pro
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Kiosk Accounts Section */}
            <div className="bg-white rounded-lg wiggly-border sketch-shadow overflow-hidden">
                <div className="p-6 border-b-2 border-charcoal/10 border-dashed flex justify-between items-center bg-background-light/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg border border-green-200">
                            <span className="material-symbols-outlined text-green-600">qr_code_scanner</span>
                        </div>
                        <div>
                            <h3 className="font-hand text-xl font-bold text-charcoal">Kiosk Accounts</h3>
                            <p className="font-dashboard-display text-sm text-charcoal/60">QR terminal login credentials</p>
                        </div>
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <button className="px-4 py-2 border-2 border-charcoal rounded-lg font-hand font-bold hover:bg-charcoal hover:text-white transition-colors text-sm uppercase tracking-wide flex items-center gap-2">
                                <span className="material-symbols-outlined text-base">add_circle</span>
                                Add Kiosk
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="font-hand text-2xl">New Kiosk Account</DialogTitle>
                                <DialogDescription className="font-dashboard-display">
                                    Create a new account for QR code terminal
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-hand font-bold">Kiosk Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Main Entrance" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="kioskId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-hand font-bold">Kiosk ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="KIOSK-001" className="uppercase font-mono" {...field} />
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
                                                <FormLabel className="font-hand font-bold">PIN Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="1234" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-charcoal text-white rounded-lg font-hand font-bold text-lg hover:bg-charcoal/90 transition-colors border-2 border-charcoal"
                                    >
                                        Create Kiosk
                                    </button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="p-6">
                    {companyKiosks.length === 0 ? (
                        <div className="text-center py-12 bg-background-light/30 rounded-lg border-2 border-dashed border-charcoal/20">
                            <div className="inline-block p-4 bg-green-100 rounded-full mb-4 border-2 border-green-200">
                                <span className="material-symbols-outlined text-5xl text-green-600">qr_code_scanner</span>
                            </div>
                            <p className="font-hand text-xl font-bold text-charcoal mb-2">
                                No kiosk accounts yet
                            </p>
                            <p className="font-dashboard-display text-charcoal/60 max-w-md mx-auto">
                                Click the "Add Kiosk" button above to create your first QR terminal account
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Instructions Alert */}
                            <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200 border-dashed flex gap-3">
                                <span className="material-symbols-outlined text-blue-600 flex-shrink-0">info</span>
                                <div>
                                    <p className="font-hand font-bold text-charcoal mb-1">How to Access Kiosk?</p>
                                    <p className="font-dashboard-display text-sm text-charcoal/70">
                                        On the kiosk device, navigate to <code className="bg-white px-2 py-0.5 rounded border border-blue-300 font-mono text-xs">/kiosk/login</code>
                                        {' '}and enter the <strong>Kiosk ID</strong> and <strong>PIN</strong> below.
                                    </p>
                                </div>
                            </div>

                            {/* Kiosk List */}
                            {companyKiosks.map((kiosk, index) => (
                                <div
                                    key={kiosk.id}
                                    className="flex items-center justify-between p-5 bg-white rounded-lg border-2 border-charcoal/10 hover:border-green-200 hover:bg-green-50/30 transition-all group"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`p-3 rounded-lg border-2 ${index % 3 === 0 ? 'bg-blue-100 border-blue-200' :
                                            index % 3 === 1 ? 'bg-purple-100 border-purple-200' :
                                                'bg-green-100 border-green-200'
                                            }`}>
                                            <span className={`material-symbols-outlined text-2xl ${index % 3 === 0 ? 'text-blue-600' :
                                                index % 3 === 1 ? 'text-purple-600' :
                                                    'text-green-600'
                                                }`}>qr_code_scanner</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-hand text-lg font-bold text-charcoal mb-2">{kiosk.name}</p>
                                            <div className="flex flex-wrap items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-hand text-xs text-charcoal/60 font-bold uppercase">ID:</span>
                                                    <code className="bg-charcoal/5 px-3 py-1 rounded border border-charcoal/20 text-sm font-mono font-bold text-charcoal">
                                                        {kiosk.kioskId}
                                                    </code>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-hand text-xs text-charcoal/60 font-bold uppercase">PIN:</span>
                                                    <code className="bg-charcoal/5 px-3 py-1 rounded border border-charcoal/20 text-sm font-mono font-bold text-charcoal min-w-[60px]">
                                                        {showPins[kiosk.id] ? kiosk.pin : '••••'}
                                                    </code>
                                                    <button
                                                        onClick={() => togglePinVisibility(kiosk.id)}
                                                        className="p-1.5 hover:bg-charcoal/5 rounded-full transition-colors"
                                                        title={showPins[kiosk.id] ? 'Hide PIN' : 'Show PIN'}
                                                    >
                                                        <span className="material-symbols-outlined text-base text-charcoal/60">
                                                            {showPins[kiosk.id] ? 'visibility_off' : 'visibility'}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={() => copyToClipboard(kiosk.pin, 'PIN')}
                                                        className="p-1.5 hover:bg-charcoal/5 rounded-full transition-colors"
                                                        title="Copy PIN"
                                                    >
                                                        <span className="material-symbols-outlined text-base text-charcoal/60">content_copy</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="p-2 hover:bg-red-100 rounded-full transition-colors group/delete"
                                        title="Delete kiosk"
                                    >
                                        <span className="material-symbols-outlined text-charcoal/40 group-hover/delete:text-red-600">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
