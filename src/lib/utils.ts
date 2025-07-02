import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PromptTemplate } from "@langchain/core/prompts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const promptTemplate = PromptTemplate.fromTemplate(
  "You are a helpful assistant, based on task title: {title} and description: {description}, return the suitable label for this task. The label should be one word. If you cannot find a suitable label, return 'other'.",
);
