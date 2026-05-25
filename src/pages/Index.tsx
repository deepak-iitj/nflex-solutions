import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  MonitorCog,
  Zap,
  Wifi,
  Gauge,
  ShieldCheck,
  Factory,
  FlaskConical,
  Utensils,
  Droplets,
  HardHat,
  Bolt,
  CheckCircle2,
  ClipboardList,
  PencilRuler,
  Wrench,
  LifeBuoy,
  TrendingDown,
  Award,
  Users,
  Cog,
  ScanEye,
  BrainCircuit,
  Database,
  Navigation,
  MonitorPlay,
  Bot,
  Activity,
  Cloud
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { getBrandLogo } from "@/data/brandLogos";
import { brands, defaultProducts as products, getProductDisplayImage } from "@/data/products";

import { caseStudies } from "@/data/caseStudies";
import heroVideo from "@/assets/car-factory-3d-concept-automated-robot-arm-assembly-line-manufacturing-high-tech-green-energy.mp4";
import whyUsVideo from "@/assets/automated-car-factory-with-robotic-arms-assembling-battery-modules.mp4";
import processVideo from "@/assets/conveyor-with-advanced-high-precision-robot-arms-at-electronics-manufacturing-factory.mp4";
import ctaVideo from "@/assets/autonomous-electric-car-factory-with-robotic-arms-assembling-battery-modules.mp4";
import originalHeroVideo from "@/assets/hero_video.mp4";
import imgDigitalTwin from "@/assets/verticals/digital_twin_sim.png";
import imgSpm from "@/assets/verticals/spm_machine.png";
import imgAiInspection from "@/assets/verticals/ai_inspection.png";
import imgPredictive from "@/assets/verticals/predictive_maintenance.png";
import imgSynthetic from "@/assets/verticals/synthetic_data.png";
import imgModel from "@/assets/verticals/model_training.png";
import imgMlops from "@/assets/verticals/mlops_dashboard.png";
import imgCloud from "@/assets/verticals/cloud_edge.png";
import imgFleet from "@/assets/verticals/fleet_control.png";


const allHeroVideos = [
  heroVideo,
  whyUsVideo,
  processVideo,
  ctaVideo,
  originalHeroVideo,
];
import { clients } from "@/data/clients";

const heroMetrics = [
  { value: "↓ 40%", label: "Unplanned downtime" },
  { value: "↑ 2×", label: "Line throughput" },
  { value: "↓ 20%", label: "Energy consumption" },
  { value: "24/7", label: "AI-Driven Insights" },
];

const services = [
  {
    icon: MonitorPlay,
    image: imgDigitalTwin,
    title: "Digital Twin & Simulation",
    description:
      "Full factory process simulation and digital twins utilizing Nvidia Omniverse and Isaac Sim for risk-free virtual testing and workflow optimization.",
  },
  {
    icon: Bot,
    image: imgSpm,
    title: "Special Purpose Machines",
    description:
      "Design of custom Special Purpose Machines (SPMs) and bespoke software solutions with precision sensor integrations for unique industrial challenges.",
  },
  {
    icon: ScanEye,
    image: imgAiInspection,
    title: "AI-Based Inspection",
    description:
      "High-speed, AI-based vision inspection systems utilizing multi-sensor fusion to guarantee zero-defect tolerance in critical manufacturing.",
  },
  {
    icon: Activity,
    image: imgPredictive,
    title: "Predictive Maintenance",
    description:
      "Continuous sensor monitoring combined with AI analytics for predictive maintenance and automated root cause analysis of production anomalies.",
  },
  {
    icon: Database,
    image: imgSynthetic,
    title: "Synthetic Data Generation",
    description:
      "End-to-end data lifecycle management, from raw sensor telemetry capture to programmatic synthetic data generation for robust AI training.",
  },
  {
    icon: BrainCircuit,
    image: imgModel,
    title: "Model Training & Algorithms",
    description:
      "Bespoke algorithm development and end-to-end model training services tailored specifically to your physical environments and constraints.",
  },
  {
    icon: Cpu,
    image: imgMlops,
    title: "MLOps & AIOps",
    description:
      "Robust MLOps and AIOps frameworks for continuous model monitoring, retraining, and high-availability inference on the factory floor.",
  },
  {
    icon: Cloud,
    image: imgCloud,
    title: "Cloud & Edge Architecture",
    description:
      "Scalable cloud services and secure edge compute clusters, facilitating massive data processing, analytics, and fleet-wide model updates.",
  },
  {
    icon: Navigation,
    image: imgFleet,
    title: "Advanced Fleet Control",
    description:
      "Proprietary path-planning architectures and continuous trajectory generation to ensure autonomous mobile robots navigate safely.",
  },
];

const industries = [
  { icon: Factory, name: "Automotive" },
  { icon: FlaskConical, name: "Pharmaceuticals" },
  { icon: Utensils, name: "Food & Beverage" },
  { icon: Droplets, name: "Water & Wastewater" },
  { icon: HardHat, name: "Metals & Steel" },
  { icon: Bolt, name: "Energy & Utilities" },
];

const whyChooseUs = [
  {
    title: "AI-First Engineering Approach",
    description:
      "We don't just connect machines; we make them intelligent. Our team combines deep industrial automation expertise with cutting-edge AI capabilities.",
  },
  {
    title: "Data-Driven Decision Making",
    description:
      "Every project is built on a foundation of robust data pipelines, ensuring your AI models have clean, real-time data for maximum accuracy.",
  },
  {
    title: "Measurable AI ROI",
    description:
      "We commit to KPIs upfront — downtime reduction via predictive analytics, energy optimization, and throughput — and report against them.",
  },
  {
    title: "Continuous ML Training",
    description:
      "24/7 remote diagnostics and continuous Machine Learning model training ensure your systems get smarter and more efficient over time.",
  },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: "Requirement Analysis",
    description:
      "Site survey, P&ID review, KPI definition and a detailed scope-of-work with timelines and acceptance criteria.",
  },
  {
    icon: PencilRuler,
    title: "Design & Engineering",
    description:
      "Control philosophy, I/O lists, panel GA, schematics, network architecture and software functional design specs.",
  },
  {
    icon: Wrench,
    title: "Build & Commissioning",
    description:
      "In-house panel build, FAT, on-site installation, loop checks, SAT and operator training with handover dossier.",
  },
  {
    icon: LifeBuoy,
    title: "Support & Optimization",
    description:
      "Warranty, AMC, remote support, spares and continuous improvement reviews tied to plant performance KPIs.",
  },
];

const trustStats = [
  { icon: Award, value: "1000+", label: "Projects Delivered" },
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Factory, value: "10+", label: "Industries Served" },
  { icon: TrendingDown, value: "30%", label: "Avg Efficiency Gain" },
];

const featuredCases = caseStudies.slice(0, 4);

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  company: z.string().trim().min(2, "Company is required").max(120),
  email: z.string().trim().email("Enter a valid email").max(160),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(1000),
});

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [randomHeroVideo] = useState(() => allHeroVideos[Math.floor(Math.random() * allHeroVideos.length)]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Please check the form",
        description: result.error.errors[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Enquiry received",
        description: "Our engineering team will get back to you within 24 hours.",
      });
      setForm({ name: "", company: "", email: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <Layout>
      <SEO
        title="NFlex Solutions | AI-Powered Industrial Automation & Smart Solutions"
        description="AI-driven automation, predictive maintenance, intelligent SCADA, and smart IIoT for manufacturing, pharma, F&B, water and metals. Measurable AI outcomes."
        path="/"
      />
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover blur-[1px] scale-[1.05] opacity-99 pointer-events-none"
          >
            <source src={randomHeroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 w-full flex justify-center text-center">
          <div className="max-w-4xl flex flex-col items-center">
            <span className="animate-fade-up inline-block text-primary font-medium text-xs tracking-widest uppercase mb-6 border border-primary/30 rounded-full px-4 py-1.5">
              AI-Powered Automation • Machine Learning • Intelligent IIoT • Predictive Maintenance
            </span>
            <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-hero-foreground leading-[1.05] tracking-tight">
              AI-Driven Intelligence. Autonomous Operations.{" "}
              <span className="text-gradient">Engineered to perform.</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg md:text-xl text-hero-muted max-w-2xl leading-relaxed">
              We design, build and deploy AI-driven automation, predictive analytics, and intelligent IIoT systems for process and discrete plants — with measurable KPIs from day one.
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap justify-center gap-4">
              <a href="#enquiry">
                <Button size="lg" className="font-medium text-base px-8 gap-2">
                  Get a Quote <ArrowRight size={18} />
                </Button>
              </a>
              <Link to="/case-studies">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-medium text-base px-8 gap-2 bg-transparent border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10"
                >
                  View Case Studies
                </Button>
              </Link>
            </div>

            {/* Hero metrics */}
            <div className="animate-fade-up-delay-3 mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
              {heroMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-hero-foreground/10 bg-hero-foreground/5 backdrop-blur-sm px-4 py-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-primary">
                    {m.value}
                  </div>
                  <div className="text-xs md:text-sm text-hero-muted mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="What We Do"
            title="Engineering Services"
            description="End-to-end automation and electrical engineering — from concept and design to commissioning and lifecycle support."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-md hover:shadow-primary/5">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4 -mt-12 relative z-20 shadow-lg">
                      <s.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{s.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section-padding bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Industries Served"
            title="Built for Demanding Environments"
            description="Process and discrete manufacturing across regulated and high-availability sectors."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.05}>
                <div className="group flex flex-col items-center justify-center p-5 rounded-xl border border-border bg-card card-hover text-center h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <ind.icon size={22} className="text-primary" />
                  </div>
                  <span className="font-display font-semibold text-sm text-card-foreground">
                    {ind.name}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      
      {/* FEATURED KUEBLER PRODUCTS */}
      <section className="section-padding bg-secondary/20 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Featured Products"
            title="Premium KÜBLER Components"
            description="Explore our flagship range of high-precision encoders, slip rings, and measurement devices."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <Link to={`/products/${p.id}`} className="group block h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <div className="relative h-48 bg-secondary/30 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img
                      src={getProductDisplayImage(p)}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 z-20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary text-primary-foreground shadow-sm">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 h-[calc(100%-12rem)]">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">{p.category}</span>
                    <h3 className="text-lg font-display font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                      <span className="text-sm font-semibold text-foreground">
                        {p.price || "Contact for Quote"}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                Browse Full Catalog <ArrowRight size={16} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Case Studies"
            title="Real Projects, Real Results"
            description="A snapshot of recent engagements with measurable outcomes and the technologies deployed."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {featuredCases.map((cs, i) => (
              <ScrollReveal key={cs.slug} delay={i * 0.07}>
                <Link to={`/case-studies/${cs.slug}`} className="block h-full">
                  <article className="group h-full rounded-xl border border-border bg-card overflow-hidden card-hover flex flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <img
                        src={cs.image}
                        alt={cs.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-1 rounded">
                          {cs.industry}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider bg-background/90 text-foreground px-2.5 py-1 rounded">
                          {cs.year}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-lg bg-background/95 backdrop-blur px-3 py-2 text-right">
                        <div className="text-xl font-display font-bold text-primary leading-none">
                          {cs.keyMetric}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                          {cs.metricLabel}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-display font-semibold text-card-foreground group-hover:text-primary transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                        {cs.excerpt}
                      </p>
                      {cs.technologies && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {cs.technologies.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-[11px] font-medium text-muted-foreground border border-border rounded px-2 py-0.5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Read case study <ArrowRight size={14} />
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link to="/case-studies">
              <Button variant="outline" className="gap-2">
                View all case studies <ArrowRight size={16} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-padding surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover blur-[5px] scale-110 opacity-30"
          >
            <source src={whyUsVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <span className="text-primary font-medium text-xs tracking-widest uppercase">
                Why NFlex Solutions
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-hero-foreground leading-tight">
                AI Innovation, rooted in{" "}
                <span className="text-gradient">engineering depth.</span>
              </h2>
              <p className="mt-5 text-hero-muted leading-relaxed">
                We are an AI-first engineering team. Our solutions combine deep industrial domain expertise with advanced machine learning, ensuring our intelligent deployments are measured against the KPIs you care about — predictive uptime, autonomous throughput, energy optimization, and continuous compliance.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#enquiry">
                  <Button size="lg" className="gap-2">
                    Talk to an engineer <ArrowRight size={16} />
                  </Button>
                </a>
                <Link to="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 bg-transparent border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/10"
                  >
                    Browse products
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyChooseUs.map((w, i) => (
                <ScrollReveal key={w.title} delay={i * 0.07}>
                  <div className="p-6 rounded-xl bg-hero-foreground/5 border border-hero-foreground/10 h-full">
                    <CheckCircle2 size={20} className="text-primary mb-3" />
                    <h3 className="font-display font-semibold text-hero-foreground">
                      {w.title}
                    </h3>
                    <p className="text-sm text-hero-muted mt-2 leading-relaxed">
                      {w.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / STATS */}
      <section className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustStats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <s.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-foreground leading-none">
                      {s.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1.5">{s.label}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS / BRANDS */}
      <section className="section-padding bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Technology Partners"
            title="Certified across leading OEMs"
          />
          <div className="overflow-hidden">
            <div className="flex w-max marquee-track">
              {[...brands, ...brands].map((brand, i) => {
                const logoUrl = getBrandLogo(brand);
                return (
                  <div
                    key={`${brand}-${i}`}
                    className="flex-shrink-0 w-40 h-20 flex items-center justify-center rounded-xl border border-border bg-card hover:border-primary/30 transition-colors p-3 mx-2 overflow-hidden"
                  >
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={brand}
                        className={`brand-logo h-full w-full ${brand === "SICK" ? "brand-logo--sick" : ""}`}
                      />
                    ) : (
                      <span className="font-display font-bold text-muted-foreground/60 text-lg">
                        {brand}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OUR CLIENTS */}
      <section className="section-padding bg-background border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Clients"
            title="Trusted by Industry Leaders"
            description="We proudly serve some of India's most reputed industrial and manufacturing organisations."
          />
          <div className="overflow-hidden">
            <div className="flex w-max marquee-track">
              {[...clients, ...clients].map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="flex-shrink-0 w-44 h-20 flex items-center justify-center rounded-xl border border-border bg-card hover:border-primary/30 transition-colors p-4 mx-2 overflow-hidden"
                >
                  {client.logoUrl ? (
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <span className={`font-display font-bold text-muted-foreground/60 text-sm text-center ${client.logoUrl ? "hidden" : ""}`}>
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover blur-[6px] scale-110 opacity-20"
          >
            <source src={processVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            label="How We Deliver"
            title="A Predictable Engineering Process"
            description="Structured, documented and reviewed at every gate — so there are no surprises at FAT or commissioning."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.08}>
                <div className="relative p-6 rounded-xl border border-border bg-card card-hover h-full">
                  <div className="absolute -top-3 -left-3 w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm">
                    0{i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mt-2">
                    <step.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-card-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / ENQUIRY */}
      <section id="enquiry" className="section-padding surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover blur-[5px] scale-110 opacity-40"
          >
            <source src={ctaVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-2">
              <span className="text-primary font-medium text-xs tracking-widest uppercase">
                Start Your Project
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold text-hero-foreground leading-tight">
                Have a similar challenge?
              </h2>
              <p className="mt-5 text-hero-muted leading-relaxed">
                Send us a brief description of your plant, the systems involved and the outcomes you need. An NFlex Solutions engineer will respond within 24 hours with next steps.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-hero-muted">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  Free 30-minute scoping call with a senior engineer
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  NDA available on request — your data stays confidential
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  Indicative timeline & budget within 5 working days
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-2xl bg-hero-foreground/5 border border-hero-foreground/10 backdrop-blur-sm"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-hero-foreground">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-1.5 bg-hero-foreground/5 border-hero-foreground/15 text-hero-foreground placeholder:text-hero-muted"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-hero-foreground">
                      Company *
                    </Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-1.5 bg-hero-foreground/5 border-hero-foreground/15 text-hero-foreground placeholder:text-hero-muted"
                      placeholder="Company name"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="email" className="text-hero-foreground">
                    Work email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-1.5 bg-hero-foreground/5 border-hero-foreground/15 text-hero-foreground placeholder:text-hero-muted"
                    placeholder="you@company.com"
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="message" className="text-hero-foreground">
                    Project brief *
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="mt-1.5 bg-hero-foreground/5 border-hero-foreground/15 text-hero-foreground placeholder:text-hero-muted"
                    placeholder="Industry, plant size, systems involved, target outcomes…"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button type="submit" size="lg" disabled={submitting} className="gap-2">
                    <Cog size={18} className={submitting ? "animate-spin" : ""} />
                    {submitting ? "Sending…" : "Request Consultation"}
                  </Button>
                  <Link to="/contact">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="bg-transparent border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/10"
                    >
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
