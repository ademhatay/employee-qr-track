import { Link } from '@tanstack/react-router'

export function Header() {
    return (
        <nav className="sticky top-0 z-50 w-full px-6 py-4 transition-all duration-300">
            <div className="mx-auto max-w-6xl wiggly-border bg-white/95 backdrop-blur-sm shadow-sketch px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="relative size-8 flex items-center justify-center">
                        <span
                            className="material-symbols-outlined text-4xl text-primary absolute -rotate-12"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}
                        >
                            qr_code_2
                        </span>
                        <span
                            className="material-symbols-outlined text-4xl text-charcoal absolute rotate-6 opacity-70"
                            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                        >
                            qr_code_2
                        </span>
                    </div>
                    <h1 className="font-hand text-2xl font-bold tracking-tight text-charcoal">QR Track</h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <a
                        className="font-display text-sm font-semibold text-charcoal hover:text-primary transition-colors decoration-wavy hover:underline underline-offset-4"
                        href="#features"
                    >
                        Features
                    </a>
                    <a
                        className="font-display text-sm font-semibold text-charcoal hover:text-primary transition-colors decoration-wavy hover:underline underline-offset-4"
                        href="#pricing"
                    >
                        Pricing
                    </a>
                    <a
                        className="font-display text-sm font-semibold text-charcoal hover:text-primary transition-colors decoration-wavy hover:underline underline-offset-4"
                        href="#about"
                    >
                        About Us
                    </a>
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <Link to="/auth/register">
                        <button className="font-hand text-lg font-bold bg-primary text-white px-6 py-2 wiggly-border-sm shadow-sketch hover:shadow-sketch-hover hover:-translate-y-0.5 transition-all duration-200">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button className="p-2 text-charcoal">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
