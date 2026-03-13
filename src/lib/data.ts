import { SectionKey } from "@prisma/client";
import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { sectionMeta } from "@/lib/site-config";

const heroFallback = {
  id: "hero-section",
  name: "Midu Mojumder",
  role: "Dedicated and result-oriented tutor",
  badge: "Premium academic mentorship",
  summary:
    "Dedicated and result-oriented tutor with over 5 years of experience teaching SSC, HSC, and admission-level science students.",
  primaryCtaLabel: "Contact Me",
  primaryCtaHref: "#contact",
  secondaryCtaLabel: "View Achievements",
  secondaryCtaHref: "#achievements",
  supportText: "",
  heroStats: []
};

const aboutFallback = {
  id: "about-section",
  title: "About Me",
  summary:
    "I help science students gain conceptual clarity and consistent academic progress through structured, supportive teaching.",
  conceptualApproach: "Conceptual clarity first.",
  guardianCommunication: "Regular guardian updates.",
  teachingEnvironment: "Friendly, supportive learning environment."
};

const contactFallback = {
  id: "contact-info",
  email: "midumojumder8@gmail.com",
  phone: "+8801794532606",
  whatsapp: "8801794532606",
  location: "Mohakhali, Dhaka, Bangladesh",
  formTitle: "Start a conversation",
  formDescription: "Share your learning goals and I will respond soon.",
  availability: "Available for online and offline tutoring."
};

export const getSiteData = cache(async () => {
  const [siteSettings, hero, about, contactInfo] = await prisma.$transaction([
    prisma.siteSettings.findUnique({
      where: { id: "site-settings" },
      include: {
        socialLinks: {
          orderBy: { sortOrder: "asc" }
        },
        sections: {
          orderBy: { sortOrder: "asc" }
        }
      }
    }),
    prisma.heroSection.findUnique({
      where: { id: "hero-section" },
      include: {
        heroStats: {
          orderBy: { sortOrder: "asc" }
        }
      }
    }),
    prisma.aboutSection.findUnique({
      where: { id: "about-section" }
    }),
    prisma.contactInfo.findUnique({
      where: { id: "contact-info" }
    })
  ]);

  return {
    siteSettings,
    hero: hero ?? heroFallback,
    about: about ?? aboutFallback,
    contactInfo: contactInfo ?? contactFallback
  };
});

export const getHomepageData = cache(async () => {
  const base = await getSiteData();

  const [subjects, experiences, achievements, whyChooseMe, education, highlights, testimonials, faqs] =
    await prisma.$transaction([
      prisma.subject.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.experience.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" },
        include: {
          points: {
            orderBy: { sortOrder: "asc" }
          }
        }
      }),
      prisma.achievement.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.whyChooseMeItem.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.education.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.highlight.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.testimonial.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      }),
      prisma.fAQ.findMany({
        where: { isVisible: true },
        orderBy: { sortOrder: "asc" }
      })
    ]);

  const sections = (base.siteSettings?.sections ?? [])
    .filter((section) => section.isVisible)
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((section) => ({
      ...section,
      sectionId: sectionMeta[section.key].id,
      icon: sectionMeta[section.key].icon
    }));

  return {
    ...base,
    sections,
    heroStats: base.hero.heroStats?.filter((item) => item.isVisible) ?? [],
    socialLinks:
      base.siteSettings?.socialLinks.filter((item) => item.isVisible).sort((a, b) => a.sortOrder - b.sortOrder) ??
      [],
    subjects,
    experiences,
    achievements,
    whyChooseMe,
    education,
    highlights,
    testimonials,
    faqs
  };
});

export const getAdminData = cache(async () => {
  const base = await getSiteData();

  const [subjects, experiences, achievements, whyChooseMe, education, highlights, testimonials, faqs, inquiries] =
    await prisma.$transaction([
      prisma.subject.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.experience.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
          points: {
            orderBy: { sortOrder: "asc" }
          }
        }
      }),
      prisma.achievement.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.whyChooseMeItem.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.education.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.highlight.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.testimonial.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.fAQ.findMany({
        orderBy: { sortOrder: "asc" }
      }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5
      })
    ]);

  const sections =
    base.siteSettings?.sections.sort((left, right) => left.sortOrder - right.sortOrder) ?? [];

  const dashboardStats = {
    totalSubjects: subjects.length,
    totalTestimonials: testimonials.length,
    visibleSections: sections.filter((item) => item.isVisible).length,
    newInquiries: inquiries.filter((item) => item.status === "NEW").length
  };

  return {
    ...base,
    sections,
    subjects,
    experiences,
    achievements,
    whyChooseMe,
    education,
    highlights,
    testimonials,
    faqs,
    inquiries,
    dashboardStats
  };
});

export function buildSidebarSections(
  sections: Array<{ key: SectionKey; title: string; description: string | null }>
) {
  return sections.map((section) => ({
    ...sectionMeta[section.key],
    title: section.title,
    description: section.description ?? ""
  }));
}
