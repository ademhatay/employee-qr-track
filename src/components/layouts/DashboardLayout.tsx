import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/store'
import { Icons } from '@/lib/icons'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const user = useAuthStore((state) => state.user)
    const company = useAuthStore((state) => state.company)
    const logout = useAuthStore((state) => state.logout)

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U'

    const sidebarItems = [
        { href: '/dashboard', title: 'Genel Bakış', icon: Icons.home, color: 'blue' },
        { href: '/dashboard/employees', title: 'Çalışanlar', icon: Icons.users, color: 'green' },
        { href: '/dashboard/reports', title: 'Raporlar', icon: Icons.trending, color: 'purple' },
        { href: '/dashboard/settings', title: 'Ayarlar', icon: Icons.settings, color: 'red' },
    ]

    const handleLogout = () => {
        logout()
        navigate({ to: '/' })
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full relative">
            {/* Background texture */}
            <div className="absolute inset-0 bg-texture-adaptive-paper opacity-60 pointer-events-none" />
            
            {/* Logo Section */}
            <div className="relative z-10 border-b border-sketchy-border-muted border-dashed">
                <Link
                    to="/"
                    className="flex items-center gap-3 group p-4 hover:bg-sketchy-accent-blue/5 active:bg-sketchy-accent-blue/10 transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sketchy-accent-blue border-organic-md shadow-sketchy-sm group-hover:scale-105 group-active:scale-95 transition-transform">
                        <Icons.qrCode className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-0">
                        <h1 className="heading-organic-4 text-sketchy-primary font-bold text-sm group-hover:text-sketchy-accent-blue transition-colors">
                            Employee QR Track
                        </h1>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className="group flex items-center gap-3 px-4 py-3 rounded-xl border-organic-sm transition-all duration-300 hover:shadow-sketchy-md hover:border-sketchy-accent-blue/30 [&.active]:bg-sketchy-accent-blue/10 [&.active]:border-sketchy-accent-blue/50"
                        activeOptions={{ exact: true }}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                            item.color === 'blue' ? 'bg-sketchy-accent-blue/10 text-sketchy-accent-blue' :
                            item.color === 'green' ? 'bg-sketchy-accent-green/10 text-sketchy-accent-green' :
                            item.color === 'purple' ? 'bg-sketchy-accent-purple/10 text-sketchy-accent-purple' :
                            'bg-sketchy-accent-red/10 text-sketchy-accent-red'
                        }`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="body-organic text-sketchy-primary font-medium group-hover:translate-x-1 transition-transform">
                            {item.title}
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Company Info */}
            <div className="relative z-10 p-4 border-t border-sketchy-border-muted border-dashed">
                <Card sketchy texture="paper" className="shadow-sketchy-sm">
                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sketchy-accent-blue/10">
                                <Icons.building className="w-4 h-4 text-sketchy-accent-blue" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="label-organic text-sketchy-primary font-medium truncate">
                                    {company?.name}
                                </p>
                            </div>
                        </div>
                        <Badge 
                            variant="secondary" 
                            className="border-organic-sm text-xs w-full justify-center"
                        >
                            {company?.plan === 'pro' ? 'Pro Plan' : 'Ücretsiz Plan'}
                        </Badge>
                    </div>
                </Card>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-sketchy-bg-primary relative overflow-hidden">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-texture-adaptive-paper opacity-40 pointer-events-none" />
            
            <div className="relative z-10 flex min-h-screen lg:pl-[280px]">
                {/* Desktop Sidebar - Fixed Position */}
                <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[280px] flex-col border-r border-sketchy-border-muted border-dashed bg-sketchy-bg-secondary/50 overflow-y-auto">
                    <SidebarContent />
                </div>

                {/* Mobile Sidebar */}
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetContent side="left" className="w-[300px] p-0 border-r border-sketchy-border-muted border-dashed bg-sketchy-bg-secondary">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>

                {/* Main Content - Full width and scrollable */}
                <div className="flex flex-col flex-1 min-h-screen w-full">
                    {/* Header */}
                    <header className="fixed top-0 left-0 right-0 z-50 border-b border-sketchy-border-muted border-dashed bg-sketchy-bg-primary/95 backdrop-blur-sm">
                        <div className="flex h-16 lg:h-20 items-center gap-4 px-4 lg:px-6">
                            {/* Mobile Menu Button */}
                            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="sketchy"
                                        size="icon"
                                        className="shrink-0 lg:hidden h-10 w-10"
                                    >
                                        <Icons.menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                            </Sheet>

                            {/* Page Title Area */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <Badge 
                                        variant="secondary" 
                                        className="border-organic-sm text-xs hidden sm:inline-flex"
                                    >
                                        <Icons.qrCode className="w-3 h-3 mr-1" />
                                        {company?.name}
                                    </Badge>
                                </div>
                            </div>

                            {/* User Menu */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="sketchy" 
                                        size="icon" 
                                        className="h-10 w-10 rounded-2xl border-organic-md shadow-sketchy-sm hover:shadow-sketchy-md transition-shadow"
                                    >
                                        <Avatar className="h-9 w-9 border-2 border-sketchy-border-muted">
                                            <AvatarImage src="" alt={user?.name} />
                                            <AvatarFallback className="bg-sketchy-accent-blue text-white body-organic font-semibold">
                                                {initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent 
                                    align="end" 
                                    className="w-56 border-organic-md shadow-sketchy-lg"
                                >
                                    <DropdownMenuLabel className="border-b border-sketchy-border-muted border-dashed pb-3">
                                        <div className="space-y-1">
                                            <p className="label-organic text-sketchy-primary font-semibold">
                                                {user?.name}
                                            </p>
                                            <p className="body-organic-small text-sketchy-text-secondary">
                                                {user?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link 
                                            to="/dashboard/settings"
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <Icons.settings className="w-4 h-4" />
                                            Ayarlar
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link 
                                            to="/app"
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <Icons.qrCode className="w-4 h-4" />
                                            Çalışan Modu
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                        onClick={handleLogout}
                                        className="text-sketchy-accent-red hover:bg-sketchy-accent-red/10 cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Çıkış Yap
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 relative pt-16 lg:pt-20">
                        <div className="absolute inset-0 bg-texture-adaptive-paper opacity-30 pointer-events-none" />
                        <div className="relative z-10 p-4 lg:p-6 space-y-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
