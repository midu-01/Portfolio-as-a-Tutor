import { PageHeader } from "@/components/admin/page-header";
import { EducationEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function EducationContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Education"
        title="Update academic background"
        description="Maintain the academic timeline, institution details, and result summaries shown publicly."
      />
      <EducationEditorForm
        initialValues={{
          items: data.education.map((item) => ({
            id: item.id,
            institution: item.institution,
            degree: item.degree,
            period: item.period,
            score: item.score,
            location: item.location ?? "",
            note: item.note ?? "",
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
