import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { useDataStore, useAuthStore } from '@/lib/store'
import { format, addDays, startOfWeek, isSameDay, parseISO, setHours, setMinutes, differenceInMinutes, addMinutes } from 'date-fns'
import type { Employee, Shift } from '@/types'

// Shift color variants
const shiftColors = [
    { bg: 'bg-blue-200/80', border: 'border-blue-400', text: 'text-blue-900' },
    { bg: 'bg-green-200/80', border: 'border-green-400', text: 'text-green-900' },
    { bg: 'bg-purple-200/80', border: 'border-purple-400', text: 'text-purple-900' },
    { bg: 'bg-yellow-200/80', border: 'border-yellow-400', text: 'text-yellow-900' },
    { bg: 'bg-pink-200/80', border: 'border-pink-400', text: 'text-pink-900' },
    { bg: 'bg-orange-200/80', border: 'border-orange-400', text: 'text-orange-900' },
]

// Timeline config
const TIMELINE_START_HOUR = 0 // 12 AM (midnight)
const TIMELINE_END_HOUR = 24 // 12 AM (next day midnight)
const HOURS_IN_TIMELINE = TIMELINE_END_HOUR - TIMELINE_START_HOUR // 24 hours
const PIXELS_PER_HOUR = 60 // Width of each hour column (slightly smaller for 24h)
const ROW_HEIGHT = 60 // Height of each employee row
const SNAP_MINUTES = 15 // Snap to 15-minute intervals

interface EditorShift extends Omit<Shift, 'id'> {
    id: string
    label?: string
    colorIndex: number
}

interface DragState {
    type: 'move' | 'resize-left' | 'resize-right' | 'create' | null
    shiftId: string | null
    startX: number
    startY: number
    originalShift: EditorShift | null
    employeeId: string | null
    dayIndex: number | null
    initialMinutes: number
}

interface EmployeeInEditor {
    employee: Employee
    colorIndex: number
}

export function ShiftEditor() {
    const user = useAuthStore((state) => state.user)
    const company = useAuthStore((state) => state.company)
    void company
    const employees = useDataStore((state) => state.employees)
    const logout = useAuthStore((state) => state.logout)

    // State
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
    const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly')
    const [currentTime, setCurrentTime] = useState(new Date())
    const [selectedShiftId, setSelectedShiftId] = useState<string | null>(null)
    const [shifts, setShifts] = useState<EditorShift[]>([])
    const [employeesInEditor, setEmployeesInEditor] = useState<EmployeeInEditor[]>([])
    const [isSaved, setIsSaved] = useState(true)
    const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)

    const persistedShifts = useDataStore((state) => state.shifts)
    const setPersistedShifts = useDataStore((state) => state.setShifts)
    const scheduledEmployeesRaw = useDataStore((state) => state.scheduledEmployees)
    const setScheduledEmployeesRaw = useDataStore((state) => state.setScheduledEmployees)

    // Sync from persisted store on mount ONLY
    const isInitialMount = useRef(true)
    useEffect(() => {
        if (isInitialMount.current) {
            if (persistedShifts.length > 0) {
                setShifts(persistedShifts as EditorShift[])
            }
            if (scheduledEmployeesRaw.length > 0) {
                const mapped = scheduledEmployeesRaw.map(raw => ({
                    employee: employees.find(e => e.id === raw.id)!,
                    colorIndex: raw.colorIndex
                })).filter(e => e.employee)
                setEmployeesInEditor(mapped)
            }
            isInitialMount.current = false
        }
    }, [persistedShifts, scheduledEmployeesRaw, employees])

    // Helper to sync to store (also saves to localStorage)
    const syncToStore = useCallback((currentShifts: EditorShift[], currentEmployees: EmployeeInEditor[]) => {
        setPersistedShifts(currentShifts as Shift[])
        setScheduledEmployeesRaw(currentEmployees.map(e => ({ id: e.employee.id, colorIndex: e.colorIndex })))
        setIsSaved(false) // Mark as unsaved when changes happen
    }, [setPersistedShifts, setScheduledEmployeesRaw])

    // Save to localStorage explicitly
    const handleSaveSchedule = useCallback(() => {
        try {
            const dataToSave = {
                shifts: shifts,
                scheduledEmployees: employeesInEditor.map(e => ({ id: e.employee.id, colorIndex: e.colorIndex })),
                savedAt: new Date().toISOString()
            }
            localStorage.setItem('qr-track-shifts', JSON.stringify(dataToSave))
            setIsSaved(true)
            setLastSavedAt(new Date())
            console.log('Schedule saved successfully!', dataToSave)
        } catch (error) {
            console.error('Failed to save schedule:', error)
        }
    }, [shifts, employeesInEditor])

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('qr-track-shifts')
            if (savedData) {
                const parsed = JSON.parse(savedData)
                if (parsed.shifts && parsed.shifts.length > 0) {
                    setShifts(parsed.shifts as EditorShift[])
                    console.log('Loaded shifts from localStorage:', parsed.shifts.length)
                }
                if (parsed.scheduledEmployees && parsed.scheduledEmployees.length > 0) {
                    const mapped = parsed.scheduledEmployees.map((raw: { id: string, colorIndex: number }) => ({
                        employee: employees.find(e => e.id === raw.id)!,
                        colorIndex: raw.colorIndex
                    })).filter((e: EmployeeInEditor) => e.employee)
                    if (mapped.length > 0) {
                        setEmployeesInEditor(mapped)
                        console.log('Loaded employees from localStorage:', mapped.length)
                    }
                }
                if (parsed.savedAt) {
                    setLastSavedAt(new Date(parsed.savedAt))
                }
                setIsSaved(true)
                isInitialMount.current = false // Skip other init
                return
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error)
        }
    }, [employees])

    const [dragState, setDragState] = useState<DragState>({
        type: null,
        shiftId: null,
        startX: 0,
        startY: 0,
        originalShift: null,
        employeeId: null,
        dayIndex: null,
        initialMinutes: 0,
    })
    const [showShiftModal, setShowShiftModal] = useState(false)
    const [editingShift, setEditingShift] = useState<EditorShift | null>(null)
    const [, setDragOverEmployee] = useState<string | null>(null)
    const [staffDragEmployee, setStaffDragEmployee] = useState<Employee | null>(null)

    const timelineRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Filter employees for current company
    const companyEmployees = useMemo(() =>
        employees.filter(e => e.companyId === user?.companyId),
        [employees, user?.companyId]
    )

    // Available employees (not in editor)
    const availableEmployees = useMemo(() =>
        companyEmployees.filter(emp => !employeesInEditor.some(e => e.employee.id === emp.id)),
        [companyEmployees, employeesInEditor]
    )

    // Current view days
    const viewDays = useMemo(() => {
        if (viewMode === 'daily') {
            return [currentWeekStart]
        }
        return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))
    }, [currentWeekStart, viewMode])

    const todayIdx = useMemo(() => viewDays.findIndex(day => isSameDay(day, new Date())), [viewDays])

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000)
        return () => clearInterval(timer)
    }, [])

    // No demo data - start with empty state
    // Users will add employees and shifts manually

    // Auto-scroll to current time on load
    useEffect(() => {
        if (scrollContainerRef.current && todayIdx !== -1 && employeesInEditor.length > 0) {
            const container = scrollContainerRef.current
            const targetX = (todayIdx * timelineWidth) + timePosition
            const scrollOffset = targetX - (container.clientWidth / 2) + 240 // 240px is sidebar width (12rem) + padding

            // Smooth scroll to position
            container.scrollTo({
                left: Math.max(0, scrollOffset),
                behavior: 'smooth'
            })
        }
    }, [viewMode, employeesInEditor.length > 0]) // Scroll when view changes or employees load

    // Navigation
    const navigate = useCallback((direction: 'prev' | 'next') => {
        const days = viewMode === 'weekly' ? 7 : 1
        setCurrentWeekStart(prev => addDays(prev, direction === 'next' ? days : -days))
    }, [viewMode])

    // Helper: Convert pixel position to time
    const pixelsToTime = useCallback((pixelX: number, referenceDate: Date): Date => {
        const hourOffset = pixelX / PIXELS_PER_HOUR
        const totalMinutes = hourOffset * 60
        const snappedMinutes = Math.round(totalMinutes / SNAP_MINUTES) * SNAP_MINUTES
        const hours = Math.floor(snappedMinutes / 60) + TIMELINE_START_HOUR
        const minutes = snappedMinutes % 60
        return setMinutes(setHours(referenceDate, Math.min(Math.max(hours, TIMELINE_START_HOUR), TIMELINE_END_HOUR)), minutes)
    }, [])

    // Helper: Convert time to pixel position
    const timeToPixels = useCallback((date: Date): number => {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const totalMinutes = (hours - TIMELINE_START_HOUR) * 60 + minutes
        return (totalMinutes / 60) * PIXELS_PER_HOUR
    }, [])

    // Get shifts for specific employee and day
    const getShiftsForEmployeeAndDay = useCallback((employeeId: string, day: Date) => {
        return shifts.filter(shift =>
            shift.employeeId === employeeId &&
            isSameDay(parseISO(shift.startTime), day)
        )
    }, [shifts])

    // Create new shift
    const _createShift = useCallback((employeeId: string, startTime: Date, endTime: Date) => {
        const employee = employeesInEditor.find(e => e.employee.id === employeeId)
        const newShift: EditorShift = {
            id: `shift-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            employeeId,
            companyId: user?.companyId || '',
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            isPublished: false,
            colorIndex: employee?.colorIndex || 0,
        }
        setShifts(prev => {
            const next = [...prev, newShift]
            syncToStore(next, employeesInEditor)
            return next
        })
        setSelectedShiftId(newShift.id)
        return newShift
    }, [user?.companyId, employeesInEditor, syncToStore])

    // Update shift
    const updateShift = useCallback((shiftId: string, updates: Partial<EditorShift>) => {
        setShifts(prev => prev.map(shift =>
            shift.id === shiftId ? { ...shift, ...updates } : shift
        ))
    }, [])

    // Delete shift
    const deleteShift = useCallback((shiftId: string) => {
        setShifts(prev => {
            const next = prev.filter(shift => shift.id !== shiftId)
            syncToStore(next, employeesInEditor)
            return next
        })
        if (selectedShiftId === shiftId) {
            setSelectedShiftId(null)
        }
    }, [selectedShiftId, syncToStore, employeesInEditor])

    // Add employee to editor
    const addEmployeeToEditor = useCallback((employee: Employee) => {
        const existingColorIndices = employeesInEditor.map(e => e.colorIndex)
        let colorIndex = 0
        for (let i = 0; i < shiftColors.length; i++) {
            if (!existingColorIndices.includes(i)) {
                colorIndex = i
                break
            }
        }
        const nextEmployees = [...employeesInEditor, { employee, colorIndex }]
        setEmployeesInEditor(nextEmployees)
        syncToStore(shifts, nextEmployees)
    }, [employeesInEditor, shifts, syncToStore])

    // Remove employee from editor
    const removeEmployeeFromEditor = useCallback((employeeId: string) => {
        const nextEmployees = employeesInEditor.filter(e => e.employee.id !== employeeId)
        const nextShifts = shifts.filter(shift => shift.employeeId !== employeeId)

        setEmployeesInEditor(nextEmployees)
        setShifts(nextShifts)
        syncToStore(nextShifts, nextEmployees)
    }, [employeesInEditor, shifts, syncToStore])

    // Handle mouse down on timeline (create new shift)
    const handleTimelineMouseDown = useCallback((e: React.MouseEvent, employeeId: string, dayIndex: number) => {
        if (e.target !== e.currentTarget) return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const day = viewDays[dayIndex]
        const startTime = pixelsToTime(x, day)
        const initialMinutes = startTime.getHours() * 60 + startTime.getMinutes()

        setDragState({
            type: 'create',
            shiftId: null,
            startX: e.clientX, // Keep absolute start for delta calculation
            startY: e.clientY,
            originalShift: null,
            employeeId,
            dayIndex,
            initialMinutes, // Store initial minutes for start ref
        })

        // Instantly create a placeholder
        const employee = employeesInEditor.find(emp => emp.employee.id === employeeId)
        const newShift: EditorShift = {
            id: `creating-${Date.now()}`,
            employeeId,
            companyId: user?.companyId || '',
            startTime: startTime.toISOString(),
            endTime: addMinutes(startTime, SNAP_MINUTES).toISOString(),
            isPublished: false,
            colorIndex: employee?.colorIndex || 0,
        }
        setShifts(prev => [...prev, newShift])
    }, [viewDays, pixelsToTime, employeesInEditor, user?.companyId, SNAP_MINUTES])

    // Handle mouse down on shift (move or resize)
    const handleShiftMouseDown = useCallback((e: React.MouseEvent, shift: EditorShift, action: 'move' | 'resize-left' | 'resize-right') => {
        e.stopPropagation()
        e.preventDefault()

        setSelectedShiftId(shift.id)

        const startDate = parseISO(shift.startTime)
        const dayIndex = viewDays.findIndex(day => isSameDay(day, startDate))

        setDragState({
            type: action,
            shiftId: shift.id,
            startX: e.clientX,
            startY: e.clientY,
            originalShift: { ...shift },
            employeeId: shift.employeeId,
            dayIndex,
            initialMinutes: 0,
        })
    }, [viewDays])

    // Handle mouse move
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!dragState.type || !timelineRef.current) return

        const deltaX = e.clientX - dragState.startX
        const deltaY = e.clientY - dragState.startY

        if (dragState.type === 'create' && dragState.employeeId && dragState.dayIndex !== null) {
            const day = viewDays[dragState.dayIndex]
            const creatingShift = shifts.find(s => s.id.startsWith('creating-'))
            if (!creatingShift) return

            const rowElement = timelineRef.current?.querySelector(`[data-employee="${dragState.employeeId}"][data-day="${dragState.dayIndex}"]`)
            if (rowElement) {
                const rect = rowElement.getBoundingClientRect()
                const currentRelX = e.clientX - rect.left

                // Calculate current time from mouse position
                const currentTime = pixelsToTime(currentRelX, day)
                const startHour = Math.floor(dragState.initialMinutes / 60)
                const startMins = dragState.initialMinutes % 60
                const originalStartTime = setMinutes(setHours(day, startHour), startMins)

                let newStart = originalStartTime
                let newEnd = currentTime

                // Handle dragging backwards
                if (currentTime < originalStartTime) {
                    newStart = currentTime
                    newEnd = originalStartTime
                }

                // Ensure minimum duration
                if (differenceInMinutes(newEnd, newStart) < SNAP_MINUTES) {
                    newEnd = addMinutes(newStart, SNAP_MINUTES)
                }

                updateShift(creatingShift.id, {
                    startTime: newStart.toISOString(),
                    endTime: newEnd.toISOString()
                })
            }
        } else if (dragState.type === 'move' && dragState.originalShift && dragState.shiftId) {
            // Moving shift
            const originalStart = parseISO(dragState.originalShift.startTime)
            const originalEnd = parseISO(dragState.originalShift.endTime)
            const duration = differenceInMinutes(originalEnd, originalStart)

            // Calculate horizontal movement (time)
            const minutesDelta = Math.round((deltaX / PIXELS_PER_HOUR) * 60 / SNAP_MINUTES) * SNAP_MINUTES

            // Calculate vertical movement (employee change)
            const rowHeight = ROW_HEIGHT + 8 // Include the 8px padding
            const employeeRowDelta = Math.round(deltaY / rowHeight)

            // Find current employee index and calculate new target
            const currentEmployeeIndex = employeesInEditor.findIndex(e => e.employee.id === dragState.originalShift?.employeeId)
            let targetEmployeeIndex = currentEmployeeIndex + employeeRowDelta
            targetEmployeeIndex = Math.max(0, Math.min(targetEmployeeIndex, employeesInEditor.length - 1))
            const targetEmployee = employeesInEditor[targetEmployeeIndex]

            // Keep the same day as original
            const originalDay = parseISO(dragState.originalShift.startTime)

            let newStartHour = originalStart.getHours()
            let newStartMinutes = originalStart.getMinutes() + minutesDelta

            // Normalize minutes to hours
            newStartHour += Math.floor(newStartMinutes / 60)
            newStartMinutes = ((newStartMinutes % 60) + 60) % 60

            // Clamp to timeline bounds
            if (newStartHour < TIMELINE_START_HOUR) {
                newStartHour = TIMELINE_START_HOUR
                newStartMinutes = 0
            }
            if (newStartHour >= TIMELINE_END_HOUR) {
                newStartHour = TIMELINE_END_HOUR - 1
                newStartMinutes = 0
            }

            const newStart = setMinutes(setHours(originalDay, newStartHour), newStartMinutes)
            const newEnd = addMinutes(newStart, duration)

            updateShift(dragState.shiftId, {
                startTime: newStart.toISOString(),
                endTime: newEnd.toISOString(),
                employeeId: targetEmployee?.employee.id || dragState.originalShift.employeeId,
                colorIndex: targetEmployee?.colorIndex ?? dragState.originalShift.colorIndex,
            })
        } else if ((dragState.type === 'resize-left' || dragState.type === 'resize-right') && dragState.originalShift && dragState.shiftId) {
            // Resizing shift
            const originalStart = parseISO(dragState.originalShift.startTime)
            const originalEnd = parseISO(dragState.originalShift.endTime)
            const minutesDelta = Math.round((deltaX / PIXELS_PER_HOUR) * 60 / SNAP_MINUTES) * SNAP_MINUTES

            if (dragState.type === 'resize-left') {
                // Resize from left
                let newStartMinutes = originalStart.getMinutes() + minutesDelta
                let newStartHour = originalStart.getHours() + Math.floor(newStartMinutes / 60)
                newStartMinutes = ((newStartMinutes % 60) + 60) % 60

                // Clamp
                if (newStartHour < TIMELINE_START_HOUR) {
                    newStartHour = TIMELINE_START_HOUR
                    newStartMinutes = 0
                }

                const newStart = setMinutes(setHours(originalStart, newStartHour), newStartMinutes)

                // Ensure minimum duration
                if (differenceInMinutes(originalEnd, newStart) >= SNAP_MINUTES) {
                    updateShift(dragState.shiftId, { startTime: newStart.toISOString() })
                }
            } else {
                // Resize from right
                let newEndMinutes = originalEnd.getMinutes() + minutesDelta
                let newEndHour = originalEnd.getHours() + Math.floor(newEndMinutes / 60)
                newEndMinutes = ((newEndMinutes % 60) + 60) % 60

                // Clamp
                if (newEndHour > TIMELINE_END_HOUR) {
                    newEndHour = TIMELINE_END_HOUR
                    newEndMinutes = 0
                }

                const day = parseISO(dragState.originalShift.startTime)
                const newEnd = setMinutes(setHours(day, newEndHour), newEndMinutes)

                // Ensure minimum duration
                if (differenceInMinutes(newEnd, originalStart) >= SNAP_MINUTES) {
                    updateShift(dragState.shiftId, { endTime: newEnd.toISOString() })
                }
            }
        }
    }, [dragState, viewDays, pixelsToTime, updateShift, employeesInEditor, user?.companyId, shifts])

    // Handle mouse up
    const handleMouseUp = useCallback(() => {
        if (dragState.type === 'create') {
            // Finalize the creating shift
            const creatingShift = shifts.find(s => s.id.startsWith('creating-'))
            if (creatingShift) {
                const duration = differenceInMinutes(parseISO(creatingShift.endTime), parseISO(creatingShift.startTime))
                if (duration >= SNAP_MINUTES) {
                    // Save it with a proper ID
                    updateShift(creatingShift.id, {
                        id: `shift-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
                    } as any)
                } else {
                    // Too short, delete it
                    deleteShift(creatingShift.id)
                }
            }
        }

        // Finalize state to store after ANY drag operation
        syncToStore(shifts, employeesInEditor)

        setDragState({
            type: null,
            shiftId: null,
            startX: 0,
            startY: 0,
            originalShift: null,
            employeeId: null,
            dayIndex: null,
            initialMinutes: 0,
        })
    }, [dragState.type, shifts, employeesInEditor, updateShift, deleteShift, syncToStore])

    // Global mouse event listeners
    useEffect(() => {
        if (dragState.type) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            document.body.style.cursor = dragState.type === 'move' ? 'grabbing' :
                dragState.type.includes('resize') ? 'ew-resize' : 'crosshair'
            document.body.style.userSelect = 'none'

            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
                document.body.style.cursor = ''
                document.body.style.userSelect = ''
            }
        }
    }, [dragState.type, handleMouseMove, handleMouseUp])

    // Staff pool drag handlers
    const handleStaffDragStart = useCallback((e: React.DragEvent, employee: Employee) => {
        setStaffDragEmployee(employee)
        e.dataTransfer.effectAllowed = 'copy'
    }, [])

    const handleStaffDragEnd = useCallback(() => {
        setStaffDragEmployee(null)
        setDragOverEmployee(null)
    }, [])

    const handleEditorDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        if (staffDragEmployee) {
            addEmployeeToEditor(staffDragEmployee)
            setStaffDragEmployee(null)
        }
        setDragOverEmployee(null)
    }, [staffDragEmployee, addEmployeeToEditor])

    const handleEditorDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }, [])

    // Calculate current time indicator position
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()
    const timePosition = ((currentHour - TIMELINE_START_HOUR) * 60 + currentMinute) / 60 * PIXELS_PER_HOUR

    // Timeline width
    const timelineWidth = HOURS_IN_TIMELINE * PIXELS_PER_HOUR

    // Generate hour labels
    const hourLabels = useMemo(() => {
        return Array.from({ length: HOURS_IN_TIMELINE + 1 }, (_, i) => {
            const hour = TIMELINE_START_HOUR + i
            // Handle 24 as 12 AM (midnight)
            const normalizedHour = hour === 24 ? 0 : hour
            const period = normalizedHour >= 12 && normalizedHour < 24 && hour !== 24 ? 'PM' : 'AM'
            let displayHour = normalizedHour % 12
            if (displayHour === 0) displayHour = 12
            return `${displayHour}${period}`
        })
    }, [])

    // Open shift edit modal
    const openShiftModal = useCallback((shift: EditorShift) => {
        setEditingShift(shift)
        setShowShiftModal(true)
    }, [])

    // Handle double click on shift
    const handleShiftDoubleClick = useCallback((e: React.MouseEvent, shift: EditorShift) => {
        e.stopPropagation()
        openShiftModal(shift)
    }, [openShiftModal])

    return (
        <div className="min-h-screen bg-paper text-charcoal font-display overflow-x-hidden flex flex-col relative">
            {/* Coffee Stain Decorations */}
            <div className="coffee-stain fixed top-4 right-4 pointer-events-none"></div>
            <div className="coffee-stain fixed bottom-[10%] left-[5%] w-[300px] h-[300px] opacity-50 rotate-180 pointer-events-none"></div>

            {/* Top Navigation */}
            <header className="relative z-10 flex items-center justify-between border-b-2 border-charcoal/10 px-8 py-4 bg-paper/80 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-charcoal text-white flex items-center justify-center rounded-lg shadow-sketch rotate-[-2deg]">
                        <span className="material-symbols-outlined text-2xl">qr_code_scanner</span>
                    </div>
                    <h2 className="text-charcoal text-2xl font-bold tracking-tight font-hand rotate-1">QR Track</h2>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/dashboard" className="text-charcoal font-medium hover:text-primary transition-colors font-hand text-lg">
                        Dashboard
                    </Link>
                    <Link to="/schedule" className="text-charcoal font-bold border-b-2 border-primary transition-colors font-hand text-lg">
                        Schedule
                    </Link>
                    <Link to="/dashboard/employees" className="text-charcoal font-medium hover:text-primary transition-colors font-hand text-lg">
                        Employees
                    </Link>
                    <Link to="/dashboard/reports" className="text-charcoal font-medium hover:text-primary transition-colors font-hand text-lg">
                        Reports
                    </Link>
                </nav>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => {
                            logout()
                            window.location.href = '/auth/login'
                        }}
                        className="hidden sm:flex items-center gap-2 text-charcoal font-bold hover:text-primary transition-colors font-hand"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span>Log Out</span>
                    </button>
                    <div className="size-10 rounded-full border-2 border-charcoal p-0.5 shadow-sketch overflow-hidden bg-white">
                        <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-charcoal">person</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="flex flex-1 overflow-hidden relative z-0">
                {/* Sidebar: Staff Pool */}
                <aside className="w-72 border-r-2 border-charcoal/10 flex flex-col bg-white relative shadow-[4px_0_10px_rgba(0,0,0,0.05)]">
                    {/* Paper Clip Decoration */}
                    <div className="absolute top-[-10px] right-8 z-20 w-8 h-16">
                        <svg viewBox="0 0 50 100" fill="none" stroke="#555" strokeWidth="6" strokeLinecap="round">
                            <path d="M15 70 V 30 A 10 10 0 0 1 35 30 V 80 A 15 15 0 0 1 5 80 V 20"></path>
                        </svg>
                    </div>

                    <div className="p-6 border-b-2 border-dashed border-charcoal/20">
                        <h3 className="font-hand text-2xl font-bold text-charcoal">Staff Pool</h3>
                        <p className="text-charcoal/60 text-sm font-hand mt-1">Drag to add • Click × to remove</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
                        {/* Employees in Editor */}
                        {employeesInEditor.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-charcoal/50 font-hand mb-2 uppercase tracking-wide">In Schedule</p>
                                {employeesInEditor.map(({ employee, colorIndex }) => (
                                    <div
                                        key={employee.id}
                                        className={`wiggly-box p-3 flex items-center gap-3 mb-2 shadow-sketch transition-all ${shiftColors[colorIndex].bg} border ${shiftColors[colorIndex].border}`}
                                    >
                                        <div className="size-10 rounded-full border-2 border-charcoal overflow-hidden bg-white shrink-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-charcoal">person</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-charcoal leading-tight truncate">{employee.name}</p>
                                            <p className="text-xs text-charcoal/60 font-hand truncate">{employee.position || employee.role}</p>
                                        </div>
                                        <button
                                            onClick={() => removeEmployeeFromEditor(employee.id)}
                                            className="size-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors border border-red-300"
                                        >
                                            <span className="material-symbols-outlined text-red-600 text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Available Employees */}
                        {availableEmployees.length > 0 && (
                            <div>
                                <p className="text-xs text-charcoal/50 font-hand mb-2 uppercase tracking-wide">Available</p>
                                {availableEmployees.map((employee) => (
                                    <div
                                        key={employee.id}
                                        draggable
                                        onDragStart={(e) => handleStaffDragStart(e, employee)}
                                        onDragEnd={handleStaffDragEnd}
                                        className="wiggly-box p-3 flex items-center gap-3 bg-white shadow-sketch hover:shadow-sketch-hover hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing group mb-2"
                                    >
                                        <div className="size-10 rounded-full border-2 border-charcoal overflow-hidden bg-gray-100 shrink-0 flex items-center justify-center">
                                            <span className="material-symbols-outlined text-charcoal">person</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-charcoal leading-tight truncate">{employee.name}</p>
                                            <p className="text-xs text-charcoal/60 font-hand truncate">{employee.position || employee.role}</p>
                                        </div>
                                        <span className="material-symbols-outlined ml-auto text-charcoal/40 group-hover:text-primary flex-shrink-0">drag_indicator</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {companyEmployees.length === 0 && (
                            <div className="border-2 border-dashed border-charcoal/30 rounded-lg p-4 flex flex-col items-center justify-center text-center gap-2 mt-4 opacity-60">
                                <span className="material-symbols-outlined text-3xl">person_add</span>
                                <p className="font-hand text-sm">No employees found</p>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Workspace */}
                <main
                    ref={timelineRef}
                    className="flex-1 flex flex-col h-full overflow-hidden bg-paper"
                    onDrop={handleEditorDrop}
                    onDragOver={handleEditorDragOver}
                >
                    {/* Header & Controls */}
                    <div className="px-8 py-6 pb-2">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-charcoal tracking-tight font-hand mb-1 flex items-center gap-2">
                                    Shift & Timeline Editor
                                    <span className="text-sm font-sans bg-secondary/30 px-2 py-0.5 rounded-full border border-secondary text-charcoal/80">
                                        {shifts.length} shifts
                                    </span>
                                </h1>
                                <p className="text-charcoal/60 text-sm flex items-center gap-1 font-hand">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    Click and drag to create • Drag edges to resize • Drag to move
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => {
                                        setShifts([])
                                        setIsSaved(false)
                                    }}
                                    className="px-4 py-2 border-2 border-charcoal/30 rounded-lg font-hand hover:bg-paper-dark transition-colors"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={handleSaveSchedule}
                                    className={`h-12 px-6 wiggly-border shadow-sketch hover:shadow-sketch-hover hover:-translate-y-1 transition-all flex items-center gap-2 font-bold group ${isSaved ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}
                                >
                                    <span className="material-symbols-outlined group-hover:animate-bounce">
                                        {isSaved ? 'check_circle' : 'save'}
                                    </span>
                                    {isSaved ? 'Saved!' : 'Save Schedule'}
                                </button>
                            </div>
                        </div>

                        {/* Toolbar */}
                        <div className="flex items-center justify-between border-b-2 border-charcoal py-4 bg-paper relative z-10">
                            <div className="flex items-center gap-1 bg-white p-1 border-2 border-charcoal rounded-lg shadow-sketch">
                                <button
                                    onClick={() => setViewMode('daily')}
                                    className={`px-4 py-2 rounded font-hand font-bold transition-colors flex items-center gap-2 ${viewMode === 'daily' ? 'bg-primary/10 text-primary' : 'text-charcoal hover:bg-paper-dark'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">calendar_view_day</span>
                                    Daily
                                </button>
                                <div className="w-0.5 h-6 bg-charcoal/20"></div>
                                <button
                                    onClick={() => setViewMode('weekly')}
                                    className={`px-4 py-2 rounded font-hand font-bold transition-colors flex items-center gap-2 ${viewMode === 'weekly' ? 'bg-primary/10 text-primary' : 'text-charcoal hover:bg-paper-dark'}`}
                                >
                                    <span className="material-symbols-outlined text-lg">calendar_view_week</span>
                                    Weekly
                                </button>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
                                    className="px-3 py-1 text-sm border border-charcoal/30 rounded font-hand hover:bg-paper-dark transition-colors"
                                >
                                    Today
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => navigate('prev')}
                                        className="size-8 flex items-center justify-center rounded-full border-2 border-charcoal hover:bg-charcoal hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                                    </button>
                                    <span className="font-hand text-lg font-bold min-w-[180px] text-center">
                                        {viewMode === 'weekly'
                                            ? `${format(currentWeekStart, 'MMM d')} - ${format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}`
                                            : format(currentWeekStart, 'EEEE, MMM d, yyyy')
                                        }
                                    </span>
                                    <button
                                        onClick={() => navigate('next')}
                                        className="size-8 flex items-center justify-center rounded-full border-2 border-charcoal hover:bg-charcoal hover:text-white transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Canvas */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-auto relative bg-paper-dots bg-[length:24px_24px] bg-[rgba(0,0,0,0.02)] scroll-smooth"
                    >
                        {employeesInEditor.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center p-8 rounded-lg border-2 border-dashed border-charcoal/30 bg-white/50">
                                    <span className="material-symbols-outlined text-6xl text-charcoal/30 mb-4">group_add</span>
                                    <h3 className="font-hand text-xl font-bold text-charcoal/60 mb-2">No employees in schedule</h3>
                                    <p className="text-charcoal/50 font-hand">Drag employees from the Staff Pool to start scheduling</p>
                                </div>
                            </div>
                        ) : (
                            <div className="min-w-max p-4 pb-20 relative">
                                {/* Day Headers (for weekly view) */}
                                {viewMode === 'weekly' && (
                                    <div className="flex ml-48 mb-2">
                                        {viewDays.map((day, idx) => (
                                            <div
                                                key={idx}
                                                className="flex-shrink-0 text-center px-2 py-1"
                                                style={{ width: timelineWidth }}
                                            >
                                                <div className={`font-hand font-bold ${isSameDay(day, new Date()) ? 'text-primary' : 'text-charcoal'}`}>
                                                    {format(day, 'EEE')}
                                                </div>
                                                <div className={`text-sm ${isSameDay(day, new Date()) ? 'text-primary font-bold' : 'text-charcoal/60'}`}>
                                                    {format(day, 'MMM d')}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Time Axis */}
                                <div className="flex ml-48 border-b border-charcoal/20 sticky top-0 bg-paper/95 backdrop-blur z-10">
                                    {viewDays.map((_day, dayIdx) => (
                                        <div key={dayIdx} className="flex-shrink-0 flex" style={{ width: timelineWidth }}>
                                            {hourLabels.map((label, i) => (
                                                <div
                                                    key={i}
                                                    className="text-center font-hand text-xs text-charcoal/60 py-1 border-l border-charcoal/10"
                                                    style={{ width: PIXELS_PER_HOUR }}
                                                >
                                                    {i < hourLabels.length - 1 ? label : ''}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Employee Rows */}
                                {employeesInEditor.map(({ employee, colorIndex }) => (
                                    <div key={employee.id} className="flex group/row">
                                        {/* Employee Info */}
                                        <div
                                            className="w-48 pr-4 flex items-center gap-3 sticky left-0 bg-paper z-30 border-r border-charcoal/10"
                                            style={{ height: ROW_HEIGHT + 8 }}
                                        >
                                            <div className={`size-10 rounded-full border-2 overflow-hidden flex items-center justify-center ${shiftColors[colorIndex].bg} ${shiftColors[colorIndex].border}`}>
                                                <span className="material-symbols-outlined text-charcoal">person</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-charcoal text-sm truncate">{employee.name}</p>
                                                <p className="text-xs text-charcoal/50 font-hand truncate">{employee.position || 'Staff'}</p>
                                            </div>
                                        </div>

                                        {/* Timeline Rows for Each Day */}
                                        <div className="flex">
                                            {viewDays.map((day, dayIdx) => {
                                                const dayShifts = getShiftsForEmployeeAndDay(employee.id, day)
                                                const isToday = isSameDay(day, new Date())

                                                return (
                                                    <div
                                                        key={dayIdx}
                                                        data-employee={employee.id}
                                                        data-day={dayIdx}
                                                        className={`relative flex-shrink-0 border-b border-charcoal/10 ${isToday ? 'bg-primary/5' : 'bg-white/50'} hover:bg-white/80 transition-colors`}
                                                        style={{
                                                            width: timelineWidth,
                                                            height: ROW_HEIGHT + 8
                                                        }}
                                                        onMouseDown={(e) => handleTimelineMouseDown(e, employee.id, dayIdx)}
                                                    >
                                                        {/* Hour Grid Lines */}
                                                        {hourLabels.map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="absolute top-0 bottom-0 border-l border-charcoal/10"
                                                                style={{ left: i * PIXELS_PER_HOUR }}
                                                            />
                                                        ))}

                                                        {/* Shifts */}
                                                        {dayShifts.map((shift) => {
                                                            const startTime = parseISO(shift.startTime)
                                                            const endTime = parseISO(shift.endTime)
                                                            const left = timeToPixels(startTime)
                                                            const width = timeToPixels(endTime) - left
                                                            const isSelected = selectedShiftId === shift.id
                                                            const colors = shiftColors[shift.colorIndex % shiftColors.length]

                                                            return (
                                                                <div
                                                                    key={shift.id}
                                                                    className={`absolute top-1 bottom-1 rounded-md cursor-move transition-shadow ${colors.bg} ${colors.border} border-2 ${isSelected ? 'ring-2 ring-primary ring-offset-1 shadow-lg z-20' : 'shadow-sm hover:shadow-md z-10'}`}
                                                                    style={{
                                                                        left: `${left}px`,
                                                                        width: `${Math.max(width, 20)}px`,
                                                                    }}
                                                                    onMouseDown={(e) => handleShiftMouseDown(e, shift, 'move')}
                                                                    onDoubleClick={(e) => handleShiftDoubleClick(e, shift)}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        setSelectedShiftId(shift.id)
                                                                    }}
                                                                >
                                                                    {/* Shift Content */}
                                                                    <div className="w-full h-full px-2 py-1 flex flex-col justify-center overflow-hidden">
                                                                        <span className={`text-xs font-bold ${colors.text} truncate`}>
                                                                            {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
                                                                        </span>
                                                                        {shift.label && (
                                                                            <span className={`text-[10px] ${colors.text} opacity-70 truncate`}>
                                                                                {shift.label}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {/* Left Resize Handle */}
                                                                    <div
                                                                        className="absolute left-0 inset-y-0 w-3 cursor-ew-resize flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                                                        onMouseDown={(e) => handleShiftMouseDown(e, shift, 'resize-left')}
                                                                    >
                                                                        <div className="w-1 h-6 bg-charcoal/50 rounded-full" />
                                                                    </div>

                                                                    {/* Right Resize Handle */}
                                                                    <div
                                                                        className="absolute right-0 inset-y-0 w-3 cursor-ew-resize flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                                                        onMouseDown={(e) => handleShiftMouseDown(e, shift, 'resize-right')}
                                                                    >
                                                                        <div className="w-1 h-6 bg-charcoal/50 rounded-full" />
                                                                    </div>

                                                                    {/* Delete Button (show on select) */}
                                                                    {isSelected && (
                                                                        <button
                                                                            className="absolute -top-2 -right-2 size-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors z-30"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation()
                                                                                deleteShift(shift.id)
                                                                            }}
                                                                        >
                                                                            <span className="material-symbols-outlined text-sm">close</span>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )
                                                        })}

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {/* Global Current Time Indicator */}
                                {todayIdx !== -1 && currentHour >= TIMELINE_START_HOUR && currentHour < TIMELINE_END_HOUR && (
                                    <div
                                        className="absolute top-0 bottom-0 pointer-events-none z-30"
                                        style={{
                                            left: `calc(1rem + 12rem + ${todayIdx * timelineWidth}px + ${timePosition}px)`,
                                            height: '100%',
                                            transition: 'left 0.5s ease'
                                        }}
                                    >
                                        <div className="h-full w-[2px] bg-red-500 relative">
                                            {/* Top Circle */}
                                            <div className="absolute -top-1 -left-[5px] size-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />

                                            {/* Time Badge */}
                                            <div className="absolute top-2 left-1 bg-red-500 text-white rounded-md p-1 shadow-lg flex flex-col items-center min-w-[32px] border border-white/20">
                                                <span className="text-[10px] font-bold leading-none">{format(currentTime, 'h:mm')}</span>
                                                <span className="text-[8px] font-bold opacity-90 mt-0.5 leading-none uppercase">{format(currentTime, 'a')}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Drop Zone for New Employees */}
                                {staffDragEmployee && (
                                    <div
                                        className="flex items-center justify-center py-8 border-2 border-dashed border-primary rounded-lg mt-4 bg-primary/10 animate-pulse"
                                    >
                                        <span className="material-symbols-outlined text-primary mr-2">add_circle</span>
                                        <span className="font-hand text-primary font-bold">Drop to add {staffDragEmployee.name} to schedule</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Shift Edit Modal */}
            {showShiftModal && editingShift && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowShiftModal(false)}>
                    <div
                        className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border-2 border-charcoal/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="font-hand text-2xl font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined">edit_calendar</span>
                            Edit Shift
                        </h3>

                        {/* Date Display */}
                        <div className="bg-paper-dark/50 rounded-lg p-3 mb-4 border border-charcoal/10">
                            <div className="flex items-center gap-2 text-charcoal">
                                <span className="material-symbols-outlined text-primary">calendar_today</span>
                                <span className="font-hand font-bold text-lg">
                                    {format(parseISO(editingShift.startTime), 'EEEE, MMMM d, yyyy')}
                                </span>
                            </div>
                        </div>

                        {/* Employee Selection */}
                        <div className="mb-4">
                            <label className="block text-sm font-hand text-charcoal/70 mb-1">Assigned To</label>
                            <select
                                value={editingShift.employeeId}
                                onChange={(e) => {
                                    const newEmployeeId = e.target.value
                                    const newEmployee = employeesInEditor.find(emp => emp.employee.id === newEmployeeId)
                                    if (newEmployee) {
                                        setEditingShift(prev => prev ? {
                                            ...prev,
                                            employeeId: newEmployeeId,
                                            colorIndex: newEmployee.colorIndex
                                        } : null)
                                    }
                                }}
                                className="w-full px-4 py-2 border-2 border-charcoal/20 rounded-lg focus:border-primary focus:outline-none font-hand bg-white"
                            >
                                {employeesInEditor.map(({ employee, colorIndex }) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.name} - {employee.position || employee.role || 'Staff'}
                                    </option>
                                ))}
                            </select>
                            {/* Current Employee Preview */}
                            {(() => {
                                const currentEmployee = employeesInEditor.find(e => e.employee.id === editingShift.employeeId)
                                if (currentEmployee) {
                                    const colors = shiftColors[currentEmployee.colorIndex % shiftColors.length]
                                    return (
                                        <div className={`mt-2 flex items-center gap-2 p-2 rounded-lg ${colors.bg} ${colors.border} border`}>
                                            <div className={`size-8 rounded-full ${colors.border} border-2 bg-white flex items-center justify-center`}>
                                                <span className="material-symbols-outlined text-charcoal text-sm">person</span>
                                            </div>
                                            <span className={`font-hand font-bold ${colors.text}`}>{currentEmployee.employee.name}</span>
                                        </div>
                                    )
                                }
                                return null
                            })()}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-hand text-charcoal/70 mb-1">Label (optional)</label>
                                <input
                                    type="text"
                                    value={editingShift.label || ''}
                                    onChange={(e) => setEditingShift(prev => prev ? { ...prev, label: e.target.value } : null)}
                                    placeholder="e.g. Morning Shift"
                                    className="w-full px-4 py-2 border-2 border-charcoal/20 rounded-lg focus:border-primary focus:outline-none font-hand"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-hand text-charcoal/70 mb-1">Start Time</label>
                                    <input
                                        type="time"
                                        value={format(parseISO(editingShift.startTime), 'HH:mm')}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(':').map(Number)
                                            const newStart = setMinutes(setHours(parseISO(editingShift.startTime), hours), minutes)
                                            setEditingShift(prev => prev ? { ...prev, startTime: newStart.toISOString() } : null)
                                        }}
                                        className="w-full px-4 py-2 border-2 border-charcoal/20 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-hand text-charcoal/70 mb-1">End Time</label>
                                    <input
                                        type="time"
                                        value={format(parseISO(editingShift.endTime), 'HH:mm')}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(':').map(Number)
                                            const newEnd = setMinutes(setHours(parseISO(editingShift.endTime), hours), minutes)
                                            setEditingShift(prev => prev ? { ...prev, endTime: newEnd.toISOString() } : null)
                                        }}
                                        className="w-full px-4 py-2 border-2 border-charcoal/20 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-hand text-charcoal/70 mb-2">Color</label>
                                <div className="flex gap-2">
                                    {shiftColors.map((color, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setEditingShift(prev => prev ? { ...prev, colorIndex: idx } : null)}
                                            className={`size-8 rounded-full ${color.bg} ${color.border} border-2 transition-transform ${editingShift.colorIndex === idx ? 'scale-125 ring-2 ring-offset-2 ring-primary' : 'hover:scale-110'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    deleteShift(editingShift.id)
                                    setShowShiftModal(false)
                                    setEditingShift(null)
                                }}
                                className="flex-1 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-hand font-bold hover:bg-red-50 transition-colors"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => {
                                    updateShift(editingShift.id, editingShift)
                                    setShowShiftModal(false)
                                    setEditingShift(null)
                                }}
                                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-hand font-bold hover:bg-primary/90 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyboard Shortcuts Info */}
            <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-lg border border-charcoal/10 p-3 text-xs font-hand text-charcoal/60">
                <p><strong>Double-click</strong> shift to edit</p>
                <p><strong>Click</strong> to select • <strong>Delete</strong> shows on select</p>
            </div>
        </div>
    )
}
