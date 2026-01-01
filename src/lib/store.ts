import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Attendance, Company, Employee, User, Shift } from '@/types'

// Extended types for auth
export interface AuthUser extends User {
    password?: string // Only for mock auth
}

export interface KioskAccount {
    id: string
    name: string
    kioskId: string
    companyId: string
    pin: string
    createdAt: string
}

export interface Invitation {
    id: string
    token: string
    email: string
    companyId: string
    role: 'admin' | 'manager' | 'employee'
    expiresAt: string
    acceptedAt?: string
}

interface AuthState {
    user: AuthUser | null
    company: Company | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<boolean>
    register: (name: string, email: string, password: string) => Promise<boolean>
    logout: () => void
    setCompany: (company: Company) => void
    updateProfile: (data: Partial<AuthUser>) => void
}

interface DataState {
    employees: Array<Employee>
    attendances: Array<Attendance>
    kioskAccounts: Array<KioskAccount>
    invitations: Array<Invitation>
    shifts: Array<Shift>
    scheduledEmployees: Array<{ id: string, colorIndex: number }>
    addEmployee: (employee: Employee) => void
    updateEmployee: (id: string, data: Partial<Employee>) => void
    removeEmployee: (id: string) => void
    addAttendance: (attendance: Attendance) => void
    addKioskAccount: (kiosk: KioskAccount) => void
    addInvitation: (invitation: Invitation) => void
    acceptInvitation: (token: string, user: AuthUser) => boolean
    setShifts: (shifts: Array<Shift>) => void
    setScheduledEmployees: (employees: Array<{ id: string, colorIndex: number }>) => void
}

// Auth Store
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            company: null,
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                // Check demo accounts first
                const demoAccounts = [
                    {
                        email: 'admin@demo.com',
                        password: 'demo123',
                        id: 'demo-admin',
                        name: 'Admin User',
                        role: 'owner' as const,
                        companyId: 'demo-company',
                        createdAt: new Date().toISOString(),
                    },
                    {
                        email: 'user@demo.com',
                        password: 'demo123',
                        id: 'demo-user',
                        name: 'Demo User',
                        role: 'manager' as const,
                        companyId: 'demo-company',
                        createdAt: new Date().toISOString(),
                    },
                ]

                const demoUser = demoAccounts.find((u) => u.email === email && u.password === password)
                if (demoUser) {
                    const demoCompany: Company = {
                        id: 'demo-company',
                        name: 'Demo Company',
                        plan: 'pro',
                        kioskCode: 'DEMO-KIOSK',
                        ownerId: 'demo-admin',
                        createdAt: new Date().toISOString(),
                    }
                    set({ user: demoUser, company: demoCompany, isAuthenticated: true })
                    return true
                }

                // Check localStorage for registered users
                const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as Array<AuthUser>
                const user = users.find((u) => u.email === email && u.password === password)

                if (user) {
                    const companies = JSON.parse(localStorage.getItem('qr-track-companies') || '[]') as Array<Company>
                    const company = companies.find((c) => c.id === user.companyId) || null

                    set({ user, company, isAuthenticated: true })
                    return true
                }
                return false
            },

            register: async (name: string, email: string, password: string) => {
                const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as Array<AuthUser>

                if (users.some((u) => u.email === email)) {
                    return false // Email already exists
                }

                const newUser: AuthUser = {
                    id: crypto.randomUUID(),
                    name,
                    email,
                    password,
                    role: 'owner',
                    companyId: '', // Will be set after onboarding
                    createdAt: new Date().toISOString(),
                }

                users.push(newUser)
                localStorage.setItem('qr-track-users', JSON.stringify(users))
                set({ user: newUser, isAuthenticated: true })
                return true
            },

            logout: () => {
                set({ user: null, company: null, isAuthenticated: false })
            },

            setCompany: (company: Company) => {
                const { user } = get()
                if (user) {
                    // Update user's companyId
                    const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as Array<AuthUser>
                    const idx = users.findIndex((u) => u.id === user.id)
                    if (idx !== -1) {
                        users[idx].companyId = company.id
                        localStorage.setItem('qr-track-users', JSON.stringify(users))
                    }

                    // Save company
                    const companies = JSON.parse(localStorage.getItem('qr-track-companies') || '[]') as Array<Company>
                    companies.push(company)
                    localStorage.setItem('qr-track-companies', JSON.stringify(companies))

                    set({ company, user: { ...user, companyId: company.id } })
                }
            },

            updateProfile: (data: Partial<AuthUser>) => {
                const { user } = get()
                if (user) {
                    const updatedUser = { ...user, ...data }

                    // Update in localStorage
                    const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as Array<AuthUser>
                    const idx = users.findIndex((u) => u.id === user.id)
                    if (idx !== -1) {
                        users[idx] = { ...users[idx], ...data }
                        localStorage.setItem('qr-track-users', JSON.stringify(users))
                    }

                    // Update in data store as well if it exists there
                    // This is handled by EmployeeProfile calling updateEmployee separately to keep them in sync

                    set({ user: updatedUser })
                }
            },
        }),
        {
            name: 'qr-track-auth',
        }
    )
)

// Helper function to generate demo data
const generateDemoData = () => {
    const demoCompanyId = 'demo-company'
    const demoEmployees: Array<Employee> = [
        {
            id: 'emp-001',
            name: 'Sarah Jenkins',
            email: 'sarah@demo.com',
            role: 'employee',
            position: 'Marketing Manager',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            id: 'emp-002',
            name: 'Mike Ross',
            email: 'mike@demo.com',
            role: 'employee',
            position: 'Legal Counsel',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-02-20').toISOString(),
        },
        {
            id: 'emp-003',
            name: 'Harvey Specter',
            email: 'harvey@demo.com',
            role: 'manager',
            position: 'Senior Partner',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-03-10').toISOString(),
        },
        {
            id: 'emp-004',
            name: 'Donna Paulsen',
            email: 'donna@demo.com',
            role: 'employee',
            position: 'COO',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-04-05').toISOString(),
        },
        {
            id: 'emp-005',
            name: 'Rachel Zane',
            email: 'rachel@demo.com',
            role: 'employee',
            position: 'Senior Associate',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-05-18').toISOString(),
        },
        {
            id: 'emp-006',
            name: 'Louis Litt',
            email: 'louis@demo.com',
            role: 'manager',
            position: 'Managing Partner',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-06-12').toISOString(),
        },
        {
            id: 'emp-007',
            name: 'Jessica Pearson',
            email: 'jessica@demo.com',
            role: 'admin',
            position: 'Founding Partner',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2023-11-01').toISOString(),
        },
    ]

    const demoAttendances: Array<Attendance> = []
    const now = new Date()

    // Generate data for the last 35 days to ensure full month coverage
    for (let i = 35; i >= 0; i--) {
        const currentDate = new Date(now)
        currentDate.setDate(now.getDate() - i)

        const dayOfWeek = currentDate.getDay()
        // Skip weekends for most employees, but maybe keep some "extra" data
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

        demoEmployees.forEach((employee) => {
            // Chance of working: 90% on weekdays, 10% on weekends
            const workChance = isWeekend ? 0.1 : 0.9
            if (Math.random() > workChance) return

            // Randomize times slightly
            const checkInHour = 8 + Math.floor(Math.random() * 2) // 8-9 AM
            const checkOutHour = 17 + Math.floor(Math.random() * 2) // 5-6 PM
            const checkInMinute = Math.floor(Math.random() * 60)
            const checkOutMinute = Math.floor(Math.random() * 60)

            const checkInDate = new Date(currentDate)
            checkInDate.setHours(checkInHour, checkInMinute, 0)

            const checkOutDate = new Date(currentDate)
            checkOutDate.setHours(checkOutHour, checkOutMinute, 0)

            demoAttendances.push({
                id: crypto.randomUUID(),
                employeeId: employee.id,
                companyId: demoCompanyId,
                type: 'check-in',
                timestamp: checkInDate.toISOString(),
                device: 'kiosk',
            })

            demoAttendances.push({
                id: crypto.randomUUID(),
                employeeId: employee.id,
                companyId: demoCompanyId,
                type: 'check-out',
                timestamp: checkOutDate.toISOString(),
                device: 'kiosk',
            })
        })
    }

    // Sort by timestamp
    demoAttendances.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    return { demoEmployees, demoAttendances }
}

// Data Store
export const useDataStore = create<DataState>()(
    persist(
        (set, get) => {
            // Get initial state from persisted storage or use demo data
            let employees: Array<Employee> = []
            let attendances: Array<Attendance> = []
            let shifts: Array<Shift> = []
            let scheduledEmployees: Array<{ id: string, colorIndex: number }> = []

            // Try to get persisted data
            if (typeof window !== 'undefined') {
                try {
                    const stored = localStorage.getItem('qr-track-data')
                    if (stored) {
                        const parsed = JSON.parse(stored)
                        if (parsed.state) {
                            employees = parsed.state.employees || []
                            attendances = parsed.state.attendances || []
                            shifts = parsed.state.shifts || []
                            scheduledEmployees = parsed.state.scheduledEmployees || []
                        }
                    }
                } catch (e) {
                    // If parsing fails, use demo data
                }
            }

            // Always ensure demo company has data
            const demoCompanyId = 'demo-company'
            const hasDemoEmployees = employees.some((e) => e.companyId === demoCompanyId)
            const hasDemoAttendances = attendances.some((a) => a.companyId === demoCompanyId)

            if (!hasDemoEmployees || !hasDemoAttendances) {
                const { demoEmployees, demoAttendances } = generateDemoData()

                // Add demo employees if they don't exist
                if (!hasDemoEmployees) {
                    employees = [...employees, ...demoEmployees]
                }

                // Add demo attendances if they don't exist
                if (!hasDemoAttendances) {
                    attendances = [...attendances, ...demoAttendances]
                }
            }

            return {
                employees,
                attendances,
                shifts,
                scheduledEmployees,
                kioskAccounts: [],
                invitations: [],
                addEmployee: (employee) => {
                    set((state) => ({ employees: [...state.employees, employee] }))
                },

                updateEmployee: (id, data) => {
                    set((state) => ({
                        employees: state.employees.map((e) =>
                            e.id === id ? { ...e, ...data } : e
                        ),
                    }))
                },

                removeEmployee: (id) => {
                    set((state) => ({
                        employees: state.employees.filter((e) => e.id !== id),
                    }))
                },

                addAttendance: (attendance) => {
                    set((state) => ({ attendances: [...state.attendances, attendance] }))
                },

                addKioskAccount: (kiosk) => {
                    set((state) => ({ kioskAccounts: [...state.kioskAccounts, kiosk] }))
                },

                addInvitation: (invitation) => {
                    set((state) => ({ invitations: [...state.invitations, invitation] }))
                },

                acceptInvitation: (token, user) => {
                    const { invitations } = get()
                    const invitation = invitations.find((i) => i.token === token && !i.acceptedAt)

                    if (!invitation || new Date(invitation.expiresAt) < new Date()) {
                        return false
                    }

                    // Create employee from invitation
                    const newEmployee: Employee = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: invitation.role,
                        companyId: invitation.companyId,
                        isActive: true,
                        createdAt: new Date().toISOString(),
                    }

                    set((state) => ({
                        employees: [...state.employees, newEmployee],
                        invitations: state.invitations.map((i) =>
                            i.token === token ? { ...i, acceptedAt: new Date().toISOString() } : i
                        ),
                    }))

                    return true
                },

                setShifts: (shifts) => {
                    set({ shifts })
                },

                setScheduledEmployees: (scheduledEmployees) => {
                    set({ scheduledEmployees })
                },
            }
        },
        {
            name: 'qr-track-data',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    const demoCompanyId = 'demo-company'
                    const hasDemoEmployees = state.employees.some((e) => e.companyId === demoCompanyId)
                    const hasDemoAttendances = state.attendances.some((a) => a.companyId === demoCompanyId)

                    if (!hasDemoEmployees || !hasDemoAttendances) {
                        const { demoEmployees, demoAttendances } = generateDemoData()

                        // Add demo data if missing
                        const updatedEmployees = hasDemoEmployees
                            ? state.employees
                            : [...state.employees, ...demoEmployees]

                        const updatedAttendances = hasDemoAttendances
                            ? state.attendances
                            : [...state.attendances, ...demoAttendances]

                        // Update state with demo data
                        state.employees = updatedEmployees
                        state.attendances = updatedAttendances
                    }
                }
            },
        }
    )
)

// Kiosk Store (for kiosk mode)
interface KioskState {
    currentKiosk: KioskAccount | null
    qrCode: string
    loginKiosk: (pin: string, kioskId: string) => boolean
    logoutKiosk: () => void
    generateQRCode: () => string
}

export const useKioskStore = create<KioskState>()(
    persist(
        (set, get) => ({
            currentKiosk: null,
            qrCode: '',

            loginKiosk: (pin: string, kioskId: string) => {
                // Check demo kiosk credentials first
                const demoKiosk: KioskAccount = {
                    id: 'kiosk-001',
                    name: 'Demo Kiosk',
                    kioskId: 'KIOSK-001',
                    companyId: 'demo-company',
                    pin: '1234',
                    createdAt: new Date().toISOString(),
                }

                if (pin === demoKiosk.pin && kioskId === 'KIOSK-001') {
                    const qrCode = get().generateQRCode()
                    set({ currentKiosk: demoKiosk, qrCode })
                    return true
                }

                // Check localStorage for registered kiosk accounts
                const kioskAccounts = JSON.parse(localStorage.getItem('qr-track-data') || '{}')?.state?.kioskAccounts || []
                const kiosk = kioskAccounts.find(
                    (k: KioskAccount) => k.pin === pin && k.kioskId === kioskId
                )

                if (kiosk) {
                    const qrCode = get().generateQRCode()
                    set({ currentKiosk: kiosk, qrCode })
                    return true
                }
                return false
            },

            logoutKiosk: () => {
                set({ currentKiosk: null, qrCode: '' })
            },

            generateQRCode: () => {
                // Generate a unique QR code that rotates
                const timestamp = Date.now()
                const code = `QRT-${timestamp}-${crypto.randomUUID().slice(0, 8)}`
                set({ qrCode: code })
                return code
            },
        }),
        {
            name: 'qr-track-kiosk',
        }
    )
)
