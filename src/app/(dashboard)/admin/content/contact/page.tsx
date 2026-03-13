import { PageHeader } from "@/components/admin/page-header";
import { ContactEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function ContactContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Contact"
        title="Manage contact details and quick actions"
        description="Update the inquiry section, WhatsApp CTA, contact details, and social links shown across the site."
      />
      <ContactEditorForm
        initialValues={{
          email: data.contactInfo.email,
          phone: data.contactInfo.phone,
          whatsapp: data.contactInfo.whatsapp,
          location: data.contactInfo.location,
          formTitle: data.contactInfo.formTitle,
          formDescription: data.contactInfo.formDescription,
          availability: data.contactInfo.availability,
          socialLinks: data.siteSettings?.socialLinks.map((item) => ({
            id: item.id,
            label: item.label,
            platform: item.platform,
            url: item.url,
            icon: item.icon,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          })) ?? []
        }}
      />
    </div>
  );
}
