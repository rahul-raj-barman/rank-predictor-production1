import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PredictorForm from "@/components/PredictorForm";
import {
  getAllExamRouteSlugs,
  getExamFaqs,
  getExamRouteBySlug,
  getRelatedExams,
  type ExamStats,
} from "@/data/exams";

const siteUrl = "https://www.sikshalabh.com";

type ExamPageProps = {
  params: Promise<{
    exam_slug: string;
  }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExamRouteSlugs().map((slug) => ({
    exam_slug: slug,
  }));
}

function getPageTitle(exam: ExamStats, isMarksVsRankPage: boolean): string {
  if (isMarksVsRankPage) {
    return `${exam.shortName} Marks vs Rank 2027 - Expected Rank Calculator`;
  }

  return `${exam.shortName} Rank Predictor 2027 - Marks vs Rank Calculator`;
}

function getPageDescription(exam: ExamStats, isMarksVsRankPage: boolean): string {
  if (isMarksVsRankPage) {
    return `${exam.shortName} marks vs rank calculator with expected rank, good score, cutoff planning, and score band estimates for Indian exam preparation.`;
  }

  return exam.description;
}

function estimateRank(score: number, exam: ExamStats): number {
  const z = (score - exam.mean) / exam.standardDeviation;
  const cdf = 1 / (1 + Math.exp(-1.702 * z));
  const rank = Math.round((1 - cdf) * exam.totalCandidates + 1);

  return Math.max(1, Math.min(exam.totalCandidates, rank));
}

function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-IN");
}

function getScoreBands(exam: ExamStats) {
  const scores = [
    exam.mean + exam.standardDeviation * 2,
    exam.mean + exam.standardDeviation,
    exam.mean,
    Math.max(0, exam.mean - exam.standardDeviation),
  ].map((score) => Math.min(exam.maxScore, Math.max(0, score)));

  return scores.map((score) => ({
    score: Math.round(score),
    rank: estimateRank(score, exam),
  }));
}

export async function generateMetadata({
  params,
}: ExamPageProps): Promise<Metadata> {
  const { exam_slug } = await params;
  const route = getExamRouteBySlug(exam_slug);

  if (!route) {
    return {};
  }

  const { exam, isMarksVsRankPage } = route;
  const title = getPageTitle(exam, isMarksVsRankPage);
  const description = getPageDescription(exam, isMarksVsRankPage);

  return {
    title,
    description,
    keywords: [
      ...exam.keywords,
      `${exam.shortName} good score`,
      `${exam.shortName} expected cutoff`,
      `${exam.shortName} college predictor`,
    ],
    alternates: {
      canonical: `/exam/${exam_slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/exam/${exam_slug}`,
      siteName: "Sikshalabh",
      type: "website",
    },
  };
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { exam_slug } = await params;
  const route = getExamRouteBySlug(exam_slug);

  if (!route) {
    notFound();
  }

  const { exam, isMarksVsRankPage } = route;
  const title = getPageTitle(exam, isMarksVsRankPage);
  const description = getPageDescription(exam, isMarksVsRankPage);
  const faqs = getExamFaqs(exam);
  const relatedExams = getRelatedExams(exam);
  const scoreBands = getScoreBands(exam);
  const goodScore = Math.min(exam.maxScore, exam.mean + exam.standardDeviation);
  const strongScore = Math.min(exam.maxScore, exam.mean + exam.standardDeviation * 1.5);
  const cutoffSignal = Math.max(0, exam.mean - exam.standardDeviation * 0.35);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["SoftwareApplication", "WebApplication"],
        name: `${exam.shortName} Rank Predictor`,
        applicationCategory: "EducationalApplication",
        applicationSubCategory: `${exam.category} exam calculator`,
        operatingSystem: "Web",
        url: `${siteUrl}/exam/${exam_slug}`,
        description,
        keywords: exam.keywords.join(", "),
        isAccessibleForFree: true,
        provider: {
          "@type": "Organization",
          name: "Sikshalabh EdTech Systems",
          url: siteUrl,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        featureList: [
          `${exam.shortName} expected rank calculation`,
          `${exam.shortName} marks vs rank estimate`,
          "Client-side WebAssembly processing",
          "Exam-specific distribution inputs",
        ],
        softwareVersion: "2027.0.1",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `${exam.category} Exams`,
            item: `${siteUrl}/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: `${siteUrl}/exam/${exam_slug}`,
          },
        ],
      },
      {
        "@type": "EducationalOccupationalProgram",
        name: exam.name,
        provider: {
          "@type": "Organization",
          name: "Sikshalabh EdTech Systems",
          url: siteUrl,
        },
        educationalProgramMode: "online",
        description,
      },
      {
        "@type": "FAQPage",
        mainEntity: getExamFaqs(exam).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <nav className="mb-4 text-sm font-medium text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-teal-700">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>{exam.category}</span>
            </nav>
            <p className="text-sm font-semibold uppercase text-teal-700">
              {exam.category} Rank Predictor
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">
              {isMarksVsRankPage
                ? `${exam.shortName} Marks vs Rank 2027`
                : `${exam.shortName} Rank Predictor 2027`}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              {description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {exam.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Mean
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {exam.mean}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Std. dev.
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {exam.standardDeviation}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Candidates
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-950">
                {exam.totalCandidates.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <PredictorForm
          exam={{
            shortName: exam.shortName,
            mean: exam.mean,
            standardDeviation: exam.standardDeviation,
            totalCandidates: exam.totalCandidates,
            maxScore: exam.maxScore,
            scoreLabel: exam.scoreLabel,
          }}
        />
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-5 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">
            {exam.shortName} marks vs rank guide
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-700">
            This page is built for students searching for {exam.shortName} rank
            predictor, marks vs rank, expected rank, cut-off research, and
            admission or selection planning. The calculator uses modeled
            distribution inputs for mean, standard deviation, and total
            candidates to estimate how competitive a score may be.
          </p>
          <p className="mt-3 text-base leading-7 text-slate-700">
            The result is useful for shortlisting colleges, branches, posts,
            zones, or preparation targets before official ranks and cut-offs are
            published.
          </p>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-base font-semibold text-slate-950">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-5 pb-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              {exam.shortName} marks vs rank
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Higher marks usually map to a better expected rank because fewer
              candidates are projected above that score. Use the table below as
              a modeled planning view, then calculate your exact score in the
              predictor.
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Score</th>
                    <th className="px-4 py-3 font-semibold">Expected rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {scoreBands.map((band) => (
                    <tr key={`${band.score}-${band.rank}`}>
                      <td className="px-4 py-3 text-slate-950">
                        {formatNumber(band.score)}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        Around {formatNumber(band.rank)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Good score and expected cutoff
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              A good score for {exam.shortName} is modeled around{" "}
              <strong>{formatNumber(goodScore)}</strong> or above. A stronger
              competitive score is around{" "}
              <strong>{formatNumber(strongScore)}</strong> or above.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              The expected cutoff signal begins near{" "}
              <strong>{formatNumber(cutoffSignal)}</strong> in this model, but
              actual cutoffs can change with paper difficulty, normalization,
              category rules, vacancies, seats, and counselling policy.
            </p>
          </article>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              College, branch, or post prediction
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Use the expected rank to create a shortlist for colleges,
              branches, government posts, zones, or interview targets. For
              counselling-heavy exams, compare your result with official
              category-wise and round-wise closing ranks before final choices.
            </p>
          </article>

          <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              How rank is calculated
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              The calculator models the exam score distribution with a normal
              cumulative distribution function. It estimates the percentage of
              candidates scoring above your marks, multiplies that by total
              candidates, then rounds the result into an expected rank.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-14">
        <div className="border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-semibold text-slate-950">
            Related rank predictors
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedExams.map((relatedExam) => (
              <Link
                key={relatedExam.slug}
                href={`/exam/${relatedExam.slug}`}
                className="rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm transition hover:border-teal-400 hover:shadow-md"
              >
                <span className="font-semibold text-teal-700">
                  {relatedExam.shortName}
                </span>
                <span className="mt-1 block text-slate-700">
                  Marks vs rank and expected rank calculator
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
