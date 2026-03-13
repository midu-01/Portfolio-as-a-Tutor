import { SectionKey } from "@prisma/client";
import { z } from "zod";

const baseItemSchema = z.object({
  id: z.string().optional(),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0)
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export const heroStatSchema = baseItemSchema.extend({
  value: z.string().min(1, "Value is required."),
  label: z.string().min(1, "Label is required.")
});

export const heroSectionSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  badge: z.string().min(2),
  summary: z.string().min(30),
  primaryCtaLabel: z.string().min(2),
  primaryCtaHref: z.string().min(1),
  secondaryCtaLabel: z.string().min(2),
  secondaryCtaHref: z.string().min(1),
  supportText: z.string().optional().or(z.literal("")),
  heroStats: z.array(heroStatSchema).min(1).max(4)
});

export const aboutSectionSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(30),
  conceptualApproach: z.string().min(10),
  guardianCommunication: z.string().min(10),
  teachingEnvironment: z.string().min(10)
});

export const subjectSchema = baseItemSchema.extend({
  title: z.string().min(2),
  icon: z.string().min(2),
  description: z.string().min(10),
  accent: z.string().min(2)
});

export const subjectsFormSchema = z.object({
  items: z.array(subjectSchema).min(1)
});

export const experiencePointSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(3),
  sortOrder: z.number().int().min(0).default(0)
});

export const experienceSchema = baseItemSchema.extend({
  title: z.string().min(2),
  organization: z.string().min(2),
  period: z.string().min(2),
  summary: z.string().min(10),
  points: z.array(experiencePointSchema).min(1)
});

export const experiencesFormSchema = z.object({
  items: z.array(experienceSchema).min(1)
});

export const achievementSchema = baseItemSchema.extend({
  title: z.string().min(2),
  description: z.string().min(10),
  metric: z.string().optional().or(z.literal(""))
});

export const achievementsFormSchema = z.object({
  items: z.array(achievementSchema).min(1)
});

export const whyChooseMeSchema = baseItemSchema.extend({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().min(2)
});

export const whyChooseMeFormSchema = z.object({
  items: z.array(whyChooseMeSchema).min(1)
});

export const educationSchema = baseItemSchema.extend({
  institution: z.string().min(2),
  degree: z.string().min(2),
  period: z.string().min(2),
  score: z.string().min(2),
  location: z.string().optional().or(z.literal("")),
  note: z.string().optional().or(z.literal(""))
});

export const educationFormSchema = z.object({
  items: z.array(educationSchema).min(1)
});

export const highlightSchema = baseItemSchema.extend({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().min(2)
});

export const highlightsFormSchema = z.object({
  items: z.array(highlightSchema).min(1)
});

export const testimonialSchema = baseItemSchema.extend({
  name: z.string().min(2),
  role: z.string().min(2),
  quote: z.string().min(10),
  result: z.string().optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5)
});

export const testimonialsFormSchema = z.object({
  items: z.array(testimonialSchema).min(1)
});

export const socialLinkSchema = baseItemSchema.extend({
  label: z.string().min(2),
  platform: z.string().min(2),
  url: z.string().url("Enter a valid URL."),
  icon: z.string().min(2)
});

export const contactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(6),
  whatsapp: z.string().min(6),
  location: z.string().min(4),
  formTitle: z.string().min(6),
  formDescription: z.string().min(20),
  availability: z.string().min(6),
  socialLinks: z.array(socialLinkSchema).default([])
});

export const faqSchema = baseItemSchema.extend({
  question: z.string().min(6),
  answer: z.string().min(10)
});

export const faqsFormSchema = z.object({
  items: z.array(faqSchema).min(1)
});

export const siteSectionSchema = z.object({
  id: z.string().optional(),
  key: z.nativeEnum(SectionKey),
  title: z.string().min(2),
  description: z.string().optional().or(z.literal("")),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().min(0)
});

export const siteSettingsSchema = z.object({
  siteName: z.string().min(2),
  siteTagline: z.string().min(2),
  siteDescription: z.string().min(20),
  siteUrl: z.string().url().optional().or(z.literal("")),
  siteLocation: z.string().min(4),
  primaryEmail: z.string().email(),
  primaryPhone: z.string().min(6),
  whatsappNumber: z.string().min(6),
  profileImageUrl: z.string().optional().or(z.literal("")),
  ogImageUrl: z.string().optional().or(z.literal("")),
  scheduleCallUrl: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().min(4),
  seoDescription: z.string().min(20),
  yearsExperience: z.string().min(2),
  studentLevelLabel: z.string().min(2),
  resultHighlight: z.string().min(2),
  themeAccent: z.string().min(2),
  sections: z.array(siteSectionSchema)
});

export const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().optional().or(z.literal("")),
  message: z.string().min(20)
});

export type LoginInput = z.input<typeof loginSchema>;
export type HeroSectionInput = z.input<typeof heroSectionSchema>;
export type AboutSectionInput = z.input<typeof aboutSectionSchema>;
export type SubjectsFormInput = z.input<typeof subjectsFormSchema>;
export type ExperiencesFormInput = z.input<typeof experiencesFormSchema>;
export type AchievementsFormInput = z.input<typeof achievementsFormSchema>;
export type WhyChooseMeFormInput = z.input<typeof whyChooseMeFormSchema>;
export type EducationFormInput = z.input<typeof educationFormSchema>;
export type HighlightsFormInput = z.input<typeof highlightsFormSchema>;
export type TestimonialsFormInput = z.input<typeof testimonialsFormSchema>;
export type ContactInfoInput = z.input<typeof contactInfoSchema>;
export type FaqsFormInput = z.input<typeof faqsFormSchema>;
export type SiteSettingsInput = z.input<typeof siteSettingsSchema>;
export type InquiryInput = z.input<typeof inquirySchema>;
