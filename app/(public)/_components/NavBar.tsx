"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { authClient } from "@/lib/auth-client";
import logo from "@/public/logo.png";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UserDropdown } from "./UserDropDown";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function NavBar() {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container relative flex min-h-16 items-center justify-between mx-auto px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" className="size-9" />
          <span className="font-bold">EduFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between ml-6">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                name={session?.user?.name}
                email={session?.user?.email}
                image={session?.user?.image}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
                <Link href="/signup" className={buttonVariants()}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t bg-background transition-all duration-300",
          isOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden",
        )}
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium hover:text-primary"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center justify-between pt-4 border-t">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                name={session?.user?.name}
                email={session?.user?.email}
                image={session?.user?.image}
              />
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Login
                </Link>

                <Link href="/signup" className={buttonVariants({ size: "sm" })}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
