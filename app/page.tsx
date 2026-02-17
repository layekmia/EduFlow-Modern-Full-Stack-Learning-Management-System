"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const router = useRouter();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
          toast.success("Signout successfully");
        },
      },
    });
  }

  if (isPending) return <Loader2 className="size-10 animate-spin" />;
  return (
    <div>
      {session ? (
        <>
          <p>{session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </>
      ) : (
        <Link href={"/login"}>Login</Link>
      )}
    </div>
  );
}
