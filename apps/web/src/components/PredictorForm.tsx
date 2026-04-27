"use client";

import { Calculator, CheckCircle2, Mail, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

type RankWasmModule = {
  default: (moduleOrPath?: string | URL | Request | Response | BufferSource | WebAssembly.Module) => Promise<unknown>;
  calculate_expected_rank: (
    score: number,
    mean: number,
    stdDev: number,
    totalCandidates: number,
  ) => number;
};

type WasmStatus = "idle" | "loading" | "ready" | "error";

type LeadFormState = {
  email: string;
  targetCollege: string;
};

type PredictorFormProps = {
  exam: {
    shortName: string;
    mean: number;
    standardDeviation: number;
    totalCandidates: number;
    maxScore: number;
    scoreLabel: string;
  };
};

const wasmScriptPath = "/wasm/rank-core/sikshalabh_rank_core.js";
const wasmBinaryPath = "/wasm/rank-core/sikshalabh_rank_core_bg.wasm";

function formatRank(rank: number): string {
  return Math.max(1, rank).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
}

export default function PredictorForm({ exam }: PredictorFormProps) {
  const [scoreInput, setScoreInput] = useState<string>("");
  const [expectedRank, setExpectedRank] = useState<number | null>(null);
  const [wasmModule, setWasmModule] = useState<RankWasmModule | null>(null);
  const [wasmStatus, setWasmStatus] = useState<WasmStatus>("idle");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalWasTriggered, setModalWasTriggered] = useState<boolean>(false);
  const [leadForm, setLeadForm] = useState<LeadFormState>({
    email: "",
    targetCollege: "",
  });
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    async function loadWasm(): Promise<void> {
      setWasmStatus("loading");

      try {
        const moduleUrl = new URL(wasmScriptPath, window.location.origin).href;
        const wasmUrl = new URL(wasmBinaryPath, window.location.origin).href;
        const module = (await import(
          /* webpackIgnore: true */ moduleUrl
        )) as RankWasmModule;

        await module.default(wasmUrl);

        if (!cancelled) {
          setWasmModule(module);
          setWasmStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setWasmStatus("error");
        }
      }
    }

    void loadWasm();

    return () => {
      cancelled = true;
    };
  }, []);

  const score = useMemo<number>(() => Number(scoreInput), [scoreInput]);
  const scoreIsValid = Number.isFinite(score) && score >= 0 && score <= exam.maxScore;

  useEffect(() => {
    if (!wasmModule || !scoreIsValid) {
      setExpectedRank(null);
      return;
    }

    const rank = wasmModule.calculate_expected_rank(
      score,
      exam.mean,
      exam.standardDeviation,
      exam.totalCandidates,
    );

    setExpectedRank(Math.max(1, rank));
  }, [exam.mean, exam.standardDeviation, exam.totalCandidates, score, scoreIsValid, wasmModule]);

  useEffect(() => {
    if (expectedRank !== null && !modalWasTriggered) {
      const modalTimer = window.setTimeout(() => {
        setModalOpen(true);
        setModalWasTriggered(true);
      }, 650);

      return () => window.clearTimeout(modalTimer);
    }

    return undefined;
  }, [expectedRank, modalWasTriggered]);

  function handleLeadSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setLeadSubmitted(true);
  }

  const engineCopy: Record<WasmStatus, string> = {
    idle: "Preparing engine",
    loading: "Loading Wasm engine",
    ready: "Wasm engine ready",
    error: "Engine unavailable",
  };

  return (
    <>
      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-5 sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-700">
                  {exam.shortName}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-950">
                  Rank Predictor
                </h2>
              </div>
              <div className="flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-teal-700" aria-hidden="true" />
                {engineCopy[wasmStatus]}
              </div>
            </div>

            <label className="block text-sm font-semibold text-slate-800" htmlFor="score">
              {exam.scoreLabel}
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="score"
                inputMode="decimal"
                min={0}
                max={exam.maxScore}
                step="0.01"
                type="number"
                value={scoreInput}
                onChange={(event) => setScoreInput(event.target.value)}
                className="h-12 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                placeholder={`0 - ${exam.maxScore}`}
              />
              <button
                type="button"
                onClick={() => {
                  if (expectedRank !== null) {
                    setModalOpen(true);
                    setModalWasTriggered(true);
                  }
                }}
                disabled={expectedRank === null}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Report
              </button>
            </div>

            {scoreInput.length > 0 && !scoreIsValid ? (
              <p className="mt-3 text-sm font-medium text-rose-700">
                Enter a score between 0 and {exam.maxScore}.
              </p>
            ) : null}

            <div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-600">Expected rank</p>
              <div className="mt-2 min-h-16 text-4xl font-semibold text-slate-950">
                {expectedRank !== null ? formatRank(expectedRank) : "—"}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Model inputs: mean {exam.mean}, standard deviation{" "}
                {exam.standardDeviation}, candidates{" "}
                {exam.totalCandidates.toLocaleString("en-IN")}.
              </p>
            </div>

            <div className="mt-5 inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
              Powered By Sikshalabh EdTech Systems
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-950 p-5 text-white sm:p-7 lg:border-l lg:border-t-0">
            <p className="text-sm font-semibold text-cyan-200">Distribution view</p>
            <div className="mt-5 flex h-52 items-end gap-2" aria-hidden="true">
              {[18, 32, 48, 71, 94, 100, 88, 62, 41, 23, 14].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className="flex flex-1 items-end rounded-md bg-white/10"
                >
                  <div
                    className="w-full rounded-md bg-cyan-300"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-300">Mean</dt>
                <dd className="mt-1 text-xl font-semibold">{exam.mean}</dd>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-300">Std. dev.</dt>
                <dd className="mt-1 text-xl font-semibold">
                  {exam.standardDeviation}
                </dd>
              </div>
              <div className="col-span-2 rounded-lg border border-white/10 bg-white/5 p-4">
                <dt className="text-slate-300">Candidates</dt>
                <dd className="mt-1 text-xl font-semibold">
                  {exam.totalCandidates.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-teal-700">
                  Detailed Branch Prediction Report
                </p>
                <h3 id="lead-modal-title" className="mt-1 text-xl font-semibold text-slate-950">
                  Get the college-fit report
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-slate-400 hover:text-slate-950"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {leadSubmitted ? (
              <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
                Thanks. The report request is captured for {leadForm.targetCollege}.
              </div>
            ) : (
              <form className="mt-5 grid gap-4" onSubmit={handleLeadSubmit}>
                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Email
                  <input
                    required
                    type="email"
                    value={leadForm.email}
                    onChange={(event) =>
                      setLeadForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    placeholder="student@example.com"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Target college
                  <input
                    required
                    type="text"
                    value={leadForm.targetCollege}
                    onChange={(event) =>
                      setLeadForm((current) => ({
                        ...current,
                        targetCollege: event.target.value,
                      }))
                    }
                    className="h-11 rounded-md border border-slate-300 px-3 text-base font-normal text-slate-950 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    placeholder="IIT Madras, IISc, NIT Trichy"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send report
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
