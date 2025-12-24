import { createFileRoute, redirect } from '@tanstack/react-router'
import { OnboardingWizard } from '@/features/onboarding'

export const Route = createFileRoute('/onboarding')({
    beforeLoad: () => {
        // Check if user is authenticated
        const authData = localStorage.getItem('qr-track-auth')
        if (!authData) {
            throw redirect({ to: '/auth/login' })
        }
        const { state } = JSON.parse(authData)
        if (!state.isAuthenticated) {
            throw redirect({ to: '/auth/login' })
        }
    },
    component: OnboardingPage,
})

function OnboardingPage() {
    return <OnboardingWizard />
}
