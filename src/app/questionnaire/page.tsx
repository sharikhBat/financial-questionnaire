"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";

export default function QuestionnairePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  const current = questions[step];
  const total = questions.length;
  const progress = ((step + 1) / total) * 100;

  const animateTransition = useCallback(
    (newDirection: "forward" | "back", callback: () => void) => {
      setDirection(newDirection);
      setIsAnimating(true);
      setTimeout(() => {
        callback();
        setIsAnimating(false);
      }, 200);
    },
    []
  );

  const selectAnswer = useCallback(
    (value: string) => {
      const updated = { ...answers, [current.id]: value };
      setAnswers(updated);

      if (step < total - 1) {
        animateTransition("forward", () => setStep(step + 1));
      } else {
        sessionStorage.setItem("fq_answers", JSON.stringify(updated));
        router.push("/checkout");
      }
    },
    [answers, current.id, step, total, animateTransition, router]
  );

  const goBack = useCallback(() => {
    if (step > 0) {
      animateTransition("back", () => setStep(step - 1));
    } else {
      router.push("/");
    }
  }, [step, animateTransition, router]);

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button
            onClick={goBack}
            className="text-muted hover:text-foreground transition-colors p-1 -ml-1"
            aria-label="Go back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4L6 10L12 16" />
            </svg>
          </button>

          <div className="flex-1">
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <span className="text-sm text-muted font-medium tabular-nums">
            {step + 1}/{total}
          </span>
        </div>
      </header>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div
          className="max-w-md mx-auto w-full space-y-8"
          key={step}
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating
              ? `translateX(${direction === "forward" ? "30px" : "-30px"})`
              : "translateX(0)",
            transition: "opacity 0.2s ease, transform 0.2s ease",
          }}
        >
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {current.title}
            </h1>
            <p className="text-muted text-base">{current.subtitle}</p>
          </div>

          <div className="space-y-3">
            {current.options?.map((option) => {
              const isSelected = answers[current.id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => selectAnswer(option.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-150 active:scale-[0.98] ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-surface hover:border-primary/30"
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{option.icon}</span>
                  <span
                    className={`text-base font-medium ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
