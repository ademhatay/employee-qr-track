import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Icons } from '@/lib/icons'
import { EmployeeTable } from './components/EmployeeTable'
import { EmployeeForm } from './components/EmployeeForm'
import { useEmployees, useCreateEmployee } from './api/queries'
import { toast } from 'sonner' // Assuming sonner is installed as per package.json

export function EmployeeManagement() {
    const [isOpen, setIsOpen] = useState(false)
    const { data: employees, isLoading } = useEmployees({ type: 'list' }) // adjust mock filter
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
        return <div className="p-8 text-center">Loading employees...</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Icons.add className="mr-2 h-4 w-4" />
                            Add Employee
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Employee</DialogTitle>
                            <DialogDescription>
                                Add a new employee to your organization.
                            </DialogDescription>
                        </DialogHeader>
                        <EmployeeForm
                            onSubmit={handleCreate}
                            isSubmitting={createEmployee.isPending}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            <EmployeeTable data={employees || []} />
        </div>
    )
}
