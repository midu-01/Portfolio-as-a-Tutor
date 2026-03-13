import { PageHeader } from "@/components/admin/page-header";
import { HeroEditorForm, ProfileImageUploadForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function HeroContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Hero"
        title="Edit the homepage introduction"
        description="Manage the first impression visitors get, including the main summary, call-to-action buttons, and hero stats."
      />
      <ProfileImageUploadForm
        currentImageUrl={data.siteSettings?.profileImageUrl}
        blobConfigured={Boolean(process.env.BLOB_READ_WRITE_TOKEN)}
      />
      <HeroEditorForm
        initialValues={{
          name: data.hero.name,
          role: data.hero.role,
          badge: data.hero.badge,
          summary: data.hero.summary,
          primaryCtaLabel: data.hero.primaryCtaLabel,
          primaryCtaHref: data.hero.primaryCtaHref,
          secondaryCtaLabel: data.hero.secondaryCtaLabel,
          secondaryCtaHref: data.hero.secondaryCtaHref,
          supportText: data.hero.supportText ?? "",
          heroStats: (data.hero.heroStats ?? []).map((item) => ({
            id: item.id,
            value: item.value,
            label: item.label,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
