"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { handleAnimationThemeToggle } from "@/lib/animation-theme";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  variant = "ghost",
  size = "sm",
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    handleAnimationThemeToggle({
      element: ref,
      setTheme,
      theme,
    });
  };

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(showLabel ? "" : "h-8 w-8 p-0", className)}
        disabled
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(showLabel ? "" : "h-8 w-8 p-0", className)}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      {showLabel && (
        <span className="ml-2 capitalize">
          {theme === "dark" ? "Light" : "Dark"}
        </span>
      )}
    </Button>
  );
}
