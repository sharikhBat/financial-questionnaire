"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    const stored = sessionStorage.getItem("fq_answers");
    if (!stored) {
      router.push("/questionnaire");
      return;
    }

    try {
      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: stored,
      });

      const data = await response.json();
      sessionStorage.setItem("fq_report", JSON.stringify(data));
      router.push("/report");
    } catch {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="animate-fade-in text-center space-y-3">
          <div className="text-5xl">🎯</div>
          <h1 className="text-2xl font-bold tracking-tight">
            Your plan is ready to generate
          </h1>
          <p className="text-muted text-base leading-relaxed">
            We&apos;ll use AI to create a personalized financial blueprint based
            on your answers.
          </p>
        </div>

        <div
          className="animate-slide-up bg-surface border border-border rounded-2xl p-6 space-y-4"
          style={{ animationDelay: "0.15s", opacity: 0 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-foreground font-medium">
              Personal Financial Plan
            </span>
            <span className="text-foreground font-bold text-lg">$9</span>
          </div>
          <div className="border-t border-border pt-3 space-y-2 text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="text-accent-strong">✓</span>
              Personalized action plan
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-strong">✓</span>
              Budget breakdown
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-strong">✓</span>
              Investment strategy
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-strong">✓</span>
              90-day milestone roadmap
            </div>
          </div>
        </div>

        <div
          className="animate-slide-up space-y-3"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-70 text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating your plan...
              </>
            ) : (
              "Pay $9 & Generate Plan"
            )}
          </button>
          <p className="text-center text-xs text-muted">
            Demo mode — no real charge. Stripe integration ready.
          </p>
        </div>
      </div>
    </main>
  );
}
