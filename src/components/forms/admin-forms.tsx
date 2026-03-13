"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDown,
  ArrowUp,
  ImageUp,
  Loader2,
  Plus,
  Save,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type UseFormReturn,
  type UseFormRegister,
  useFieldArray,
  useForm
} from "react-hook-form";
import { toast } from "sonner";

import {
  updateAboutSectionAction,
  updateAchievementsAction,
  updateContactInfoAction,
  updateEducationAction,
  updateExperiencesAction,
  updateFaqsAction,
  updateHeroSectionAction,
  updateHighlightsAction,
  updateSiteSettingsAction,
  updateSubjectsAction,
  updateTestimonialsAction,
  updateWhyChooseMeAction,
  uploadProfileImageAction
} from "@/actions/content-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sectionMeta } from "@/lib/site-config";
import {
  aboutSectionSchema,
  achievementsFormSchema,
  contactInfoSchema,
  educationFormSchema,
  experiencesFormSchema,
  faqsFormSchema,
  heroSectionSchema,
  highlightsFormSchema,
  siteSettingsSchema,
  subjectsFormSchema,
  testimonialsFormSchema,
  whyChooseMeFormSchema,
  type AboutSectionInput,
  type AchievementsFormInput,
  type ContactInfoInput,
  type EducationFormInput,
  type ExperiencesFormInput,
  type FaqsFormInput,
  type HeroSectionInput,
  type HighlightsFormInput,
  type SiteSettingsInput,
  type SubjectsFormInput,
  type TestimonialsFormInput,
  type WhyChooseMeFormInput
} from "@/lib/validators";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}

function CheckboxField({
  checked,
  onCheckedChange,
  label
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-muted-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
      />
      {label}
    </label>
  );
}

function SaveButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      Save changes
    </Button>
  );
}

function normalizeItems<T extends Record<string, unknown>>(
  items: T[]
): Array<T & { sortOrder: number }> {
  return items.map((item, index) => ({
    ...item,
    sortOrder: index
  }));
}

function SectionCard({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}

function ItemCard({
  title,
  children,
  onMoveUp,
  onMoveDown,
  onRemove
}: {
  title: string;
  children: React.ReactNode;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-background/60 p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-display text-xl">{title}</h3>
        <div className="flex items-center gap-2">
          <Button type="button" size="icon" variant="outline" onClick={onMoveUp}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="outline" onClick={onMoveDown}>
            <ArrowDown className="h-4 w-4" />
          </Button>
          {onRemove ? (
            <Button type="button" size="icon" variant="outline" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export function ProfileImageUploadForm({
  currentImageUrl
}: {
  currentImageUrl?: string | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fileName, setFileName] = useState("");

  return (
    <SectionCard
      title="Profile image"
      description="Upload a polished portrait using Vercel Blob storage."
    >
      {currentImageUrl ? (
        <p className="text-sm text-muted-foreground">Current image: {currentImageUrl}</p>
      ) : (
        <p className="text-sm text-muted-foreground">No profile image uploaded yet.</p>
      )}
      <form
        action={(formData) => {
          startTransition(async () => {
            const result = await uploadProfileImageAction(formData);

            if (!result.success) {
              toast.error(result.message);
              return;
            }

            toast.success(result.message);
            router.refresh();
          });
        }}
        className="space-y-4"
      >
        <Input
          type="file"
          name="file"
          accept="image/*"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
        />
        {fileName ? <p className="text-sm text-muted-foreground">{fileName}</p> : null}
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
          Upload image
        </Button>
      </form>
    </SectionCard>
  );
}

export function HeroEditorForm({ initialValues }: { initialValues: HeroSectionInput }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<HeroSectionInput>({
    resolver: zodResolver(heroSectionSchema),
    defaultValues: initialValues
  });
  const stats = useFieldArray({
    control: form.control,
    name: "heroStats"
  });

  const onSubmit = (values: HeroSectionInput) => {
    startTransition(async () => {
      const result = await updateHeroSectionAction({
        ...values,
        heroStats: normalizeItems<NonNullable<HeroSectionInput["heroStats"]>[number]>(
          values.heroStats
        )
      });
      toast.success(result.message);
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <SectionCard title="Hero content" description="Main homepage introduction and CTAs.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input {...form.register("name")} />
            <FieldError message={form.formState.errors.name?.message} />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input {...form.register("role")} />
            <FieldError message={form.formState.errors.role?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Badge</Label>
          <Input {...form.register("badge")} />
          <FieldError message={form.formState.errors.badge?.message} />
        </div>

        <div className="space-y-2">
          <Label>Summary</Label>
          <Textarea {...form.register("summary")} />
          <FieldError message={form.formState.errors.summary?.message} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Primary CTA label</Label>
            <Input {...form.register("primaryCtaLabel")} />
          </div>
          <div className="space-y-2">
            <Label>Primary CTA href</Label>
            <Input {...form.register("primaryCtaHref")} />
          </div>
          <div className="space-y-2">
            <Label>Secondary CTA label</Label>
            <Input {...form.register("secondaryCtaLabel")} />
          </div>
          <div className="space-y-2">
            <Label>Secondary CTA href</Label>
            <Input {...form.register("secondaryCtaHref")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Support text</Label>
          <Input {...form.register("supportText")} />
        </div>
      </SectionCard>

      <SectionCard title="Hero stats" description="These appear as premium badges below the main hero.">
        <div className="space-y-4">
          {stats.fields.map((field, index) => (
            <ItemCard
              key={field.id}
              title={`Stat ${index + 1}`}
              onMoveUp={() => index > 0 && stats.move(index, index - 1)}
              onMoveDown={() => index < stats.fields.length - 1 && stats.move(index, index + 1)}
              onRemove={() => stats.remove(index)}
            >
              <input type="hidden" {...form.register(`heroStats.${index}.id`)} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input {...form.register(`heroStats.${index}.value`)} />
                </div>
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input {...form.register(`heroStats.${index}.label`)} />
                </div>
              </div>
              <Controller
                control={form.control}
                name={`heroStats.${index}.isVisible`}
                render={({ field: controllerField }) => (
                  <CheckboxField
                    checked={!!controllerField.value}
                    onCheckedChange={controllerField.onChange}
                    label="Visible on homepage"
                  />
                )}
              />
            </ItemCard>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            stats.append({
              value: "",
              label: "",
              isVisible: true,
              sortOrder: stats.fields.length
            })
          }
        >
          <Plus className="h-4 w-4" />
          Add stat
        </Button>
      </SectionCard>

      <SaveButton isPending={isPending} />
    </form>
  );
}

export function AboutEditorForm({ initialValues }: { initialValues: AboutSectionInput }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<AboutSectionInput>({
    resolver: zodResolver(aboutSectionSchema),
    defaultValues: initialValues
  });

  const onSubmit = (values: AboutSectionInput) => {
    startTransition(async () => {
      const result = await updateAboutSectionAction(values);
      toast.success(result.message);
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <SectionCard title="About section" description="Your story, teaching philosophy, and guardian trust notes.">
        <div className="space-y-2">
          <Label>Section title</Label>
          <Input {...form.register("title")} />
        </div>
        <div className="space-y-2">
          <Label>Summary</Label>
          <Textarea {...form.register("summary")} />
        </div>
        <div className="space-y-2">
          <Label>Conceptual approach</Label>
          <Textarea {...form.register("conceptualApproach")} />
        </div>
        <div className="space-y-2">
          <Label>Guardian communication</Label>
          <Textarea {...form.register("guardianCommunication")} />
        </div>
        <div className="space-y-2">
          <Label>Teaching environment</Label>
          <Textarea {...form.register("teachingEnvironment")} />
        </div>
      </SectionCard>
      <SaveButton isPending={isPending} />
    </form>
  );
}

function SubjectsFormFields({
  control,
  register,
  errors
}: {
  control: Control<SubjectsFormInput>;
  register: UseFormRegister<SubjectsFormInput>;
  errors: FieldErrors<SubjectsFormInput>;
}) {
  const items = useFieldArray({
    control,
    name: "items"
  });

  return (
    <SectionCard title="Subjects" description="Add, edit, hide, or reorder the subject cards shown publicly.">
      <div className="space-y-4">
        {items.fields.map((field, index) => (
          <ItemCard
            key={field.id}
            title={`Subject ${index + 1}`}
            onMoveUp={() => index > 0 && items.move(index, index - 1)}
            onMoveDown={() => index < items.fields.length - 1 && items.move(index, index + 1)}
            onRemove={() => items.remove(index)}
          >
            <input type="hidden" {...register(`items.${index}.id`)} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...register(`items.${index}.title`)} />
                <FieldError message={errors.items?.[index]?.title?.message} />
              </div>
              <div className="space-y-2">
                <Label>Icon name</Label>
                <Input {...register(`items.${index}.icon`)} placeholder="Calculator" />
                <FieldError message={errors.items?.[index]?.icon?.message} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea {...register(`items.${index}.description`)} />
            </div>
            <div className="space-y-2">
              <Label>Accent gradient classes</Label>
              <Input {...register(`items.${index}.accent`)} />
            </div>
            <Controller
              control={control}
              name={`items.${index}.isVisible`}
              render={({ field }) => (
                <CheckboxField
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  label="Visible on homepage"
                />
              )}
            />
          </ItemCard>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          items.append({
            title: "",
            icon: "Sparkles",
            description: "",
            accent: "from-sky-500/20 to-cyan-400/10",
            isVisible: true,
            sortOrder: items.fields.length
          })
        }
      >
        <Plus className="h-4 w-4" />
        Add subject
      </Button>
    </SectionCard>
  );
}

export function SubjectsEditorForm({ initialValues }: { initialValues: SubjectsFormInput }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SubjectsFormInput>({
    resolver: zodResolver(subjectsFormSchema),
    defaultValues: initialValues
  });

  const onSubmit = (values: SubjectsFormInput) => {
    startTransition(async () => {
      const result = await updateSubjectsAction({
        items: normalizeItems<NonNullable<SubjectsFormInput["items"]>[number]>(values.items)
      });
      toast.success(result.message);
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <SubjectsFormFields
        control={form.control}
        register={form.register}
        errors={form.formState.errors}
      />
      <SaveButton isPending={isPending} />
    </form>
  );
}

function ExperienceItemFields({
  index,
  control,
  register,
  remove,
  moveUp,
  moveDown,
  errors
}: {
  index: number;
  control: Control<ExperiencesFormInput>;
  register: UseFormRegister<ExperiencesFormInput>;
  remove: () => void;
  moveUp: () => void;
  moveDown: () => void;
  errors: FieldErrors<ExperiencesFormInput>;
}) {
  const points = useFieldArray({
    control,
    name: `items.${index}.points`
  });

  return (
    <ItemCard
      title={`Experience ${index + 1}`}
      onMoveUp={moveUp}
      onMoveDown={moveDown}
      onRemove={remove}
    >
      <input type="hidden" {...register(`items.${index}.id`)} />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input {...register(`items.${index}.title`)} />
        </div>
        <div className="space-y-2">
          <Label>Organization / subtitle</Label>
          <Input {...register(`items.${index}.organization`)} />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Period</Label>
          <Input {...register(`items.${index}.period`)} />
        </div>
        <Controller
          control={control}
          name={`items.${index}.isVisible`}
          render={({ field }) => (
            <CheckboxField
              checked={!!field.value}
              onCheckedChange={field.onChange}
              label="Visible on homepage"
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Textarea {...register(`items.${index}.summary`)} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Experience points</Label>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() =>
              points.append({
                content: "",
                sortOrder: points.fields.length
              })
            }
          >
            <Plus className="h-4 w-4" />
            Add point
          </Button>
        </div>

        {points.fields.map((field, pointIndex) => (
          <div
            key={field.id}
            className="rounded-[1.25rem] border border-border/70 bg-card/80 p-4"
          >
            <input type="hidden" {...register(`items.${index}.points.${pointIndex}.id`)} />
            <div className="flex items-center gap-2">
              <Input {...register(`items.${index}.points.${pointIndex}.content`)} />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() =>
                  pointIndex > 0 && points.move(pointIndex, pointIndex - 1)
                }
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() =>
                  pointIndex < points.fields.length - 1 &&
                  points.move(pointIndex, pointIndex + 1)
                }
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => points.remove(pointIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ItemCard>
  );
}

export function ExperiencesEditorForm({
  initialValues
}: {
  initialValues: ExperiencesFormInput;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ExperiencesFormInput>({
    resolver: zodResolver(experiencesFormSchema),
    defaultValues: initialValues
  });
  const items = useFieldArray({
    control: form.control,
    name: "items" as never
  });

  const onSubmit = (values: ExperiencesFormInput) => {
    startTransition(async () => {
      const result = await updateExperiencesAction({
        items: normalizeItems<NonNullable<ExperiencesFormInput["items"]>[number]>(
          values.items
        ).map((item) => ({
          ...item,
          points: normalizeItems<
            NonNullable<ExperiencesFormInput["items"]>[number]["points"][number]
          >(item.points)
        }))
      });
      toast.success(result.message);
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <SectionCard title="Teaching experience" description="Manage timeline entries and supporting bullet points.">
        <div className="space-y-4">
          {items.fields.map((field, index) => (
            <ExperienceItemFields
              key={field.id}
              index={index}
              control={form.control}
              register={form.register}
              remove={() => items.remove(index)}
              moveUp={() => index > 0 && items.move(index, index - 1)}
              moveDown={() => index < items.fields.length - 1 && items.move(index, index + 1)}
              errors={form.formState.errors}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            items.append({
              title: "",
              organization: "",
              period: "",
              summary: "",
              isVisible: true,
              sortOrder: items.fields.length,
              points: [{ content: "", sortOrder: 0 }]
            })
          }
        >
          <Plus className="h-4 w-4" />
          Add experience
        </Button>
      </SectionCard>
      <SaveButton isPending={isPending} />
    </form>
  );
}

function SimpleCollectionForm<
  TForm extends FieldValues & {
    items: Array<{ id?: string; isVisible?: boolean; sortOrder?: number }>;
  }
>({
  title,
  description,
  form,
  renderItem,
  addItem,
  submit
}: {
  title: string;
  description: string;
  form: UseFormReturn<TForm>;
  renderItem: (index: number, moveUp: () => void, moveDown: () => void, remove: () => void) => React.ReactNode;
  addItem: () => void;
  submit: (values: TForm) => Promise<{ success: boolean; message: string }>;
}) {
  const [isPending, startTransition] = useTransition();
  const items = useFieldArray({
    control: form.control,
    name: "items" as never
  });

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit((values) =>
        startTransition(async () => {
          const result = await submit({
            ...values,
            items: normalizeItems(values.items)
          } as TForm);
          toast.success(result.message);
        })
      )}
    >
      <SectionCard title={title} description={description}>
        <div className="space-y-4">
          {items.fields.map((field, index) => (
            <div key={field.id}>
              {renderItem(
                index,
                () => index > 0 && items.move(index, index - 1),
                () => index < items.fields.length - 1 && items.move(index, index + 1),
                () => items.remove(index)
              )}
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" onClick={addItem}>
          <Plus className="h-4 w-4" />
          Add item
        </Button>
      </SectionCard>
      <SaveButton isPending={isPending} />
    </form>
  );
}

export function AchievementsEditorForm({
  initialValues
}: {
  initialValues: AchievementsFormInput;
}) {
  const form = useForm<AchievementsFormInput>({
    resolver: zodResolver(achievementsFormSchema),
    defaultValues: initialValues
  });

  return (
    <SimpleCollectionForm
      title="Achievements"
      description="Curate the result-oriented trust signals shown on the homepage."
      form={form}
      submit={updateAchievementsAction}
      addItem={() =>
        form.setValue("items", [
          ...form.getValues("items"),
          {
            title: "",
            description: "",
            metric: "",
            isVisible: true,
            sortOrder: form.getValues("items").length
          }
        ])
      }
      renderItem={(index, moveUp, moveDown, remove) => (
        <ItemCard
          title={`Achievement ${index + 1}`}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
        >
          <input type="hidden" {...form.register(`items.${index}.id`)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Metric</Label>
              <Input {...form.register(`items.${index}.metric`)} />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...form.register(`items.${index}.title`)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...form.register(`items.${index}.description`)} />
          </div>
          <Controller
            control={form.control}
            name={`items.${index}.isVisible`}
            render={({ field }) => (
              <CheckboxField
                checked={!!field.value}
                onCheckedChange={field.onChange}
                label="Visible on homepage"
              />
            )}
          />
        </ItemCard>
      )}
    />
  );
}

export function WhyChooseMeEditorForm({
  initialValues
}: {
  initialValues: WhyChooseMeFormInput;
}) {
  const form = useForm<WhyChooseMeFormInput>({
    resolver: zodResolver(whyChooseMeFormSchema),
    defaultValues: initialValues
  });

  return (
    <SimpleCollectionForm
      title="Why choose me"
      description="Trust-building reasons for guardians and students."
      form={form}
      submit={updateWhyChooseMeAction}
      addItem={() =>
        form.setValue("items", [
          ...form.getValues("items"),
          {
            title: "",
            description: "",
            icon: "Sparkles",
            isVisible: true,
            sortOrder: form.getValues("items").length
          }
        ])
      }
      renderItem={(index, moveUp, moveDown, remove) => (
        <ItemCard
          title={`Reason ${index + 1}`}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
        >
          <input type="hidden" {...form.register(`items.${index}.id`)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...form.register(`items.${index}.title`)} />
            </div>
            <div className="space-y-2">
              <Label>Icon name</Label>
              <Input {...form.register(`items.${index}.icon`)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...form.register(`items.${index}.description`)} />
          </div>
          <Controller
            control={form.control}
            name={`items.${index}.isVisible`}
            render={({ field }) => (
              <CheckboxField
                checked={!!field.value}
                onCheckedChange={field.onChange}
                label="Visible on homepage"
              />
            )}
          />
        </ItemCard>
      )}
    />
  );
}

export function EducationEditorForm({
  initialValues
}: {
  initialValues: EducationFormInput;
}) {
  const form = useForm<EducationFormInput>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: initialValues
  });

  return (
    <SimpleCollectionForm
      title="Education"
      description="Academic timeline entries and performance details."
      form={form}
      submit={updateEducationAction}
      addItem={() =>
        form.setValue("items", [
          ...form.getValues("items"),
          {
            institution: "",
            degree: "",
            period: "",
            score: "",
            location: "",
            note: "",
            isVisible: true,
            sortOrder: form.getValues("items").length
          }
        ])
      }
      renderItem={(index, moveUp, moveDown, remove) => (
        <ItemCard
          title={`Education ${index + 1}`}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
        >
          <input type="hidden" {...form.register(`items.${index}.id`)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input {...form.register(`items.${index}.institution`)} />
            </div>
            <div className="space-y-2">
              <Label>Degree / group</Label>
              <Input {...form.register(`items.${index}.degree`)} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Period</Label>
              <Input {...form.register(`items.${index}.period`)} />
            </div>
            <div className="space-y-2">
              <Label>Score</Label>
              <Input {...form.register(`items.${index}.score`)} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input {...form.register(`items.${index}.location`)} />
            </div>
            <div className="space-y-2">
              <Label>Extra note</Label>
              <Input {...form.register(`items.${index}.note`)} />
            </div>
          </div>
          <Controller
            control={form.control}
            name={`items.${index}.isVisible`}
            render={({ field }) => (
              <CheckboxField
                checked={!!field.value}
                onCheckedChange={field.onChange}
                label="Visible on homepage"
              />
            )}
          />
        </ItemCard>
      )}
    />
  );
}

export function HighlightsEditorForm({
  initialValues
}: {
  initialValues: HighlightsFormInput;
}) {
  const form = useForm<HighlightsFormInput>({
    resolver: zodResolver(highlightsFormSchema),
    defaultValues: initialValues
  });

  return (
    <SimpleCollectionForm
      title="Highlights"
      description="Additional achievements, leadership, and academic distinctions."
      form={form}
      submit={updateHighlightsAction}
      addItem={() =>
        form.setValue("items", [
          ...form.getValues("items"),
          {
            title: "",
            description: "",
            icon: "Star",
            isVisible: true,
            sortOrder: form.getValues("items").length
          }
        ])
      }
      renderItem={(index, moveUp, moveDown, remove) => (
        <ItemCard
          title={`Highlight ${index + 1}`}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
        >
          <input type="hidden" {...form.register(`items.${index}.id`)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...form.register(`items.${index}.title`)} />
            </div>
            <div className="space-y-2">
              <Label>Icon name</Label>
              <Input {...form.register(`items.${index}.icon`)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea {...form.register(`items.${index}.description`)} />
          </div>
          <Controller
            control={form.control}
            name={`items.${index}.isVisible`}
            render={({ field }) => (
              <CheckboxField
                checked={!!field.value}
                onCheckedChange={field.onChange}
                label="Visible on homepage"
              />
            )}
          />
        </ItemCard>
      )}
    />
  );
}

export function TestimonialsEditorForm({
  initialValues
}: {
  initialValues: TestimonialsFormInput;
}) {
  const form = useForm<TestimonialsFormInput>({
    resolver: zodResolver(testimonialsFormSchema),
    defaultValues: initialValues
  });

  return (
    <SimpleCollectionForm
      title="Testimonials"
      description="Seeded placeholders can be replaced with real student or guardian feedback."
      form={form}
      submit={updateTestimonialsAction}
      addItem={() =>
        form.setValue("items", [
          ...form.getValues("items"),
          {
            name: "",
            role: "",
            quote: "",
            result: "",
            rating: 5,
            isVisible: true,
            sortOrder: form.getValues("items").length
          }
        ])
      }
      renderItem={(index, moveUp, moveDown, remove) => (
        <ItemCard
          title={`Testimonial ${index + 1}`}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
        >
          <input type="hidden" {...form.register(`items.${index}.id`)} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input {...form.register(`items.${index}.name`)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input {...form.register(`items.${index}.role`)} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Result label</Label>
              <Input {...form.register(`items.${index}.result`)} />
            </div>
            <div className="space-y-2">
              <Label>Rating</Label>
              <Input
                type="number"
                min={1}
                max={5}
                {...form.register(`items.${index}.rating`, {
                  valueAsNumber: true
                })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Quote</Label>
            <Textarea {...form.register(`items.${index}.quote`)} />
          </div>
          <Controller
            control={form.control}
            name={`items.${index}.isVisible`}
            render={({ field }) => (
              <CheckboxField
                checked={!!field.value}
                onCheckedChange={field.onChange}
                label="Visible on homepage"
              />
            )}
          />
        </ItemCard>
      )}
    />
  );
}

export function ContactEditorForm({
  initialValues
}: {
  initialValues: ContactInfoInput;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactInfoInput>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: initialValues
  });
  const socialLinks = useFieldArray({
    control: form.control,
    name: "socialLinks"
  });

  const onSubmit = (values: ContactInfoInput) => {
    startTransition(async () => {
      const result = await updateContactInfoAction({
        ...values,
        socialLinks: normalizeItems<NonNullable<ContactInfoInput["socialLinks"]>[number]>(
          values.socialLinks ?? []
        )
      });
      toast.success(result.message);
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <SectionCard title="Contact info" description="Public contact details and inquiry section copy.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input {...form.register("phone")} />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp</Label>
            <Input {...form.register("whatsapp")} />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...form.register("location")} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Form title</Label>
          <Input {...form.register("formTitle")} />
        </div>
        <div className="space-y-2">
          <Label>Form description</Label>
          <Textarea {...form.register("formDescription")} />
        </div>
        <div className="space-y-2">
          <Label>Availability note</Label>
          <Input {...form.register("availability")} />
        </div>
      </SectionCard>

      <SectionCard title="Social links" description="Quick-action buttons in the sidebar and contact section.">
        <div className="space-y-4">
          {socialLinks.fields.map((field, index) => (
            <ItemCard
              key={field.id}
              title={`Link ${index + 1}`}
              onMoveUp={() => index > 0 && socialLinks.move(index, index - 1)}
              onMoveDown={() =>
                index < socialLinks.fields.length - 1 && socialLinks.move(index, index + 1)
              }
              onRemove={() => socialLinks.remove(index)}
            >
              <input type="hidden" {...form.register(`socialLinks.${index}.id`)} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input {...form.register(`socialLinks.${index}.label`)} />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Input {...form.register(`socialLinks.${index}.platform`)} />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input {...form.register(`socialLinks.${index}.url`)} />
                </div>
                <div className="space-y-2">
                  <Label>Icon name</Label>
                  <Input {...form.register(`socialLinks.${index}.icon`)} />
                </div>
              </div>
              <Controller
                control={form.control}
                name={`socialLinks.${index}.isVisible`}
                render={({ field }) => (
                  <CheckboxField
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    label="Visible on homepage"
                  />
                )}
              />
            </ItemCard>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            socialLinks.append({
              label: "",
              platform: "",
              url: "",
              icon: "Mail",
              isVisible: true,
              sortOrder: socialLinks.fields.length
            })
          }
        >
          <Plus className="h-4 w-4" />
          Add link
        </Button>
      </SectionCard>

      <SaveButton isPending={isPending} />
    </form>
  );
}

export function FaqEditorForm({ initialValues }: { initialValues: FaqsFormInput }) {
  const form = useForm<FaqsFormInput>({
    resolver: zodResolver(faqsFormSchema),
    defaultValues: initialValues
  });

  return (
    <SimpleCollectionForm
      title="FAQ"
      description="Optional common questions for conversion support and trust."
      form={form}
      submit={updateFaqsAction}
      addItem={() =>
        form.setValue("items", [
          ...form.getValues("items"),
          {
            question: "",
            answer: "",
            isVisible: true,
            sortOrder: form.getValues("items").length
          }
        ])
      }
      renderItem={(index, moveUp, moveDown, remove) => (
        <ItemCard
          title={`FAQ ${index + 1}`}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onRemove={remove}
        >
          <input type="hidden" {...form.register(`items.${index}.id`)} />
          <div className="space-y-2">
            <Label>Question</Label>
            <Input {...form.register(`items.${index}.question`)} />
          </div>
          <div className="space-y-2">
            <Label>Answer</Label>
            <Textarea {...form.register(`items.${index}.answer`)} />
          </div>
          <Controller
            control={form.control}
            name={`items.${index}.isVisible`}
            render={({ field }) => (
              <CheckboxField
                checked={!!field.value}
                onCheckedChange={field.onChange}
                label="Visible on homepage"
              />
            )}
          />
        </ItemCard>
      )}
    />
  );
}

export function SiteSettingsEditorForm({
  initialValues
}: {
  initialValues: SiteSettingsInput;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: initialValues
  });
  const sections = useFieldArray({
    control: form.control,
    name: "sections"
  });

  const onSubmit = (values: SiteSettingsInput) => {
    startTransition(async () => {
      const result = await updateSiteSettingsAction({
        ...values,
        sections: normalizeItems<NonNullable<SiteSettingsInput["sections"]>[number]>(
          values.sections
        )
      });
      toast.success(result.message);
    });
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <SectionCard title="General settings" description="Branding, SEO, public contact details, and media URLs.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Site name</Label>
            <Input {...form.register("siteName")} />
          </div>
          <div className="space-y-2">
            <Label>Site tagline</Label>
            <Input {...form.register("siteTagline")} />
          </div>
          <div className="space-y-2">
            <Label>Site URL</Label>
            <Input {...form.register("siteUrl")} placeholder="https://yourdomain.com" />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...form.register("siteLocation")} />
          </div>
          <div className="space-y-2">
            <Label>Primary email</Label>
            <Input {...form.register("primaryEmail")} />
          </div>
          <div className="space-y-2">
            <Label>Primary phone</Label>
            <Input {...form.register("primaryPhone")} />
          </div>
          <div className="space-y-2">
            <Label>WhatsApp number</Label>
            <Input {...form.register("whatsappNumber")} />
          </div>
          <div className="space-y-2">
            <Label>Theme accent</Label>
            <Input {...form.register("themeAccent")} />
          </div>
          <div className="space-y-2">
            <Label>Profile image URL</Label>
            <Input {...form.register("profileImageUrl")} />
          </div>
          <div className="space-y-2">
            <Label>OG image URL</Label>
            <Input {...form.register("ogImageUrl")} />
          </div>
          <div className="space-y-2">
            <Label>Schedule call URL</Label>
            <Input {...form.register("scheduleCallUrl")} />
          </div>
          <div className="space-y-2">
            <Label>Years experience badge</Label>
            <Input {...form.register("yearsExperience")} />
          </div>
          <div className="space-y-2">
            <Label>Student level badge</Label>
            <Input {...form.register("studentLevelLabel")} />
          </div>
          <div className="space-y-2">
            <Label>Results badge</Label>
            <Input {...form.register("resultHighlight")} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Site description</Label>
          <Textarea {...form.register("siteDescription")} />
        </div>
        <div className="space-y-2">
          <Label>SEO title</Label>
          <Input {...form.register("seoTitle")} />
        </div>
        <div className="space-y-2">
          <Label>SEO description</Label>
          <Textarea {...form.register("seoDescription")} />
        </div>
      </SectionCard>

      <SectionCard title="Section visibility and order" description="Toggle sections on or off and reorder the homepage navigation.">
        <div className="space-y-4">
          {sections.fields.map((field, index) => (
            <ItemCard
              key={field.id}
              title={sectionMeta[field.key as keyof typeof sectionMeta].label}
              onMoveUp={() => index > 0 && sections.move(index, index - 1)}
              onMoveDown={() =>
                index < sections.fields.length - 1 && sections.move(index, index + 1)
              }
            >
              <input type="hidden" {...form.register(`sections.${index}.id`)} />
              <input type="hidden" {...form.register(`sections.${index}.key`)} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input {...form.register(`sections.${index}.title`)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input {...form.register(`sections.${index}.description`)} />
                </div>
              </div>
              <Controller
                control={form.control}
                name={`sections.${index}.isVisible`}
                render={({ field }) => (
                  <CheckboxField
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                    label="Visible on homepage"
                  />
                )}
              />
            </ItemCard>
          ))}
        </div>
      </SectionCard>

      <SaveButton isPending={isPending} />
    </form>
  );
}
