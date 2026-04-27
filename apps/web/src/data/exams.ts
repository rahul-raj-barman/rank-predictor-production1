export type ExamSlug = "gate-da-2027" | "gate-cs-2027" | "jee-mains-2027";

export type ExamStats = {
  slug: ExamSlug;
  name: string;
  shortName: string;
  mean: number;
  standardDeviation: number;
  totalCandidates: number;
  maxScore: number;
  scoreLabel: string;
  description: string;
};

export const exams: readonly ExamStats[] = [
  {
    slug: "gate-da-2027",
    name: "GATE Data Science and Artificial Intelligence 2027",
    shortName: "GATE DA 2027",
    mean: 38.5,
    standardDeviation: 13.8,
    totalCandidates: 52_000,
    maxScore: 100,
    scoreLabel: "GATE score out of 100",
    description:
      "Expected rank model for GATE Data Science and Artificial Intelligence aspirants using mocked historical distribution inputs.",
  },
  {
    slug: "gate-cs-2027",
    name: "GATE Computer Science 2027",
    shortName: "GATE CS 2027",
    mean: 34.2,
    standardDeviation: 14.6,
    totalCandidates: 115_000,
    maxScore: 100,
    scoreLabel: "GATE score out of 100",
    description:
      "Expected rank model for GATE Computer Science aspirants using mocked historical distribution inputs.",
  },
  {
    slug: "jee-mains-2027",
    name: "JEE Mains 2027",
    shortName: "JEE Mains 2027",
    mean: 88.0,
    standardDeviation: 42.0,
    totalCandidates: 1_250_000,
    maxScore: 300,
    scoreLabel: "JEE Main marks out of 300",
    description:
      "Expected rank model for JEE Main aspirants using mocked historical distribution inputs.",
  },
] as const;

export function getExamBySlug(slug: string): ExamStats | undefined {
  return exams.find((exam) => exam.slug === slug);
}
