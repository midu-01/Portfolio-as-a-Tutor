import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "@/components/portfolio/reveal";
import { Badge } from "@/components/ui/badge";

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <Reveal>
        <div className="mb-8 space-y-4">
          <Badge>{eyebrow}</Badge>
          <div className="max-w-3xl space-y-3">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {description ? (
              <p className="text-base leading-7 text-muted-foreground sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>
      {children}
    </section>
  );
}
