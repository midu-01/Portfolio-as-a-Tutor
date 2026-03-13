import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Quote,
  Star
} from "lucide-react";

import { IconByName } from "@/components/icon-map";
import { ContactInquiryForm } from "@/components/forms/contact-inquiry-form";
import { ProfilePortrait } from "@/components/portfolio/profile-portrait";
import { Reveal } from "@/components/portfolio/reveal";
import { SectionShell } from "@/components/portfolio/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProfileSidebarCard({
  heroName,
  heroRole,
  heroBadge,
  profileImageUrl,
  siteLocation,
  heroStats,
  subjects,
  className
}: {
  heroName: string;
  heroRole: string;
  heroBadge: string;
  profileImageUrl: string | null;
  siteLocation: string;
  heroStats: Array<{
    id: string;
    value: string;
    label: string;
  }>;
  subjects: string[];
  className?: string;
}) {
  return (
    <Card className={cn("surface-glow overflow-visible", className)}>
      <CardContent className="flex items-start justify-center p-8 sm:p-10">
        <div className="flex w-full max-w-sm flex-col items-center justify-start gap-6 pt-2 text-center">
          <div className="relative mx-auto flex aspect-[4/5] w-full max-w-sm items-end justify-center overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-primary/10 via-transparent to-teal-400/10">
            <ProfilePortrait
              name={heroName}
              profileImageUrl={profileImageUrl}
            />
          </div>

          <div className="w-full space-y-3 rounded-[1.75rem] border border-border/70 bg-background/70 p-6">
            <Badge className="mx-auto w-fit bg-primary/10 text-primary">{heroBadge}</Badge>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-semibold">{heroName}</h3>
              <p className="text-sm font-medium text-foreground/80">{heroRole}</p>
            </div>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {heroStats.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-2 font-display text-xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="w-full rounded-[1.75rem] border border-border/70 bg-background/70 p-6 text-left">
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              Subjects
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Badge key={subject} className="rounded-full bg-background">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

export function HeroSection({
  siteSettings,
  hero,
  sidebarCard
}: {
  siteSettings: {
    siteDescription: string;
    siteLocation: string;
    scheduleCallUrl: string | null;
    profileImageUrl: string | null;
  };
  hero: {
    name: string;
    role: string;
    badge: string;
    summary: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    supportText: string | null;
  };
  sidebarCard?: ReactNode;
}) {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="space-y-6">
        <Reveal>
          <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-card via-card to-primary/5">
            <CardContent className="grid gap-10 p-8 sm:p-10">
              <div className="space-y-5 text-center">
                <Badge className="mx-auto w-fit bg-primary/10 text-primary">{hero.badge}</Badge>
                <div className="space-y-4">
                  <h1 className="mx-auto max-w-4xl text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {hero.name}
                  </h1>
                  <p className="text-xl font-semibold text-foreground/80 sm:text-2xl">
                    {hero.role}
                  </p>
                  <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                    {hero.summary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button asChild size="lg">
                  <a href={hero.primaryCtaHref}>
                    {hero.primaryCtaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel}</a>
                </Button>
                {siteSettings.scheduleCallUrl ? (
                  <Button asChild size="lg" variant="ghost">
                    <a href={siteSettings.scheduleCallUrl} target="_blank" rel="noreferrer">
                      Schedule a Call
                    </a>
                  </Button>
                ) : null}
              </div>

              {hero.supportText ? (
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {hero.supportText}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </Reveal>

        {sidebarCard ? <Reveal delay={0.08}>{sidebarCard}</Reveal> : null}
      </div>
    </section>
  );
}

export function AboutSection({
  about
}: {
  about: {
    title: string;
    summary: string;
    conceptualApproach: string;
    guardianCommunication: string;
    teachingEnvironment: string;
  };
}) {
  return (
    <SectionShell
      id="about"
      eyebrow="About Me"
      title={about.title}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Concept-first teaching",
            body: about.conceptualApproach
          },
          {
            title: "Guardian communication",
            body: about.guardianCommunication
          },
          {
            title: "Supportive environment",
            body: about.teachingEnvironment
          }
        ].map((item, index) => (
          <Reveal key={item.title} delay={index * 0.06}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function SubjectsSection({
  subjects
}: {
  subjects: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    accent: string;
  }>;
}) {
  return (
    <SectionShell
      id="subjects"
      eyebrow="Subjects"
      title="Premium guidance across core science subjects"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject, index) => (
          <Reveal key={subject.id} delay={index * 0.05}>
            <Card className="group h-full overflow-hidden">
              <CardContent className="p-6">
                <div
                  className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-gradient-to-br ${subject.accent}`}
                >
                  <IconByName name={subject.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl">{subject.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{subject.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function ExperienceSection({
  experiences
}: {
  experiences: Array<{
    id: string;
    title: string;
    organization: string;
    period: string;
    summary: string;
    points: Array<{ id: string; content: string }>;
  }>;
}) {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience"
      title="Structured academic support built on consistency"
    >
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <Reveal key={experience.id} delay={index * 0.06}>
            <Card>
              <CardContent className="grid gap-6 p-6 lg:grid-cols-[0.55fr_1fr]">
                <div className="space-y-3">
                  <Badge>{experience.period}</Badge>
                  <h3 className="font-display text-2xl">{experience.title}</h3>
                  <p className="font-medium text-foreground/80">{experience.organization}</p>
                  <p className="leading-7 text-muted-foreground">{experience.summary}</p>
                </div>
                <div className="grid gap-3">
                  {experience.points.map((point) => (
                    <div
                      key={point.id}
                      className="flex items-start gap-3 rounded-[1.25rem] border border-border/70 bg-background/70 p-4"
                    >
                      <CalendarRange className="mt-0.5 h-4 w-4 text-primary" />
                      <p className="text-sm leading-7 text-muted-foreground">{point.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function AchievementsSection({
  achievements
}: {
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    metric: string | null;
  }>;
}) {
  return (
    <SectionShell
      id="achievements"
      eyebrow="Achievements"
      title="A result track record that builds trust"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {achievements.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <Card className="h-full">
              <CardHeader>
                {item.metric ? <Badge className="w-fit text-primary">{item.metric}</Badge> : null}
                <CardTitle className="mt-4">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function WhyChooseMeSection({
  items
}: {
  items: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}) {
  return (
    <SectionShell
      id="why-choose-me"
      eyebrow="Why Choose Me"
      title="A calm, accountable tutoring experience for students and guardians"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <IconByName name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function EducationSection({
  education
}: {
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    period: string;
    score: string;
    location: string | null;
    note: string | null;
  }>;
}) {
  return (
    <SectionShell
      id="education"
      eyebrow="Education"
      title="Academic grounding shaped by science and engineering"
    >
      <div className="space-y-4">
        {education.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <Card>
              <CardContent className="grid gap-4 p-6 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <h3 className="font-display text-2xl">{item.institution}</h3>
                  <p className="mt-2 font-medium text-foreground/80">{item.degree}</p>
                  {item.location ? (
                    <p className="mt-2 text-sm text-muted-foreground">{item.location}</p>
                  ) : null}
                  {item.note ? (
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.note}</p>
                  ) : null}
                </div>
                <div className="rounded-[1.5rem] border border-border/70 bg-background/70 px-5 py-4 text-right">
                  <p className="text-sm text-muted-foreground">{item.period}</p>
                  <p className="mt-2 font-semibold">{item.score}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function HighlightsSection({
  highlights
}: {
  highlights: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
}) {
  return (
    <SectionShell
      id="highlights"
      eyebrow="Highlights"
      title="Additional achievements beyond the classroom"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {highlights.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <Card className="h-full">
              <CardContent className="flex h-full gap-4 p-6">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <IconByName name={item.icon} className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function TestimonialsSection({
  testimonials
}: {
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    quote: string;
    result: string | null;
    rating: number;
  }>;
}) {
  return (
    <SectionShell
      id="testimonials"
      eyebrow="Testimonials"
      title="Feedback that reflects clarity, patience, and results"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                <Quote className="h-8 w-8 text-primary/70" />
                <p className="mt-5 flex-1 leading-7 text-muted-foreground">{item.quote}</p>
                <div className="mt-6 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="mt-5">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                  {item.result ? (
                    <p className="mt-3 text-sm font-medium text-primary">{item.result}</p>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function FaqSection({
  faqs
}: {
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}) {
  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      title="Common questions from students and guardians"
    >
      <div className="grid gap-4">
        {faqs.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display text-xl">{item.question}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

export function ContactSection({
  contactInfo,
  scheduleCallUrl
}: {
  contactInfo: {
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    formTitle: string;
    formDescription: string;
    availability: string;
  };
  scheduleCallUrl?: string | null;
}) {
  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title={contactInfo.formTitle}
    >
      <Reveal delay={0.08}>
        <Card className="mr-auto w-full">
          <CardHeader>
            <CardTitle>Send an inquiry</CardTitle>
            <CardDescription>
              Share your subject needs, preferred timing, and learning goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactInquiryForm />
          </CardContent>
        </Card>
      </Reveal>
    </SectionShell>
  );
}
