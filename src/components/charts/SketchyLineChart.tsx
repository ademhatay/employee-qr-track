import { useState, useMemo } from 'react'

interface DataPoint {
    label: string
    value: number
}

interface SketchyLineChartProps {
    data: DataPoint[]
    title?: string
    subtitle?: string
    color?: string
    unit?: string
    showFilter?: boolean
    onFilterClick?: () => void
}

export function SketchyLineChart({
    data,
    title = 'Chart',
    subtitle,
    color = '#3474f4',
    unit = 'Scans',
    showFilter = true,
    onFilterClick
}: SketchyLineChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // Calculate chart dimensions and scaling
    const chartConfig = useMemo(() => {
        const maxValue = Math.max(...data.map(d => d.value), 1)
        const minValue = Math.min(...data.map(d => d.value), 0)

        // Round max to nice number for Y axis
        const niceMax = Math.ceil(maxValue / 50) * 50 || 100

        // Generate Y axis labels
        const yLabels = [niceMax, Math.round(niceMax * 0.66), Math.round(niceMax * 0.33), 0]

        return { maxValue: niceMax, minValue, yLabels }
    }, [data])

    // Calculate point positions
    const points = useMemo(() => {
        const chartWidth = 100 // percentage
        const chartHeight = 100 // percentage
        const padding = 5

        return data.map((point, index) => {
            const x = padding + ((chartWidth - padding * 2) / (data.length - 1 || 1)) * index
            const y = chartHeight - padding - ((point.value / chartConfig.maxValue) * (chartHeight - padding * 2))
            return { ...point, x, y, index }
        })
    }, [data, chartConfig.maxValue])

    // Generate SVG path for the line
    const linePath = useMemo(() => {
        if (points.length === 0) return ''

        // Create smooth curve using quadratic bezier
        let path = `M ${points[0].x} ${points[0].y}`

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1]
            const curr = points[i]
            const midX = (prev.x + curr.x) / 2

            // Quadratic bezier for smooth curve
            path += ` Q ${prev.x + (curr.x - prev.x) * 0.5} ${prev.y}, ${midX} ${(prev.y + curr.y) / 2}`
            path += ` T ${curr.x} ${curr.y}`
        }

        return path
    }, [points])

    // Generate area fill path
    const areaPath = useMemo(() => {
        if (points.length === 0) return ''

        let path = `M ${points[0].x} 95` // Start at bottom
        path += ` L ${points[0].x} ${points[0].y}` // Go up to first point

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1]
            const curr = points[i]
            const midX = (prev.x + curr.x) / 2

            path += ` Q ${prev.x + (curr.x - prev.x) * 0.5} ${prev.y}, ${midX} ${(prev.y + curr.y) / 2}`
            path += ` T ${curr.x} ${curr.y}`
        }

        path += ` L ${points[points.length - 1].x} 95` // Go down to bottom
        path += ' Z' // Close path

        return path
    }, [points])

    return (
        <div className="bg-white p-6 rounded-lg wiggly-border sketch-shadow relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-hand text-2xl font-bold text-charcoal">
                    {title}
                    {subtitle && (
                        <span className="text-sm font-dashboard-display text-charcoal/50 font-normal ml-2">
                            ({subtitle})
                        </span>
                    )}
                </h3>
                {showFilter && (
                    <button
                        onClick={onFilterClick}
                        className="text-dashboard-primary hover:bg-dashboard-primary/5 px-3 py-1 rounded-full text-sm font-hand border border-transparent hover:border-dashboard-primary/20 transition-all flex items-center gap-1"
                    >
                        Filter <span className="material-symbols-outlined text-base">filter_list</span>
                    </button>
                )}
            </div>

            {/* Chart Container */}
            <div className="relative h-64 w-full pl-10 pb-8">
                {/* Y Axis Labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs font-hand text-charcoal/50 py-2 w-8 text-right pr-2">
                    {chartConfig.yLabels.map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>

                {/* X Axis Labels */}
                <div className="absolute left-10 bottom-0 right-0 flex justify-between text-xs font-hand text-charcoal/50 px-2">
                    {data.map((point, i) => (
                        <span
                            key={i}
                            className={`transition-all ${hoveredIndex === i ? 'text-charcoal font-bold scale-110' : ''}`}
                        >
                            {point.label}
                        </span>
                    ))}
                </div>

                {/* Grid Lines */}
                <div
                    className="w-full h-full flex flex-col justify-between py-2 border-l-2 border-charcoal/80 border-dashed"
                    style={{ borderRadius: '2px' }}
                >
                    <div className="w-full border-b border-charcoal/10 border-dashed"></div>
                    <div className="w-full border-b border-charcoal/10 border-dashed"></div>
                    <div className="w-full border-b border-charcoal/10 border-dashed"></div>
                    <div className="w-full border-b-2 border-charcoal/80"></div>
                </div>

                {/* SVG Chart */}
                <svg
                    className="absolute inset-0 pl-10 pb-8 pr-2 pt-2 w-full h-full overflow-visible"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* Wiggle filter for hand-drawn effect */}
                    <defs>
                        <filter id="sketchyWiggle" x="-5%" y="-5%" width="110%" height="110%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>

                    {/* Area fill */}
                    <path
                        d={areaPath}
                        fill={`${color}10`}
                        className="transition-all duration-300"
                    />

                    {/* The Line */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke={color}
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="drop-shadow-sm"
                        style={{ filter: 'url(#sketchyWiggle)' }}
                    />

                    {/* Interactive Points */}
                    {points.map((point, i) => (
                        <g key={i}>
                            {/* Hover area (larger invisible circle) */}
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                            {/* Visible point */}
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={hoveredIndex === i ? '2' : '1'}
                                fill={hoveredIndex === i ? color : '#FDFBF7'}
                                stroke="#2D2D2D"
                                strokeWidth="0.4"
                                className="transition-all duration-200 cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                        </g>
                    ))}
                </svg>

                {/* Tooltip */}
                {hoveredIndex !== null && points[hoveredIndex] && (
                    <div
                        className="absolute bg-charcoal text-white text-xs px-3 py-2 rounded-lg font-dashboard-display shadow-lg z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full animate-in fade-in duration-150"
                        style={{
                            left: `calc(${points[hoveredIndex].x}% + 2.5rem)`,
                            top: `calc(${points[hoveredIndex].y}% - 0.5rem)`,
                        }}
                    >
                        <div className="flex flex-col items-center gap-0.5">
                            <span className="font-hand text-base font-bold" style={{ color }}>
                                {points[hoveredIndex].value} {unit}
                            </span>
                            <span className="text-white/60 text-[10px]">
                                {points[hoveredIndex].label}
                            </span>
                        </div>
                        {/* Tooltip arrow */}
                        <div
                            className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-charcoal"
                        />
                    </div>
                )}
            </div>

            {/* Legend / Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-charcoal/10">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-hand text-charcoal/60">{unit}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-hand">
                    <span className="text-charcoal/60">
                        Total: <strong className="text-charcoal">{data.reduce((sum, d) => sum + d.value, 0)}</strong>
                    </span>
                    <span className="text-charcoal/60">
                        Avg: <strong className="text-charcoal">{Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length || 0)}</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SketchyLineChart
