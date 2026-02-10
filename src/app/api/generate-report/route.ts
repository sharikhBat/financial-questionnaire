import { NextResponse } from "next/server";
import { questions } from "@/lib/questions";

interface Answers {
  [key: string]: string;
}

function buildPrompt(answers: Answers): string {
  const readable = questions
    .map((q) => {
      const selected = q.options?.find((o) => o.value === answers[q.id]);
      return `${q.title}\n→ ${selected?.label ?? answers[q.id] ?? "Not answered"}`;
    })
    .join("\n\n");

  return `You are an expert financial planner. Based on the following questionnaire answers, create a personalized financial plan.

QUESTIONNAIRE ANSWERS:
${readable}

Respond in this exact JSON format (no markdown, no code fences):
{
  "headline": "A short, encouraging one-line summary (e.g. 'You're closer than you think')",
  "summary": "A 2-3 sentence personalized overview of their financial situation and what this plan will help them achieve.",
  "sections": [
    {
      "title": "Section title",
      "icon": "single emoji",
      "items": ["Actionable item 1", "Actionable item 2", "Actionable item 3"]
    }
  ],
  "milestones": [
    {
      "timeframe": "Month 1",
      "goal": "What to accomplish",
      "actions": ["Step 1", "Step 2"]
    }
  ],
  "bottomLine": "One motivating sentence to close with"
}

Create exactly 4 sections: (1) Immediate Actions (this week), (2) Budget Strategy, (3) Savings & Investment Plan, (4) Debt Strategy or Growth Strategy depending on their answers.
Create exactly 3 milestones: Month 1, Month 3, Month 6.
Make everything specific to THEIR answers — reference their income range, goals, and risk tolerance directly.`;
}

function generateMockReport(answers: Answers): object {
  const goalLabels: Record<string, string> = {
    save: "building an emergency fund",
    debt: "paying off debt",
    invest: "starting to invest",
    retire: "planning for retirement",
    buy: "saving for a big purchase",
  };

  const goal = goalLabels[answers.goal] ?? "improving your finances";

  return {
    headline: "You're closer than you think",
    summary: `Your top priority: ${goal}. Good news — with the right moves, you'll see real progress in 90 days. This plan fits your income and risk comfort.`,
    sections: [
      {
        title: "Immediate Actions",
        icon: "⚡",
        items: [
          "Open a high-yield savings account (4.5%+ APY)",
          "Set up automatic transfers the day after payday",
          "Track every expense for 7 days — use your phone's notes app",
        ],
      },
      {
        title: "Budget Strategy",
        icon: "📋",
        items: [
          "Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings/debt",
          "Find 3 subscriptions you barely use. Cancel one.",
          "Use the 24-hour rule: wait a day before any purchase over $50",
        ],
      },
      {
        title:
          answers.goal === "debt"
            ? "Debt Payoff Strategy"
            : "Savings & Investment Plan",
        icon: answers.goal === "debt" ? "💪" : "📈",
        items:
          answers.goal === "debt"
            ? [
                "List all debts by interest rate — attack the highest rate first (avalanche method)",
                "Call each creditor and ask for a rate reduction — the worst they can say is no",
                "Throw any windfall (tax refunds, bonuses) straight at your debt",
              ]
            : [
                "Save 3 months of expenses before you invest a dollar",
                `Start with a ${answers.risk === "conservative" ? "target-date index fund for hands-off growth" : answers.risk === "aggressive" ? "diversified portfolio with 80% stocks, 20% bonds" : "balanced 60/40 stock-to-bond index fund"}`,
                "Automate weekly micro-deposits — removes the guesswork",
              ],
      },
      {
        title: "Growth Strategy",
        icon: "🚀",
        items: [
          "Negotiate your bills (insurance, phone, internet) — most people save $50-200/mo",
          "Pick one side income stream that fits your skills",
          "Schedule a monthly 30-minute money review — consistency beats intensity",
        ],
      },
    ],
    milestones: [
      {
        timeframe: "Month 1",
        goal: "Foundation laid",
        actions: [
          "First emergency fund deposit made",
          "Budget tracked for 30 days straight",
        ],
      },
      {
        timeframe: "Month 3",
        goal: "Momentum building",
        actions: [
          `${answers.goal === "debt" ? "Smallest debt eliminated" : "One month of expenses saved"}`,
          "Spending down 15% from month 1",
        ],
      },
      {
        timeframe: "Month 6",
        goal: "Visible results",
        actions: [
          `${answers.goal === "invest" ? "Investment portfolio established and growing" : answers.goal === "debt" ? "50% of high-interest debt cleared" : "3 months emergency fund complete"}`,
          "You feel in control of your money",
        ],
      },
    ],
    bottomLine:
      "Small moves beat big plans. Start today — future you will thank you.",
  };
}

export async function POST(request: Request) {
  const answers: Answers = await request.json();

  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: "You are an expert financial planner. Respond only with valid JSON." },
              { role: "user", content: buildPrompt(answers) },
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        }
      );

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;

      if (content) {
        const cleaned = content
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        const report = JSON.parse(cleaned);
        return NextResponse.json(report);
      }
    } catch {
      // Fall through to mock
    }
  }

  // Mock fallback — still personalized from answers
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const report = generateMockReport(answers);
  return NextResponse.json(report);
}
