import SignupForm from "./SignupForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ returnUrl?: string }>;
}) {
  const params = await searchParams;
  const returnUrl = params.returnUrl ?? "/";

  return <SignupForm returnUrl={returnUrl} />;
}
