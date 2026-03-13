import { PageHeader } from "@/components/admin/page-header";
import { HighlightsEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function HighlightsContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Highlights"
        title="Manage extra achievements and leadership"
        description="Control the additional highlights section, including university offers, Olympiad ranking, programming, and leadership roles."
      />
      <HighlightsEditorForm
        initialValues={{
          items: data.highlights.map((item) => ({
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
