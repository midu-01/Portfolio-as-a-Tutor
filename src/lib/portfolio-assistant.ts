import "server-only";

import { getHomepageData } from "@/lib/data";

export async function getPortfolioAssistantContext() {
  const data = await getHomepageData();

  const sections = [
    `Brand: ${data.siteSettings?.siteName ?? data.hero.name}`,
    data.siteSettings?.siteDescription
      ? `Overview: ${data.siteSettings.siteDescription}`
      : null,
    `Tutor: ${data.hero.name}`,
    `Role: ${data.hero.role}`,
    `Hero badge: ${data.hero.badge}`,
    `Summary: ${data.hero.summary}`,
    data.hero.supportText ? `Support text: ${data.hero.supportText}` : null,
    data.siteSettings?.siteLocation
      ? `Location: ${data.siteSettings.siteLocation}`
      : `Location: ${data.contactInfo.location}`,
    `Contact email: ${data.contactInfo.email}`,
    `Contact phone: ${data.contactInfo.phone}`,
    `WhatsApp: ${data.contactInfo.whatsapp}`,
    data.siteSettings?.yearsExperience
      ? `Experience highlight: ${data.siteSettings.yearsExperience}`
      : null,
    data.siteSettings?.studentLevelLabel
      ? `Student levels: ${data.siteSettings.studentLevelLabel}`
      : null,
    data.siteSettings?.resultHighlight
      ? `Results highlight: ${data.siteSettings.resultHighlight}`
      : null,
    `Subjects: ${
      data.subjects.length > 0 ? data.subjects.map((item) => item.title).join(", ") : "Not listed"
    }`,
    `About: ${data.about.summary}`,
    `Conceptual approach: ${data.about.conceptualApproach}`,
    `Guardian communication: ${data.about.guardianCommunication}`,
    `Teaching environment: ${data.about.teachingEnvironment}`,
    data.experiences.length > 0
      ? `Experience details:\n${data.experiences
          .map(
            (item) =>
              `- ${item.title} at ${item.organization} (${item.period}): ${item.summary}. Points: ${item.points
                .map((point) => point.content)
                .join("; ")}`
          )
          .join("\n")}`
      : null,
    data.achievements.length > 0
      ? `Achievements:\n${data.achievements
          .map((item) =>
            `- ${item.title}: ${item.description}${item.metric ? ` (${item.metric})` : ""}`
          )
          .join("\n")}`
      : null,
    data.whyChooseMe.length > 0
      ? `Why choose this tutor:\n${data.whyChooseMe
          .map((item) => `- ${item.title}: ${item.description}`)
          .join("\n")}`
      : null,
    data.education.length > 0
      ? `Education:\n${data.education
          .map(
            (item) =>
              `- ${item.institution}: ${item.degree}, ${item.period}, ${item.score}${item.location ? `, ${item.location}` : ""}${item.note ? `, ${item.note}` : ""}`
          )
          .join("\n")}`
      : null,
    data.highlights.length > 0
      ? `Additional highlights:\n${data.highlights
          .map((item) => `- ${item.title}: ${item.description}`)
          .join("\n")}`
      : null,
    data.testimonials.length > 0
      ? `Testimonials:\n${data.testimonials
          .map(
            (item) =>
              `- ${item.name} (${item.role}): ${item.quote}${item.result ? ` Result: ${item.result}.` : ""}`
          )
          .join("\n")}`
      : null,
    data.faqs.length > 0
      ? `FAQ:\n${data.faqs
          .map((item) => `- Q: ${item.question} A: ${item.answer}`)
          .join("\n")}`
      : null,
    data.socialLinks.length > 0
      ? `Quick contact links:\n${data.socialLinks
          .map((item) => `- ${item.label}: ${item.url}`)
          .join("\n")}`
      : null
  ].filter(Boolean);

  return sections.join("\n\n");
}
