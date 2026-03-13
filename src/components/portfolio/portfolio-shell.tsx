"use client";

import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IconByName } from "@/components/icon-map";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollspy } from "@/hooks/use-scrollspy";

type SidebarSection = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: string;
};

export function PortfolioShell({
  children,
  siteName,
  siteTagline,
  sections,
  socialLinks
}: {
  children: ReactNode;
  siteName: string;
  siteTagline: string;
  sections: SidebarSection[];
  socialLinks: SocialLink[];
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const activeId = useScrollspy(sections.map((section) => section.id));

  useEffect(() => {
    const savedState = window.localStorage.getItem("portfolio-sidebar-collapsed");
    setIsCollapsed(savedState === "true");
  }, []);

  const sidebarWidth = isCollapsed ? "5.5rem" : "18.5rem";

  const handleNavClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileOpen(false);
  };

  const socialPreview = useMemo(() => socialLinks.slice(0, 3), [socialLinks]);

  return (
    <div
      className="min-h-screen px-4 py-4 sm:px-6 lg:px-8"
      style={
        {
          "--sidebar-width": sidebarWidth
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-[1600px] lg:grid lg:grid-cols-[var(--sidebar-width)_1fr] lg:gap-8">
        <header className="sticky top-4 z-40 mb-4 flex items-center justify-between rounded-[1.75rem] border border-border/70 bg-card/85 p-3 shadow-card backdrop-blur lg:hidden">
          <div>
            <p className="font-display text-lg font-semibold">{siteName}</p>
            <p className="text-xs text-muted-foreground">{siteTagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              aria-label="Open navigation"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <aside className="hidden lg:block">
          <div
            className={cn(
              "sticky top-6 h-[calc(100vh-3rem)] overflow-hidden rounded-[2rem] border border-border/70 bg-card/88 p-4 shadow-soft backdrop-blur transition-all duration-300",
              isCollapsed ? "px-3" : "px-5"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className={cn("min-w-0", isCollapsed && "hidden")}>
                <Link href="/" className="font-display text-2xl font-semibold">
                  {siteName}
                </Link>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {siteTagline}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  onClick={() => {
                    const nextState = !isCollapsed;
                    setIsCollapsed(nextState);
                    window.localStorage.setItem(
                      "portfolio-sidebar-collapsed",
                      String(nextState)
                    );
                  }}
                >
                  {isCollapsed ? (
                    <PanelLeftOpen className="h-4 w-4" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4" />
                  )}
                </Button>
                <ThemeToggle />
              </div>
            </div>

            <nav className="mt-8 space-y-2">
              {sections.map((section) => {
                const isActive = activeId === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => handleNavClick(section.id)}
                    className={cn(
                      "interactive flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left",
                      isActive
                        ? "bg-primary/12 text-primary"
                        : "text-muted-foreground hover:bg-accent/70 hover:text-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border",
                        isActive
                          ? "border-primary/30 bg-primary/10"
                          : "border-border/70 bg-background/60"
                      )}
                    >
                      <IconByName name={section.icon} className="h-4 w-4" />
                    </span>
                    <span className={cn("min-w-0", isCollapsed && "hidden")}>
                      <span className="block text-sm font-semibold">{section.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {section.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className={cn("mt-auto pt-6", isCollapsed && "hidden")}>
              <div className="rounded-[1.75rem] border border-border/70 bg-background/75 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Quick Links
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socialPreview.map((item) => (
                    <Button key={item.id} asChild size="sm" variant="outline">
                      <a href={item.url} target="_blank" rel="noreferrer">
                        <IconByName name={item.icon} className="h-4 w-4" />
                        {item.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
                className="surface-glow absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-r border-border p-5"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-2xl font-semibold">{siteName}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{siteTagline}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Close navigation"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <nav className="mt-8 space-y-2">
                  {sections.map((section) => {
                    const isActive = activeId === section.id;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => handleNavClick(section.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left",
                          isActive
                            ? "bg-primary/12 text-primary"
                            : "text-muted-foreground hover:bg-accent/70 hover:text-foreground"
                        )}
                      >
                        <IconByName name={section.icon} className="h-4 w-4" />
                        <span>{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="space-y-6 lg:space-y-8">{children}</main>
      </div>
    </div>
  );
}
