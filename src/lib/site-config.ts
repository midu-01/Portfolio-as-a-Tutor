import { SectionKey } from "@prisma/client";

export const sectionMeta = {
  [SectionKey.HERO]: {
    id: "home",
    label: "Home",
    icon: "House"
  },
  [SectionKey.ABOUT]: {
    id: "about",
    label: "About",
    icon: "UserRound"
  },
  [SectionKey.SUBJECTS]: {
    id: "subjects",
    label: "Subjects",
    icon: "BookOpenText"
  },
  [SectionKey.EXPERIENCE]: {
    id: "experience",
    label: "Experience",
    icon: "BriefcaseBusiness"
  },
  [SectionKey.ACHIEVEMENTS]: {
    id: "achievements",
    label: "Achievements",
    icon: "Trophy"
  },
  [SectionKey.WHY_CHOOSE_ME]: {
    id: "why-choose-me",
    label: "Why Me",
    icon: "ShieldCheck"
  },
  [SectionKey.EDUCATION]: {
    id: "education",
    label: "Education",
    icon: "GraduationCap"
  },
  [SectionKey.HIGHLIGHTS]: {
    id: "highlights",
    label: "Highlights",
    icon: "Sparkles"
  },
  [SectionKey.TESTIMONIALS]: {
    id: "testimonials",
    label: "Testimonials",
    icon: "Quote"
  },
  [SectionKey.FAQ]: {
    id: "faq",
    label: "FAQ",
    icon: "CircleHelp"
  },
  [SectionKey.CONTACT]: {
    id: "contact",
    label: "Contact",
    icon: "PhoneCall"
  }
} as const;

export const adminNavItems = [
  {
    href: "/admin",
    label: "Overview",
    icon: "LayoutDashboard"
  },
  {
    href: "/admin/content/hero",
    label: "Hero",
    icon: "Sparkles"
  },
  {
    href: "/admin/content/about",
    label: "About",
    icon: "UserRound"
  },
  {
    href: "/admin/content/subjects",
    label: "Subjects",
    icon: "BookOpenText"
  },
  {
    href: "/admin/content/experience",
    label: "Experience",
    icon: "BriefcaseBusiness"
  },
  {
    href: "/admin/content/achievements",
    label: "Achievements",
    icon: "Trophy"
  },
  {
    href: "/admin/content/why-choose-me",
    label: "Why Choose Me",
    icon: "ShieldCheck"
  },
  {
    href: "/admin/content/education",
    label: "Education",
    icon: "GraduationCap"
  },
  {
    href: "/admin/content/highlights",
    label: "Highlights",
    icon: "Star"
  },
  {
    href: "/admin/content/testimonials",
    label: "Testimonials",
    icon: "Quote"
  },
  {
    href: "/admin/content/contact",
    label: "Contact",
    icon: "PhoneCall"
  },
  {
    href: "/admin/content/faq",
    label: "FAQ",
    icon: "CircleHelp"
  },
  {
    href: "/admin/content/sections",
    label: "Sections & SEO",
    icon: "Settings2"
  }
] as const;
