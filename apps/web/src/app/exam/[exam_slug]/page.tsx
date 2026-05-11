import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PredictorForm from "@/components/PredictorForm";
import { exams, getExamBySlug, getExamFaqs } from "@/data/exams";

const siteUrl = "https://www.sikshalabh.com";

type ExamPageProps = {
  params: Promise<{
    exam_slug: string;
  }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return exams.map((exam) => ({
    exam_slug: exam.slug,
  }));
}

export async function generateMetadata({
  params,
}: ExamPageProps): Promise<Metadata> {
  const { exam_slug } = await params;
  const exam = getExamBySlug(exam_slug);

  if (!exam) {
    return {};
  }

  return {
    title: `${exam.shortName} Rank Predictor - Marks vs Rank Calculator`,
    description: exam.description,
    keywords: [...exam.keywords],
    alternates: {
      canonical: `/exam/${exam.slug}`,
    },
    openGraph: {
      title: `${exam.shortName} Rank Predictor`,
      description: exam.description,
      url: `${siteUrl}/exam/${exam.slug}`,
      siteName: "Sikshalabh",
      type: "website",
    },
  };
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { exam_slug } = await params;
  const exam = getExamBySlug(exam_slug);

  if (!exam) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: `${exam.shortName} Rank Predictor`,
        applicationCategory: "EducationalApplication",
        applicationSubCategory: `${exam.category} exam calculator`,
        operatingSystem: "Web",
        url: `${siteUrl}/exam/${exam.slug}`,
        description: exam.description,
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
  const faqs = getExamFaqs(exam);

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
            <p className="text-sm font-semibold uppercase text-teal-700">
              {exam.category} Rank Predictor
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">
              {exam.shortName} Rank Predictor 2027
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              {exam.description}
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
    </main>
  );
}
