"use client";

import Image from "next/image";
import { BRAND } from "@/lib/constants";
import { useState } from "react";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { width: 120, height: 40 },
  md: { width: 180, height: 60 },
  lg: { width: 240, height: 80 },
};

export default function Logo({
  variant = "horizontal",
  size = "md",
  className = "",
}: LogoProps) {
  const [hasError, setHasError] = useState(false);
  
  // Usar logo.png para header (horizontal) y logo-dark.png para footer (vertical/dark)
  const logoPath = variant === "vertical" || variant === "icon" 
    ? `/images/logo/logo-dark.png` 
    : `/images/logo/logo.png`;
  
  const dimensions = sizeMap[size];

  // Si hay error, mostrar texto
  if (hasError) {
    return (
      <div className={className}>
        <span
          className={`${
            size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl"
          } font-heading font-bold text-primary`}
        >
          {BRAND.name}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={logoPath}
        alt={`${BRAND.name} Logo`}
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="object-contain"
        onError={() => {
          setHasError(true);
        }}
      />
    </div>
  );
}
