import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ label, title, description, centered = true, light = false }: SectionHeadingProps) => (
  <ScrollReveal className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
    {label && (
      <span className="text-primary font-medium text-sm tracking-widest uppercase mb-3 block">
        {label}
      </span>
    )}
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight ${light ? "text-hero-foreground" : "text-foreground"}`}>
      {title}
    </h2>
    {description && (
      <p className={`mt-4 text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-hero-muted" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </ScrollReveal>
);

export default SectionHeading;
