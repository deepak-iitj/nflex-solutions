import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Calendar,
  Search,
  TrendingUp,
  Award,
  Globe,
  Layers,
  Factory,
  FlaskConical,
  Hammer,
  UtensilsCrossed,
  Droplets,
  Zap,
  CheckCircle2,
  Send,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { caseStudies, industries } from "@/data/caseStudies";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import processVideo from "@/assets/conveyor-with-advanced-high-precision-robot-arms-at-electronics-manufacturing-factory.mp4";
import ctaVideo from "@/assets/autonomous-electric-car-factory-with-robotic-arms-assembling-battery-modules.mp4";

const INDUSTRY_ICONS: Record<string, typeof Factory> = {
  Automotive: Factory,
  Pharmaceuticals: FlaskConical,
  "Metals & Steel": Hammer,
  "Food & Beverage": UtensilsCrossed,
  "Water & Wastewater": Droplets,
  "Energy / Utilities": Zap,
};

const consultSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email is required").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const CaseStudies = () => {
  const { toast } = useToast();
  const [activeIndustry, setActiveIndustry] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return caseStudies.filter((c) => {
      const indMatch = activeIndustry === "All" || c.industry === activeIndustry;
      const qMatch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.excerpt.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        (c.technologies ?? []).some((t) => t.toLowerCase().includes(q));
      return indMatch && qMatch;
    });
  }, [activeIndustry, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = consultSchema.safeParse(form);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.errors.forEach((er) => {
        if (er.path[0]) fe[er.path[0] as string] = er.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    toast({ title: "Request received", description: "Our team will reach out within 24 hours." });
    setForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <Layout>
      <SEO
        title="Case Studies – Real Projects, Real Results"
        description="Industrial automation case studies across automotive, pharma, steel, F&B, water and energy. Measurable outcomes delivered by NFlex Solutions."
        path="/case-studies"
      />

      {/* HERO */}
      <section className="relative hero-gradient pt-32 pb-20 md:pt-40 md:pb-24 border-b border-hero-foreground/10 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-[5px] scale-[1.05] opacity-40">
            <source src={processVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="animate-fade-up text-primary font-semibold text-xs tracking-[0.2em] uppercase mb-4 block">
              Case Studies
            </span>
            <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-hero-foreground leading-[1.05] tracking-tight">
              Real Projects, <span className="text-gradient">Real Results</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg text-hero-muted max-w-2xl leading-relaxed">
              We help manufacturers and utilities improve efficiency, reliability, compliance and performance through industrial automation and electrical solutions. Explore measurable outcomes from real deployments across India.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Talk to an Expert <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="#consult">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
                >
                  Start Your Project
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Layers, value: "150+", label: "Projects Delivered" },
            { icon: Building2, value: "10+", label: "Industries Served" },
            { icon: TrendingUp, value: "30%", label: "Avg Efficiency Gain" },
            { icon: Globe, value: "Pan-India", label: "Installations" },
          ].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.05}>
              <div className="text-center md:text-left">
                <s.icon className="text-primary mb-2 mx-auto md:mx-0" size={22} />
                <div className="text-3xl md:text-4xl font-display font-extrabold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FILTERS + SEARCH */}
      <section className="py-10 bg-secondary/30 border-b border-border sticky top-16 z-10 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex flex-wrap gap-2 flex-1">
            {industries.map((ind) => {
              const active = activeIndustry === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-foreground border-border hover:border-primary/40"
                  }`}
                >
                  {ind}
                </button>
              );
            })}
          </div>
          <div className="relative lg:w-72 shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search case studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </section>

      {/* CASE STUDY GRID */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No case studies match your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((study, i) => {
                const Icon = INDUSTRY_ICONS[study.industry] ?? Factory;
                return (
                  <ScrollReveal key={study.slug} delay={Math.min(i * 0.05, 0.3)}>
                    <Link to={`/case-studies/${study.slug}`} className="block h-full">
                      <article className="group h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                          <img
                            src={study.image}
                            alt={study.title}
                            loading="lazy"
                            width={1024}
                            height={640}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/95 text-primary-foreground backdrop-blur">
                            <Icon size={12} /> {study.industry}
                          </div>
                          <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-card/90 text-foreground backdrop-blur border border-border">
                            <Calendar size={11} /> {study.year}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h2 className="text-lg font-display font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {study.title}
                          </h2>
                          <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                            {study.excerpt}
                          </p>
                          <div className="mt-4 flex items-end justify-between gap-3 pt-4 border-t border-border">
                            <div>
                              <div className="text-2xl font-display font-extrabold text-primary leading-none">
                                {study.keyMetric}
                              </div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                                {study.metricLabel}
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all whitespace-nowrap">
                              Read case study <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* FEATURED CASE STUDY */}
      {featured && (
        <section className="py-16 md:py-24 bg-secondary/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-3">
                <Award size={16} className="text-primary" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Featured Project</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-10 max-w-3xl">
                {featured.title}
              </h2>
            </ScrollReveal>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              <ScrollReveal className="lg:col-span-2">
                <div>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      loading="lazy"
                      width={1024}
                      height={640}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Industry</div>
                      <div className="font-display font-semibold text-foreground mt-1">{featured.industry}</div>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-card">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">Year</div>
                      <div className="font-display font-semibold text-foreground mt-1">{featured.year}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1} className="lg:col-span-3">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">Challenge</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{featured.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-2">Solution & Implementation</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{featured.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground mb-3">Measurable Results</h3>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {featured.results.map((r) => (
                        <li key={r} className="flex items-start gap-2.5 p-3 rounded-lg bg-card border border-border">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {featured.technologies && (
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {featured.technologies.map((t) => (
                          <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-2">
                    <Link to={`/case-studies/${featured.slug}`}>
                      <Button className="gap-2">
                        Read full case study <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA + FORM */}
      <section id="consult" className="py-16 md:py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-[5px] scale-110 opacity-40">
            <source src={ctaVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Get Started</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-hero-foreground leading-tight">
              Have a similar challenge?
            </h2>
            <p className="mt-4 text-hero-muted leading-relaxed max-w-xl">
              Share a few details about your operation and our automation specialists will reach out with a tailored approach, lead time and indicative pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Request Consultation <ArrowRight size={16} />
                </Button>
              </Link>
              <a href="tel:+918858793819">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
                >
                  <Phone size={16} /> Contact Sales
                </Button>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-2xl space-y-4">
              <h3 className="font-display font-bold text-xl text-foreground">Request Consultation</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Input placeholder="Full name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
              </div>
              <div>
                <Input type="email" placeholder="Work email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Textarea placeholder="Briefly describe your challenge or project..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full gap-2">
                <Send size={16} /> Send Request
              </Button>
              <p className="text-xs text-muted-foreground text-center">We respond within 24 hours, Mon–Sat.</p>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
