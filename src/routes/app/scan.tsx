import { createFileRoute } from '@tanstack/react-router'
import { QRScanner } from '@/features/employee-app'

export const Route = createFileRoute('/app/scan')({
    component: QRScanner,
})
