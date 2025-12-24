import { createFileRoute } from '@tanstack/react-router'
import { EmployeeHome } from '@/features/employee-app'

export const Route = createFileRoute('/app/')({
    component: EmployeeHome,
})
