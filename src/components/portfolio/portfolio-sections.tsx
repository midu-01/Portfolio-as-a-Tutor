import Image from "next/image";
import { ArrowRight, CalendarRange, CheckCircle2, Quote, Star } from "lucide-react";

import { IconByName } from "@/components/icon-map";
import { ContactInquiryForm } from "@/components/forms/contact-inquiry-form";
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
import { normalizeWhatsAppNumber } from "@/lib/utils";

export function HeroSection({
  siteSettings,
  hero,
  heroStats
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
  heroStats: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}) {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Reveal>
          <Card className="overflow-hidden border-primary/10 bg-gradient-to-br from-card via-card to-primary/5">
            <CardContent className="grid gap-10 p-8 sm:p-10">
              <div className="space-y-5">
                <Badge className="bg-primary/10 text-primary">{hero.badge}</Badge>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                    {hero.name}
                  </h1>
                  <p className="text-xl font-semibold text-foreground/80 sm:text-2xl">
                    {hero.role}
                  </p>
                  <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                    {hero.summary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
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

              <div className="grid gap-3 sm:grid-cols-3">
                {heroStats.map((item, index) => (
                  <Reveal key={item.id} delay={index * 0.05}>
                    <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4 backdrop-blur">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="mt-2 font-display text-2xl font-semibold">{item.value}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {hero.supportText ? (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {hero.supportText}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="surface-glow overflow-hidden">
            <CardContent className="p-8 sm:p-10">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="relative mx-auto flex aspect-[4/5] w-full max-w-sm items-end justify-center overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-primary/10 via-transparent to-teal-400/10">
                  {siteSettings.profileImageUrl ? (
                    <Image
                      src={siteSettings.profileImageUrl}
                      alt={`${hero.name} portrait`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 30vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-10 text-center">
                      <div>
                        <p className="font-display text-4xl">{hero.name.split(" ")[0]}</p>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Add a profile image from the admin dashboard.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-5 rounded-[1.75rem] border border-border/70 bg-background/70 p-6">
                  <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                    Quick Snapshot
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    <div>
                      <p className="text-xs text-muted-foreground">Based in</p>
                      <p className="mt-1 font-semibold">{siteSettings.siteLocation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Approach</p>
                      <p className="mt-1 font-semibold">Conceptual, supportive, results-focused</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>
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
      description={about.summary}
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
      description="Each subject is taught with clear structure, practice rhythm, and exam-aware strategy."
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
      description="Years of hands-on tutoring experience across one-to-one and group settings."
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
      description="Student outcomes, guardian satisfaction, and consistent academic progress are central to the tutoring experience."
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
      description="The teaching style is designed to build understanding, confidence, and measurable progress."
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
      description="A strong academic base supports the structure, logic, and clarity used in teaching."
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
      description="Academic distinctions, competitive programming, and leadership all add depth to the mentoring experience."
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
      description="Testimonials are seeded now and can be managed from the dashboard later."
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
      description="This section can easily be expanded later from the admin dashboard."
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
  socialLinks,
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
  socialLinks: Array<{
    id: string;
    label: string;
    url: string;
    icon: string;
  }>;
  scheduleCallUrl?: string | null;
}) {
  const whatsappUrl = `https://wa.me/${normalizeWhatsAppNumber(contactInfo.whatsapp)}`;

  return (
    <SectionShell
      id="contact"
      eyebrow="Contact"
      title={contactInfo.formTitle}
      description={contactInfo.formDescription}
    >
      <div className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
        <Reveal>
          <Card className="h-full">
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4">
                {[
                  { label: "Email", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
                  { label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                  { label: "Location", value: contactInfo.location, href: undefined }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a className="mt-2 block font-medium hover:text-primary" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-[1.5rem] border border-border/70 bg-primary/8 p-5">
                <p className="text-sm font-semibold">{contactInfo.availability}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Ideal for guardian consultations, SSC/HSC preparation planning, and admission-focused study support.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild size="lg">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    Quick WhatsApp Contact
                  </a>
                </Button>
                {scheduleCallUrl ? (
                  <Button asChild size="lg" variant="outline">
                    <a href={scheduleCallUrl} target="_blank" rel="noreferrer">
                      Schedule a Call
                    </a>
                  </Button>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((item) => (
                  <Button key={item.id} asChild size="sm" variant="outline">
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <IconByName name={item.icon} className="h-4 w-4" />
                      {item.label}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card>
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
      </div>
    </SectionShell>
  );
}
