import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminNavItems } from "@/lib/site-config";
import { getAdminData } from "@/lib/data";

export default async function AdminOverviewPage() {
  const data = await getAdminData();

  const stats = [
    { label: "Visible sections", value: data.dashboardStats.visibleSections },
    { label: "Subjects", value: data.dashboardStats.totalSubjects },
    { label: "Testimonials", value: data.dashboardStats.totalTestimonials },
    { label: "New inquiries", value: data.dashboardStats.newInquiries }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Overview"
        title="Portfolio content dashboard"
        description="Manage every public-facing part of the portfolio, monitor fresh inquiries, and keep the content aligned with your teaching progress."
        action={
          <Button asChild>
            <Link href="/" target="_blank" rel="noreferrer">
              View live site
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-3 font-display text-4xl">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Content management</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {adminNavItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-primary/30"
              >
                <p className="font-medium">{item.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Open the editor for this section.
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent inquiries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.inquiries.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-border/70 p-5 text-sm text-muted-foreground">
                No inquiries yet. New messages from the contact form will show up here.
              </div>
            ) : (
              data.inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    </div>
                    <Badge>{inquiry.status}</Badge>
                  </div>
                  {inquiry.subject ? (
                    <p className="mt-3 text-sm font-medium text-foreground/80">
                      {inquiry.subject}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {inquiry.message}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
