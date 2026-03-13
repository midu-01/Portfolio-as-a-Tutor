import { PageHeader } from "@/components/admin/page-header";
import { ExperiencesEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function ExperienceContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Experience"
        title="Manage teaching experience entries"
        description="Showcase one-to-one and group tuition experience, lesson planning details, and exam strategy support."
      />
      <ExperiencesEditorForm
        initialValues={{
          items: data.experiences.map((item) => ({
            id: item.id,
            title: item.title,
            organization: item.organization,
            period: item.period,
            summary: item.summary,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder,
            points: item.points.map((point) => ({
              id: point.id,
              content: point.content,
              sortOrder: point.sortOrder
            }))
          }))
        }}
      />
    </div>
  );
}
