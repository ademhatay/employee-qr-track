import { useAuthStore, useDataStore } from '@/lib/store'
import { isToday, subDays, isSameDay, startOfWeek, addDays, format } from 'date-fns'
import { useMemo } from 'react'
import { SketchyLineChart } from '@/components/charts/SketchyLineChart'

// KPI Stats Data
const useStats = () => {
    const company = useAuthStore((state) => state.company)
    const employees = useDataStore((state) => state.employees)
    const attendances = useDataStore((state) => state.attendances)

    const companyEmployees = employees.filter((e) => e.companyId === company?.id)
    const todayAttendances = attendances.filter(
        (a) => a.companyId === company?.id && isToday(new Date(a.timestamp))
    )

    const employeeCheckIns = new Map<string, number>()
    todayAttendances.forEach((a) => {
        const count = employeeCheckIns.get(a.employeeId) || 0
        employeeCheckIns.set(a.employeeId, count + 1)
    })
    const currentlyCheckedIn = Array.from(employeeCheckIns.entries()).filter(
        ([_, count]) => count % 2 === 1
    ).length

    return {
        totalEmployees: companyEmployees.length || 142,
        activeNow: currentlyCheckedIn || 118,
        checkInsToday: todayAttendances.filter((a) => a.type === 'check-in').length || 135,
        lateArrivals: 7,
    }
}

// Weekly Attendance Data Hook
const useWeeklyAttendanceData = () => {
    const company = useAuthStore((state) => state.company)
    const attendances = useDataStore((state) => state.attendances)

    const weeklyData = useMemo(() => {
        const today = new Date()
        const weekStart = startOfWeek(today, { weekStartsOn: 1 })

        const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

        return dayLabels.map((label, index) => {
            const day = addDays(weekStart, index)
            const dayAttendances = attendances.filter(
                (a) => a.companyId === company?.id &&
                    isSameDay(new Date(a.timestamp), day) &&
                    a.type === 'check-in'
            )

            // If no real data, generate some demo values
            const value = dayAttendances.length > 0
                ? dayAttendances.length
                : Math.floor(80 + Math.random() * 70) // Demo: 80-150 range

            return { label, value }
        })
    }, [attendances, company?.id])

    return weeklyData
}

export function DashboardOverview() {
    const stats = useStats()
    const weeklyData = useWeeklyAttendanceData()

    return (
        <div className="space-y-8">
            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 - Total Employees */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="material-symbols-outlined text-4xl">group</span>
                    </div>
                    <p className="font-hand text-lg text-charcoal/70 font-bold mb-1">Total Employees</p>
                    <div className="flex items-end gap-2">
                        <span className="font-dashboard-display text-4xl font-bold text-charcoal">{stats.totalEmployees}</span>
                        <span className="font-hand text-sm text-green-600 mb-1 font-bold">
                            +2% <span className="material-symbols-outlined text-sm align-middle">arrow_upward</span>
                        </span>
                    </div>
                </div>

                {/* Card 2 - Active Now */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="material-symbols-outlined text-4xl">radio_button_checked</span>
                    </div>
                    <p className="font-hand text-lg text-charcoal/70 font-bold mb-1">Active Now</p>
                    <div className="flex items-end gap-2">
                        <span className="font-dashboard-display text-4xl font-bold text-charcoal">{stats.activeNow}</span>
                        <span className="font-hand text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full border border-green-200">
                            Live
                        </span>
                    </div>
                </div>

                {/* Card 3 - Check-ins Today */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <span className="material-symbols-outlined text-4xl">fact_check</span>
                    </div>
                    <p className="font-hand text-lg text-charcoal/70 font-bold mb-1">Check-ins Today</p>
                    <div className="flex items-end gap-2">
                        <span className="font-dashboard-display text-4xl font-bold text-charcoal">{stats.checkInsToday}</span>
                        <span className="font-hand text-sm text-green-600 mb-1 font-bold">+12%</span>
                    </div>
                </div>

                {/* Card 4 - Late Arrivals */}
                <div className="bg-white p-5 rounded-lg wiggly-border relative sketch-shadow hover:-translate-y-1 transition-transform cursor-default group border-red-100">
                    <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-40 transition-opacity text-red-500">
                        <span className="material-symbols-outlined text-4xl">alarm_off</span>
                    </div>
                    <p className="font-hand text-lg text-charcoal/70 font-bold mb-1">Late Arrivals</p>
                    <div className="flex items-end gap-2 relative">
                        <div className="absolute inset-0 bg-red-100 transform -skew-x-12 opacity-50 -z-10 rounded-sm"></div>
                        <span className="font-dashboard-display text-4xl font-bold text-red-600">{stats.lateArrivals}</span>
                        <span className="font-hand text-sm text-red-500 mb-1 font-bold">-2%</span>
                    </div>
                </div>
            </div>

            {/* Main Section Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Chart Section - Interactive */}
                <div className="xl:col-span-2">
                    <SketchyLineChart
                        data={weeklyData}
                        title="Attendance Trends"
                        subtitle="Weekly"
                        color="#3474f4"
                        unit="Scans"
                        showFilter={true}
                    />
                </div>

                {/* Side Panel: Recent Checkins */}
                <div className="bg-white p-6 rounded-lg wiggly-border sketch-shadow flex flex-col">
                    <h3 className="font-hand text-xl font-bold text-charcoal mb-4">Latest Scans</h3>
                    <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-2">
                        <LatestScanItem name="Sarah Jenkins" department="Marketing" time="09:42 AM" color="blue" status="active" />
                        <LatestScanItem name="Mike Ross" department="Legal" time="09:38 AM" color="purple" status="active" />
                        <LatestScanItem name="Harvey S." department="Executive" time="09:30 AM" color="orange" status="warning" />
                        <LatestScanItem name="Donna Paulsen" department="Admin" time="09:15 AM" color="pink" status="active" />
                    </div>
                    <button className="mt-4 w-full py-2 border-2 border-charcoal rounded-lg font-hand font-bold hover:bg-charcoal hover:text-white transition-colors text-sm uppercase tracking-wide">
                        View All Logs
                    </button>
                </div>
            </div>

            {/* Recent Activity Table */}
            <ActivityTable />
        </div>
    )
}

interface LatestScanItemProps {
    name: string
    department: string
    time: string
    color: 'blue' | 'purple' | 'orange' | 'pink'
    status: 'active' | 'warning'
}

function LatestScanItem({ name, department, time, color, status }: LatestScanItemProps) {
    const colorClasses = {
        blue: 'bg-blue-100 text-dashboard-primary',
        purple: 'bg-purple-100 text-purple-600',
        orange: 'bg-orange-100 text-orange-600',
        pink: 'bg-pink-100 text-pink-600',
    }

    return (
        <div className="flex items-center gap-3 p-2 hover:bg-background-light rounded-lg transition-colors border border-transparent hover:border-charcoal/10 border-dashed">
            <div
                className={`w-10 h-10 rounded-full ${colorClasses[color]} flex items-center justify-center border border-charcoal/20`}
            >
                <span className="material-symbols-outlined text-lg">person</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-charcoal font-bold text-sm truncate">{name}</p>
                <p className="text-charcoal/50 text-xs truncate">
                    {department} • {time}
                </p>
            </div>
            <div
                className={`w-2 h-2 rounded-full ${status === 'warning' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}
            ></div>
        </div>
    )
}

function ActivityTable() {
    const activities = [
        {
            name: 'Elena Gilbert',
            department: 'Operations',
            timeIn: '08:58 AM',
            status: 'On Time',
            statusColor: 'green',
            location: 'HQ - Lobby',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuB38D5iFDeP6qR03NlCIz8WA8unvZcS5yodKzhs2UJgb__5C3qJu3s4wX7COitKEFy5JnKOocGKTlQnHLrw9a--iABeTPyD98_B-1qaBwQ0ePfF0Ds25GZJFncnkamTOYgAeFZV3plQLnTQIXoOKLcHD7hHNAgkTejJ7T8tvEM3X2WRtQCZk1Clbbu17Z1jwoegYwisP_1PFtoxxVtCyqL6o5UmdDWa9ibtoz-t8quz1bwBnAW_inIwnQpuNmGznRk-ABOhLcjwEA',
        },
        {
            name: 'Damon S.',
            department: 'Security',
            timeIn: '09:05 AM',
            status: 'Late',
            statusColor: 'yellow',
            location: 'Gate A',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDWSz4ZWEvUhctvmwelcPiQJrUJFYtSEPQdLWXODdxqaIh8C16_p9X4EPhKRge5Apz6QHgL_WhOqGFi0-wpYVxnr5fpuwLuwRL6aAi7K4ThoVsy1yTfKMvhm1sWSFoAMOTZ9pRnJlRHmOmHxG0noi7DyYdfiQwVXQUKYEZ23y-H4Yy0mX-v8ELaPdcfEdVKDjdVB7wU1VWgx4ZacToKZzhmoxQgZ2m6HpGo66hcbZ2QQfm3mKrlzUMWVRP_SCGjt9tzEuQNjmxJGg',
        },
        {
            name: 'Stefan S.',
            department: 'Finance',
            timeIn: '08:45 AM',
            status: 'On Time',
            statusColor: 'green',
            location: 'HQ - Office 3',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuCjuvKjck9-XAAsV3KE0Qzzy_uhR6EpE6h7xvvzUk36FNaF3Zv6-8CRxkH8XmbpCNjH1s3-zyzrVcsfPEq82B6c324qGUl9sRnaYYV5RrRXGbFlGwvckYn7CHaLID3deAggYbzvsYaND86mLbQampxQH86brJtKyjfCPqz7bMN3ec8bpdZlchKTI0ESFMKpi0UaY8cy8eJsrRfqBEVPoIKlzyyWk8hQXdiok0P2yqt7kmh4dsSQjTvJWaoJpmy3knkARdZ6iyxNXA',
        },
        {
            name: 'Caroline F.',
            department: 'Events',
            timeIn: '--:--',
            status: 'Absent',
            statusColor: 'gray',
            location: '--',
            avatar:
                'https://lh3.googleusercontent.com/aida-public/AB6AXuBdnDHbPIe0snr0eupoHWvDt6fJCAdRJ-HbMJwIhWC73sh59WjJiT38Aq6b64TcUG8tXedkn6IMTbMJHmBtXGnghnnJ1HZe3SORMefNnL9RYVM96FTjOgInesQxJTT14RuK_lgq7r6Ur0ey0LT417628rXySi0aOTAF5mF1Tb6ru-XXsxIjBFeuorBW-hxxiVPA7GMHfg5bIkLB9EpqDTeWaqMfUUgsIrG8CUm9qVSYwliNTNeT7PJSE6MwC76NhBDz3Eq0pufspg',
        },
    ]

    const getStatusClasses = (color: string) => {
        const map: Record<string, string> = {
            green: 'bg-green-200 text-green-900 border-green-300',
            yellow: 'bg-yellow-200 text-yellow-900 border-yellow-300',
            gray: 'bg-gray-200 text-gray-600 border-gray-300',
        }
        return map[color] || map.gray
    }

    return (
        <div className="bg-white rounded-lg wiggly-border sketch-shadow overflow-hidden">
            <div className="p-6 border-b-2 border-charcoal/10 border-dashed flex justify-between items-center bg-background-light/50">
                <h3 className="font-hand text-xl font-bold text-charcoal">Team Activity Log</h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-charcoal/60">download</span>
                    </button>
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-charcoal/60">print</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-background-light">
                        <tr className="text-charcoal/60 font-hand text-lg border-b-2 border-charcoal">
                            <th className="px-6 py-4 font-bold">Employee</th>
                            <th className="px-6 py-4 font-bold">Department</th>
                            <th className="px-6 py-4 font-bold">Time In</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold">Location</th>
                            <th className="px-6 py-4 font-bold text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-dashed divide-charcoal/10 font-dashboard-display text-sm">
                        {activities.map((activity, index) => (
                            <tr key={index} className="group hover:bg-yellow-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full bg-gray-200 bg-cover"
                                            style={{ backgroundImage: `url('${activity.avatar}')` }}
                                        ></div>
                                        <span className="font-bold text-charcoal">{activity.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-charcoal/80">{activity.department}</td>
                                <td className="px-6 py-4 text-charcoal/80 font-mono">{activity.timeIn}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-block px-3 py-1 ${getStatusClasses(activity.statusColor)} rounded-md font-bold font-hand transform ${index % 2 === 0 ? '-rotate-2' : 'rotate-1'} border shadow-sm text-xs`}
                                    >
                                        {activity.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-charcoal/80">{activity.location}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-charcoal/40 hover:text-dashboard-primary transition-colors">
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
