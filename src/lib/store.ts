import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Attendance, Company, Employee, User } from '@/types'

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
}

interface DataState {
    employees: Array<Employee>
    attendances: Array<Attendance>
    kioskAccounts: Array<KioskAccount>
    invitations: Array<Invitation>
    addEmployee: (employee: Employee) => void
    updateEmployee: (id: string, data: Partial<Employee>) => void
    removeEmployee: (id: string) => void
    addAttendance: (attendance: Attendance) => void
    addKioskAccount: (kiosk: KioskAccount) => void
    addInvitation: (invitation: Invitation) => void
    acceptInvitation: (token: string, user: AuthUser) => boolean
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
            name: 'Ahmet Yılmaz',
            email: 'ahmet@demo.com',
            role: 'employee',
            position: 'Yazılım Geliştirici',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-01-15').toISOString(),
        },
        {
            id: 'emp-002',
            name: 'Ayşe Demir',
            email: 'ayse@demo.com',
            role: 'employee',
            position: 'Tasarım Direktörü',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-02-20').toISOString(),
        },
        {
            id: 'emp-003',
            name: 'Mehmet Kaya',
            email: 'mehmet@demo.com',
            role: 'manager',
            position: 'Proje Yöneticisi',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-03-10').toISOString(),
        },
        {
            id: 'emp-004',
            name: 'Zeynep Arslan',
            email: 'zeynep@demo.com',
            role: 'employee',
            position: 'İnsan Kaynakları',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-04-05').toISOString(),
        },
        {
            id: 'emp-005',
            name: 'Can Öztürk',
            email: 'can@demo.com',
            role: 'employee',
            position: 'Satış Temsilcisi',
            companyId: demoCompanyId,
            isActive: true,
            createdAt: new Date('2024-05-18').toISOString(),
        },
    ]

    const now = new Date()
    // Use last month for demo data
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const demoMonth = lastMonthDate.getMonth()
    const demoYear = lastMonthDate.getFullYear()
    const demoAttendances: Array<Attendance> = []

    // Create a pool of days to work on (spread across month, exclude weekends)
    const daysInMonth = new Date(demoYear, demoMonth + 1, 0).getDate()
    const workDays: Array<number> = []
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(demoYear, demoMonth, day)
        const dayOfWeek = date.getDay()
        // Exclude weekends (Saturday=6, Sunday=0)
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workDays.push(day)
        }
    }

    demoEmployees.forEach((employee) => {
        // Each employee works 70-80% of work days
        const workPercentage = 0.7 + Math.random() * 0.1 // 70-80%
        const daysWorked = Math.floor(workDays.length * workPercentage)

        // Shuffle work days and select random subset
        const shuffledDays = [...workDays].sort(() => Math.random() - 0.5)
        const employeeWorkDays = shuffledDays.slice(0, daysWorked)

        employeeWorkDays.forEach((day) => {
            const checkInHour = 8 + Math.floor(Math.random() * 2) // 8-9 AM
            const checkOutHour = 17 + Math.floor(Math.random() * 2) // 5-6 PM
            const checkInMinute = Math.floor(Math.random() * 60)
            const checkOutMinute = Math.floor(Math.random() * 60)

            const checkInDate = new Date(demoYear, demoMonth, day, checkInHour, checkInMinute)
            const checkOutDate = new Date(demoYear, demoMonth, day, checkOutHour, checkOutMinute)

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
    })

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

            // Try to get persisted data
            if (typeof window !== 'undefined') {
                try {
                    const stored = localStorage.getItem('qr-track-data')
                    if (stored) {
                        const parsed = JSON.parse(stored)
                        if (parsed.state) {
                            employees = parsed.state.employees || []
                            attendances = parsed.state.attendances || []
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
