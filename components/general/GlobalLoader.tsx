"use client";

import { useSession } from "@/context/session-provider";
import BrandLoader from "./Loader";

export function GlobalLoader() {
  const { isLoading } = useSession();

  if (!isLoading) return null;

  return <BrandLoader subtitle="Checking your session" />;
}
