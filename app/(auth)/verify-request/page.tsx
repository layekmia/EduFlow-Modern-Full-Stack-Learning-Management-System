import { Suspense } from "react";
import VerifyRequest from "./VerifyRequest";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  return (
    <Suspense fallback={<span>Loading....</span>}>
      <VerifyRequest searchParams={searchParams} />
    </Suspense>
  );
}
