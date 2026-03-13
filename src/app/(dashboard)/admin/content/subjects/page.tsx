import { PageHeader } from "@/components/admin/page-header";
import { SubjectsEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function SubjectsContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Subjects"
        title="Manage subjects and subject cards"
        description="Update the subjects you teach, the icons that represent them, and the descriptions that build clarity and trust."
      />
      <SubjectsEditorForm
        initialValues={{
          items: data.subjects.map((item) => ({
            id: item.id,
            title: item.title,
            icon: item.icon,
            description: item.description,
            accent: item.accent,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
