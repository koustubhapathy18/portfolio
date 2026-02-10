import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} Koustubha Pathy. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <Link href="https://github.com/koustubhapathy18" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/koustubha-pathy-758243332/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    )
}
