import { useState, useMemo, useRef, useCallback } from 'react'

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
    const chartRef = useRef<HTMLDivElement>(null)

    // Calculate chart dimensions and scaling
    const chartConfig = useMemo(() => {
        const maxValue = Math.max(...data.map(d => d.value), 1)

        // Round max to nice number for Y axis
        const niceMax = Math.ceil(maxValue / 50) * 50 || 100

        // Generate Y axis labels (5 labels)
        const yLabels = [
            niceMax,
            Math.round(niceMax * 0.75),
            Math.round(niceMax * 0.5),
            Math.round(niceMax * 0.25),
            0
        ]

        return { maxValue: niceMax, yLabels }
    }, [data])

    // Calculate point positions as percentages
    const points = useMemo(() => {
        return data.map((point, index) => {
            const x = (index / (data.length - 1 || 1)) * 100
            const y = 100 - ((point.value / chartConfig.maxValue) * 100)
            return { ...point, x, y, index }
        })
    }, [data, chartConfig.maxValue])

    // Generate SVG path for the line
    const linePath = useMemo(() => {
        if (points.length === 0) return ''

        let path = `M ${points[0].x} ${points[0].y}`

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1]
            const curr = points[i]

            // Control points for smooth cubic bezier
            const cp1x = prev.x + (curr.x - prev.x) * 0.4
            const cp1y = prev.y
            const cp2x = curr.x - (curr.x - prev.x) * 0.4
            const cp2y = curr.y

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
        }

        return path
    }, [points])

    // Generate area fill path
    const areaPath = useMemo(() => {
        if (points.length === 0) return ''

        let path = `M ${points[0].x} 100`
        path += ` L ${points[0].x} ${points[0].y}`

        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1]
            const curr = points[i]

            const cp1x = prev.x + (curr.x - prev.x) * 0.4
            const cp1y = prev.y
            const cp2x = curr.x - (curr.x - prev.x) * 0.4
            const cp2y = curr.y

            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
        }

        path += ` L ${points[points.length - 1].x} 100`
        path += ' Z'

        return path
    }, [points])

    // Find the nearest point based on mouse X position
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!chartRef.current || points.length === 0) return

        const chartArea = chartRef.current.querySelector('.chart-area')
        if (!chartArea) return

        const rect = chartArea.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const chartWidth = rect.width

        const relativeX = Math.max(0, Math.min(1, mouseX / chartWidth))
        const pointSpacing = 1 / (points.length - 1 || 1)
        const nearestIndex = Math.round(relativeX / pointSpacing)
        const clampedIndex = Math.max(0, Math.min(points.length - 1, nearestIndex))

        setHoveredIndex(clampedIndex)
    }, [points])

    const handleMouseLeave = useCallback(() => {
        setHoveredIndex(null)
    }, [])

    return (
        <div className="bg-white p-6 rounded-lg wiggly-border sketch-shadow relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
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
            <div
                ref={chartRef}
                className="relative h-64 w-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Y Axis Labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs font-dashboard-display text-charcoal/40 w-8 text-right pr-2">
                    {chartConfig.yLabels.map((label, i) => (
                        <span key={i}>{label}</span>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="absolute left-10 right-0 top-0 bottom-6 chart-area">
                    {/* Horizontal Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between border-l border-charcoal/15">
                        {chartConfig.yLabels.map((_, i) => (
                            <div
                                key={i}
                                className={`w-full ${i === chartConfig.yLabels.length - 1 ? 'border-b border-charcoal/20' : 'border-b border-dashed border-charcoal/8'}`}
                            />
                        ))}
                    </div>

                    {/* SVG for line and area */}
                    <svg
                        className="absolute inset-0 w-full h-full overflow-visible"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                                <stop offset="100%" stopColor={color} stopOpacity="0.02" />
                            </linearGradient>
                        </defs>

                        {/* Area fill */}
                        <path d={areaPath} fill="url(#chartAreaGradient)" />

                        {/* Line - using vector-effect for consistent stroke width */}
                        <path
                            d={linePath}
                            fill="none"
                            stroke={color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Vertical hover line */}
                        {hoveredIndex !== null && points[hoveredIndex] && (
                            <line
                                x1={points[hoveredIndex].x}
                                y1="0"
                                x2={points[hoveredIndex].x}
                                y2="100"
                                stroke={color}
                                strokeWidth="1"
                                strokeDasharray="4,3"
                                opacity="0.35"
                                vectorEffect="non-scaling-stroke"
                            />
                        )}
                    </svg>

                    {/* Data Points - HTML elements for perfect circles */}
                    {points.map((point, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                left: `${point.x}%`,
                                top: `${point.y}%`,
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                            }}
                        >
                            {/* Pulse effect for hovered */}
                            {hoveredIndex === i && (
                                <div
                                    className="absolute rounded-full animate-ping"
                                    style={{
                                        width: 18,
                                        height: 18,
                                        left: -9,
                                        top: -9,
                                        backgroundColor: color,
                                        opacity: 0.25
                                    }}
                                />
                            )}
                            {/* Main dot - perfect circle */}
                            <div
                                className="rounded-full transition-all duration-150"
                                style={{
                                    width: hoveredIndex === i ? 12 : 8,
                                    height: hoveredIndex === i ? 12 : 8,
                                    marginLeft: hoveredIndex === i ? -6 : -4,
                                    marginTop: hoveredIndex === i ? -6 : -4,
                                    backgroundColor: hoveredIndex === i ? color : '#fff',
                                    border: `2px solid ${hoveredIndex === i ? color : '#666'}`,
                                    boxShadow: hoveredIndex === i
                                        ? `0 0 0 4px ${color}20, 0 2px 4px rgba(0,0,0,0.1)`
                                        : '0 1px 3px rgba(0,0,0,0.08)',
                                }}
                            />
                        </div>
                    ))}

                    {/* Tooltip */}
                    {hoveredIndex !== null && points[hoveredIndex] && (
                        <div
                            className="absolute bg-charcoal text-white text-xs px-3 py-2 rounded-lg font-dashboard-display shadow-lg z-20 pointer-events-none"
                            style={{
                                left: `${points[hoveredIndex].x}%`,
                                top: `${points[hoveredIndex].y}%`,
                                transform: 'translate(-50%, calc(-100% - 14px))',
                            }}
                        >
                            <div className="flex flex-col items-center gap-0.5">
                                <span className="text-base font-bold" style={{ color }}>
                                    {points[hoveredIndex].value}
                                </span>
                                <span className="text-white/60 text-[10px]">
                                    {unit} • {points[hoveredIndex].label}
                                </span>
                            </div>
                            <div
                                className="absolute left-1/2 -bottom-1.5"
                                style={{
                                    transform: 'translateX(-50%)',
                                    borderLeft: '5px solid transparent',
                                    borderRight: '5px solid transparent',
                                    borderTop: '5px solid #2D2D2D',
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* X Axis Labels */}
                <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs font-dashboard-display text-charcoal/40 h-6 items-center">
                    {data.map((point, i) => (
                        <span
                            key={i}
                            className={`transition-all duration-150 ${hoveredIndex === i ? 'text-charcoal font-semibold' : ''}`}
                        >
                            {point.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Legend / Stats */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-charcoal/10">
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-dashboard-display text-charcoal/50">{unit}</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-dashboard-display">
                    <span className="text-charcoal/50">
                        Total: <strong className="text-charcoal">{data.reduce((sum, d) => sum + d.value, 0)}</strong>
                    </span>
                    <span className="text-charcoal/50">
                        Avg: <strong className="text-charcoal">{Math.round(data.reduce((sum, d) => sum + d.value, 0) / data.length || 0)}</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SketchyLineChart
