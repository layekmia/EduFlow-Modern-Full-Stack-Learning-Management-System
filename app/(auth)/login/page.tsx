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
import { useTransition } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [githubPending, startGithubTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your Github Email Account</CardDescription>
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

        <div className="relative text-center text-sm after:absolute after:inset-0 after:border-t after:top-1/2 after:z-0 after:border-border">
          <span className="relative px-2 bg-card z-10 text-muted-foreground">
            or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="m@example.com" />
          </div>
          <Button>Continue with Email</Button>
        </div>
      </CardContent>
    </Card>
  );
}
