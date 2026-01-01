import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { EmployeeForm } from './components/EmployeeForm'
import { useEmployees, useCreateEmployee } from './api/queries'
import { toast } from 'sonner'
import type { Employee } from '@/types'

export function EmployeeManagement() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: employees, isLoading } = useEmployees({ type: 'list' })
    const createEmployee = useCreateEmployee()

    const handleCreate = async (data: any) => {
        try {
            await createEmployee.mutateAsync(data)
            toast.success('Employee created successfully')
            setIsOpen(false)
        } catch (error) {
            toast.error('Failed to create employee')
            console.error(error)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-6xl text-dashboard-primary animate-pulse">
                        hourglass_empty
                    </span>
                    <p className="font-hand text-xl text-charcoal/70">Loading employees...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="font-hand text-3xl md:text-4xl font-bold text-charcoal relative inline-block">
                        Team Members 👥
                        <span className="absolute -bottom-1 left-0 w-full h-2 bg-blue-200/50 -z-10 rounded-full transform -rotate-1"></span>
                    </h1>
                    <p className="text-charcoal/60 font-dashboard-display text-sm mt-1">
                        Manage your organization's employees
                    </p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <button className="font-hand text-lg font-bold bg-dashboard-primary text-white px-6 py-3 wiggly-border-sm sketch-shadow hover:-translate-y-1 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">person_add</span>
                            Add Employee
                        </button>
                    </DialogTrigger>
                    <DialogContent className="wiggly-border bg-background-light">
                        <DialogHeader>
                            <DialogTitle className="font-hand text-2xl font-bold text-charcoal">
                                Add New Employee
                            </DialogTitle>
                            <DialogDescription className="text-charcoal/60">
                                Add a new team member to your organization.
                            </DialogDescription>
                        </DialogHeader>
                        <EmployeeForm onSubmit={handleCreate} isSubmitting={createEmployee.isPending} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-charcoal/20">
                            <span className="material-symbols-outlined text-dashboard-primary text-xl">groups</span>
                        </div>
                        <div>
                            <p className="font-hand text-lg font-bold text-charcoal">{employees?.length || 0}</p>
                            <p className="text-charcoal/60 text-sm">Total Employees</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center border-2 border-charcoal/20">
                            <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                        </div>
                        <div>
                            <p className="font-hand text-lg font-bold text-charcoal">
                                {employees?.filter((e) => e.isActive).length || 0}
                            </p>
                            <p className="text-charcoal/60 text-sm">Active</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg wiggly-border sketch-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center border-2 border-charcoal/20">
                            <span className="material-symbols-outlined text-purple-600 text-xl">admin_panel_settings</span>
                        </div>
                        <div>
                            <p className="font-hand text-lg font-bold text-charcoal">
                                {employees?.filter((e) => e.role === 'manager' || e.role === 'admin').length || 0}
                            </p>
                            <p className="text-charcoal/60 text-sm">Managers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Employee Table */}
            <EmployeeTable data={employees || []} />
        </div>
    )
}

interface EmployeeTableProps {
    data: Employee[]
}

function EmployeeTable({ data }: EmployeeTableProps) {
    const getRandomColor = (index: number) => {
        const colors = ['blue', 'purple', 'green', 'orange', 'pink', 'teal']
        return colors[index % colors.length]
    }

    const getColorClasses = (color: string) => {
        const map: Record<string, string> = {
            blue: 'bg-blue-100 text-dashboard-primary',
            purple: 'bg-purple-100 text-purple-600',
            green: 'bg-green-100 text-green-600',
            orange: 'bg-orange-100 text-orange-600',
            pink: 'bg-pink-100 text-pink-600',
            teal: 'bg-teal-100 text-teal-600',
        }
        return map[color] || map.blue
    }

    const getRoleClasses = (role: string) => {
        const map: Record<string, string> = {
            owner: 'bg-purple-200 text-purple-900 border-purple-300',
            admin: 'bg-red-200 text-red-900 border-red-300',
            manager: 'bg-blue-200 text-blue-900 border-blue-300',
            employee: 'bg-green-200 text-green-900 border-green-300',
        }
        return map[role] || map.employee
    }

    return (
        <div className="bg-white rounded-lg wiggly-border sketch-shadow overflow-hidden">
            <div className="p-6 border-b-2 border-charcoal/10 border-dashed flex justify-between items-center bg-background-light/50">
                <h3 className="font-hand text-xl font-bold text-charcoal">Employee Directory</h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-charcoal/60">download</span>
                    </button>
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-charcoal/60">print</span>
                    </button>
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-charcoal/60">filter_list</span>
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-background-light">
                        <tr className="text-charcoal/60 font-hand text-lg border-b-2 border-charcoal">
                            <th className="px-6 py-4 font-bold">Employee</th>
                            <th className="px-6 py-4 font-bold">Email</th>
                            <th className="px-6 py-4 font-bold">Position</th>
                            <th className="px-6 py-4 font-bold">Role</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-dashed divide-charcoal/10 font-dashboard-display text-sm">
                        {data.length > 0 ? (
                            data.map((employee, index) => (
                                <tr key={employee.id} className="group hover:bg-yellow-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full ${getColorClasses(getRandomColor(index))} flex items-center justify-center border border-charcoal/20`}
                                            >
                                                <span className="material-symbols-outlined text-lg">person</span>
                                            </div>
                                            <span className="font-bold text-charcoal">{employee.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-charcoal/80">{employee.email}</td>
                                    <td className="px-6 py-4 text-charcoal/80">{employee.position || '--'}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-3 py-1 ${getRoleClasses(employee.role)} rounded-md font-bold font-hand transform ${index % 2 === 0 ? '-rotate-2' : 'rotate-1'} border shadow-sm text-xs capitalize`}
                                        >
                                            {employee.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${employee.isActive ? 'bg-green-500' : 'bg-gray-400'}`}
                                            ></div>
                                            <span className={employee.isActive ? 'text-green-600' : 'text-gray-500'}>
                                                {employee.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-charcoal/40 hover:text-dashboard-primary transition-colors hover:bg-dashboard-primary/5 rounded-full">
                                                <span className="material-symbols-outlined text-xl">edit</span>
                                            </button>
                                            <button className="p-2 text-charcoal/40 hover:text-dashboard-primary transition-colors hover:bg-dashboard-primary/5 rounded-full">
                                                <span className="material-symbols-outlined text-xl">qr_code_2</span>
                                            </button>
                                            <button className="p-2 text-charcoal/40 hover:text-red-500 transition-colors hover:bg-red-50 rounded-full">
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center">
                                    <div className="space-y-4">
                                        <span className="material-symbols-outlined text-6xl text-charcoal/30">
                                            person_off
                                        </span>
                                        <p className="font-hand text-xl text-charcoal/50">No employees yet</p>
                                        <p className="text-charcoal/40 text-sm">Add your first team member to get started</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            {data.length > 0 && (
                <div className="p-4 bg-background-light/50 border-t-2 border-charcoal/10 border-dashed flex items-center justify-between">
                    <p className="text-charcoal/60 text-sm font-dashboard-display">
                        Showing <span className="font-bold text-charcoal">{data.length}</span> employees
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border-2 border-charcoal/20 rounded-lg font-hand text-sm hover:bg-charcoal hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Previous
                        </button>
                        <button className="px-3 py-1 border-2 border-charcoal/20 rounded-lg font-hand text-sm hover:bg-charcoal hover:text-white transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
