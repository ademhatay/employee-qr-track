import { Outlet } from '@tanstack/react-router'

export function AuthLayout() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <div className="w-full max-w-sm space-y-4">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Employee QR Track</h1>
                    <p className="text-sm text-muted-foreground">Sign in to your account</p>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
