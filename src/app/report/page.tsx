"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReportSection {
  title: string;
  icon: string;
  items: string[];
}

interface Milestone {
  timeframe: string;
  goal: string;
  actions: string[];
}

interface Report {
  headline: string;
  summary: string;
  sections: ReportSection[];
  milestones: Milestone[];
  bottomLine: string;
}

export default function ReportPage() {
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("fq_report");
    if (!stored) {
      router.push("/questionnaire");
      return;
    }
    setReport(JSON.parse(stored));
  }, [router]);

  if (!report) {
    return (
      <main className="min-h-dvh flex items-center justify-center">
        <div className="animate-pulse-soft text-muted">Loading your plan...</div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-background">
      {/* Hero */}
      <section className="px-6 pt-12 pb-8">
        <div className="max-w-md mx-auto text-center space-y-4 animate-fade-in">
          <div className="text-5xl">✨</div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {report.headline}
          </h1>
          <p className="text-muted text-base leading-relaxed">
            {report.summary}
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="px-6 pb-6">
        <div className="max-w-md mx-auto space-y-4">
          {report.sections.map((section, i) => (
            <div
              key={section.title}
              className="animate-slide-up bg-surface border border-border rounded-2xl p-5 space-y-3"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <span className="text-xl">{section.icon}</span>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm text-muted leading-relaxed"
                  >
                    <span className="text-accent-strong mt-0.5 flex-shrink-0">
                      ●
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="px-6 pb-6">
        <div className="max-w-md mx-auto">
          <h2
            className="animate-slide-up text-lg font-semibold text-foreground mb-4"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            🗓️ Your 90-Day Roadmap
          </h2>
          <div className="space-y-3">
            {report.milestones.map((milestone, i) => (
              <div
                key={milestone.timeframe}
                className="animate-slide-up flex gap-4"
                style={{ animationDelay: `${0.5 + i * 0.1}s`, opacity: 0 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < report.milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-semibold text-foreground text-sm">
                    {milestone.timeframe}{" "}
                    <span className="text-muted font-normal">
                      — {milestone.goal}
                    </span>
                  </p>
                  <ul className="mt-1.5 space-y-1">
                    {milestone.actions.map((action) => (
                      <li
                        key={action}
                        className="text-sm text-muted flex gap-2"
                      >
                        <span className="text-accent-strong">→</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom line */}
      <section className="px-6 pb-12">
        <div
          className="animate-slide-up max-w-md mx-auto bg-accent border border-accent-strong/20 rounded-2xl p-5 text-center"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <p className="text-accent-strong font-medium text-sm leading-relaxed">
            {report.bottomLine}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div
          className="animate-slide-up max-w-md mx-auto text-center"
          style={{ animationDelay: "0.9s", opacity: 0 }}
        >
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← Start fresh
          </Link>
        </div>
      </section>
    </main>
  );
}
