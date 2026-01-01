import { useAuthStore, useDataStore } from '@/lib/store'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'

export function EmployeeProfile() {
    const user = useAuthStore((state) => state.user)
    const updateProfile = useAuthStore((state) => state.updateProfile)
    const updateEmployee = useDataStore((state) => state.updateEmployee)
    const logout = useAuthStore((state) => state.logout)

    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')

    const handleUpdate = () => {
        if (!name || !email) {
            toast.error('Please fill in all fields')
            return
        }

        updateProfile({ name, email })
        if (user?.id) {
            updateEmployee(user.id, { name, email })
        }
        toast.success('Profile updated successfully!')
    }

    return (
        <div className="min-h-screen text-charcoal overflow-x-hidden font-display kiosk-paper-bg">
            {/* Header */}
            <header className="w-full px-6 py-4 flex justify-between items-center relative z-20">
                {/* Back Button */}
                <Link to="/app" className="sketch-border-sm bg-white px-4 py-2 transform -rotate-1 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <span className="material-symbols-outlined text-charcoal">arrow_back</span>
                    <span className="font-hand font-bold text-sm">Back</span>
                </Link>

                {/* Logo */}
                <div className="sketch-border-sm bg-white px-4 py-2 transform rotate-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-charcoal text-2xl">person</span>
                    <span className="font-hand font-bold text-lg">My Profile</span>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-6 py-4 max-w-lg mx-auto space-y-8 pb-24">
                {/* Profile Header Card */}
                <div className="relative text-center pb-4">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-blue-200 border-2 border-charcoal transform rotate-3 rounded-full"></div>
                        <div className="relative bg-blue-100 border-2 border-charcoal w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                            <span className="material-symbols-outlined text-charcoal text-5xl">person</span>
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 border-2 border-charcoal p-1 rounded-full shadow-sm transform -rotate-12">
                            <span className="material-symbols-outlined text-charcoal text-xl">star</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-hand font-bold text-charcoal wiggle-slow mt-2">
                        {user?.name || 'Employee Name'}
                    </h1>
                    <div className="marker-highlight-yellow inline-block">
                        <span className="font-hand font-bold text-charcoal px-2">
                            {user?.role?.toUpperCase() || 'STAFF'}
                        </span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="relative">
                    {/* Card Shadow */}
                    <div className="absolute inset-0 bg-charcoal transform translate-x-2 translate-y-2 rounded-lg"></div>

                    {/* Main Card */}
                    <div className="relative bg-white sketch-border p-6 space-y-6">
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div className="space-y-1">
                                <label className="font-hand font-bold text-lg text-charcoal flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">person</span>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-12 px-4 bg-gray-50 border-2 border-charcoal rounded-lg font-display text-charcoal focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="space-y-1">
                                <label className="font-hand font-bold text-lg text-charcoal flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">alternate_email</span>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 px-4 bg-gray-50 border-2 border-charcoal rounded-lg font-display text-charcoal focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Position (Read Only for now) */}
                            <div className="space-y-1 opacity-70">
                                <label className="font-hand font-bold text-lg text-charcoal flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-500">work</span>
                                    Position
                                </label>
                                <div className="w-full h-12 px-4 bg-gray-100 border-2 border-dashed border-charcoal rounded-lg font-display text-charcoal flex items-center">
                                    {user?.role === 'owner' ? 'Owner / Admin' : 'Team Member'}
                                </div>
                                <p className="text-[10px] italic text-gray-500">Position changes require admin approval</p>
                            </div>
                        </div>

                        {/* Update Button */}
                        <button
                            onClick={handleUpdate}
                            className="w-full h-14 bg-blue-600 text-white rounded-lg font-hand font-bold text-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-charcoal flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined">save</span>
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="space-y-4">
                    {/* Security Note */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-100 border-2 border-charcoal transform rotate-1 rounded-sm"></div>
                        <div className="relative bg-[#fff9c4] border-2 border-charcoal p-4 rounded-sm flex items-start gap-3">
                            <span className="material-symbols-outlined text-charcoal">security</span>
                            <div className="flex-1">
                                <p className="font-hand font-bold text-sm text-charcoal">Security Note</p>
                                <p className="font-display text-xs text-gray-600">Your account is secured with end-to-end encryption for your privacy.</p>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={() => {
                            logout()
                            window.location.href = '/auth/login'
                        }}
                        className="w-full h-14 bg-red-100 text-red-600 rounded-lg font-hand font-bold text-xl hover:bg-red-200 transition-all border-2 border-charcoal border-dashed flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        Sign Out
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-4 text-center fixed bottom-0 bg-background-light/80 backdrop-blur-sm">
                <p className="font-hand text-charcoal/60 text-sm">
                    <span className="font-bold text-charcoal">QR Track</span> • Employee Profile
                </p>
            </footer>
        </div>
    )
}
