import { useState } from 'react'
import { Link, useNavigate, useLocation } from '@tanstack/react-router'
import { useAuthStore } from '@/lib/store'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)

    const handleLogout = () => {
        logout()
        navigate({ to: '/' })
    }

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { href: '/schedule', label: 'Schedule', icon: 'calendar_month' },
        { href: '/dashboard/employees', label: 'Users', icon: 'group' },
        { href: '/dashboard/reports', label: 'Charts', icon: 'bar_chart' },
        { href: '/kiosk', label: 'QR Codes', icon: 'qr_code_2' },
    ]


    const isPathActive = (href: string) => {
        if (href === '/dashboard') {
            return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
        }
        return location.pathname.startsWith(href)
    }

    return (
        <div className="dashboard-body bg-background-light text-charcoal font-dashboard-display overflow-hidden">
            {/* Decorative Doodles */}
            <div className="fixed top-20 right-10 opacity-20 pointer-events-none z-0 rotate-12 hidden xl:block">
                <svg fill="none" height="100" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 100" width="100">
                    <path d="M20,20 C40,10 60,30 80,20 S 90,50 80,80" strokeDasharray="5,5"></path>
                </svg>
            </div>
            <div className="fixed bottom-10 left-64 opacity-20 pointer-events-none z-0 -rotate-12 hidden lg:block">
                <span className="material-symbols-outlined text-6xl">local_cafe</span>
            </div>

            <div className="flex h-screen w-full">
                {/* Left Sidebar */}
                <aside className="hidden lg:flex w-64 min-w-[256px] h-full flex-col bg-background-light border-r-2 border-charcoal/10 relative z-20 wiggly-border-r shadow-sm">
                    <div className="p-6 pb-2">
                        <Link to="/" className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-dashboard-primary text-3xl font-bold">
                                qr_code_scanner
                            </span>
                            <h1 className="font-hand text-2xl font-bold text-charcoal tracking-wide">QR Track</h1>
                        </Link>
                        <p className="text-charcoal/60 text-xs font-hand pl-10 -mt-2">Admin Console</p>
                    </div>

                    <nav className="flex-1 flex flex-col gap-3 px-4 py-6 overflow-y-auto">
                        {navItems.map((item) => {
                            const active = isPathActive(item.href)
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${active ? '' : 'hover:bg-black/5'
                                        }`}
                                >
                                    {active && (
                                        <div className="absolute inset-0 bg-dashboard-primary/10 rounded-lg wiggly-border-sm border-transparent transform -rotate-1 opacity-100"></div>
                                    )}
                                    <span
                                        className={`material-symbols-outlined ${active ? 'text-dashboard-primary' : 'text-charcoal/70 group-hover:text-charcoal'}`}
                                    >
                                        {item.icon}
                                    </span>
                                    <span
                                        className={`${active ? 'font-bold text-charcoal relative z-10' : 'font-medium text-charcoal/70 group-hover:text-charcoal'}`}
                                    >
                                        {item.label}
                                    </span>
                                    {active && (
                                        <div className="ml-auto opacity-100 text-dashboard-primary">
                                            <span className="material-symbols-outlined text-sm">edit</span>
                                        </div>
                                    )}
                                </Link>
                            )
                        })}

                        <div className="my-2 border-t-2 border-charcoal/10 border-dashed mx-3"></div>

                        <Link
                            to="/dashboard/settings"
                            className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${isPathActive('/dashboard/settings') ? '' : 'hover:bg-black/5'}`}
                        >
                            {isPathActive('/dashboard/settings') && (
                                <div className="absolute inset-0 bg-dashboard-primary/10 rounded-lg wiggly-border-sm border-transparent transform -rotate-1 opacity-100"></div>
                            )}
                            <span className={`material-symbols-outlined ${isPathActive('/dashboard/settings') ? 'text-dashboard-primary' : 'text-charcoal/70 group-hover:text-charcoal'}`}>settings</span>
                            <span className={`${isPathActive('/dashboard/settings') ? 'font-bold text-charcoal relative z-10' : 'font-medium text-charcoal/70 group-hover:text-charcoal'}`}>Settings</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-black/5 transition-all mt-auto"
                        >
                            <span className="material-symbols-outlined text-charcoal/70 group-hover:text-charcoal">logout</span>
                            <span className="font-medium text-charcoal/70 group-hover:text-charcoal">Logout</span>
                        </button>
                    </nav>

                    {/* Paper Clip Decoration */}
                    <div className="absolute -right-3 top-20 transform rotate-45 text-charcoal/30 z-30">
                        <span className="material-symbols-outlined text-4xl">attachment</span>
                    </div>
                </aside>

                {/* Mobile Sidebar */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
                        <aside className="absolute left-0 top-0 bottom-0 w-64 bg-background-light shadow-lg">
                            <div className="p-6 pb-2">
                                <div className="flex items-center justify-between">
                                    <Link to="/" className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-dashboard-primary text-3xl font-bold">
                                            qr_code_scanner
                                        </span>
                                        <h1 className="font-hand text-2xl font-bold text-charcoal tracking-wide">QR Track</h1>
                                    </Link>
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            </div>
                            <nav className="flex-1 flex flex-col gap-3 px-4 py-6">
                                {navItems.map((item) => {
                                    const active = isPathActive(item.href)
                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${active ? '' : 'hover:bg-black/5'}`}
                                        >
                                            {active && (
                                                <div className="absolute inset-0 bg-dashboard-primary/10 rounded-lg wiggly-border-sm border-transparent transform -rotate-1 opacity-100"></div>
                                            )}
                                            <span className={`material-symbols-outlined ${active ? 'text-dashboard-primary' : 'text-charcoal/70'}`}>{item.icon}</span>
                                            <span className={`${active ? 'font-bold text-charcoal relative z-10' : 'font-medium text-charcoal/70'}`}>{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </nav>
                        </aside>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[size:20px_20px] bg-paper-pattern">
                    {/* Header */}
                    <header className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 pb-2 gap-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {/* Mobile Menu Button */}
                            <button className="lg:hidden p-2 text-charcoal" onClick={() => setIsMobileMenuOpen(true)}>
                                <span className="material-symbols-outlined">menu</span>
                            </button>

                            <div className="flex flex-col">
                                <h2 className="font-hand text-3xl md:text-4xl font-bold text-charcoal relative inline-block">
                                    Hello, {user?.name?.split(' ')[0] || 'Admin'}! ✨
                                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-yellow-200/50 -z-10 rounded-full transform -rotate-1"></span>
                                </h2>
                                <p className="text-charcoal/60 font-dashboard-display text-sm mt-1">
                                    Here's your daily doodle overview.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {/* Sketchy Search */}
                            <div className="relative group w-full md:w-64">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-charcoal/50">search</span>
                                </div>
                                <input
                                    className="w-full py-2.5 pl-10 pr-4 bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dashboard-primary/20 wiggly-border-sm transition-shadow shadow-sm"
                                    placeholder="Search logs..."
                                    type="text"
                                />
                            </div>

                            {/* Avatar */}
                            <div className="relative shrink-0 cursor-pointer group">
                                <div className="w-12 h-12 rounded-full border-2 border-charcoal p-0.5 transform transition-transform group-hover:rotate-6 shadow-sm overflow-hidden bg-white">
                                    <div
                                        className="w-full h-full rounded-full bg-cover bg-center bg-dashboard-primary/10 flex items-center justify-center"
                                        style={{
                                            backgroundImage:
                                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIymUNrLGIHOFi6RPsw9ApEKZSgGD1v87MCqw12cAEp9wDsS8rkmvGGyR-s70Sw13w-cRXy0AdXwXYVp4jho4--aQ1UEL_-wS46fl-C_tq0_OarYZyxt33e8mSZX58QGcInluZQlyNQR_YO_pVMQ6Let5ZQfr1PeC224WCXqZKMRkrVYflF28bz62j8znniSRKkM0Ei8hAPpA8lMNAyc5xzeUIYkT_vwE7FRjwdtzMILLyn2tZafK6mMfxSEVoosqzxOXZsjutsQ')",
                                        }}
                                    ></div>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                    </header>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 pt-2">{children}</div>
                </main>
            </div>

            {/* SVG Filters for wiggle effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="wiggleFilter">
                        <feTurbulence baseFrequency="0.01" numOctaves={3} result="noise" type="fractalNoise"></feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale={2}></feDisplacementMap>
                    </filter>
                </defs>
            </svg>
        </div >
    )
}
