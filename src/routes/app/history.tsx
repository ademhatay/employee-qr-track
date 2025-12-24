import { createFileRoute } from '@tanstack/react-router'
import { AttendanceHistory } from '@/features/employee-app'

export const Route = createFileRoute('/app/history')({
    component: AttendanceHistory,
})
