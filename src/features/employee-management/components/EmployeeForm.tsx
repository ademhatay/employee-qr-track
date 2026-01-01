import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const employeeSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    role: z.enum(['admin', 'manager', 'employee', 'kiosk']),
    position: z.string().optional(),
})

type EmployeeFormValues = z.infer<typeof employeeSchema>

interface EmployeeFormProps {
    onSubmit: (data: EmployeeFormValues) => void
    isSubmitting?: boolean
}

export function EmployeeForm({ onSubmit, isSubmitting }: EmployeeFormProps) {
    const form = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            name: '',
            email: '',
            role: 'employee',
            position: '',
        },
    })

    const handleSubmit = form.handleSubmit(onSubmit)

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
                <label className="font-hand text-lg font-bold text-charcoal flex items-center gap-2">
                    <span className="material-symbols-outlined text-dashboard-primary text-xl">person</span>
                    Name
                </label>
                <input
                    {...form.register('name')}
                    className="w-full py-3 px-4 bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dashboard-primary/20 wiggly-border-sm transition-shadow shadow-sm"
                    placeholder="John Doe"
                    type="text"
                />
                {form.formState.errors.name && (
                    <p className="text-red-500 text-sm font-display">{form.formState.errors.name.message}</p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <label className="font-hand text-lg font-bold text-charcoal flex items-center gap-2">
                    <span className="material-symbols-outlined text-dashboard-primary text-xl">email</span>
                    Email
                </label>
                <input
                    {...form.register('email')}
                    className="w-full py-3 px-4 bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dashboard-primary/20 wiggly-border-sm transition-shadow shadow-sm"
                    placeholder="john@example.com"
                    type="email"
                />
                {form.formState.errors.email && (
                    <p className="text-red-500 text-sm font-display">{form.formState.errors.email.message}</p>
                )}
            </div>

            {/* Role Field */}
            <div className="space-y-2">
                <label className="font-hand text-lg font-bold text-charcoal flex items-center gap-2">
                    <span className="material-symbols-outlined text-dashboard-primary text-xl">badge</span>
                    Role
                </label>
                <select
                    {...form.register('role')}
                    className="w-full py-3 px-4 bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-dashboard-primary/20 wiggly-border-sm transition-shadow shadow-sm appearance-none cursor-pointer"
                >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="kiosk">Kiosk</option>
                </select>
                {form.formState.errors.role && (
                    <p className="text-red-500 text-sm font-display">{form.formState.errors.role.message}</p>
                )}
            </div>

            {/* Position Field */}
            <div className="space-y-2">
                <label className="font-hand text-lg font-bold text-charcoal flex items-center gap-2">
                    <span className="material-symbols-outlined text-dashboard-primary text-xl">work</span>
                    Position
                </label>
                <input
                    {...form.register('position')}
                    className="w-full py-3 px-4 bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dashboard-primary/20 wiggly-border-sm transition-shadow shadow-sm"
                    placeholder="Software Engineer"
                    type="text"
                />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-hand text-lg font-bold bg-dashboard-primary text-white py-3 px-6 wiggly-border-sm sketch-shadow hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <span className="material-symbols-outlined animate-spin">hourglass_empty</span>
                            Saving...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined">person_add</span>
                            Create Employee
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}
