import { PageHeader } from "@/components/admin/page-header";
import { AboutEditorForm } from "@/components/forms/admin-forms";
import { getAdminData } from "@/lib/data";

export default async function AboutContentPage() {
  const data = await getAdminData();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="About"
        title="Refine your teaching story"
        description="Update the philosophy, guardian communication notes, and the supportive learning environment message."
      />
      <AboutEditorForm
        initialValues={{
          title: data.about.title,
          summary: data.about.summary,
          conceptualApproach: data.about.conceptualApproach,
          guardianCommunication: data.about.guardianCommunication,
          teachingEnvironment: data.about.teachingEnvironment
        }}
      />
    </div>
  );
}
