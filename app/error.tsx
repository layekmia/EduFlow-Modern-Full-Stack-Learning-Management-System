"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-md w-full text-center border-muted">
        <CardContent className="p-8 space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Something went wrong
            </h1>

            <p className="text-sm text-muted-foreground">
              An unexpected error occurred while loading this page.
            </p>

            {error?.digest && (
              <p className="text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={() => reset()} className={buttonVariants()}>
              Try again
            </button>

            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              Go home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
