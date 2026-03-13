import { DashboardShell } from "@/components/admin/dashboard-shell";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <DashboardShell
      userName={session.user.name ?? "Admin"}
      userEmail={session.user.email ?? ""}
    >
      {children}
    </DashboardShell>
  );
}
