"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Github, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { checkEmail } from "../actions";

export default function LoginForm({ returnUrl }: { returnUrl: string }) {
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailPending] = useTransition();

  const router = useRouter();
  const [email, setEmail] = useState("");

  function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: returnUrl,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with GitHub. Redirecting...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: returnUrl,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Google. Redirecting...");
          },
          onError: () => {
            toast.error("Internal server error");
          },
        },
      });
    });
  }

  function signInWithEmail() {
    const normalizedEmail = email.toLowerCase().trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      toast.error("Invalid email address");
      return;
    }

    startEmailPending(async () => {
      const result = await checkEmail(normalizedEmail);

      if (result.status === "not_found") {
        toast.error("No account found with this email");
        return;
      }

      if (result.status === "error") {
        toast.error(result.message);
        return;
      }

      await authClient.emailOtp.sendVerificationOtp({
        email: normalizedEmail,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email has been sent");
            router.push(
              `/verify-request?email=${encodeURIComponent(normalizedEmail)}&mode=login&returnUrl=${encodeURIComponent(returnUrl)}`,
            );
          },
          onError: () => {
            toast.error("Error sending email");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your preferred method</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Github className="size-4" />
              Sign in with GitHub
            </>
          )}
        </Button>

        <Button
          disabled={googlePending}
          onClick={signInWithGoogle}
          className="w-full"
          variant="outline"
        >
          {googlePending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FaGoogle className="size-4" />
              Sign in with Google
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Continue</span>
            )}
          </Button>
        </div>

        <p className="mt-2 text-center text-sm font-normal text-muted-foreground">
          Do not have an account?{" "}
          <Link
            href={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`}
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
