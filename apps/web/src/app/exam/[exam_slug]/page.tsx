import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PredictorForm from "@/components/PredictorForm";
import { exams, getExamBySlug } from "@/data/exams";

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
    title: `${exam.shortName} Rank Predictor`,
    description: exam.description,
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
    "@type": "SoftwareApplication",
    name: `${exam.shortName} Rank Predictor`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/exam/${exam.slug}`,
    description: exam.description,
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
      "Expected rank calculation",
      "Client-side WebAssembly processing",
      "Exam-specific historical distribution inputs",
    ],
    softwareVersion: "2027.0.1",
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
            <p className="text-sm font-semibold uppercase text-teal-700">
              Sikshalabh EdTech Systems
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">
              {exam.shortName} Rank Predictor
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              {exam.description}
            </p>
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
    </main>
  );
}
