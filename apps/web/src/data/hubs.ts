import { ExamStats, exams } from "@/data/exams";

export type HubPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: readonly string[];
  examSlugs: readonly string[];
};

export const hubPages: readonly HubPage[] = [
  {
    slug: "jee-rank-predictor",
    title: "JEE Rank Predictor - JEE Main and Advanced Marks vs Rank",
    h1: "JEE Rank Predictor",
    description:
      "Use JEE Main and JEE Advanced rank predictor tools to estimate expected rank from marks, compare score bands, and plan engineering college choices.",
    keywords: ["JEE rank predictor", "JEE Main marks vs rank", "JEE Advanced rank predictor"],
    examSlugs: ["jee-mains-2027", "jee-advanced-2027"],
  },
  {
    slug: "neet-rank-predictor",
    title: "NEET Rank Predictor - NEET Marks vs Rank Calculator",
    h1: "NEET Rank Predictor",
    description:
      "Estimate NEET UG expected rank from marks for medical admission planning, MBBS counselling research, and college shortlisting.",
    keywords: ["NEET rank predictor", "NEET marks vs rank", "medical college predictor"],
    examSlugs: ["neet-ug-2027"],
  },
  {
    slug: "gate-rank-predictor",
    title: "GATE Rank Predictor - GATE Marks vs Rank Calculator",
    h1: "GATE Rank Predictor",
    description:
      "Predict GATE expected rank from marks for CS, DA, Mechanical, Electrical, M.Tech admission, PSU preparation, and branch planning.",
    keywords: ["GATE rank predictor", "GATE marks vs rank", "GATE score calculator"],
    examSlugs: ["gate-da-2027", "gate-cs-2027", "gate-me-2027", "gate-ee-2027"],
  },
  {
    slug: "ssc-rank-predictor",
    title: "SSC Rank Predictor - CGL, CHSL, GD and MTS Marks vs Rank",
    h1: "SSC Rank Predictor",
    description:
      "Estimate SSC expected rank from marks for CGL, CHSL, GD Constable, MTS, post preference research, and cut-off planning.",
    keywords: ["SSC rank predictor", "SSC CGL marks vs rank", "SSC CHSL rank predictor"],
    examSlugs: ["ssc-cgl-2027", "ssc-chsl-2027", "ssc-gd-2027", "ssc-mts-2027"],
  },
  {
    slug: "upsc-rank-predictor",
    title: "UPSC Rank Predictor - Prelims Marks vs Rank Calculator",
    h1: "UPSC Rank Predictor",
    description:
      "Estimate UPSC Prelims expected rank position from marks and compare related civil service exam preparation targets.",
    keywords: ["UPSC rank predictor", "UPSC Prelims marks vs rank", "civil services rank predictor"],
    examSlugs: ["upsc-prelims-2027", "state-psc-prelims-2027", "bpsc-prelims-2027", "uppsc-prelims-2027", "mpsc-prelims-2027"],
  },
  {
    slug: "government-exam-rank-predictor",
    title: "Government Exam Rank Predictor - SSC, UPSC, Banking, Railway, Defence",
    h1: "Government Exam Rank Predictor",
    description:
      "Explore rank predictor tools for Indian government exams including SSC, UPSC, State PSC, banking, railway, defence, and teaching exams.",
    keywords: ["government exam rank predictor", "sarkari exam marks vs rank", "competitive exam rank predictor"],
    examSlugs: [
      "ssc-cgl-2027",
      "upsc-prelims-2027",
      "state-psc-prelims-2027",
      "ibps-po-2027",
      "sbi-po-2027",
      "rrb-ntpc-2027",
      "nda-2027",
      "ugc-net-2027",
    ],
  },
];

export function getHubBySlug(slug: string): HubPage | undefined {
  return hubPages.find((hub) => hub.slug === slug);
}

export function getHubExams(hub: HubPage): readonly ExamStats[] {
  return hub.examSlugs
    .map((slug) => exams.find((exam) => exam.slug === slug))
    .filter((exam): exam is ExamStats => Boolean(exam));
}
