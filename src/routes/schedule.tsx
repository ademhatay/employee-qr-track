import { createFileRoute, redirect } from '@tanstack/react-router'
import { ShiftEditor } from '@/features/shifts'

export const Route = createFileRoute('/schedule')({
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
    component: ShiftEditor,
})
