"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="top-right"
        richColors
        theme="system"
        toastOptions={{
          className: "rounded-2xl border border-border bg-card text-card-foreground"
        }}
      />
    </ThemeProvider>
  );
}
