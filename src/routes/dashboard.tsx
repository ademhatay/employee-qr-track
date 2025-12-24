import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { DashboardLayout } from '@/components/layouts/DashboardLayout'

export const Route = createFileRoute('/dashboard')({
    beforeLoad: () => {
        // Check if user is authenticated and has a company
        const authData = localStorage.getItem('qr-track-auth')
        if (!authData) {
            throw redirect({ to: '/auth/login' })
        }
        const { state } = JSON.parse(authData)
        if (!state.isAuthenticated) {
            throw redirect({ to: '/auth/login' })
        }
        if (!state.company) {
            throw redirect({ to: '/onboarding' })
        }
    },
    component: DashboardLayoutRoute,
})

function DashboardLayoutRoute() {
    return (
        <DashboardLayout>
            <Outlet />
        </DashboardLayout>
    )
}
