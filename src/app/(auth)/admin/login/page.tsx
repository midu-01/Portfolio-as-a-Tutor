import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="surface-glow hidden rounded-[2rem] border border-border/70 p-10 shadow-soft lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-5">
            <Badge>Admin Access</Badge>
            <div className="space-y-4">
              <h1 className="font-display text-5xl font-semibold tracking-tight">
                Manage a premium tutor portfolio without editing code.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                Update hero content, achievements, testimonials, section visibility, SEO details,
                and contact information from one polished dashboard.
              </p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border/70 bg-background/70 p-6">
            <p className="text-sm text-muted-foreground">
              After signing in, you can manage public content, upload a profile image, reorder sections,
              and keep the website current without touching the codebase.
            </p>
            <Button asChild variant="outline" className="mt-5">
              <Link href="/">Back to portfolio</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
