import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
    LayoutDashboard,
    Users,
    FileBarChart,
    Settings,
    LogOut,
    Menu,
    QrCode,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { useAuthStore } from '@/lib/store'

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
        { href: '/dashboard', title: 'Genel Bakış', icon: LayoutDashboard },
        { href: '/dashboard/employees', title: 'Çalışanlar', icon: Users },
        { href: '/dashboard/reports', title: 'Raporlar', icon: FileBarChart },
        { href: '/dashboard/settings', title: 'Ayarlar', icon: Settings },
    ]

    const handleLogout = () => {
        logout()
        navigate({ to: '/' })
    }

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex h-14 items-center border-b px-6">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <QrCode className="h-6 w-6 text-primary" />
                    <span>Employee QR Track</span>
                </Link>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-1">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-primary [&.active]:text-primary-foreground"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t">
                <div className="text-xs text-muted-foreground mb-2">Şirket</div>
                <p className="font-medium truncate">{company?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{company?.plan} Plan</p>
            </div>
        </div>
    )

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <SidebarContent />
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 lg:h-[60px]">
                    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col p-0">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        {/* Search or page title could go here */}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" alt={user?.name} />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                <div>
                                    <p className="font-medium">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link to="/dashboard/settings">Ayarlar</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/app">Çalışan Modu</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Çıkış Yap
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
