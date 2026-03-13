"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { logoutAction } from "@/actions/auth-actions";
import { IconByName } from "@/components/icon-map";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { adminNavItems } from "@/lib/site-config";

export function DashboardShell({
  children,
  userName,
  userEmail
}: {
  children: ReactNode;
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = (
    <div className="flex h-full flex-col rounded-[2rem] border border-border/70 bg-card/88 p-5 shadow-soft backdrop-blur">
      <div className="space-y-2">
        <p className="font-display text-2xl font-semibold">Admin Panel</p>
        <p className="text-sm text-muted-foreground">
          Manage portfolio content, section visibility, and SEO details.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "interactive flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium",
                isActive
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <IconByName name={item.icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
          <p className="font-medium">{userName}</p>
          <p className="mt-1 text-sm text-muted-foreground">{userEmail}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <form action={logoutAction} className="flex-1">
            <Button type="submit" variant="outline" className="w-full">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[300px_1fr] lg:gap-8">
        <header className="sticky top-4 z-40 mb-4 flex items-center justify-between rounded-[1.75rem] border border-border/70 bg-card/85 p-3 shadow-card backdrop-blur lg:hidden">
          <div>
            <p className="font-display text-lg font-semibold">Admin Panel</p>
            <p className="text-xs text-muted-foreground">{userName}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              aria-label="Open dashboard navigation"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <aside className="hidden lg:block">
          <div className="sticky top-6 h-[calc(100vh-3rem)]">{navigation}</div>
        </aside>

        <AnimatePresence>
          {isMobileOpen ? (
            <motion.div
              className="fixed inset-0 z-50 bg-slate-950/45 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="surface-glow absolute left-0 top-0 h-full w-[88%] max-w-sm p-4"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
              >
                <div className="mb-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Close dashboard navigation"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {navigation}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
