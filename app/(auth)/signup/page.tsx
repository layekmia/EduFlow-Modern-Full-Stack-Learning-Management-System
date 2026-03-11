import { Suspense } from "react";
import SignupForm from "./SignUp";

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ returnUrl: string }>;
}) {
  return (
    <Suspense>
      <SignupForm searchParams={searchParams} />
    </Suspense>
  );
}
