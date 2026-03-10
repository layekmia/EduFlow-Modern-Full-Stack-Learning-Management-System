"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { use, useState, useTransition } from "react";
import { toast } from "sonner";
import { updateUserNameDuringSignUp } from "./actions";

export default function VerifyRequest({
  searchParams,
}: {
  searchParams: Promise<{
    email?: string;
    name?: string;
    mode?: string;
    returnUrl?: string;
  }>;
}) {
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const [updatingName, setUpdatingName] = useState(false);
  const router = useRouter();

  const { email, name, mode, returnUrl } = use(searchParams);
  const isSignUp = mode === "signup";

  const isOtpCompleted = otp.length === 6;

  if (!email) {
    redirect("/");
  }

  function verifyOtp() {
    if (!email) return;

    startTransition(async () => {
      if (isSignUp && !name) {
        toast.error("Name is required for signup");
        return;
      }

      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: async () => {
            if (isSignUp && name) {
              setUpdatingName(true);
              await updateUserNameDuringSignUp(name);
              setUpdatingName(false);
            }

            toast.success(isSignUp ? "Account created" : "Logged in");
            router.push(returnUrl ?? "/");
          },
          onError: () => {
            toast.error("Invalid or expired OTP");
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit verification code to <br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-2 items-center">
          <InputOTP
            maxLength={6}
            className=""
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <Button
          onClick={verifyOtp}
          disabled={emailPending || !isOtpCompleted || !email || updatingName}
          className="w-full"
        >
          {emailPending || updatingName ? (
            <>
              <Loader2 className="size-4 animate-spin" />{" "}
              <span>Verifying…</span>
            </>
          ) : (
            "Verify Account"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={() => {
              /* Add resend logic */
            }}
            className="text-primary hover:underline"
          >
            Resend
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
