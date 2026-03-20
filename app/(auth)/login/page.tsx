import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnUrl?: string }>;
}) {
  const params = await searchParams;
  const returnUrl = params.returnUrl ?? "/";

  return <LoginForm returnUrl={returnUrl} />;
}
