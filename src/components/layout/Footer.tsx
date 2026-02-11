import Link from "next/link"
import { ShieldCheck, Rocket } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background py-8">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-muted-foreground text-center md:text-left order-2 md:order-1">
                    &copy; {new Date().getFullYear()} Koustubha Pathy. All rights reserved.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 hover:text-primary transition-colors cursor-default order-1 md:order-2">
                    <ShieldCheck size={15} className="text-primary/70" />
                    <span className="font-medium">Building secure infrastructures with an explorer&apos;s mindset</span>
                    <Rocket size={15} className="text-primary/70" />
                </div>
            </div>
        </footer>
    )
}
