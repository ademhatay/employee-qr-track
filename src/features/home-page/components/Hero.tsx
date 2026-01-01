import { Link } from '@tanstack/react-router'

export function Hero() {
    return (
        <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
            {/* Hand-drawn decorative arrow pointing to content */}
            <div className="absolute top-20 left-10 opacity-20 rotate-12 hidden xl:block pointer-events-none">
                <svg
                    className="text-charcoal"
                    fill="none"
                    height="100"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 100 100"
                    width="100"
                >
                    <path d="M10,10 Q50,50 90,90" strokeDasharray="5,5"></path>
                    <path d="M80,85 L90,90 L85,80"></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <div className="flex flex-col gap-8 text-center lg:text-left relative z-10">
                        <div className="inline-block mx-auto lg:mx-0 rotate-[-2deg]">
                            <span className="bg-yellow-200/50 px-3 py-1 font-hand text-charcoal font-bold text-lg border-2 border-charcoal rounded-full border-dashed transform -rotate-2">
                                ✨ No more paper logs!
                            </span>
                        </div>

                        <h1 className="font-hand text-5xl lg:text-7xl font-bold leading-[0.9] text-charcoal tracking-tight">
                            Time Tracking, <br />
                            <span className="sketch-highlight inline-block mt-2">Simplified</span> with a Scribble
                        </h1>

                        <p className="font-display text-lg lg:text-xl text-charcoal/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            The employee attendance system that feels as easy as paper, but works like magic. Scan, scribble, and
                            you're done.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-4">
                            <div className="relative group">
                                {/* Sketchy arrow pointing to button */}
                                <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none">
                                    <svg
                                        fill="none"
                                        height="40"
                                        stroke="#2D2D2D"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 60 40"
                                        width="60"
                                    >
                                        <path d="M5,20 C15,10 40,30 55,20 M50,15 L55,20 L50,25"></path>
                                    </svg>
                                </div>
                                <Link to="/auth/register">
                                    <button className="relative font-hand text-xl font-bold bg-primary text-white px-8 py-3 wiggly-border shadow-sketch hover:shadow-sketch-hover hover:-translate-y-1 transition-all duration-200 w-full sm:w-auto">
                                        Start Sketching Free
                                    </button>
                                </Link>
                            </div>

                            <a
                                className="font-hand font-bold text-charcoal hover:text-primary flex items-center gap-2 group decoration-wavy underline underline-offset-4"
                                href="#"
                            >
                                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">play_circle</span>
                                See how it works
                            </a>
                        </div>

                        <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm font-display text-charcoal/60">
                            <span className="material-symbols-outlined text-lg">check</span> No credit card required
                            <span className="mx-2">•</span>
                            <span className="material-symbols-outlined text-lg">check</span> 14-day free trial
                        </div>
                    </div>

                    {/* Illustration Content */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                        {/* Background Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

                        <div className="wiggly-border bg-white p-4 shadow-sketch rotate-2 relative">
                            {/* "Tape" effect */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-100/80 border border-charcoal/10 rotate-1 shadow-sm z-20"></div>

                            <div className="bg-paper-pattern aspect-square rounded overflow-hidden relative border-2 border-charcoal border-dashed flex items-center justify-center group">
                                {/* Custom CSS Drawing mimicking the requested illustration */}
                                <div className="relative w-full h-full p-8 flex flex-col items-center justify-center">
                                    {/* Phone */}
                                    <div className="w-32 h-56 border-4 border-charcoal rounded-3xl bg-white relative z-10 transform -rotate-6 shadow-sketch group-hover:rotate-0 transition-transform duration-500">
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-charcoal rounded-full"></div>
                                        <div className="w-full h-full flex items-center justify-center bg-blue-50/50 rounded-2xl overflow-hidden">
                                            <span className="material-symbols-outlined text-6xl text-primary animate-pulse">
                                                qr_code_scanner
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stand (Wooden Kiosk) */}
                                    <div className="w-40 h-4 bg-amber-100 border-2 border-charcoal rounded mt-[-20px] relative z-0 transform rotate-1"></div>
                                    <div className="w-4 h-24 bg-amber-100 border-2 border-charcoal mx-auto relative z-0"></div>
                                    <div className="w-32 h-4 bg-amber-100 border-2 border-charcoal rounded-full mx-auto relative z-0"></div>

                                    {/* Floating Doodle Elements */}
                                    <div className="absolute top-10 right-10 text-primary animate-bounce">
                                        <span className="material-symbols-outlined text-4xl">bolt</span>
                                    </div>
                                    <div className="absolute bottom-10 left-10 text-green-500 animate-pulse delay-100">
                                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
