import { createFileRoute } from '@tanstack/react-router'
import { EmployeeProfile } from '@/features/employee-app'

export const Route = createFileRoute('/app/profile')({
    component: EmployeeProfile,
})
