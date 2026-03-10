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
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { checkEmail } from "../actions";

export default function SignupForm() {
  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailPending] = useTransition();

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const searchParams = useSearchParams();

  const returnUrl = searchParams.get("returnUrl") || "/";

  function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: returnUrl,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in with Github, you will be redirected...");
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
            toast.success("Signed in with google,you will be redirected...");
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

    if (
      !normalizedEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return toast.error("Invalid email address");
    } else if (!name) {
      return toast.error("Name is required");
    }

    startEmailPending(async () => {
      const result = await checkEmail(normalizedEmail);

      if (result.status === "user_found") {
        toast.error("Already have an account with this email, please login");
        return;
      }

      if (result.status === "error") {
        {
          toast.error(result.message);
          return;
        }
      }

      await authClient.emailOtp.sendVerificationOtp({
        email: email, // required
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email has been sent");
            router.push(
              `/verify-request?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&mode=signup&returnUrl=${encodeURIComponent(returnUrl)}`,
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
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>Sign up with your preferred method</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          disabled={githubPending}
          onClick={signInWithGithub}
          className="w-full"
          variant={"outline"}
        >
          {githubPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />{" "}
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Github className="size-4" />
              Sign in with Github
            </>
          )}
        </Button>
        <Button
          disabled={googlePending}
          onClick={signInWithGoogle}
          className="w-full"
          variant={"outline"}
        >
          {googlePending ? (
            <>
              <Loader2 className="size-4 animate-spin" />{" "}
              <span>Loading...</span>
            </>
          ) : (
            <>
              <FaGoogle className="size-4" />
              Sign in with Google
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:border-t after:top-1/2 after:z-0 after:border-border">
          <span className="relative px-2 bg-card z-10 text-muted-foreground">
            or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="FULL NAME"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="EMAIL"
              required
            />
          </div>
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />{" "}
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>Continue</span>
              </>
            )}
          </Button>
        </div>

        <p className="text-sm font-normal text-muted-foreground text-center mt-2">
          already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
