import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto space-y-8 px-4 py-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-orange-500">Tu Primera Chamba</h3>
            <p className="text-sm text-muted-foreground max-w-[45ch]">
              I am hungry and I need to sleep, looking for new opps
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-8">
            <Link
              href="/about"
              className="min-h-[44px] flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="min-h-[44px] flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="min-h-[44px] flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="min-h-[44px] flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground pt-8 border-t">
          © {new Date().getFullYear()} /tp Chamba, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;