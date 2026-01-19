interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  background?: "white" | "dark" | "primary";
  padding?: "sm" | "md" | "lg";
}

export default function Section({
  id,
  className = "",
  children,
  background = "white",
  padding = "md",
}: SectionProps) {
  const backgroundStyles = {
    white: "bg-white text-dark",
    dark: "bg-dark text-white",
    primary: "bg-primary text-white",
  };

  const paddingStyles = {
    sm: "py-8",
    md: "py-16",
    lg: "py-24",
  };

  return (
    <section
      id={id}
      className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
