import { createFileRoute, redirect } from '@tanstack/react-router'
import { KioskDisplay } from '@/features/kiosk'

export const Route = createFileRoute('/kiosk/')({
    beforeLoad: () => {
        // Check if logged in as kiosk
        const kioskData = localStorage.getItem('qr-track-kiosk')
        if (!kioskData) {
            throw redirect({ to: '/kiosk/login' })
        }
        const { state } = JSON.parse(kioskData)
        if (!state.currentKiosk) {
            throw redirect({ to: '/kiosk/login' })
        }
    },
    component: KioskDisplay,
})
