export function Footer() {
    return (
        <footer className="border-t border-border/40">
            <div className="container flex items-center justify-center h-16">
                <p className="text-sm text-foreground/60">
                    &copy; {new Date().getFullYear()} PurrfectDev. All rights reserved. Made with 🐾 and code.
                </p>
            </div>
        </footer>
    )
}
