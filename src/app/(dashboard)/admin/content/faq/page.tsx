import { PageHeader } from "@/components/admin/page-header";
import { FaqEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function FaqContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="FAQ"
        title="Manage frequently asked questions"
        description="Add or refine the conversion-friendly FAQ section for common parent and student questions."
      />
      <FaqEditorForm
        initialValues={{
          items: data.faqs.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
