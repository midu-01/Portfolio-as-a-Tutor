import { SectionKey } from "@prisma/client";

import { PortfolioShell } from "@/components/portfolio/portfolio-shell";
import {
  AboutSection,
  AchievementsSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  FaqSection,
  HeroSection,
  HighlightsSection,
  ProfileSidebarCard,
  SubjectsSection,
  TestimonialsSection,
  WhyChooseMeSection
} from "@/components/portfolio/portfolio-sections";
import { getHomepageData } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";
import { TutorAssistant } from "@/components/portfolio/tutor-assistant";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomepageData();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.hero.name,
    jobTitle: data.hero.role,
    description: data.siteSettings?.siteDescription ?? data.hero.summary,
    email: data.contactInfo.email,
    telephone: data.contactInfo.phone,
    address: data.contactInfo.location,
    url: absoluteUrl("/"),
    image: data.siteSettings?.profileImageUrl ?? undefined,
    alumniOf: data.education.map((item) => item.institution),
    knowsAbout: data.subjects.map((item) => item.title)
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PortfolioShell
        siteName={data.siteSettings?.siteName ?? data.hero.name}
        siteTagline={data.siteSettings?.siteTagline ?? ""}
        sections={data.sections.map((section) => ({
          id: section.sectionId,
          title: section.title,
          description: section.description ?? "",
          icon: section.icon
        }))}
        socialLinks={data.socialLinks}
        rightSidebar={
          <ProfileSidebarCard
            heroName={data.hero.name}
            heroRole={data.hero.role}
            heroBadge={data.hero.badge}
            profileImageUrl={data.siteSettings?.profileImageUrl ?? null}
            siteLocation={data.siteSettings?.siteLocation ?? data.contactInfo.location}
            heroStats={data.heroStats}
            subjects={data.subjects.map((item) => item.title)}
          />
        }
      >
        {data.sections.map((section) => {
          switch (section.key) {
            case SectionKey.HERO:
              return (
                <HeroSection
                  key={section.key}
                  siteSettings={{
                    siteDescription: data.siteSettings?.siteDescription ?? "",
                    siteLocation: data.siteSettings?.siteLocation ?? data.contactInfo.location,
                    scheduleCallUrl: data.siteSettings?.scheduleCallUrl ?? null,
                    profileImageUrl: data.siteSettings?.profileImageUrl ?? null
                  }}
                  hero={data.hero}
                  sidebarCard={
                    <div className="xl:hidden">
                      <ProfileSidebarCard
                        heroName={data.hero.name}
                        heroRole={data.hero.role}
                        heroBadge={data.hero.badge}
                        profileImageUrl={data.siteSettings?.profileImageUrl ?? null}
                        siteLocation={
                          data.siteSettings?.siteLocation ?? data.contactInfo.location
                        }
                        heroStats={data.heroStats}
                        subjects={data.subjects.map((item) => item.title)}
                      />
                    </div>
                  }
                />
              );
            case SectionKey.ABOUT:
              return <AboutSection key={section.key} about={data.about} />;
            case SectionKey.SUBJECTS:
              return <SubjectsSection key={section.key} subjects={data.subjects} />;
            case SectionKey.EXPERIENCE:
              return <ExperienceSection key={section.key} experiences={data.experiences} />;
            case SectionKey.ACHIEVEMENTS:
              return (
                <AchievementsSection key={section.key} achievements={data.achievements} />
              );
            case SectionKey.WHY_CHOOSE_ME:
              return <WhyChooseMeSection key={section.key} items={data.whyChooseMe} />;
            case SectionKey.EDUCATION:
              return <EducationSection key={section.key} education={data.education} />;
            case SectionKey.HIGHLIGHTS:
              return <HighlightsSection key={section.key} highlights={data.highlights} />;
            case SectionKey.TESTIMONIALS:
              return (
                <TestimonialsSection key={section.key} testimonials={data.testimonials} />
              );
            case SectionKey.FAQ:
              return <FaqSection key={section.key} faqs={data.faqs} />;
            case SectionKey.CONTACT:
              return (
                <ContactSection
                  key={section.key}
                  contactInfo={data.contactInfo}
                  scheduleCallUrl={data.siteSettings?.scheduleCallUrl}
                />
              );
            default:
              return null;
          }
        })}
      </PortfolioShell>
      <TutorAssistant />
    </>
  );
}
