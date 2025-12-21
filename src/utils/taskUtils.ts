import type { Money, Task } from "../types/user";

export const CurrencySymbolMap: Record<Money["currency"], string> = {
  CNY: "¥",
  USD: "$",
  JPY: "¥",
  EUR: "€",
};

export function isCommission(task: Task) {
  return task?.type === "commission";
}

export function getCommissionFeeString(task: Task) {
  if (!task.commissionFee) return "";
  return task.commissionFee.amount + " " + CurrencySymbolMap[task.commissionFee.currency];
}

export const isValidAmountNumber = (value: number) => {
  // TODO: geli  more strict logic implement later
  return value >= 0;
};
