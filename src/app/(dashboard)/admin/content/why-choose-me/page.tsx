import { PageHeader } from "@/components/admin/page-header";
import { WhyChooseMeEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function WhyChooseMeContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Why Choose Me"
        title="Manage trust-building reasons"
        description="Control the reasons students and guardians should feel confident choosing this tutoring service."
      />
      <WhyChooseMeEditorForm
        initialValues={{
          items: data.whyChooseMe.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            icon: item.icon,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
