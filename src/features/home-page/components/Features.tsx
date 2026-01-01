const features = [
    {
        icon: 'qr_code_scanner',
        title: 'Instant QR Scan',
        description: "Clock in faster than you can write your name. Just a quick scan and you're good.",
        bgColor: 'bg-blue-100',
    },
    {
        icon: 'monitoring',
        title: 'Live Dashboard',
        description: 'See who is here at a glance. Real-time updates without the refresh button.',
        bgColor: 'bg-green-100',
    },
    {
        icon: 'tablet_mac',
        title: 'Kiosk Mode',
        description: 'Turn any tablet into a friendly punch clock. Perfect for the reception desk.',
        bgColor: 'bg-purple-100',
    },
    {
        icon: 'description',
        title: 'Smart Reports',
        description: 'Export payroll data without the erasing. Clean, organized, and ready for HR.',
        bgColor: 'bg-orange-100',
    },
]

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            {/* Background scribble */}
            <div className="absolute top-20 right-0 opacity-5 pointer-events-none">
                <svg fill="none" height="400" stroke="#000" strokeWidth="2" viewBox="0 0 400 400" width="400">
                    <path d="M50,50 Q200,100 350,50 T350,350 T50,350 T50,50" strokeDasharray="10,10"></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-20 relative">
                    <h2 className="font-hand text-5xl font-bold text-charcoal mb-4 relative inline-block">
                        Tools of the Trade
                        {/* Underline squiggle */}
                        <svg
                            className="absolute -bottom-4 left-0 w-full h-4 text-primary"
                            preserveAspectRatio="none"
                            viewBox="0 0 200 15"
                        >
                            <path
                                d="M0,10 Q50,0 100,10 T200,10"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="4"
                            ></path>
                        </svg>
                    </h2>
                    <p className="font-display text-lg text-charcoal/70 max-w-2xl mx-auto mt-6">
                        Everything you need to manage your team's time effectively, sketched out for simplicity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group relative">
                            <div className="absolute inset-0 bg-charcoal translate-x-2 translate-y-2 rounded-lg wiggly-border border-0"></div>
                            <div className="relative h-full bg-white p-6 wiggly-border flex flex-col gap-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:-translate-x-1 border-2 border-charcoal">
                                <div
                                    className={`w-14 h-14 ${feature.bgColor} rounded-full border-2 border-charcoal flex items-center justify-center transform group-hover:rotate-12 transition-transform`}
                                >
                                    <span className="material-symbols-outlined text-3xl text-charcoal">{feature.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-hand text-2xl font-bold text-charcoal mb-2">{feature.title}</h3>
                                    <p className="font-display text-sm text-charcoal/80 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="font-hand text-lg font-bold bg-white text-charcoal border-2 border-charcoal px-8 py-3 wiggly-border shadow-sketch hover:shadow-sketch-hover hover:bg-gray-50 transition-all duration-200">
                        View all features
                    </button>
                </div>
            </div>
        </section>
    )
}
