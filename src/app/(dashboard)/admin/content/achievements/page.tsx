import { PageHeader } from "@/components/admin/page-header";
import { AchievementsEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function AchievementsContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Achievements"
        title="Highlight student outcomes and trust signals"
        description="Curate the achievements section with strong results, Olympiad success, GPA performance, and guardian praise."
      />
      <AchievementsEditorForm
        initialValues={{
          items: data.achievements.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            metric: item.metric ?? "",
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
