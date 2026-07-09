"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, Trophy, ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { quizQuestions } from "@/data/quiz";
import { cn } from "@/lib/utils";

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQuestions[index];
  const total = quizQuestions.length;
  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  }

  function reset() {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setDone(false);
  }

  const pct = Math.round((score / total) * 100);

  return (
    <Section id="quiz" className="py-28 sm:py-36">
      <SectionHeader
        eyebrow="Knowledge Check"
        title={
          <>
            Test what you&apos;ve
            <br />
            <span className="text-gradient">learned.</span>
          </>
        }
        description="Ten questions across fundamentals, physics, ALD, LPCVD, PECVD and the process line. Instant feedback, with the reasoning explained."
        accent="#a3e635"
        align="center"
      />

      <div className="mx-auto mt-14 max-w-2xl">
        {/* Progress bar */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-signal-lime to-signal-teal"
              animate={{ width: `${done ? 100 : progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="font-mono text-xs text-white/45">
            {done ? total : index + 1}/{total}
          </span>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-3xl glass p-7 sm:p-9">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-signal-lime/30 to-signal-teal/20"
                >
                  <Trophy className="h-11 w-11 text-signal-lime" />
                </motion.div>
                <div className="mt-6 text-6xl font-semibold text-gradient-electric">
                  {pct}%
                </div>
                <div className="mt-2 text-lg text-white/70">
                  {score} of {total} correct
                </div>
                <p className="mt-3 max-w-sm text-sm text-white/45">
                  {pct === 100
                    ? "Flawless. You understand TOPCon from photon to finished cell."
                    : pct >= 70
                      ? "Strong grasp of the process. Revisit the sections above to close the gaps."
                      : "A good start — scroll back through the physics and process steps and try again."}
                </p>
                <button
                  onClick={reset}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <RotateCcw className="h-4 w-4" /> Try again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex rounded-full bg-signal-lime/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-signal-lime">
                  {q.topic}
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {q.question}
                </h3>

                <div className="mt-6 space-y-3">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.answer;
                    const isChosen = i === selected;
                    return (
                      <button
                        key={i}
                        onClick={() => choose(i)}
                        disabled={answered}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-[14px] transition-all",
                          !answered && "border-white/8 hover:border-white/20 hover:bg-white/[0.04]",
                          answered && isCorrect && "border-signal-teal/50 bg-signal-teal/10",
                          answered && isChosen && !isCorrect && "border-signal-rose/50 bg-signal-rose/10",
                          answered && !isCorrect && !isChosen && "border-white/5 opacity-40",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-bold",
                            answered && isCorrect
                              ? "border-signal-teal bg-signal-teal text-ink-950"
                              : answered && isChosen
                                ? "border-signal-rose bg-signal-rose text-ink-950"
                                : "border-white/20 text-white/50",
                          )}
                        >
                          {answered && isCorrect ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : answered && isChosen ? (
                            <X className="h-3.5 w-3.5" />
                          ) : (
                            String.fromCharCode(65 + i)
                          )}
                        </span>
                        <span className={cn("text-white/75", answered && isCorrect && "text-white")}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white/[0.03] p-4">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                            selected === q.answer ? "bg-signal-teal/20" : "bg-signal-amber/20",
                          )}
                        >
                          {selected === q.answer ? (
                            <Check className="h-3 w-3 text-signal-teal" />
                          ) : (
                            <ArrowRight className="h-3 w-3 text-signal-amber" />
                          )}
                        </span>
                        <p className="text-[13px] leading-relaxed text-white/60">
                          {q.explanation}
                        </p>
                      </div>
                      <div className="mt-5 flex justify-end">
                        <button
                          onClick={next}
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric-500 to-plasma-500 px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                        >
                          {index + 1 >= total ? "See results" : "Next question"}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
