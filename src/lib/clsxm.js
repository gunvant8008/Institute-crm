import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge classes with tailwind-merge with clsx full feature */
export default function clsxm(...classes) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return twMerge(clsx(...classes));
}
