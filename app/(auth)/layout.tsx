import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="flex items-center gap-1 self-center font-medium absolute top-4 left-4"
      >
        <Image src={logo} width={50} height={50} alt="Logo" />
        <span className="max-md:text-2xl">EduFlow</span>
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6 mt-20 md:mt-16">
        {children}
        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline">
            Terms of service
          </span>{" "}
          and policy{" "}
          <span className="hover:text-primary hover:underline">
            Privacy policy
          </span>
        </div>
      </div>
    </div>
  );
}
