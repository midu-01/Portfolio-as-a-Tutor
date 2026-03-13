import { PageHeader } from "@/components/admin/page-header";
import { SiteSettingsEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function SectionSettingsPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Sections & SEO"
        title="Control section order, visibility, and SEO"
        description="This page manages global branding, structured metadata, media URLs, and which sections appear on the homepage."
      />
      <SiteSettingsEditorForm
        initialValues={{
          siteName: data.siteSettings?.siteName ?? "Midu Mojumder",
          siteTagline: data.siteSettings?.siteTagline ?? "",
          siteDescription: data.siteSettings?.siteDescription ?? "",
          siteUrl: data.siteSettings?.siteUrl ?? "",
          siteLocation: data.siteSettings?.siteLocation ?? "",
          primaryEmail: data.siteSettings?.primaryEmail ?? data.contactInfo.email,
          primaryPhone: data.siteSettings?.primaryPhone ?? data.contactInfo.phone,
          whatsappNumber: data.siteSettings?.whatsappNumber ?? data.contactInfo.whatsapp,
          profileImageUrl: data.siteSettings?.profileImageUrl ?? "",
          ogImageUrl: data.siteSettings?.ogImageUrl ?? "",
          scheduleCallUrl: data.siteSettings?.scheduleCallUrl ?? "",
          seoTitle: data.siteSettings?.seoTitle ?? "",
          seoDescription: data.siteSettings?.seoDescription ?? "",
          yearsExperience: data.siteSettings?.yearsExperience ?? "",
          studentLevelLabel: data.siteSettings?.studentLevelLabel ?? "",
          resultHighlight: data.siteSettings?.resultHighlight ?? "",
          themeAccent: data.siteSettings?.themeAccent ?? "blue",
          sections: data.sections.map((item) => ({
            id: item.id,
            key: item.key,
            title: item.title,
            description: item.description ?? "",
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
