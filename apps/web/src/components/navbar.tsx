"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Terminal, X } from "lucide-react";

import { authClient } from "~/auth/client";
import { useSignIn } from "~/components/sign-in-dialog";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Kbd } from "~/components/ui/kbd";
import { CodingBirdIcon } from "~/components/brand/logo";
import { getAvatarUrl } from "~/lib/avatar";
import { cn } from "~/lib/utils";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const navLinks = [
  { href: "/problems", label: "Problems" },
  { href: "/paths", label: "Paths" },
  { href: "/system-design", label: "System Design" },
  { href: "/ducklets", label: "Rooms" },
  { href: "/machine-coding", label: "Machine Coding" },
  { href: "/playground", label: "Playground" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { openSignIn } = useSignIn();

  const user = session?.user;

  // Ducklet editor + guest views (`/ducklets/<id>`), interview rooms
  // (`/interview/<id>`), and the practice solve page (`/machine-coding/<slug>`)
  // are full-screen apps that render their own header. Suppress the global nav
  // so they don't double up.
  if (
    /^\/ducklets\/[^/]+/.test(pathname ?? "") ||
    /^\/interview\/[^/]+/.test(pathname ?? "") ||
    /^\/machine-coding\/[^/]+/.test(pathname ?? "")
  ) {
    return null;
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="bg-background/80 border-border/80 sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight transition-opacity hover:opacity-90"
        >
          <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-card p-1.5 shadow-xs">
            <CodingBirdIcon size={22} />
          </div>
          <span className="font-semibold">Coding Bird</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side - Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              )
            }
            className="hover:border-primary/50 hover:text-foreground hidden items-center gap-2 rounded-md border border-border bg-card/60 px-2.5 py-1 text-xs text-muted-foreground transition-colors shadow-2xs lg:flex"
            title="Search problems and architectures (⌘K)"
          >
            <Search className="size-3.5" />
            <span>Search...</span>
            <Kbd className="text-[10px]">⌘K</Kbd>
          </button>

          <AnimatedThemeToggler />
          {user ? (
            <>
              <div className="bg-border h-6 w-px" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hover:bg-accent hover:border-border flex items-center gap-2.5 rounded-full border border-transparent p-1 pr-3 transition-colors"
                  >
                    <Image
                      src={getAvatarUrl(user.username, 32)}
                      alt={user.name ?? "User"}
                      width={32}
                      height={32}
                      className="bg-muted size-7 shrink-0 rounded-full object-cover"
                    />
                    <span className="max-w-[10rem] truncate text-xs font-medium">
                      {user.name ?? "Developer"}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name ?? "Developer"}</p>
                      <p className="text-muted-foreground text-xs leading-none">@{user.username ?? "user"}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user.username && (
                    <DropdownMenuItem asChild>
                      <Link href={`/u/${user.username}`} className="w-full cursor-pointer">
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/ducklets" className="w-full cursor-pointer">
                      My Coding Rooms
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="w-full cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={() =>
                  openSignIn({
                    source: "navbar-signin",
                    callbackURL: "/problems",
                  })
                }
              >
                Sign In
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                onClick={() =>
                  openSignIn({
                    source: "navbar-getstarted",
                    callbackURL: "/problems",
                  })
                }
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-1.5 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              )
            }
            aria-label="Search"
            className="size-8"
          >
            <Search className="size-4" />
          </Button>
          <AnimatedThemeToggler />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="size-8"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto space-y-3 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname?.startsWith(link.href)
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="space-y-2 border-t pt-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Image
                      src={getAvatarUrl(user.username, 32)}
                      alt={user.name ?? "User"}
                      width={32}
                      height={32}
                      className="bg-muted size-8 shrink-0 rounded-full"
                    />
                    <span className="truncate text-sm font-medium">
                      {user.name ?? "User"}
                    </span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  {user.username && (
                    <Link
                      href={`/u/${user.username}`}
                      className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                  )}
                  <Link
                    href="/ducklets"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Coding Rooms
                  </Link>
                  <Link
                    href="/settings"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button type="button"
                    className="text-destructive hover:bg-destructive/10 w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 px-4 py-2">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground justify-center"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openSignIn({
                        source: "navbar-mobile-signin",
                        callbackURL: "/problems",
                      });
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90 justify-center font-semibold"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openSignIn({
                        source: "navbar-mobile-getstarted",
                        callbackURL: "/problems",
                      });
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
