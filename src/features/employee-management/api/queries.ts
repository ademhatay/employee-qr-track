import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Employee } from '@/types'

// Mock Data
let MOCK_EMPLOYEES: Employee[] = [
    {
        id: '1',
        name: 'Ali Yılmaz',
        email: 'ali@example.com',
        role: 'manager',
        companyId: 'comp1',
        isActive: true,
        position: 'Store Manager',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        role: 'employee',
        companyId: 'comp1',
        isActive: true,
        position: 'Sales Associate',
        createdAt: new Date().toISOString(),
    },
]

// Mock API Functions
const fetchEmployees = async (): Promise<Employee[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)) // network delay
    return [...MOCK_EMPLOYEES]
}

const createEmployee = async (data: Omit<Employee, 'id' | 'createdAt' | 'companyId'>): Promise<Employee> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newEmployee: Employee = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        companyId: 'comp1', // default for mock
    }
    MOCK_EMPLOYEES.push(newEmployee)
    return newEmployee
}

// Queries
export const employeeQueries = {
    all: () => ['employees'] as const,
    list: () => [...employeeQueries.all(), 'list'] as const,
    lists: () =>
        queryOptions({
            queryKey: employeeQueries.list(),
            queryFn: fetchEmployees,
        }),
}

// Hooks
export function useEmployees(_filters?: { type?: string }) {
    return useQuery(employeeQueries.lists())
}

// Mutations
export function useCreateEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: employeeQueries.all() })
        },
    })
}

