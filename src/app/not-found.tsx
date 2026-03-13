import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="section-frame max-w-xl p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you requested is not available. Head back to the portfolio home.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
