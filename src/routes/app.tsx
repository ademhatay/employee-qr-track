import { createFileRoute, redirect, Outlet, Link, useLocation } from '@tanstack/react-router'
import { Icons } from '@/lib/icons'

export const Route = createFileRoute('/app')({
    beforeLoad: () => {
        const authData = localStorage.getItem('qr-track-auth')
        if (!authData) {
            throw redirect({ to: '/auth/login' })
        }
        const { state } = JSON.parse(authData)
        if (!state.isAuthenticated) {
            throw redirect({ to: '/auth/login' })
        }
    },
    component: EmployeeAppLayout,
})

function EmployeeAppLayout() {
    const location = useLocation()

    const navItems = [
        { href: '/app', icon: Icons.home, label: 'Ana Sayfa' },
        { href: '/app/scan', icon: Icons.qrCode, label: 'Tara' },
        { href: '/app/history', icon: Icons.history, label: 'Geçmiş' },
    ]

    return (
        <div className="min-h-screen bg-background pb-20">
            <Outlet />

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
                <div className="flex items-center justify-around p-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="text-xs">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
