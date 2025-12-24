import { createFileRoute } from '@tanstack/react-router'
import { KioskLogin } from '@/features/kiosk'

export const Route = createFileRoute('/kiosk/login')({
    component: KioskLogin,
})
