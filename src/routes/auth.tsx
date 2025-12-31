import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
    component: AuthLayout,
})

function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-sketchy-bg-primary relative overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-texture-adaptive-paper opacity-40 pointer-events-none" />
            <div className="relative z-10 w-full max-w-lg">
                <Outlet />
            </div>
        </div>
    )
}
