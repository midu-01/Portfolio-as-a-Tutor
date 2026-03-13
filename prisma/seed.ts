import bcrypt from "bcryptjs";
import { PrismaClient, SectionKey } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: "Midu Mojumder",
      passwordHash
    },
    create: {
      email: adminEmail,
      name: "Midu Mojumder",
      passwordHash
    }
  });

  await prisma.siteSettings.upsert({
    where: { id: "site-settings" },
    update: {
      siteName: "Midu's Coaching",
      siteTagline: ""
    },
    create: {
      id: "site-settings",
      siteName: "Midu's Coaching",
      siteTagline: "",
      siteDescription:
        "Dedicated and result-oriented tutor with over 5 years of experience teaching SSC, HSC, and admission-level science students. Proven success in guiding students to top results, including admissions to SUST, BUET, DU, JU and other leading universities.",
      siteLocation: "Mohakhali, Dhaka, Bangladesh",
      primaryEmail: "midumojumder8@gmail.com",
      primaryPhone: "+8801794532606",
      whatsappNumber: "8801794532606",
      seoTitle: "Midu Mojumder | Premium Tutor Portfolio",
      seoDescription:
        "Private tutor for SSC, HSC, and admission-level science students with a strong record of public university admissions and academic results.",
      yearsExperience: "5+ Years Experience",
      studentLevelLabel: "SSC / HSC / Admission",
      resultHighlight: "Top Public University Results",
      scheduleCallUrl: "",
      themeAccent: "blue"
    }
  });

  const defaultSections = [
    {
      key: SectionKey.HERO,
      title: "Home",
      description: "Overview and introduction",
      sortOrder: 0
    },
    {
      key: SectionKey.ABOUT,
      title: "About",
      description: "Teaching philosophy and background",
      sortOrder: 1
    },
    {
      key: SectionKey.SUBJECTS,
      title: "Subjects",
      description: "Subjects currently taught",
      sortOrder: 2
    },
    {
      key: SectionKey.EXPERIENCE,
      title: "Experience",
      description: "Teaching experience and methods",
      sortOrder: 3
    },
    {
      key: SectionKey.ACHIEVEMENTS,
      title: "Achievements",
      description: "Student and teaching results",
      sortOrder: 4
    },
    {
      key: SectionKey.WHY_CHOOSE_ME,
      title: "Why Choose Me",
      description: "Trust builders for guardians and students",
      sortOrder: 5
    },
    {
      key: SectionKey.EDUCATION,
      title: "Education",
      description: "Academic background",
      sortOrder: 6
    },
    {
      key: SectionKey.HIGHLIGHTS,
      title: "Highlights",
      description: "Additional achievements and leadership",
      sortOrder: 7
    },
    {
      key: SectionKey.TESTIMONIALS,
      title: "Testimonials",
      description: "Student and guardian feedback",
      sortOrder: 8
    },
    {
      key: SectionKey.FAQ,
      title: "FAQ",
      description: "Common tuition questions",
      sortOrder: 9
    },
    {
      key: SectionKey.CONTACT,
      title: "Contact",
      description: "Contact details and inquiry form",
      sortOrder: 10
    }
  ];

  for (const section of defaultSections) {
    await prisma.siteSection.upsert({
      where: { key: section.key },
      update: section,
      create: {
        ...section,
        siteSettingsId: "site-settings"
      }
    });
  }

  await prisma.heroSection.upsert({
    where: { id: "hero-section" },
    update: {},
    create: {
      id: "hero-section",
      name: "Midu Mojumder",
      role: "Dedicated and result-oriented tutor",
      badge: "Premium academic mentorship for science students",
      summary:
        "Dedicated and result-oriented tutor with over 5 years of experience teaching SSC, HSC, and admission-level science students. Proven success in guiding students to top results, including admissions to BUET, DU, and other leading universities. Skilled in simplifying complex concepts, maintaining strong communication with guardians, and creating a supportive environment where students can learn with confidence.",
      primaryCtaLabel: "Contact Me",
      primaryCtaHref: "#contact",
      secondaryCtaLabel: "View Achievements",
      secondaryCtaHref: "#achievements",
      supportText: "Available for online, offline, and admission-focused guidance."
    }
  });

  const heroStats = [
    { value: "5+", label: "Years Experience", sortOrder: 0 },
    { value: "SSC / HSC", label: "Core Student Levels", sortOrder: 1 },
    { value: "BUET / DU", label: "Admission Outcomes", sortOrder: 2 }
  ];

  await prisma.heroStat.deleteMany({ where: { heroSectionId: "hero-section" } });
  await prisma.heroStat.createMany({
    data: heroStats.map((item) => ({
      heroSectionId: "hero-section",
      ...item
    }))
  });

  await prisma.aboutSection.upsert({
    where: { id: "about-section" },
    update: {},
    create: {
      id: "about-section",
      title: "About Me",
      summary:
        "I help SSC, HSC, and admission-level science students build confidence through clear explanations, structured practice, and a supportive learning process. My sessions focus on depth, consistency, and measurable progress rather than short-term memorization.",
      conceptualApproach:
        "I specialize in conceptual learning that helps students understand why a solution works, not just how to repeat it.",
      guardianCommunication:
        "Guardians stay informed through regular communication about progress, performance, and focus areas.",
      teachingEnvironment:
        "Students learn in a friendly, supportive environment where questions are welcome and growth is tracked carefully."
    }
  });

  await prisma.subject.deleteMany();
  await prisma.subject.createMany({
    data: [
      {
        title: "Mathematics",
        icon: "Calculator",
        description: "Strong fundamentals, problem-solving fluency, and exam-oriented techniques.",
        accent: "from-sky-500/20 to-cyan-400/10",
        sortOrder: 0
      },
      {
        title: "Higher Mathematics",
        icon: "Sigma",
        description: "Advanced algebra, trigonometry, calculus preparation, and strategic practice.",
        accent: "from-emerald-500/20 to-teal-400/10",
        sortOrder: 1
      },
      {
        title: "Physics",
        icon: "Atom",
        description: "Concept-first guidance with visual reasoning and smart numerical solving methods.",
        accent: "from-amber-500/20 to-orange-400/10",
        sortOrder: 2
      },
      {
        title: "Chemistry",
        icon: "FlaskConical",
        description: "Balanced coverage of theory, reaction logic, and examination patterns.",
        accent: "from-rose-500/20 to-pink-400/10",
        sortOrder: 3
      },
      {
        title: "ICT",
        icon: "MonitorCog",
        description: "Clear understanding of logic, computing concepts, and board-focused preparation.",
        accent: "from-violet-500/20 to-indigo-400/10",
        sortOrder: 4
      }
    ]
  });

  await prisma.experience.deleteMany();
  const experience = await prisma.experience.create({
    data: {
      title: "Private Tutor",
      organization: "SSC, HSC & Admission-Level Science Mentorship",
      period: "2019 - Present",
      summary:
        "Over 5 years of continuous teaching experience with customized academic support for classes 9-12 and admission candidates.",
      sortOrder: 0
    }
  });

  await prisma.experiencePoint.createMany({
    data: [
      "One-on-one and group tuition",
      "Customized lesson plans",
      "Exam strategies tailored to student needs",
      "Conceptual understanding and exam preparation"
    ].map((content, index) => ({
      experienceId: experience.id,
      content,
      sortOrder: index
    }))
  });

  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({
    data: [
      {
        metric: "100%",
        title: "Top public university progression",
        description:
          "All HSC students under my guidance are currently studying at top public universities in Bangladesh.",
        sortOrder: 0
      },
      {
        metric: "3 Students",
        title: "BUET admissions",
        description: "Three students secured admission into BUET through guided preparation.",
        sortOrder: 1
      },
      {
        metric: "5/6",
        title: "SSC GPA 5.00 success",
        description: "Five out of six students scored GPA 5.00 in SSC examinations.",
        sortOrder: 2
      },
      {
        metric: "3rd Place",
        title: "Math Olympiad achievement",
        description: "One student achieved 3rd position in Math Olympiad (Sylhet region).",
        sortOrder: 3
      },
      {
        metric: "Trusted",
        title: "Guardian confidence",
        description:
          "Students and guardians consistently praise the clarity, patience, and result-oriented approach.",
        sortOrder: 4
      }
    ]
  });

  await prisma.whyChooseMeItem.deleteMany();
  await prisma.whyChooseMeItem.createMany({
    data: [
      {
        title: "Complex ideas become clear",
        description: "Lessons are broken down into simple, understandable steps for lasting confidence.",
        icon: "Lightbulb",
        sortOrder: 0
      },
      {
        title: "Conceptual learning first",
        description: "Students build real understanding instead of relying on memorization alone.",
        icon: "BrainCircuit",
        sortOrder: 1
      },
      {
        title: "Strong engineering background",
        description: "A science and engineering academic background informs structured, logical teaching.",
        icon: "GraduationCap",
        sortOrder: 2
      },
      {
        title: "Guardian communication",
        description: "Progress, challenges, and next steps are communicated regularly and clearly.",
        icon: "MessagesSquare",
        sortOrder: 3
      },
      {
        title: "Supportive environment",
        description: "Students get a friendly atmosphere where they feel comfortable asking questions.",
        icon: "HeartHandshake",
        sortOrder: 4
      },
      {
        title: "Continuous assessment",
        description: "Weekly or topic-based tests help measure growth and keep momentum steady.",
        icon: "ClipboardCheck",
        sortOrder: 5
      }
    ]
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        institution: "Shahjalal University of Science and Technology (SUST)",
        degree: "BSc in Computer Science & Engineering",
        period: "2020 - 2025",
        score: "CGPA: 3.76 / 4.00",
        location: "Sylhet, Bangladesh",
        sortOrder: 0
      },
      {
        institution: "Ispahani Public School and College, Cumilla",
        degree: "Science (Bangla Version)",
        period: "2017 - 2019",
        score: "GPA: 4.92 / 5.00",
        sortOrder: 1
      },
      {
        institution: "Bazra Bohumukhi High School, Noakhali",
        degree: "Science (Bangla Version)",
        period: "2012 - 2017",
        score: "GPA: 5.00 / 5.00",
        sortOrder: 2
      }
    ]
  });

  await prisma.highlight.deleteMany();
  await prisma.highlight.createMany({
    data: [
      {
        title: "Admission offers from top universities",
        description: "BUET (1077), SUST (199), DU (1234), JU (399), KUET (545)",
        icon: "Building2",
        sortOrder: 0
      },
      {
        title: "Math Olympiad recognition",
        description: "4th Rank in Math Olympiad (HSC level, Inter-College)",
        icon: "Medal",
        sortOrder: 1
      },
      {
        title: "Competitive programming",
        description: "Rated Expert on Codeforces with a strong university programming track record.",
        icon: "Code2",
        sortOrder: 2
      },
      {
        title: "Student leadership",
        description: "Vice President, Noakhali Association, SUST",
        icon: "Users",
        sortOrder: 3
      }
    ]
  });

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: "A Guardian from Dhaka",
        role: "Parent of an HSC student",
        quote:
          "Midu bhai explains difficult science topics with patience and structure. My son became much more confident before the exams.",
        result: "Improved confidence and exam performance",
        sortOrder: 0
      },
      {
        name: "Former Admission Student",
        role: "BUET admit",
        quote:
          "The classes were focused, calm, and practical. I always knew what to study next and where I needed improvement.",
        result: "Admitted to BUET",
        sortOrder: 1
      },
      {
        name: "SSC Student",
        role: "Board exam candidate",
        quote:
          "Every chapter felt easier because the concepts were taught from the basics. The weekly tests helped a lot.",
        result: "GPA 5.00",
        sortOrder: 2
      }
    ]
  });

  await prisma.contactInfo.upsert({
    where: { id: "contact-info" },
    update: {},
    create: {
      id: "contact-info",
      email: "midumojumder8@gmail.com",
      phone: "+8801794532606",
      whatsapp: "8801794532606",
      location: "Mohakhali, Dhaka, Bangladesh",
      formTitle: "Start a conversation about your academic goals",
      formDescription:
        "Share the student level, subject needs, and your preferred schedule. I will get back with the best next step.",
      availability: "Available for online and in-person tutoring in Dhaka"
    }
  });

  await prisma.fAQ.deleteMany();
  await prisma.fAQ.createMany({
    data: [
      {
        question: "Which students do you teach?",
        answer: "I primarily teach SSC, HSC, and admission-level science students.",
        sortOrder: 0
      },
      {
        question: "Do you offer one-to-one and group tuition?",
        answer: "Yes. Both individual and small group formats are available depending on student needs.",
        sortOrder: 1
      },
      {
        question: "How do you track progress?",
        answer: "I use weekly or topic-based tests, performance reviews, and regular guardian updates.",
        sortOrder: 2
      }
    ]
  });

  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: [
      {
        label: "Email",
        platform: "Email",
        url: "mailto:midumojumder8@gmail.com",
        icon: "Mail",
        sortOrder: 0
      },
      {
        label: "WhatsApp",
        platform: "WhatsApp",
        url: "https://wa.me/8801794532606",
        icon: "MessageCircle",
        sortOrder: 1
      },
      {
        label: "Phone",
        platform: "Phone",
        url: "tel:+8801794532606",
        icon: "Phone",
        sortOrder: 2
      },
      {
        label: "Facebook",
        platform: "Facebook",
        url: "https://www.facebook.com/MiduMojumder01",
        icon: "Facebook",
        sortOrder: 3
      },
      {
        label: "Instagram",
        platform: "Instagram",
        url: "https://www.instagram.com/midu.mojumder/",
        icon: "Instagram",
        sortOrder: 4
      },
      {
        label: "Location",
        platform: "Location",
        url: "https://maps.app.goo.gl/a4wSZXNhAwSnujCc8?g_st=aw",
        icon: "MapPin",
        sortOrder: 5
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
