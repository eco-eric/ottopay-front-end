// OttoPay plans. Keep in sync with supabase/functions/_shared/plans.ts.
// OttoPay earns from subscriptions only: no fee on card payments.

export type PlanId = "free" | "pro" | "team";

export interface PlanRules {
  id: PlanId;
  name: string;
  includedUsers: number;
  canAddUsers: boolean;
  onlinePayments: boolean;
  /** null = unlimited */
  aiFreeUses: number | null;
  reports: boolean;
  dataExport: boolean;
  monthlyPrice: number;
  /** Per-month price when billed yearly */
  yearlyMonthlyPrice: number;
}

export const PLANS: Record<PlanId, PlanRules> = {
  free: {
    id: "free", name: "Free", includedUsers: 1, canAddUsers: false, onlinePayments: false,
    aiFreeUses: 10, reports: false, dataExport: false, monthlyPrice: 0, yearlyMonthlyPrice: 0,
  },
  pro: {
    id: "pro", name: "Pro", includedUsers: 2, canAddUsers: true, onlinePayments: true,
    aiFreeUses: null, reports: true, dataExport: true, monthlyPrice: 29, yearlyMonthlyPrice: 24,
  },
  team: {
    id: "team", name: "Team", includedUsers: 10, canAddUsers: true, onlinePayments: true,
    aiFreeUses: null, reports: true, dataExport: true, monthlyPrice: 59, yearlyMonthlyPrice: 49,
  },
};

export const EXTRA_USER_MONTHLY_PRICE = 5;
/** Yearly price per extra user: 10 months of $5, matching 2 months free on yearly plans. */
export const EXTRA_USER_YEARLY_PRICE = 50;
export const TRIAL_DAYS = 14;
export const MAX_CARD_SURCHARGE_PERCENT = 3;

export function normalizePlan(value: string | null | undefined): PlanId {
  if (value === "pro" || value === "professional") return "pro";
  if (value === "team") return "team";
  return "free";
}
