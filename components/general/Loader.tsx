import Image from "next/image";
import logo from "@/public/logo.png";

export default function BrandLoader({
  title = "EduFlow",
  subtitle = "Preparing your learning experience...",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full bg-primary/15 blur-2xl animate-pulse" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-border/60 bg-card/90 shadow-2xl animate-[float_3s_ease-in-out_infinite]">
            <Image
              src={logo}
              alt="EduFlow logo"
              width={48}
              height={48}
              priority
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="relative mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-muted">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-primary animate-[loader_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
