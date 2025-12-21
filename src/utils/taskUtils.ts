import type { Task } from "../types/user";

export function isCommission(task: Task) {
  return task?.type === "commission";
}
