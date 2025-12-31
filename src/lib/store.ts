import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Company, Employee, Attendance } from '@/types'

// Extended types for auth
export interface AuthUser extends User {
    password?: string // Only for mock auth
}

export interface KioskAccount {
    id: string
    name: string
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
    employees: Employee[]
    attendances: Attendance[]
    kioskAccounts: KioskAccount[]
    invitations: Invitation[]
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
                const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as AuthUser[]
                const user = users.find((u) => u.email === email && u.password === password)

                if (user) {
                    const companies = JSON.parse(localStorage.getItem('qr-track-companies') || '[]') as Company[]
                    const company = companies.find((c) => c.id === user.companyId) || null

                    set({ user, company, isAuthenticated: true })
                    return true
                }
                return false
            },

            register: async (name: string, email: string, password: string) => {
                const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as AuthUser[]

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
                    const users = JSON.parse(localStorage.getItem('qr-track-users') || '[]') as AuthUser[]
                    const idx = users.findIndex((u) => u.id === user.id)
                    if (idx !== -1) {
                        users[idx].companyId = company.id
                        localStorage.setItem('qr-track-users', JSON.stringify(users))
                    }

                    // Save company
                    const companies = JSON.parse(localStorage.getItem('qr-track-companies') || '[]') as Company[]
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

// Data Store
export const useDataStore = create<DataState>()(
    persist(
        (set, get) => ({
            employees: [],
            attendances: [],
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
        }),
        {
            name: 'qr-track-data',
        }
    )
)

// Kiosk Store (for kiosk mode)
interface KioskState {
    currentKiosk: KioskAccount | null
    qrCode: string
    loginKiosk: (pin: string, companyId: string) => boolean
    logoutKiosk: () => void
    generateQRCode: () => string
}

export const useKioskStore = create<KioskState>()(
    persist(
        (set, get) => ({
            currentKiosk: null,
            qrCode: '',

            loginKiosk: (pin: string, companyId: string) => {
                const kioskAccounts = JSON.parse(localStorage.getItem('qr-track-data') || '{}')?.state?.kioskAccounts || []
                const kiosk = kioskAccounts.find(
                    (k: KioskAccount) => k.pin === pin && k.companyId === companyId
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
