import { createFileRoute } from '@tanstack/react-router'
import { EmployeeManagement } from '../../features/employee-management'

export const Route = createFileRoute('/dashboard/employees')({
    component: EmployeeManagement,
})
