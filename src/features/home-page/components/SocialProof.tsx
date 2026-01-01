export function SocialProof() {
    return (
        <section className="py-16 bg-white border-y-2 border-charcoal border-dashed">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="relative p-10 bg-paper wiggly-border shadow-sketch mx-auto max-w-3xl transform -rotate-1">
                    {/* Quote Icon */}
                    <div className="absolute -top-6 -left-4 bg-primary text-white w-12 h-12 flex items-center justify-center wiggly-border-sm shadow-sketch z-10">
                        <span className="material-symbols-outlined text-2xl">format_quote</span>
                    </div>

                    <div className="text-center flex flex-col gap-6">
                        <h2 className="font-hand text-3xl lg:text-4xl font-bold leading-tight text-charcoal">
                            "Finally, time tracking that doesn't feel like a corporate spreadsheet."
                        </h2>

                        <div className="flex items-center justify-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full border-2 border-charcoal bg-gray-200 overflow-hidden shadow-sm"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjtrh5DUMmVoxY0DZvp5MW-TBhSWzBn1hz2bZt8o-rB9jPN27qGPzVUIx5iOui2-dfAL8nm84Kf7RQV_n7hnplsnEBU7U9G4cdyLMs2wHhyTCFwSCss8PmL81te4vhFOi4BuS6V8cWv4BLu7A6BRDliVVHQ4CcQ3A5Cpjw1RKqTLUGHmtP-_JSYDvrPnOPawnXaII89yTW2BHQ3JSUuruaJX53N_MjgCnKVV81T8oN8oN3IVQoSJaOUdAHJVByFACxsfZJFMObnA')",
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                            <div className="text-left">
                                <div className="font-bold font-hand text-xl text-charcoal">Sarah Jenkins</div>
                                <div className="text-sm font-display font-medium text-charcoal/70">HR Manager @ CreativeCo</div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative corner doodles */}
                    <svg
                        className="absolute bottom-2 right-2 w-12 h-12 text-charcoal/20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        viewBox="0 0 100 100"
                    >
                        <path d="M20,80 Q50,20 80,80"></path>
                        <path d="M20,50 Q80,50 80,50"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}
