import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/portfolio/reveal";
import { Badge } from "@/components/ui/badge";

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <Reveal>
        <div className="mb-8 space-y-4 text-center">
          <Badge className="mx-auto w-fit">{eyebrow}</Badge>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
          </div>
        </div>
      </Reveal>
      {children}
    </section>
  );
}
