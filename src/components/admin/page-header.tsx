import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-card backdrop-blur lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <Badge>{eyebrow}</Badge>
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {action}
    </div>
  );
}
