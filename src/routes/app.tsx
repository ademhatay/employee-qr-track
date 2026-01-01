import { createFileRoute, redirect, Outlet, Link, useLocation } from '@tanstack/react-router'

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
        { href: '/app', icon: 'home', label: 'Home' },
        { href: '/app/scan', icon: 'qr_code_scanner', label: 'Scan' },
        { href: '/app/history', icon: 'history', label: 'History' },
        { href: '/app/profile', icon: 'person', label: 'Profile' },
    ]

    return (
        <div className="min-h-screen bg-transparent pb-24">
            <Outlet />

            {/* Bottom Navigation - Sketchy Style */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none">
                <div className="max-w-lg mx-auto pointer-events-auto">
                    <div className="relative">
                        {/* Shadow/Offset layer */}
                        <div className="absolute inset-0 bg-charcoal transform translate-y-1 rounded-2xl"></div>

                        {/* Main Nav Bar */}
                        <div className="relative bg-white border-2 border-charcoal rounded-2xl flex items-center justify-around py-3 px-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${isActive
                                                ? 'bg-blue-50 text-blue-600 transform -translate-y-1'
                                                : 'text-charcoal/60 hover:text-charcoal'
                                            }`}
                                    >
                                        <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill-current' : ''}`}>
                                            {item.icon}
                                        </span>
                                        <span className={`text-[10px] font-hand font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                            {item.label}
                                        </span>

                                        {/* Active Indicator Dot */}
                                        {isActive && (
                                            <div className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
