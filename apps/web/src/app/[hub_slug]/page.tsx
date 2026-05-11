import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHubBySlug, getHubExams, hubPages } from "@/data/hubs";

const siteUrl = "https://www.sikshalabh.com";

type HubPageProps = {
  params: Promise<{
    hub_slug: string;
  }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return hubPages.map((hub) => ({
    hub_slug: hub.slug,
  }));
}

export async function generateMetadata({
  params,
}: HubPageProps): Promise<Metadata> {
  const { hub_slug } = await params;
  const hub = getHubBySlug(hub_slug);

  if (!hub) {
    return {};
  }

  return {
    title: hub.title,
    description: hub.description,
    keywords: [...hub.keywords],
    alternates: {
      canonical: `/${hub.slug}`,
    },
    openGraph: {
      title: hub.title,
      description: hub.description,
      url: `${siteUrl}/${hub.slug}`,
      siteName: "Sikshalabh",
      type: "website",
    },
  };
}

export default async function HubPage({ params }: HubPageProps) {
  const { hub_slug } = await params;
  const hub = getHubBySlug(hub_slug);

  if (!hub) {
    notFound();
  }

  const hubExams = getHubExams(hub);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: hub.title,
        url: `${siteUrl}/${hub.slug}`,
        description: hub.description,
        keywords: hub.keywords.join(", "),
        mainEntity: hubExams.map((exam) => ({
          "@type": "SoftwareApplication",
          name: `${exam.shortName} Rank Predictor`,
          url: `${siteUrl}/exam/${exam.slug}`,
          applicationCategory: "EducationalApplication",
        })),
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
            name: hub.h1,
            item: `${siteUrl}/${hub.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="max-w-3xl">
        <nav className="mb-4 text-sm font-medium text-slate-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{hub.h1}</span>
        </nav>
        <p className="text-sm font-semibold uppercase text-teal-700">
          Indian Exam Rank Predictors
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">{hub.h1}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          {hub.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {hub.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-md border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hubExams.map((exam) => (
          <Link
            key={exam.slug}
            href={`/exam/${exam.slug}`}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-md"
          >
            <span className="text-sm font-semibold text-teal-700">
              {exam.shortName}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              {exam.name}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Rank predictor, marks vs rank, expected cutoff, and score band
              guide.
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        {["Marks vs Rank", "Expected Cutoff", "Good Score"].map((title) => (
          <article
            key={title}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Compare modeled score bands across related exams and open the
              individual predictor page for a full WebAssembly-powered rank
              calculation.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
