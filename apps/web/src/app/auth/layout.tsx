import { isAuthenticated } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    if (await isAuthenticated()) {
        redirect('/')
    }
    return (
        <div className="items-center flex min-h-screen flex-col justify-center px-4">
            <div className="w-full max-w-xs">{children}</div>
        </div>
    )
}
