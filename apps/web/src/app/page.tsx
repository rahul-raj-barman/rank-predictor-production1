import Link from "next/link";
import { exams, getExamCategories } from "@/data/exams";
import { hubPages } from "@/data/hubs";

export default function HomePage() {
  const categories = getExamCategories();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10">
      <section className="grid gap-6">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase text-teal-700">
            Sikshalabh EdTech Systems
          </p>
          <h1 className="text-4xl font-semibold text-slate-950">
            Indian Exam Rank Predictor
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Rank prediction tools for JEE, NEET, GATE, CUET, SSC, CAT, UPSC,
            State PSC, banking, railway, defence, and teaching exams. Every
            page is statically generated and loads a Rust WebAssembly rank
            engine in the browser.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hubPages.map((hub) => (
            <Link
              key={hub.slug}
              href={`/${hub.slug}`}
              className="rounded-lg border border-teal-200 bg-teal-50 p-5 shadow-sm transition hover:border-teal-500 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-teal-800">
                SEO Hub
              </span>
              <h2 className="mt-2 text-lg font-semibold text-slate-950">
                {hub.h1}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {hub.description}
              </p>
            </Link>
          ))}
        </div>

        {categories.map((category) => {
          const categoryExams = exams.filter((exam) => exam.category === category);

          return (
            <section key={category} className="grid gap-3">
              <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-2">
                <h2 className="text-xl font-semibold text-slate-950">
                  {category}
                </h2>
                <span className="text-sm font-semibold text-slate-500">
                  {categoryExams.length} tools
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {categoryExams.map((exam) => (
                  <Link
                    key={exam.slug}
                    href={`/exam/${exam.slug}`}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-400 hover:shadow-md"
                  >
                    <span className="text-sm font-semibold text-teal-700">
                      {exam.shortName}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {exam.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {exam.totalCandidates.toLocaleString("en-IN")} candidate
                      model
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
