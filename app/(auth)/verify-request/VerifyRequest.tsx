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
import { useRouter } from "next/navigation";
import { use, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { updateUserNameDuringSignUp } from "./actions";

const RESEND_COOLDOWN = 30;

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
  const [emailPending, startEmailTransition] = useTransition();
  const [resendPending, startResendTransition] = useTransition();
  const [updatingName, setUpdatingName] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);

  const router = useRouter();

  const { email, name, mode, returnUrl } = use(searchParams);
  const isSignUp = mode === "signup";
  const isOtpCompleted = otp.length === 6;

  useEffect(() => {
    if (!email) {
      router.replace("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  function verifyOtp() {
    if (!email) return;

    startEmailTransition(async () => {
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
              try {
                setUpdatingName(true);
                const result = await updateUserNameDuringSignUp(name);

                if (result?.status === "error") {
                  toast.error(
                    result.message || "Failed to finish account setup",
                  );
                  return;
                }
              } finally {
                setUpdatingName(false);
              }
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

  function resendOtp() {
    if (!email || countdown > 0 || resendPending) return;

    startResendTransition(async () => {
      const resendType = isSignUp ? "email-verification" : "sign-in";

      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: resendType,
        fetchOptions: {
          onSuccess: () => {
            setCountdown(RESEND_COOLDOWN);
            setOtp("");
            toast.success("A new verification code has been sent");
          },
          onError: () => {
            toast.error("Failed to resend code");
          },
        },
      });
    });
  }

  const isBusy = emailPending || updatingName;
  const resendDisabled = !email || resendPending || countdown > 0;

  if (!email) return null;

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a 6-digit verification code to <br />
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
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
          disabled={isBusy || !isOtpCompleted || !email}
          className="w-full"
        >
          {isBusy ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Verifying…</span>
            </>
          ) : isSignUp ? (
            "Verify Account"
          ) : (
            "Verify & Sign In"
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={resendOtp}
            disabled={resendDisabled}
            className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
          >
            {resendPending
              ? "Sending..."
              : countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend"}
          </button>
        </p>
      </CardContent>
    </Card>
  );
}
