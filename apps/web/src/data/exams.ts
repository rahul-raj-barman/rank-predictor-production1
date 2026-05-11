export type ExamCategory =
  | "Engineering"
  | "Medical"
  | "University"
  | "Government"
  | "Management"
  | "Banking"
  | "Railway"
  | "Defence"
  | "Teaching"
  | "State Exams";

export type ExamFaq = {
  question: string;
  answer: string;
};

export type ExamStats = {
  slug: string;
  name: string;
  shortName: string;
  category: ExamCategory;
  mean: number;
  standardDeviation: number;
  totalCandidates: number;
  maxScore: number;
  scoreLabel: string;
  description: string;
  keywords: readonly string[];
};

const examRouteAliases: Record<string, readonly string[]> = {
  "jee-mains-2027": ["jee-main-marks-vs-rank-2027"],
  "neet-ug-2027": ["neet-marks-vs-rank-2027"],
  "gate-cs-2027": ["gate-cs-marks-vs-rank-2027"],
  "ssc-cgl-2027": ["ssc-cgl-marks-vs-rank-2027"],
};

export const exams: readonly ExamStats[] = [
  {
    slug: "jee-mains-2027",
    name: "JEE Main 2027",
    shortName: "JEE Main 2027",
    category: "Engineering",
    mean: 88,
    standardDeviation: 42,
    totalCandidates: 1_250_000,
    maxScore: 300,
    scoreLabel: "JEE Main marks out of 300",
    description:
      "Estimate your JEE Main 2027 expected rank from marks using a fast statistical rank predictor for engineering admission planning.",
    keywords: ["JEE Main rank predictor", "JEE rank from marks", "JEE Main 2027 rank"],
  },
  {
    slug: "jee-advanced-2027",
    name: "JEE Advanced 2027",
    shortName: "JEE Advanced 2027",
    category: "Engineering",
    mean: 118,
    standardDeviation: 54,
    totalCandidates: 190_000,
    maxScore: 360,
    scoreLabel: "JEE Advanced marks",
    description:
      "Calculate an expected JEE Advanced 2027 rank range from marks for IIT admission and branch preference planning.",
    keywords: ["JEE Advanced rank predictor", "IIT rank predictor", "JEE Advanced marks vs rank"],
  },
  {
    slug: "neet-ug-2027",
    name: "NEET UG 2027",
    shortName: "NEET UG 2027",
    category: "Medical",
    mean: 310,
    standardDeviation: 115,
    totalCandidates: 2_400_000,
    maxScore: 720,
    scoreLabel: "NEET marks out of 720",
    description:
      "Predict your NEET UG 2027 expected rank from marks for MBBS, BDS, AYUSH, and medical college counselling research.",
    keywords: ["NEET rank predictor", "NEET marks vs rank", "NEET UG 2027 rank"],
  },
  {
    slug: "gate-da-2027",
    name: "GATE Data Science and Artificial Intelligence 2027",
    shortName: "GATE DA 2027",
    category: "Engineering",
    mean: 38.5,
    standardDeviation: 13.8,
    totalCandidates: 52_000,
    maxScore: 100,
    scoreLabel: "GATE score out of 100",
    description:
      "Estimate your GATE DA 2027 expected rank for data science, artificial intelligence, M.Tech, PSU, and research admission planning.",
    keywords: ["GATE DA rank predictor", "GATE Data Science rank", "GATE DA marks vs rank"],
  },
  {
    slug: "gate-cs-2027",
    name: "GATE Computer Science 2027",
    shortName: "GATE CS 2027",
    category: "Engineering",
    mean: 34.2,
    standardDeviation: 14.6,
    totalCandidates: 115_000,
    maxScore: 100,
    scoreLabel: "GATE score out of 100",
    description:
      "Use the GATE CS 2027 rank predictor to estimate expected rank from marks for M.Tech, IIT, NIT, IIIT, and PSU planning.",
    keywords: ["GATE CS rank predictor", "GATE CSE marks vs rank", "GATE CS 2027 rank"],
  },
  {
    slug: "gate-me-2027",
    name: "GATE Mechanical Engineering 2027",
    shortName: "GATE ME 2027",
    category: "Engineering",
    mean: 31.8,
    standardDeviation: 13.2,
    totalCandidates: 92_000,
    maxScore: 100,
    scoreLabel: "GATE score out of 100",
    description:
      "Predict your GATE Mechanical 2027 expected rank from marks for PSU shortlisting, M.Tech admission, and branch comparison.",
    keywords: ["GATE ME rank predictor", "GATE Mechanical marks vs rank", "GATE ME 2027"],
  },
  {
    slug: "gate-ee-2027",
    name: "GATE Electrical Engineering 2027",
    shortName: "GATE EE 2027",
    category: "Engineering",
    mean: 30.6,
    standardDeviation: 12.8,
    totalCandidates: 78_000,
    maxScore: 100,
    scoreLabel: "GATE score out of 100",
    description:
      "Estimate GATE EE 2027 expected rank from marks for electrical engineering PSU, M.Tech, and counselling decisions.",
    keywords: ["GATE EE rank predictor", "GATE Electrical marks vs rank", "GATE EE 2027"],
  },
  {
    slug: "cuet-ug-2027",
    name: "CUET UG 2027",
    shortName: "CUET UG 2027",
    category: "University",
    mean: 410,
    standardDeviation: 135,
    totalCandidates: 1_500_000,
    maxScore: 800,
    scoreLabel: "CUET UG normalized score",
    description:
      "Estimate your CUET UG 2027 rank position from normalized score for central university admission research.",
    keywords: ["CUET rank predictor", "CUET UG marks vs rank", "CUET 2027 college predictor"],
  },
  {
    slug: "cuet-pg-2027",
    name: "CUET PG 2027",
    shortName: "CUET PG 2027",
    category: "University",
    mean: 118,
    standardDeviation: 42,
    totalCandidates: 650_000,
    maxScore: 300,
    scoreLabel: "CUET PG score",
    description:
      "Predict CUET PG 2027 expected rank from score for postgraduate admission planning across participating universities.",
    keywords: ["CUET PG rank predictor", "CUET PG score vs rank", "CUET PG 2027"],
  },
  {
    slug: "ssc-cgl-2027",
    name: "SSC CGL 2027",
    shortName: "SSC CGL 2027",
    category: "Government",
    mean: 92,
    standardDeviation: 31,
    totalCandidates: 2_000_000,
    maxScore: 200,
    scoreLabel: "SSC CGL Tier 1 marks",
    description:
      "Estimate SSC CGL 2027 expected rank from Tier 1 marks for central government post preference and cut-off research.",
    keywords: ["SSC CGL rank predictor", "SSC CGL marks vs rank", "SSC CGL 2027 cutoff"],
  },
  {
    slug: "ssc-chsl-2027",
    name: "SSC CHSL 2027",
    shortName: "SSC CHSL 2027",
    category: "Government",
    mean: 83,
    standardDeviation: 28,
    totalCandidates: 1_600_000,
    maxScore: 200,
    scoreLabel: "SSC CHSL Tier 1 marks",
    description:
      "Predict SSC CHSL 2027 expected rank from marks for LDC, JSA, PA, SA, and DEO post planning.",
    keywords: ["SSC CHSL rank predictor", "SSC CHSL marks vs rank", "SSC CHSL 2027"],
  },
  {
    slug: "ssc-gd-2027",
    name: "SSC GD Constable 2027",
    shortName: "SSC GD 2027",
    category: "Government",
    mean: 68,
    standardDeviation: 22,
    totalCandidates: 3_000_000,
    maxScore: 160,
    scoreLabel: "SSC GD marks",
    description:
      "Estimate SSC GD Constable 2027 expected rank from marks for CAPF, SSF, Assam Rifles, and force allocation research.",
    keywords: ["SSC GD rank predictor", "SSC GD marks vs rank", "SSC GD 2027"],
  },
  {
    slug: "ssc-mts-2027",
    name: "SSC MTS 2027",
    shortName: "SSC MTS 2027",
    category: "Government",
    mean: 74,
    standardDeviation: 24,
    totalCandidates: 1_800_000,
    maxScore: 150,
    scoreLabel: "SSC MTS marks",
    description:
      "Use the SSC MTS 2027 rank predictor to estimate expected rank from marks for MTS and Havaldar selection planning.",
    keywords: ["SSC MTS rank predictor", "SSC MTS marks vs rank", "SSC MTS 2027"],
  },
  {
    slug: "cat-2027",
    name: "CAT 2027",
    shortName: "CAT 2027",
    category: "Management",
    mean: 46,
    standardDeviation: 22,
    totalCandidates: 330_000,
    maxScore: 198,
    scoreLabel: "CAT raw score",
    description:
      "Estimate your CAT 2027 expected rank and percentile-style position from score for IIM and MBA admission strategy.",
    keywords: ["CAT rank predictor", "CAT score vs percentile", "CAT 2027 predictor"],
  },
  {
    slug: "upsc-prelims-2027",
    name: "UPSC CSE Prelims 2027",
    shortName: "UPSC Prelims 2027",
    category: "Government",
    mean: 78,
    standardDeviation: 24,
    totalCandidates: 1_100_000,
    maxScore: 200,
    scoreLabel: "UPSC GS Paper 1 marks",
    description:
      "Estimate UPSC Prelims 2027 expected rank position from GS Paper 1 marks for Civil Services preparation analysis.",
    keywords: ["UPSC Prelims rank predictor", "UPSC marks vs rank", "UPSC CSE 2027"],
  },
  {
    slug: "state-psc-prelims-2027",
    name: "State PSC Prelims 2027",
    shortName: "State PSC 2027",
    category: "State Exams",
    mean: 86,
    standardDeviation: 27,
    totalCandidates: 500_000,
    maxScore: 200,
    scoreLabel: "State PSC prelims marks",
    description:
      "Predict expected rank for State PSC Prelims 2027 from marks across state civil service exam preparation scenarios.",
    keywords: ["State PSC rank predictor", "state civil services prelims rank", "PSC marks vs rank"],
  },
  {
    slug: "bpsc-prelims-2027",
    name: "BPSC Prelims 2027",
    shortName: "BPSC 2027",
    category: "State Exams",
    mean: 82,
    standardDeviation: 26,
    totalCandidates: 700_000,
    maxScore: 150,
    scoreLabel: "BPSC prelims marks",
    description:
      "Estimate BPSC Prelims 2027 expected rank from marks for Bihar state civil services preparation and cut-off research.",
    keywords: ["BPSC rank predictor", "BPSC prelims marks vs rank", "BPSC 2027"],
  },
  {
    slug: "uppsc-prelims-2027",
    name: "UPPSC Prelims 2027",
    shortName: "UPPSC 2027",
    category: "State Exams",
    mean: 88,
    standardDeviation: 29,
    totalCandidates: 650_000,
    maxScore: 200,
    scoreLabel: "UPPSC prelims marks",
    description:
      "Predict UPPSC Prelims 2027 expected rank from marks for Uttar Pradesh PCS preparation and merit analysis.",
    keywords: ["UPPSC rank predictor", "UPPSC marks vs rank", "UPPSC PCS 2027"],
  },
  {
    slug: "mpsc-prelims-2027",
    name: "MPSC Prelims 2027",
    shortName: "MPSC 2027",
    category: "State Exams",
    mean: 92,
    standardDeviation: 30,
    totalCandidates: 420_000,
    maxScore: 200,
    scoreLabel: "MPSC prelims marks",
    description:
      "Estimate MPSC Prelims 2027 expected rank from marks for Maharashtra state services exam preparation.",
    keywords: ["MPSC rank predictor", "MPSC prelims marks vs rank", "MPSC 2027"],
  },
  {
    slug: "ibps-po-2027",
    name: "IBPS PO 2027",
    shortName: "IBPS PO 2027",
    category: "Banking",
    mean: 52,
    standardDeviation: 18,
    totalCandidates: 900_000,
    maxScore: 100,
    scoreLabel: "IBPS PO prelims marks",
    description:
      "Estimate IBPS PO 2027 expected rank from prelims marks for banking exam selection and mains preparation planning.",
    keywords: ["IBPS PO rank predictor", "IBPS PO marks vs rank", "bank exam rank predictor"],
  },
  {
    slug: "ibps-clerk-2027",
    name: "IBPS Clerk 2027",
    shortName: "IBPS Clerk 2027",
    category: "Banking",
    mean: 57,
    standardDeviation: 19,
    totalCandidates: 1_200_000,
    maxScore: 100,
    scoreLabel: "IBPS Clerk prelims marks",
    description:
      "Predict IBPS Clerk 2027 expected rank from marks for bank clerk selection, state preference, and cut-off tracking.",
    keywords: ["IBPS Clerk rank predictor", "IBPS Clerk marks vs rank", "IBPS Clerk 2027"],
  },
  {
    slug: "sbi-po-2027",
    name: "SBI PO 2027",
    shortName: "SBI PO 2027",
    category: "Banking",
    mean: 54,
    standardDeviation: 17,
    totalCandidates: 1_000_000,
    maxScore: 100,
    scoreLabel: "SBI PO prelims marks",
    description:
      "Estimate SBI PO 2027 expected rank from prelims marks for probationary officer selection planning.",
    keywords: ["SBI PO rank predictor", "SBI PO marks vs rank", "SBI PO 2027"],
  },
  {
    slug: "rbi-grade-b-2027",
    name: "RBI Grade B 2027",
    shortName: "RBI Grade B 2027",
    category: "Banking",
    mean: 78,
    standardDeviation: 25,
    totalCandidates: 250_000,
    maxScore: 200,
    scoreLabel: "RBI Grade B Phase 1 marks",
    description:
      "Estimate RBI Grade B 2027 expected rank from Phase 1 marks for central banking exam preparation and cut-off analysis.",
    keywords: ["RBI Grade B rank predictor", "RBI Grade B marks vs rank", "RBI Grade B 2027"],
  },
  {
    slug: "rrb-ntpc-2027",
    name: "RRB NTPC 2027",
    shortName: "RRB NTPC 2027",
    category: "Railway",
    mean: 61,
    standardDeviation: 21,
    totalCandidates: 12_000_000,
    maxScore: 100,
    scoreLabel: "RRB NTPC CBT 1 marks",
    description:
      "Predict RRB NTPC 2027 expected rank from CBT 1 marks for railway post preference and zone-wise planning.",
    keywords: ["RRB NTPC rank predictor", "RRB NTPC marks vs rank", "railway exam rank predictor"],
  },
  {
    slug: "rrb-group-d-2027",
    name: "RRB Group D 2027",
    shortName: "RRB Group D 2027",
    category: "Railway",
    mean: 58,
    standardDeviation: 20,
    totalCandidates: 10_000_000,
    maxScore: 100,
    scoreLabel: "RRB Group D marks",
    description:
      "Estimate RRB Group D 2027 expected rank from marks for railway recruitment and category-wise cut-off research.",
    keywords: ["RRB Group D rank predictor", "RRB Group D marks vs rank", "RRB Group D 2027"],
  },
  {
    slug: "nda-2027",
    name: "NDA 2027",
    shortName: "NDA 2027",
    category: "Defence",
    mean: 308,
    standardDeviation: 96,
    totalCandidates: 650_000,
    maxScore: 900,
    scoreLabel: "NDA written marks",
    description:
      "Estimate NDA 2027 expected rank from written marks for Army, Navy, Air Force, and SSB preparation planning.",
    keywords: ["NDA rank predictor", "NDA marks vs rank", "NDA 2027"],
  },
  {
    slug: "cds-2027",
    name: "CDS 2027",
    shortName: "CDS 2027",
    category: "Defence",
    mean: 92,
    standardDeviation: 31,
    totalCandidates: 450_000,
    maxScore: 300,
    scoreLabel: "CDS written marks",
    description:
      "Predict CDS 2027 expected rank from written marks for IMA, INA, AFA, and OTA selection planning.",
    keywords: ["CDS rank predictor", "CDS marks vs rank", "CDS 2027"],
  },
  {
    slug: "afcat-2027",
    name: "AFCAT 2027",
    shortName: "AFCAT 2027",
    category: "Defence",
    mean: 122,
    standardDeviation: 38,
    totalCandidates: 300_000,
    maxScore: 300,
    scoreLabel: "AFCAT marks",
    description:
      "Estimate AFCAT 2027 expected rank from marks for Indian Air Force officer entry preparation and cut-off analysis.",
    keywords: ["AFCAT rank predictor", "AFCAT marks vs rank", "AFCAT 2027"],
  },
  {
    slug: "ugc-net-2027",
    name: "UGC NET 2027",
    shortName: "UGC NET 2027",
    category: "Teaching",
    mean: 112,
    standardDeviation: 42,
    totalCandidates: 900_000,
    maxScore: 300,
    scoreLabel: "UGC NET marks",
    description:
      "Predict UGC NET 2027 expected rank from marks for JRF, assistant professor eligibility, and subject-wise planning.",
    keywords: ["UGC NET rank predictor", "UGC NET marks vs rank", "UGC NET 2027"],
  },
  {
    slug: "ctet-2027",
    name: "CTET 2027",
    shortName: "CTET 2027",
    category: "Teaching",
    mean: 82,
    standardDeviation: 24,
    totalCandidates: 2_200_000,
    maxScore: 150,
    scoreLabel: "CTET marks",
    description:
      "Estimate CTET 2027 expected rank from marks for teacher eligibility preparation and benchmark analysis.",
    keywords: ["CTET rank predictor", "CTET marks vs rank", "CTET 2027"],
  },
] as const;

export function getExamBySlug(slug: string): ExamStats | undefined {
  return exams.find((exam) => exam.slug === slug);
}

export type ExamRoute = {
  exam: ExamStats;
  slug: string;
  isMarksVsRankPage: boolean;
};

export function getExamRouteBySlug(slug: string): ExamRoute | undefined {
  const directExam = getExamBySlug(slug);

  if (directExam) {
    return {
      exam: directExam,
      slug,
      isMarksVsRankPage: false,
    };
  }

  const aliasedExam = exams.find((exam) =>
    examRouteAliases[exam.slug]?.includes(slug),
  );

  if (!aliasedExam) {
    return undefined;
  }

  return {
    exam: aliasedExam,
    slug,
    isMarksVsRankPage: true,
  };
}

export function getAllExamRouteSlugs(): readonly string[] {
  return exams.flatMap((exam) => [exam.slug, ...(examRouteAliases[exam.slug] ?? [])]);
}

export function getPrimaryExamSlugForRoute(slug: string): string | undefined {
  return getExamRouteBySlug(slug)?.exam.slug;
}

export function getExamFaqs(exam: ExamStats): readonly ExamFaq[] {
  return [
    {
      question: `How accurate is the ${exam.shortName} rank predictor?`,
      answer: `The ${exam.shortName} predictor uses a normal distribution model with exam-specific mean, standard deviation, and candidate count inputs. Treat the result as a planning estimate, not an official rank.`,
    },
    {
      question: `Can I use this ${exam.shortName} predictor for counselling decisions?`,
      answer:
        "Use the expected rank as an early research signal for colleges, branches, posts, or preferences. Always verify final decisions with official scorecards, cut-offs, and counselling notices.",
    },
    {
      question: `Why does the ${exam.shortName} calculator ask for marks?`,
      answer:
        "Marks are compared against the modeled score distribution to estimate how many candidates may score above you, then the expected rank is calculated instantly in the browser.",
    },
  ];
}

export function getExamCategories(): readonly ExamCategory[] {
  return Array.from(new Set(exams.map((exam) => exam.category)));
}

export function getRelatedExams(exam: ExamStats): readonly ExamStats[] {
  const preferredGroups: Record<string, readonly string[]> = {
    "jee-mains-2027": ["jee-advanced-2027", "neet-ug-2027", "cuet-ug-2027"],
    "jee-advanced-2027": ["jee-mains-2027", "gate-cs-2027", "neet-ug-2027"],
    "neet-ug-2027": ["jee-mains-2027", "cuet-ug-2027", "upsc-prelims-2027"],
    "gate-cs-2027": ["gate-da-2027", "gate-me-2027", "gate-ee-2027"],
    "gate-da-2027": ["gate-cs-2027", "gate-me-2027", "cat-2027"],
    "ssc-cgl-2027": ["ssc-chsl-2027", "ssc-gd-2027", "ssc-mts-2027"],
    "ssc-chsl-2027": ["ssc-cgl-2027", "ssc-gd-2027", "ssc-mts-2027"],
    "upsc-prelims-2027": ["state-psc-prelims-2027", "bpsc-prelims-2027", "uppsc-prelims-2027"],
  };

  const preferred = preferredGroups[exam.slug]
    ?.map((slug) => getExamBySlug(slug))
    .filter((item): item is ExamStats => Boolean(item)) ?? [];

  const categoryFallback = exams.filter(
    (candidate) =>
      candidate.category === exam.category &&
      candidate.slug !== exam.slug &&
      !preferred.some((item) => item.slug === candidate.slug),
  );

  return [...preferred, ...categoryFallback].slice(0, 5);
}
