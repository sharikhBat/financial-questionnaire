export interface QuestionOption {
  value: string;
  label: string;
  icon: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: "single" | "multi" | "slider";
  options?: QuestionOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    unit: string;
    labels: { value: number; label: string }[];
  };
}

export const questions: Question[] = [
  {
    id: "goal",
    title: "What's your #1 financial goal?",
    subtitle: "Pick one",
    type: "single",
    options: [
      { value: "save", label: "Build an emergency fund", icon: "🛟" },
      { value: "debt", label: "Pay off debt", icon: "💳" },
      { value: "invest", label: "Start investing", icon: "📈" },
      { value: "retire", label: "Plan for retirement", icon: "🏖️" },
      { value: "buy", label: "Save for a big purchase", icon: "🏠" },
    ],
  },
  {
    id: "income",
    title: "What's your monthly income?",
    subtitle: "Before taxes — ballpark is fine",
    type: "single",
    options: [
      { value: "under_3k", label: "Under $3,000", icon: "💵" },
      { value: "3k_5k", label: "$3,000 – $5,000", icon: "💰" },
      { value: "5k_8k", label: "$5,000 – $8,000", icon: "💎" },
      { value: "8k_15k", label: "$8,000 – $15,000", icon: "🏦" },
      { value: "over_15k", label: "Over $15,000", icon: "🚀" },
    ],
  },
  {
    id: "savings",
    title: "How much do you have saved?",
    subtitle: "Across all your accounts",
    type: "single",
    options: [
      { value: "none", label: "Less than $500", icon: "🌱" },
      { value: "starter", label: "$500 – $5,000", icon: "🌿" },
      { value: "growing", label: "$5,000 – $25,000", icon: "🌳" },
      { value: "solid", label: "$25,000 – $100,000", icon: "🏔️" },
      { value: "strong", label: "Over $100,000", icon: "⭐" },
    ],
  },
  {
    id: "challenge",
    title: "What's your biggest money struggle?",
    subtitle: "Be honest — better answers, better plan",
    type: "single",
    options: [
      { value: "spending", label: "I spend more than I should", icon: "🛒" },
      { value: "saving", label: "I can't seem to save", icon: "😰" },
      { value: "investing", label: "I don't know how to invest", icon: "🤔" },
      { value: "debt", label: "Debt feels overwhelming", icon: "⛓️" },
      { value: "planning", label: "I have no financial plan", icon: "🗺️" },
    ],
  },
  {
    id: "risk",
    title: "How do you feel about risk?",
    subtitle: "For investing your money",
    type: "single",
    options: [
      { value: "conservative", label: "Keep it safe — I hate losing money", icon: "🛡️" },
      { value: "moderate", label: "I'll take some risk for better returns", icon: "⚖️" },
      { value: "aggressive", label: "I'm fine with big swings for big gains", icon: "🎢" },
    ],
  },
  {
    id: "timeline",
    title: "When do you need results?",
    subtitle: "This shapes your whole strategy",
    type: "single",
    options: [
      { value: "asap", label: "Within 6 months", icon: "⚡" },
      { value: "1year", label: "Within a year", icon: "📅" },
      { value: "3years", label: "1–3 years", icon: "🎯" },
      { value: "5plus", label: "5+ years — I'm playing long", icon: "🏗️" },
    ],
  },
];
