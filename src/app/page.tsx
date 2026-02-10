import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="animate-fade-in space-y-3">
          <div className="text-5xl">📊</div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Your AI Financial Blueprint
          </h1>
          <p className="text-muted text-lg leading-relaxed">
            6 questions. One personalized money plan. Under 2 minutes.
          </p>
        </div>

        <div
          className="animate-slide-up space-y-4"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <Link
            href="/questionnaire"
            className="block w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-6 rounded-2xl text-lg transition-all duration-200 active:scale-[0.98]"
          >
            Get My Plan
          </Link>
          <p className="text-sm text-muted">Just 60 seconds</p>
        </div>

        <div
          className="animate-slide-up pt-4 space-y-4"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <div className="flex items-center justify-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <span className="text-accent-strong">✓</span> Personalized
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent-strong">✓</span> AI-Powered
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent-strong">✓</span> Instant
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
