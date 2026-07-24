"use client";

import { trackCTAClick } from "@/lib/analytics";
import Link from "next/link";

interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "glow" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit";
  ctaType?: "primary" | "school" | "athlete" | "sponsor";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function CTAButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  type = "button",
  ctaType,
  children,
  className = "",
  disabled = false,
}: CTAButtonProps) {
  const baseStyles =
    "font-heading font-bold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark inline-flex items-center justify-center gap-2 rounded-lg";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary",
    secondary: "bg-dark text-white hover:bg-opacity-90 focus:ring-dark",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    glow: "bg-primary text-white hover:bg-opacity-90 focus:ring-primary glow-primary animate-glow-pulse",
    ghost: "bg-transparent text-gray-400 hover:text-white focus:ring-white/20",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const handleClick = () => {
    if (ctaType) {
      trackCTAClick(ctaType);
    }
    onClick?.();
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
