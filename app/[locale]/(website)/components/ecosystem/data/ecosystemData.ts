export type DonationAmount = {
  label: string;
  value: number;
  isDefault?: boolean;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  suggestedAmount: number;
  frequency: "One Off" | "Monthly";
  description: string;
  amounts: DonationAmount[];
};

export type CaseStudy = {
  title: string;
  subjectName: string;
  subjectLabel: string;
  quote: string;
  story: string[];
  interviewSource: string;
  interviewDate: string;
  image: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type EcosystemStage = {
  id: string;
  slug: string;
  stageNumber: number;
  name: string;
  tagline: string;
  badge: string;
  color: string;
  heroImage: string;
  shortDescription: string;
  heroProjects: string[]; // project IDs shown in hero
  intro: {
    eyebrow: string;
    title: string;
    why: string;
    how: string;
    vision: string;
    donorCta: string;
    stats: { value: string; label: string }[];
  };
  caseStudy: CaseStudy;
  projects: Project[];
  faqs: FAQ[];
};

export const ecosystemStages: EcosystemStage[] = [
  // ─────────────────────────────────────────────
  // STAGE 1: ESSENTIALS
  // ─────────────────────────────────────────────
  {
    id: "essentials",
    slug: "essentials",
    stageNumber: 1,
    name: "Essentials",
    tagline: "Providing urgent relief to those in need",
    badge: "URGENCY",
    color: "purple",
    heroImage: "/img-placeholder.JPG",
    shortDescription:
      "When crisis strikes, survival comes first. Our Essentials stage delivers food, healthcare, and emergency aid to those on the brink.",
    heroProjects: ["emergency-food", "medical-aid", "emergency-shelter"],
    intro: {
      eyebrow: "STAGE 1 · ESSENTIALS",
      title: "Because Survival Must Come Before Everything Else",
      why: "Millions of families are living on the edge — one flood, one illness, one conflict away from losing everything. Without urgent intervention, hunger, disease, and exposure claim lives before any long-term help can reach them. The Essentials stage exists because no development is possible without first keeping people alive.",
      how: "We deploy rapid-response food packages, emergency medical care, and safe shelter to the most vulnerable communities. Our field teams work directly in crisis zones, ensuring that aid reaches those who need it most — not aid bureaucracies.",
      vision:
        "Our long-term vision is a world where no one faces a crisis alone. But to get there, we must first ensure that every person has what they need to simply survive today — so they can dream of tomorrow.",
      donorCta:
        "Your donation to the Essentials stage acts as an emergency lifeline. Even £5 can provide a food parcel that feeds a family for a week. Every contribution is a direct act of mercy.",
      stats: [
        { value: "50,000+", label: "Families Reached" },
        { value: "12", label: "Crisis Regions" },
        { value: "£5", label: "Feeds a Family for a Week" },
      ],
    },
    caseStudy: {
      title: "From Starvation to Safety: A Family's Fight to Survive",
      subjectName: "Fatima & Her Children",
      subjectLabel: "FATIMA'S FAMILY, NORTHERN SYRIA",
      quote:
        "We hadn't eaten in three days. When the aid workers arrived, my children cried — not from sadness, but from relief.",
      story: [
        "Fatima, 34, fled her home in northern Syria after airstrikes destroyed her neighbourhood overnight. With four children under ten and no food, water, or shelter, she walked for two days before reaching a transit camp.",
        "Through Human Relief Mission's Emergency Food Programme, Fatima received an immediate food parcel containing rice, lentils, oil, and dates — enough to last her family ten days. She was also given access to a mobile medical clinic where her youngest child was treated for dehydration.",
        "Within two weeks, Fatima's family was registered for ongoing Essentials support. Her children were no longer at risk of acute malnutrition. For the first time in weeks, they slept safely.",
        "Fatima's story is one of thousands. Each year, your donations make moments like this possible — turning despair into dignified survival.",
      ],
      interviewSource: "Human Relief Mission Field Team",
      interviewDate: "2025",
      image: "/img-placeholder.JPG",
    },
    projects: [
      {
        id: "emergency-food",
        name: "Emergency Food Parcel",
        tagline: "Feeds a family for up to 10 days",
        icon: "🥘",
        suggestedAmount: 30,
        frequency: "One Off",
        description:
          "A carefully packed food parcel containing rice, lentils, cooking oil, salt, and dates — essential calories for a family in crisis. Distributed by our field teams directly to those most in need.",
        amounts: [
          { label: "£15", value: 15 },
          { label: "£30", value: 30, isDefault: true },
          { label: "£60", value: 60 },
        ],
      },
      {
        id: "medical-aid",
        name: "Emergency Medical Aid",
        tagline: "Provides urgent healthcare to one family",
        icon: "🏥",
        suggestedAmount: 25,
        frequency: "One Off",
        description:
          "Funds a mobile medical clinic visit for one family, covering consultation, basic medicines, and referrals for serious cases. In crisis zones, this can be the difference between life and death.",
        amounts: [
          { label: "£10", value: 10 },
          { label: "£25", value: 25, isDefault: true },
          { label: "£50", value: 50 },
        ],
      },
      {
        id: "emergency-shelter",
        name: "Emergency Shelter Kit",
        tagline: "Protects a family from the elements",
        icon: "🏕️",
        suggestedAmount: 75,
        frequency: "One Off",
        description:
          "A full emergency shelter kit including a weatherproof tarpaulin, rope, and basic bedding. Provides temporary but vital protection for a displaced family while longer-term housing is arranged.",
        amounts: [
          { label: "£35", value: 35 },
          { label: "£75", value: 75, isDefault: true },
          { label: "£150", value: 150 },
        ],
      },
    ],
    faqs: [
      {
        question: "Is this stage eligible for Zakat?",
        answer:
          "Yes. Emergency food, medical aid, and shelter provided to those in genuine need fully qualifies as Zakat-eligible. Our team ensures all distributions meet the conditions of Zakat as defined by Islamic scholars.",
      },
      {
        question: "How quickly does my donation reach the field?",
        answer:
          "Essentials donations are typically mobilised within 48–72 hours of receipt. We maintain pre-positioned stock in key crisis regions so that aid can be deployed immediately when emergencies arise.",
      },
      {
        question: "What percentage of my donation goes directly to aid?",
        answer:
          "100% of your Zakat donation goes directly to project delivery. For other donation types, at least 85% goes to the field — our admin costs are covered by Gift Aid and separate unrestricted funds.",
      },
      {
        question: "Can I donate regularly to the Essentials stage?",
        answer:
          "Absolutely. A regular monthly donation to Essentials helps us plan ahead and maintain consistent supply pipelines to crisis zones, rather than relying solely on emergency appeals.",
      },
      {
        question: "Which countries does Essentials operate in?",
        answer:
          "Currently we operate in Syria, Yemen, Gaza, Somalia, Pakistan, and Bangladesh. We respond to new crises as they emerge, so this list may expand. Check our latest updates for current operations.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // STAGE 2: STABILITY
  // ─────────────────────────────────────────────
  {
    id: "stability",
    slug: "stability",
    stageNumber: 2,
    name: "Stability",
    tagline: "Giving families the means to keep themselves stable",
    badge: "STABILISE",
    color: "purple",
    heroImage: "/img-placeholder.JPG",
    shortDescription:
      "Once immediate needs are met, families need the foundations to stay stable — clean water, safe housing, and consistent support.",
    heroProjects: ["water-well", "sanitation", "widow-support"],
    intro: {
      eyebrow: "STAGE 2 · STABILITY",
      title: "Building the Foundations That Allow Life to Continue",
      why: "Emergency relief keeps people alive — but it doesn't keep them safe. Families without clean water, proper sanitation, or reliable shelter remain in a constant state of crisis, unable to plan for the future. The Stability stage bridges the gap between survival and the possibility of growth.",
      how: "We install water wells, build latrines, repair homes, and provide consistent widow and orphan support to families who have stabilised but remain vulnerable. These interventions are designed to last — removing the root causes of repeated crises.",
      vision:
        "We envision communities where families are no longer caught in cycles of emergency — where clean water flows, children are protected, and families have a stable platform from which to grow.",
      donorCta:
        "Your donation to Stability creates infrastructure that serves entire communities for decades. A water well funded today will provide clean water to hundreds of families for 20+ years.",
      stats: [
        { value: "200+", label: "Wells Installed" },
        { value: "15,000+", label: "Widows Supported" },
        { value: "20 Years", label: "Average Well Lifespan" },
      ],
    },
    caseStudy: {
      title: "Clean Water Changed Everything for Nadia's Village",
      subjectName: "Nadia",
      subjectLabel: "NADIA'S VILLAGE, RURAL SOMALIA",
      quote:
        "Before the well, I walked four hours every day just to get water. Now I use that time to teach my children to read.",
      story: [
        "Nadia, 29, is a mother of three living in a rural district of Somalia. Before Human Relief Mission installed a water well in her village, the nearest clean water source was a four-hour walk away — a journey she made daily, often under dangerous conditions.",
        "The water she collected was often contaminated, leading to repeated bouts of illness in her children. Medical costs from these illnesses consumed the little income her family had, keeping them trapped in poverty.",
        "After the well was installed, Nadia's daily four-hour walk ended overnight. Her children's health improved dramatically. The time she reclaimed was spent starting a small vegetable garden — her first step toward self-sufficiency.",
        "The well serves over 300 families in Nadia's community. Your donation made it possible — and it will continue to provide clean water for the next 20 years.",
      ],
      interviewSource: "Human Relief Mission Field Team",
      interviewDate: "2025",
      image: "/img-placeholder.JPG",
    },
    projects: [
      {
        id: "water-well",
        name: "Water Well",
        tagline: "Provides clean water to 300+ families",
        icon: "💧",
        suggestedAmount: 500,
        frequency: "One Off",
        description:
          "A fully installed borehole water well serving an entire village community. Built to last 20+ years, each well eliminates the daily burden of water collection and dramatically reduces waterborne illness.",
        amounts: [
          { label: "£100", value: 100 },
          { label: "£250", value: 250 },
          { label: "£500", value: 500, isDefault: true },
        ],
      },
      {
        id: "sanitation",
        name: "Sanitation Block",
        tagline: "Protects community health and dignity",
        icon: "🚿",
        suggestedAmount: 200,
        frequency: "One Off",
        description:
          "A hygienic sanitation facility for a community school or camp, including latrines, handwashing stations, and drainage. Prevents the spread of disease and keeps girls in school.",
        amounts: [
          { label: "£50", value: 50 },
          { label: "£100", value: 100 },
          { label: "£200", value: 200, isDefault: true },
        ],
      },
      {
        id: "widow-support",
        name: "Widow & Orphan Support",
        tagline: "Monthly support for a vulnerable family",
        icon: "🤲",
        suggestedAmount: 30,
        frequency: "Monthly",
        description:
          "A monthly support package for a widow-led household, covering food, hygiene items, and access to social support services. Consistent, dignified support that allows families to stabilise without the shame of begging.",
        amounts: [
          { label: "£15", value: 15 },
          { label: "£30", value: 30, isDefault: true },
          { label: "£50", value: 50 },
        ],
      },
    ],
    faqs: [
      {
        question: "Does a water well qualify as Zakat or Sadaqah?",
        answer:
          "A water well is one of the most highly recommended forms of Sadaqah Jariyah (ongoing charity) in Islam. It can also qualify as Zakat if the community served meets the criteria of Zakat recipients. We recommend consulting with a scholar for your specific situation.",
      },
      {
        question: "How do I know a well has been installed in my name?",
        answer:
          "Every well donor receives a completion certificate with GPS coordinates, photos of the installation, and details of the community served. You can also request a field visit report.",
      },
      {
        question: "Is widow support monitored to ensure it reaches the right people?",
        answer:
          "Yes. Our in-country teams verify eligibility before enrolling families, and conduct quarterly check-ins to ensure continued need and proper receipt of support. We maintain full accountability records.",
      },
      {
        question: "How long does it take to build a water well?",
        answer:
          "From donation to completion, most wells are installed within 8–12 weeks, depending on location and ground conditions. Emergency installations can be expedited in some regions.",
      },
      {
        question: "Can I dedicate a well or support package in memory of someone?",
        answer:
          "Yes. All Stability projects can be dedicated in memory of a loved one or as a gift. Simply select the dedication option at checkout, or contact our donor services team.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // STAGE 3: DEVELOPMENT
  // ─────────────────────────────────────────────
  {
    id: "development",
    slug: "development",
    stageNumber: 3,
    name: "Development",
    tagline: "Enabling individuals to develop skills and earn with dignity",
    badge: "GROW",
    color: "purple",
    heroImage: "/img-placeholder.JPG",
    shortDescription:
      "Skills, education, and sponsorships that unlock potential — turning aid recipients into active contributors to their communities.",
    heroProjects: ["vocational-training", "orphan-sponsorship", "education"],
    intro: {
      eyebrow: "STAGE 3 · DEVELOPMENT",
      title: "From Receiving Help to Building a Future",
      why: "Stability is not enough if families remain dependent on charity indefinitely. The Development stage is where transformation truly begins — giving individuals the skills, education, and confidence to earn their own income and provide for their families with dignity.",
      how: "We fund vocational training centres, orphan education sponsorships, and skills development programmes that are aligned with local labour markets. Every programme is designed with a clear outcome: a graduate who can earn a living and no longer needs our support.",
      vision:
        "We envision a generation of skilled, educated individuals who were once aid recipients but are now employers, teachers, and community leaders — people who will one day pay Zakat themselves.",
      donorCta:
        "Sponsoring one person through our Development stage doesn't just change their life — it changes the trajectory of their entire family for generations. Your investment today is their independence tomorrow.",
      stats: [
        { value: "8,000+", label: "Graduates Trained" },
        { value: "73%", label: "Employment Rate Post-Training" },
        { value: "3,200+", label: "Orphans Sponsored" },
      ],
    },
    caseStudy: {
      title: "From Orphan to Business Owner: Mariam's Story",
      subjectName: "Mariam",
      subjectLabel: "MARIAM, VOCATIONAL TRAINEE — KABUL",
      quote:
        "I never thought a girl like me could own a business. The sewing course gave me a skill — and then gave me a life.",
      story: [
        "Mariam, 22, lost her father when she was twelve. Without income, her family faced destitution. As the eldest daughter, she felt the weight of responsibility but had no means to act on it.",
        "Through Human Relief Mission's Development Programme, Mariam was enrolled in a six-month vocational sewing course. She learned not just how to sew, but how to manage orders, price her work, and build a client base.",
        "Within three months of completing her training, Mariam had her first paying clients. Within a year, she had hired two of her neighbours and was earning more than the local average wage.",
        "Mariam is now enrolled in our business development mentorship programme. She recently made her first charitable donation — a moment that moved her to tears. She had crossed the line from Zakat receiver to Zakat payer.",
      ],
      interviewSource: "Human Relief Mission Field Team",
      interviewDate: "2025",
      image: "/img-placeholder.JPG",
    },
    projects: [
      {
        id: "vocational-training",
        name: "Vocational Training Sponsorship",
        tagline: "Skills that lead to real, lasting employment",
        icon: "🧵",
        suggestedAmount: 40,
        frequency: "Monthly",
        description:
          "Sponsor one person through a 6-month vocational training programme — sewing, carpentry, computing, or agriculture. Includes materials, certification, and job placement support.",
        amounts: [
          { label: "£20", value: 20 },
          { label: "£40", value: 40, isDefault: true },
          { label: "£80", value: 80 },
        ],
      },
      {
        id: "orphan-sponsorship",
        name: "Orphan Education Sponsorship",
        tagline: "Gives an orphan access to quality education",
        icon: "📚",
        suggestedAmount: 30,
        frequency: "Monthly",
        description:
          "Monthly sponsorship covering school fees, uniform, stationery, and a nutritious school meal for one orphaned child. Provides not just education — but hope, stability, and a future.",
        amounts: [
          { label: "£15", value: 15 },
          { label: "£30", value: 30, isDefault: true },
          { label: "£50", value: 50 },
        ],
      },
      {
        id: "education",
        name: "Community Education Centre",
        tagline: "Builds a learning space for 100+ children",
        icon: "🏫",
        suggestedAmount: 1000,
        frequency: "One Off",
        description:
          "Fund the construction or refurbishment of a community learning centre, providing a permanent, safe space for children to receive formal education in underserved areas.",
        amounts: [
          { label: "£250", value: 250 },
          { label: "£500", value: 500 },
          { label: "£1000", value: 1000, isDefault: true },
        ],
      },
    ],
    faqs: [
      {
        question: "How do I know my sponsorship is reaching the right person?",
        answer:
          "Every sponsor receives a profile of the individual or child they are supporting, along with biannual progress reports. You can also receive letters or messages from sponsored individuals where permitted.",
      },
      {
        question: "What happens if a sponsored orphan reaches adulthood?",
        answer:
          "When a sponsored child completes their schooling, they are transitioned into our vocational training or higher education support programmes if they qualify — ensuring continuity of support through to genuine independence.",
      },
      {
        question: "Are the vocational training programmes chosen based on local job markets?",
        answer:
          "Yes. Before launching any programme, our teams conduct local labour market assessments to ensure the skills taught lead to genuine employment opportunities in that region.",
      },
      {
        question: "Can I cancel my monthly sponsorship?",
        answer:
          "Yes, you can cancel at any time. However, we encourage sponsors to commit to at least six months so that the sponsored individual or child can complete a full programme cycle. We'll always work with you if your circumstances change.",
      },
      {
        question: "Does this stage qualify for Zakat?",
        answer:
          "Sponsorships for orphans and vocational training for those in genuine need can qualify as Zakat if the recipients meet the conditions. Our team can provide guidance, and we recommend seeking scholarly advice for your specific situation.",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // STAGE 4: SUSTAINABILITY
  // ─────────────────────────────────────────────
  {
    id: "sustainability",
    slug: "sustainability",
    stageNumber: 4,
    name: "Sustainability",
    tagline: "Enabling beneficiaries to earn a living and pay Zakat",
    badge: "THRIVE",
    color: "purple",
    heroImage: "/img-placeholder.JPG",
    shortDescription:
      "The final stage of transformation — where individuals become self-sufficient, providing for their families and eventually paying Zakat themselves.",
    heroProjects: ["income-generation", "microfinance", "business-mentorship"],
    intro: {
      eyebrow: "STAGE 4 · SUSTAINABILITY",
      title: "The Moment a Zakat Receiver Becomes a Zakat Payer",
      why: "True development is not complete until a person can stand entirely on their own — earning, giving, and contributing to their community. The Sustainability stage represents the fulfilment of our entire ecosystem: individuals who no longer need our help and are themselves changing the lives of others.",
      how: "We provide income generation grants, microfinance support, and ongoing business mentorship to those who have completed the Development stage. These interventions bridge the final gap between skilled individual and fully self-sufficient earner.",
      vision:
        "Our ultimate vision is captured in a single phrase: from Zakat receiver to Zakat payer. Every person we support through to Sustainability becomes a living proof that charity, when done with wisdom and long-term thinking, can truly end poverty.",
      donorCta:
        "A donation to Sustainability is an investment in a multiplier. The person you help become self-sufficient today will go on to support their family, employ their neighbours, and one day give Zakat themselves — your gift echoes across generations.",
      stats: [
        { value: "2,100+", label: "Businesses Launched" },
        { value: "89%", label: "Still Operating After 2 Years" },
        { value: "£0", label: "Zakat Received by Graduates" },
      ],
    },
    caseStudy: {
      title: "How Yusuf Went from Refugee to Employer",
      subjectName: "Yusuf",
      subjectLabel: "YUSUF, MARKET TRADER — NAIROBI",
      quote:
        "Last Ramadan, I gave Zakat for the first time in my life. I wept. I knew then that everything had changed.",
      story: [
        "Yusuf, 38, arrived in Nairobi as a refugee from South Sudan with nothing but the clothes on his back. Over six years, he moved through every stage of Human Relief Mission's ecosystem — from emergency food relief to a vocational carpentry course.",
        "At the Sustainability stage, Yusuf received a small income generation grant and was matched with a business mentor. He used the grant to purchase tools and timber, and began making and selling furniture in a local market.",
        "Within 18 months, Yusuf's business had grown enough for him to employ three other refugees from his community. His children are all in school. His wife has started her own small catering business.",
        "Last Ramadan, Yusuf calculated his Zakat for the first time. He called our field team to tell them. 'I am no longer on your list,' he said. 'I am on Allah's list of givers now.'",
      ],
      interviewSource: "Human Relief Mission Field Team",
      interviewDate: "2025",
      image: "/img-placeholder.JPG",
    },
    projects: [
      {
        id: "income-generation",
        name: "Income Generation Grant",
        tagline: "Seed funding to launch a sustainable business",
        icon: "📈",
        suggestedAmount: 150,
        frequency: "One Off",
        description:
          "A one-off grant provided to a verified graduate of our Development stage, used to purchase tools, stock, or equipment needed to launch their business. Each grant is monitored and reported on.",
        amounts: [
          { label: "£50", value: 50 },
          { label: "£100", value: 100 },
          { label: "£150", value: 150, isDefault: true },
        ],
      },
      {
        id: "microfinance",
        name: "Microfinance Support",
        tagline: "Interest-free loans for growing businesses",
        icon: "🏦",
        suggestedAmount: 200,
        frequency: "One Off",
        description:
          "Fund an interest-free (Qard Hasan) loan to a deserving entrepreneur, enabling them to scale their business without exploitative interest. Repayments are recycled to fund future entrepreneurs.",
        amounts: [
          { label: "£75", value: 75 },
          { label: "£150", value: 150 },
          { label: "£200", value: 200, isDefault: true },
        ],
      },
      {
        id: "business-mentorship",
        name: "Business Mentorship Programme",
        tagline: "Expert guidance for 12 months",
        icon: "🤝",
        suggestedAmount: 25,
        frequency: "Monthly",
        description:
          "Monthly funding for a dedicated business mentor to support one entrepreneur through their first year of trading — covering accounting, marketing, supply chain, and customer management.",
        amounts: [
          { label: "£15", value: 15 },
          { label: "£25", value: 25, isDefault: true },
          { label: "£40", value: 40 },
        ],
      },
    ],
    faqs: [
      {
        question: "Can Zakat be used for income generation grants?",
        answer:
          "This is a nuanced question. Classical scholarship generally permits Zakat to be used to provide the tools or capital needed for a person in need to become self-sufficient. We recommend consulting with a qualified Islamic scholar for guidance on your specific intention.",
      },
      {
        question: "How are income generation grant recipients selected?",
        answer:
          "All grant recipients must have completed our Development stage programmes and be assessed by our field teams as ready and motivated for self-employment. We do not give grants to anyone who has not been through our full screening process.",
      },
      {
        question: "Are the microfinance loans really interest-free?",
        answer:
          "Yes. All loans are structured as Qard Hasan — a benevolent, interest-free loan as prescribed in Islamic finance. Repayments go directly into a revolving fund to support the next entrepreneur.",
      },
      {
        question: "What happens if a business fails?",
        answer:
          "We understand that not every business succeeds. If a supported entrepreneur's business fails, our team works with them to understand what went wrong and — if appropriate — support them to try again with revised plans and additional mentorship.",
      },
      {
        question: "How do I follow the journey of someone I've helped reach Sustainability?",
        answer:
          "Donors who fund Sustainability projects receive a 12-month impact report tracking the progress of the individuals they've supported. With consent, we also share anonymised success stories through our newsletter and social channels.",
      },
    ],
  },
];

export const allStages = [
  { name: "Essentials", slug: "essentials", badge: "URGENCY", stageNumber: 1 },
  { name: "Stability", slug: "stability", badge: "STABILISE", stageNumber: 2 },
  { name: "Development", slug: "development", badge: "GROW", stageNumber: 3 },
  { name: "Sustainability", slug: "sustainability", badge: "THRIVE", stageNumber: 4 },
];

export const stageConfig = [
  {
    stageNumber: 1,
    slug: "essentials",
    name: "Essentials",
    badge: "URGENCY",
    color: "text-red-600",
    badgeBg: "bg-red-50 text-red-600 border-red-200",
    description: "Provide the bare necessities to keep people alive and safe — immediate relief before anything else can begin.",
    icon: "🆘",
  },
  {
    stageNumber: 2,
    slug: "stability",
    name: "Stability",
    badge: "STABILISE",
    color: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200",
    description: "Build stable foundations so families can live safely with clean water and proper infrastructure in place.",
    icon: "🏠",
  },
  {
    stageNumber: 3,
    slug: "development",
    name: "Development",
    badge: "GROW",
    color: "text-green-600",
    badgeBg: "bg-green-50 text-green-600 border-green-200",
    description: "Invest in people through education and sponsorships to unlock their potential, skills and capabilities.",
    icon: "📚",
  },
  {
    stageNumber: 4,
    slug: "sustainability",
    name: "Sustainability",
    badge: "THRIVE",
    color: "text-yellow-700",
    badgeBg: "bg-yellow-50 text-yellow-700 border-yellow-200",
    description: "Generate sustainable income so individuals become self-sufficient — and eventually Zakat payers themselves.",
    icon: "🌟",
  },
];
