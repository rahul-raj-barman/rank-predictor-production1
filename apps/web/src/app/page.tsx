import Link from "next/link";
import { exams } from "@/data/exams";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12">
      <section className="grid gap-6">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase text-teal-700">
            Sikshalabh EdTech Systems
          </p>
          <h1 className="text-4xl font-semibold text-slate-950">
            Exam Rank Predictor
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Choose a pre-rendered exam utility page. Each page loads the rank
            engine in the browser through Rust-compiled WebAssembly.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {exams.map((exam) => (
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
                {exam.totalCandidates.toLocaleString("en-IN")} candidate model
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
