"use server";

import { put } from "@vercel/blob";
import { InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  aboutSectionSchema,
  achievementsFormSchema,
  contactInfoSchema,
  educationFormSchema,
  experiencesFormSchema,
  faqsFormSchema,
  heroSectionSchema,
  highlightsFormSchema,
  inquirySchema,
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
  type InquiryInput,
  type SiteSettingsInput,
  type SubjectsFormInput,
  type TestimonialsFormInput,
  type WhyChooseMeFormInput
} from "@/lib/validators";

type ActionResult = {
  success: boolean;
  message: string;
};

function ok(message: string): ActionResult {
  return { success: true, message };
}

function revalidatePortfolio(extraPaths: string[] = []) {
  const paths = [
    "/",
    "/admin",
    "/admin/content/hero",
    "/admin/content/about",
    "/admin/content/subjects",
    "/admin/content/experience",
    "/admin/content/achievements",
    "/admin/content/why-choose-me",
    "/admin/content/education",
    "/admin/content/highlights",
    "/admin/content/testimonials",
    "/admin/content/contact",
    "/admin/content/faq",
    "/admin/content/sections",
    ...extraPaths
  ];

  for (const path of paths) {
    revalidatePath(path);
  }
}

export async function updateHeroSectionAction(input: HeroSectionInput) {
  await requireAdmin();
  const data = heroSectionSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    await tx.heroSection.upsert({
      where: { id: "hero-section" },
      update: {
        name: data.name,
        role: data.role,
        badge: data.badge,
        summary: data.summary,
        primaryCtaLabel: data.primaryCtaLabel,
        primaryCtaHref: data.primaryCtaHref,
        secondaryCtaLabel: data.secondaryCtaLabel,
        secondaryCtaHref: data.secondaryCtaHref,
        supportText: data.supportText || null
      },
      create: {
        id: "hero-section",
        name: data.name,
        role: data.role,
        badge: data.badge,
        summary: data.summary,
        primaryCtaLabel: data.primaryCtaLabel,
        primaryCtaHref: data.primaryCtaHref,
        secondaryCtaLabel: data.secondaryCtaLabel,
        secondaryCtaHref: data.secondaryCtaHref,
        supportText: data.supportText || null
      }
    });

    const keepIds = data.heroStats.map((item) => item.id).filter(Boolean) as string[];

    await tx.heroStat.deleteMany({
      where: {
        heroSectionId: "hero-section",
        ...(keepIds.length > 0 ? { id: { notIn: keepIds } } : {})
      }
    });

    for (const item of data.heroStats) {
      await tx.heroStat.upsert({
        where: { id: item.id ?? `hero-stat-${item.sortOrder}` },
        update: {
          value: item.value,
          label: item.label,
          sortOrder: item.sortOrder,
          isVisible: item.isVisible
        },
        create: {
          id: item.id,
          heroSectionId: "hero-section",
          value: item.value,
          label: item.label,
          sortOrder: item.sortOrder,
          isVisible: item.isVisible
        }
      });
    }
  });

  revalidatePortfolio(["/admin/content/hero"]);
  return ok("Hero section updated.");
}

export async function updateAboutSectionAction(input: AboutSectionInput) {
  await requireAdmin();
  const data = aboutSectionSchema.parse(input);

  await prisma.aboutSection.upsert({
    where: { id: "about-section" },
    update: data,
    create: {
      id: "about-section",
      ...data
    }
  });

  revalidatePortfolio(["/admin/content/about"]);
  return ok("About section updated.");
}

async function replaceSimpleCollection<T extends { id?: string; isVisible: boolean; sortOrder: number }>(
  items: T[],
  delegate: {
    deleteMany: (args: any) => Promise<unknown>;
    upsert: (args: any) => Promise<unknown>;
  },
  create: (item: T) => Record<string, unknown>,
  update: (item: T) => Record<string, unknown>
) {
  const keepIds = items.map((item) => item.id).filter(Boolean) as string[];

  await delegate.deleteMany({
    where: keepIds.length > 0 ? { id: { notIn: keepIds } } : {}
  });

  for (const item of items) {
    await delegate.upsert({
      where: { id: item.id ?? `temp-${item.sortOrder}-${Date.now()}` },
      update: update(item),
      create: create(item)
    });
  }
}

export async function updateSubjectsAction(input: SubjectsFormInput) {
  await requireAdmin();
  const data = subjectsFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.subject,
    (item) => item,
    (item) => item
  );

  revalidatePortfolio(["/admin/content/subjects"]);
  return ok("Subjects updated.");
}

export async function updateExperiencesAction(input: ExperiencesFormInput) {
  await requireAdmin();
  const data = experiencesFormSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    const keepIds = data.items.map((item) => item.id).filter(Boolean) as string[];

    await tx.experience.deleteMany({
      where: keepIds.length > 0 ? { id: { notIn: keepIds } } : {}
    });

    for (const item of data.items) {
      const experience = await tx.experience.upsert({
        where: { id: item.id ?? `experience-${item.sortOrder}-${Date.now()}` },
        update: {
          title: item.title,
          organization: item.organization,
          period: item.period,
          summary: item.summary,
          isVisible: item.isVisible,
          sortOrder: item.sortOrder
        },
        create: {
          title: item.title,
          organization: item.organization,
          period: item.period,
          summary: item.summary,
          isVisible: item.isVisible,
          sortOrder: item.sortOrder
        }
      });

      const keepPointIds = item.points.map((point) => point.id).filter(Boolean) as string[];

      await tx.experiencePoint.deleteMany({
        where: {
          experienceId: experience.id,
          ...(keepPointIds.length > 0 ? { id: { notIn: keepPointIds } } : {})
        }
      });

      for (const point of item.points) {
        await tx.experiencePoint.upsert({
          where: { id: point.id ?? `point-${point.sortOrder}-${Date.now()}` },
          update: {
            content: point.content,
            sortOrder: point.sortOrder
          },
          create: {
            experienceId: experience.id,
            content: point.content,
            sortOrder: point.sortOrder
          }
        });
      }
    }
  });

  revalidatePortfolio(["/admin/content/experience"]);
  return ok("Experience section updated.");
}

export async function updateAchievementsAction(input: AchievementsFormInput) {
  await requireAdmin();
  const data = achievementsFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.achievement,
    (item) => ({
      title: item.title,
      description: item.description,
      metric: item.metric || null,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    }),
    (item) => ({
      title: item.title,
      description: item.description,
      metric: item.metric || null,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    })
  );

  revalidatePortfolio(["/admin/content/achievements"]);
  return ok("Achievements updated.");
}

export async function updateWhyChooseMeAction(input: WhyChooseMeFormInput) {
  await requireAdmin();
  const data = whyChooseMeFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.whyChooseMeItem,
    (item) => item,
    (item) => item
  );

  revalidatePortfolio(["/admin/content/why-choose-me"]);
  return ok("Why choose me items updated.");
}

export async function updateEducationAction(input: EducationFormInput) {
  await requireAdmin();
  const data = educationFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.education,
    (item) => ({
      institution: item.institution,
      degree: item.degree,
      period: item.period,
      score: item.score,
      location: item.location || null,
      note: item.note || null,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    }),
    (item) => ({
      institution: item.institution,
      degree: item.degree,
      period: item.period,
      score: item.score,
      location: item.location || null,
      note: item.note || null,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    })
  );

  revalidatePortfolio(["/admin/content/education"]);
  return ok("Education entries updated.");
}

export async function updateHighlightsAction(input: HighlightsFormInput) {
  await requireAdmin();
  const data = highlightsFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.highlight,
    (item) => item,
    (item) => item
  );

  revalidatePortfolio(["/admin/content/highlights"]);
  return ok("Highlights updated.");
}

export async function updateTestimonialsAction(input: TestimonialsFormInput) {
  await requireAdmin();
  const data = testimonialsFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.testimonial,
    (item) => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      result: item.result || null,
      rating: item.rating,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    }),
    (item) => ({
      name: item.name,
      role: item.role,
      quote: item.quote,
      result: item.result || null,
      rating: item.rating,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    })
  );

  revalidatePortfolio(["/admin/content/testimonials"]);
  return ok("Testimonials updated.");
}

export async function updateContactInfoAction(input: ContactInfoInput) {
  await requireAdmin();
  const data = contactInfoSchema.parse(input);

  await prisma.$transaction(async (tx) => {
    await tx.contactInfo.upsert({
      where: { id: "contact-info" },
      update: {
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        location: data.location,
        formTitle: data.formTitle,
        formDescription: data.formDescription,
        availability: data.availability
      },
      create: {
        id: "contact-info",
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        location: data.location,
        formTitle: data.formTitle,
        formDescription: data.formDescription,
        availability: data.availability
      }
    });

    const keepIds = data.socialLinks.map((item) => item.id).filter(Boolean) as string[];

    await tx.socialLink.deleteMany({
      where: keepIds.length > 0 ? { id: { notIn: keepIds } } : {}
    });

    for (const item of data.socialLinks) {
      await tx.socialLink.upsert({
        where: { id: item.id ?? `social-${item.sortOrder}-${Date.now()}` },
        update: {
          label: item.label,
          platform: item.platform,
          url: item.url,
          icon: item.icon,
          isVisible: item.isVisible,
          sortOrder: item.sortOrder
        },
        create: {
          label: item.label,
          platform: item.platform,
          url: item.url,
          icon: item.icon,
          isVisible: item.isVisible,
          sortOrder: item.sortOrder
        }
      });
    }
  });

  revalidatePortfolio(["/admin/content/contact"]);
  return ok("Contact information updated.");
}

export async function updateFaqsAction(input: FaqsFormInput) {
  await requireAdmin();
  const data = faqsFormSchema.parse(input);

  await replaceSimpleCollection(
    data.items,
    prisma.fAQ,
    (item) => ({
      question: item.question,
      answer: item.answer,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    }),
    (item) => ({
      question: item.question,
      answer: item.answer,
      isVisible: item.isVisible,
      sortOrder: item.sortOrder
    })
  );

  revalidatePortfolio(["/admin/content/faq"]);
  return ok("FAQ items updated.");
}

export async function updateSiteSettingsAction(input: SiteSettingsInput) {
  await requireAdmin();
  const data = siteSettingsSchema.parse(input);
  const siteTagline = data.siteTagline ?? "";

  await prisma.$transaction(async (tx) => {
    await tx.siteSettings.upsert({
      where: { id: "site-settings" },
      update: {
        siteName: data.siteName,
        siteTagline,
        siteDescription: data.siteDescription,
        siteUrl: data.siteUrl || null,
        siteLocation: data.siteLocation,
        primaryEmail: data.primaryEmail,
        primaryPhone: data.primaryPhone,
        whatsappNumber: data.whatsappNumber,
        profileImageUrl: data.profileImageUrl || null,
        ogImageUrl: data.ogImageUrl || null,
        scheduleCallUrl: data.scheduleCallUrl || null,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        yearsExperience: data.yearsExperience,
        studentLevelLabel: data.studentLevelLabel,
        resultHighlight: data.resultHighlight,
        themeAccent: data.themeAccent
      },
      create: {
        id: "site-settings",
        siteName: data.siteName,
        siteTagline,
        siteDescription: data.siteDescription,
        siteUrl: data.siteUrl || null,
        siteLocation: data.siteLocation,
        primaryEmail: data.primaryEmail,
        primaryPhone: data.primaryPhone,
        whatsappNumber: data.whatsappNumber,
        profileImageUrl: data.profileImageUrl || null,
        ogImageUrl: data.ogImageUrl || null,
        scheduleCallUrl: data.scheduleCallUrl || null,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        yearsExperience: data.yearsExperience,
        studentLevelLabel: data.studentLevelLabel,
        resultHighlight: data.resultHighlight,
        themeAccent: data.themeAccent
      }
    });

    for (const section of data.sections) {
      await tx.siteSection.upsert({
        where: { key: section.key },
        update: {
          title: section.title,
          description: section.description || null,
          isVisible: section.isVisible,
          sortOrder: section.sortOrder
        },
        create: {
          key: section.key,
          title: section.title,
          description: section.description || null,
          isVisible: section.isVisible,
          sortOrder: section.sortOrder,
          siteSettingsId: "site-settings"
        }
      });
    }
  });

  revalidatePortfolio(["/admin/content/sections"]);
  return ok("Section visibility and site settings updated.");
}

export async function submitInquiryAction(input: InquiryInput) {
  const data = inquirySchema.parse(input);

  await prisma.inquiry.create({
    data
  });

  revalidatePortfolio(["/admin"]);
  return ok("Your message has been sent successfully.");
}

export async function updateInquiryStatusAction(id: string, status: InquiryStatus) {
  await requireAdmin();

  await prisma.inquiry.update({
    where: { id },
    data: { status }
  });

  revalidatePortfolio(["/admin"]);
  return ok("Inquiry status updated.");
}

export async function uploadProfileImageAction(formData: FormData) {
  await requireAdmin();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      message:
        "Profile image upload requires BLOB_READ_WRITE_TOKEN in .env. You can still use a direct image URL in the Sections & SEO page."
    };
  }

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return {
      success: false,
      message: "Please choose an image to upload."
    };
  }

  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
  const blob = await put(`profile-images/${fileName}`, file, {
    access: "public"
  });

  await prisma.siteSettings.upsert({
    where: { id: "site-settings" },
    update: {
      profileImageUrl: blob.url
    },
    create: {
      id: "site-settings",
      siteName: "Midu Mojumder",
      siteTagline: "",
      siteDescription: "Premium academic tutoring portfolio",
      siteLocation: "Mohakhali, Dhaka, Bangladesh",
      primaryEmail: "midumojumder8@gmail.com",
      primaryPhone: "+8801794532606",
      whatsappNumber: "8801794532606",
      seoTitle: "Midu Mojumder | Tutor Portfolio",
      seoDescription: "Premium tutor portfolio website",
      yearsExperience: "5+ Years Experience",
      studentLevelLabel: "SSC / HSC / Admission",
      resultHighlight: "Top Public University Results",
      profileImageUrl: blob.url
    }
  });

  revalidatePortfolio(["/admin/content/hero", "/admin/content/sections"]);
  return {
    success: true,
    message: "Profile image uploaded.",
    url: blob.url
  };
}
