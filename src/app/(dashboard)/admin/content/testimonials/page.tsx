import { PageHeader } from "@/components/admin/page-header";
import { TestimonialsEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function TestimonialsContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Testimonials"
        title="Manage testimonial cards"
        description="Add, edit, hide, or reorder student and guardian testimonials with ratings and outcome labels."
      />
      <TestimonialsEditorForm
        initialValues={{
          items: data.testimonials.map((item) => ({
            id: item.id,
            name: item.name,
            role: item.role,
            quote: item.quote,
            result: item.result ?? "",
            rating: item.rating,
            isVisible: item.isVisible,
            sortOrder: item.sortOrder
          }))
        }}
      />
    </div>
  );
}
