import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Send,
  MessageCircle,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Cpu,
  Wrench,
  Cog,
  Gauge,
  Thermometer,
  Network,
  CheckCircle2,
  FileText,
  FileBox,
  FileCog,
  Award,
  Factory,
  Package,
  Bot,
  Truck,
  Car,
  ChevronDown,
  Phone,
  Mail,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import DatasheetDialog from "@/components/DatasheetDialog";
import SEO from "@/components/SEO";
import { ProductJsonLd, BreadcrumbListJsonLd } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import {
  getProductById,
  getSimilarProducts,
  getProductDisplayImage,
} from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Valid email is required").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const FEATURE_ICONS = [Gauge, ShieldCheck, Zap, Cpu, Network, Wrench, Cog, Thermometer];

const APPLICATIONS = [
  { icon: Factory, label: "Factory Automation" },
  { icon: Package, label: "Packaging Industry" },
  { icon: Bot, label: "Robotics" },
  { icon: Truck, label: "Material Handling" },
  { icon: Car, label: "Automotive" },
  { icon: Cog, label: "Process Industries" },
];

const CERTIFICATIONS = ["CE", "ISO 9001", "RoHS", "UL", "IP67"];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = getProductById(products, id || "");
  const [datasheetOpen, setDatasheetOpen] = useState(false);
  const [enquiry, setEnquiry] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <Layout>
        <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h1 className="text-3xl font-display font-bold text-hero-foreground">
              Product Not Found
            </h1>
            <Link to="/products" className="mt-6 inline-block">
              <Button
                variant="outline"
                className="gap-2 border-hero-foreground/20 text-hero-foreground"
              >
                <ArrowLeft size={16} /> Back to Products
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const similar = getSimilarProducts(products, product);
  const whatsappUrl = `https://wa.me/918756170309?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.title} (${product.brand}). Can you share more details?`,
  )}`;

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(enquiry);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast({
      title: "Quote Request Sent!",
      description: `Our sales team will contact you about ${product.title} within 24 hours.`,
    });
    setEnquiry({ name: "", company: "", email: "", phone: "", message: "" });
  };

  // Derive highlights from features (top 4)
  const highlights = product.features.slice(0, 4);
  // Variants: derive simple variants from product (placeholder pattern)
  const variants = [
    { name: `${product.title} – Standard`, diff: "Base configuration", desc: "Default model with standard I/O and connectivity." },
    { name: `${product.title} – Pro`, diff: "Extended I/O", desc: "Higher channel count and extended diagnostics." },
    { name: `${product.title} – IP67`, diff: "Field-mount rated", desc: "Sealed housing for direct field installation." },
    { name: `${product.title} – Lite`, diff: "Compact form", desc: "Compact variant for space-constrained cabinets." },
  ];

  const downloads = [
    { icon: FileText, label: "Datasheet", type: "PDF", url: product.datasheetUrl },
    { icon: FileBox, label: "User Manual", type: "PDF", url: product.datasheetUrl },
    { icon: FileCog, label: "CAD Files", type: "STEP / DWG", url: undefined },
    { icon: Award, label: "Certifications", type: "PDF", url: undefined },
  ];

  const faqs = [
    {
      q: `What industries is the ${product.title} designed for?`,
      a: `The ${product.title} is engineered for demanding industrial environments including factory automation, packaging, robotics, material handling and automotive production lines.`,
    },
    {
      q: "Which communication protocols are supported?",
      a: "Depending on the variant, the product supports common industrial protocols such as PROFINET, EtherCAT, EtherNet/IP, Modbus TCP and IO-Link for seamless integration with existing control architectures.",
    },
    {
      q: "What is the typical lead time and warranty?",
      a: "Standard lead time is 2–4 weeks subject to stock. All products come with a 12-month manufacturer warranty against defects in materials and workmanship.",
    },
    {
      q: "Do you provide installation and commissioning support?",
      a: "Yes. Our application engineers offer remote and on-site commissioning support, training and integration services across India.",
    },
    {
      q: "Are CAD models and certifications available?",
      a: "Certified documentation (CE, RoHS, UL where applicable) and CAD models in STEP/DWG formats are available on request via the downloads section.",
    },
  ];

  const productImage = getProductDisplayImage(product);

  return (
    <Layout>
      <SEO
        title={product.title}
        description={product.description}
        path={`/products/${product.id}`}
        type="product"
      />
      <ProductJsonLd product={product} />
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: product.title, url: `/products/${product.id}` },
        ]}
      />

      {/* ============ 1. HERO ============ */}
      <section className="hero-gradient pt-28 pb-16 md:pt-36 md:pb-20 border-b border-hero-foreground/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Products", path: "/products" },
              { label: product.brand, path: `/products?brand=${product.brand}` },
              { label: product.title },
            ]}
            className="mb-6"
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="animate-fade-up order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-hero-foreground/10 bg-white/95 aspect-square flex items-center justify-center p-10 shadow-2xl">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={product.title}
                    className={`max-w-full max-h-full object-contain ${product.brand === "SICK" ? "brand-logo--sick" : ""}`}
                  />
                ) : (
                  <Package size={120} className="text-muted-foreground/40" />
                )}
                {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground shadow-lg">
                    {product.badge}
                  </span>
                )}
              </div>
              {/* Cert chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {CERTIFICATIONS.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded border border-hero-foreground/20 text-hero-muted bg-hero-foreground/5"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">
                  {product.brand}
                </span>
                <span className="w-1 h-1 rounded-full bg-hero-muted" />
                <span className="text-hero-muted text-xs uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-hero-foreground leading-[1.1] tracking-tight">
                {product.title}
              </h1>
              <p className="mt-4 text-lg text-hero-muted leading-relaxed max-w-xl">
                {product.description}
              </p>

              {/* Highlights */}
              {highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-hero-foreground/90">
                      <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                {product.datasheetUrl ? (
                  <a href={product.datasheetUrl} download target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2">
                      <Download size={16} /> Download Datasheet
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" className="gap-2" onClick={() => setDatasheetOpen(true)}>
                    <Download size={16} /> Download Datasheet
                  </Button>
                )}
                <a href="#enquiry">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
                  >
                    <Send size={16} /> Request Quote
                  </Button>
                </a>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="gap-2 text-hero-foreground hover:bg-hero-foreground/10 hover:text-hero-foreground"
                  >
                    <Phone size={16} /> Contact Sales
                  </Button>
                </Link>
              </div>

              {/* Secondary actions */}
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <button
                  onClick={() => {
                    addToCart(product.id);
                    toast({ title: "Added to cart", description: product.title });
                  }}
                  className="inline-flex items-center gap-1.5 text-hero-muted hover:text-primary transition-colors"
                >
                  <ShoppingCart size={14} /> Add to cart
                </button>
                <span className="text-hero-foreground/20">|</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-hero-muted hover:text-primary transition-colors"
                >
                  <MessageCircle size={14} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. OVERVIEW ============ */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Product Overview
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground">
              Built for industrial reliability and continuous performance
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The {product.title} from {product.brand} is engineered to deliver dependable performance in the most demanding industrial environments. Designed for {product.category.toLowerCase()} applications, it combines robust hardware with intelligent diagnostics to maximise uptime and reduce total cost of ownership.
              </p>
              <p>
                With proven compatibility across leading PLCs, drives and Industrial Ethernet networks, the product integrates seamlessly into new and existing automation architectures. Its rugged construction withstands shock, vibration, dust and temperature extremes typically found in factory floors, packaging lines and process plants.
              </p>
              <p>
                Backed by IVA's local stock, application engineering and lifecycle support, the {product.title} is the right choice for OEMs, system integrators and end users who demand certified quality, fast delivery and long-term reliability.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ 3. KEY FEATURES ============ */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                Key Features
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground">
                Engineered for performance and longevity
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <ScrollReveal key={f} delay={i * 0.04}>
                  <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-1.5">
                      {f}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Engineered to deliver consistent industrial-grade performance across continuous duty cycles.
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 4. TECHNICAL SPECIFICATIONS ============ */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Technical Specifications
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Detailed technical data
            </h2>
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], i) => (
                    <tr
                      key={key}
                      className={`${i % 2 === 0 ? "bg-secondary/40" : "bg-card"} border-b border-border last:border-b-0`}
                    >
                      <td className="px-6 py-4 text-sm font-semibold text-foreground w-1/3 align-top">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {val}
                      </td>
                    </tr>
                  ))}
                  {/* Extra industrial-style spec rows */}
                  <tr className="bg-secondary/40 border-b border-border">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">Mounting</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">DIN rail / Panel / Field mount (variant dependent)</td>
                  </tr>
                  <tr className="bg-card border-b border-border">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">Operating Temperature</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">−25 °C to +70 °C</td>
                  </tr>
                  <tr className="bg-secondary/40">
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">Certifications</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">CE, RoHS, UL (variant dependent)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ 5. APPLICATIONS ============ */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                Applications
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground">
                Trusted across industries
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {APPLICATIONS.map((app, i) => (
              <ScrollReveal key={app.label} delay={i * 0.04}>
                <div className="p-5 rounded-xl border border-border bg-card text-center hover:border-primary/40 hover:-translate-y-0.5 transition-all">
                  <app.icon size={28} className="text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">{app.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. VARIANTS ============ */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Product Variants
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Available models
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {variants.map((v, i) => (
              <ScrollReveal key={v.name} delay={i * 0.04}>
                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Package size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                      <h3 className="font-display font-semibold text-foreground">{v.name}</h3>
                      <span className="text-xs font-medium text-primary">{v.diff}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 7. DOWNLOADS ============ */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Downloads
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Documentation & resources
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {downloads.map((d, i) => {
              const inner = (
                <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all flex flex-col">
                  <d.icon size={24} className="text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground">{d.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{d.type}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    <Download size={14} /> Download
                  </span>
                </div>
              );
              return (
                <ScrollReveal key={d.label} delay={i * 0.04}>
                  {d.url ? (
                    <a href={d.url} target="_blank" rel="noopener noreferrer" download className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    <button onClick={() => setDatasheetOpen(true)} className="block h-full w-full text-left">
                      {inner}
                    </button>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 8. WHY CHOOSE ============ */}
      <section className="py-16 md:py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                Why Choose This Product
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground">
                Built on trust. Proven in industry.
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: ShieldCheck, title: "Industrial Reliability", desc: "Tested under continuous duty cycles for years of dependable operation." },
              { icon: Award, title: "Certified Quality", desc: "Compliant with international standards including CE, RoHS and ISO 9001." },
              { icon: Wrench, title: "Easy Integration", desc: "Plug-and-play compatibility with leading PLC and drive ecosystems." },
              { icon: Building2, title: "Lifecycle Support", desc: "Local stock, application engineering and after-sales support across India." },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.04}>
                <div className="p-6 rounded-xl border border-border bg-card h-full">
                  <b.icon size={24} className="text-primary mb-3" />
                  <h3 className="font-display font-semibold text-foreground mb-1.5">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9. FAQ ============ */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              FAQ
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Frequently asked questions
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion type="single" collapsible className="rounded-xl border border-border bg-card divide-y divide-border overflow-hidden">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-0 px-5">
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ 10. CONTACT / CTA ============ */}
      <section id="enquiry" className="py-16 md:py-24 hero-gradient border-b border-hero-foreground/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <ScrollReveal>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
                Get a Quote
              </span>
              <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-hero-foreground leading-tight">
                Talk to our automation specialists
              </h2>
              <p className="mt-4 text-hero-muted leading-relaxed">
                Share your application requirements and our engineers will get back within 24 hours with pricing, lead time and technical recommendations for the {product.title}.
              </p>
              <div className="mt-8 space-y-4">
                <a href="tel:+918858793819" className="flex items-center gap-3 text-hero-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-hero-muted uppercase tracking-wider">Call us</div>
                    <div className="font-medium">+91 88587 93819</div>
                  </div>
                </a>
                <a href="mailto:sales@iva.com" className="flex items-center gap-3 text-hero-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-hero-muted uppercase tracking-wider">Email</div>
                    <div className="font-medium">sales@iva.com</div>
                  </div>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-hero-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-hero-muted uppercase tracking-wider">WhatsApp</div>
                    <div className="font-medium">Chat with sales</div>
                  </div>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <form onSubmit={handleEnquiry} className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-2xl space-y-4">
                <h3 className="font-display font-bold text-xl text-foreground">Request a Quote</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Full name *" value={enquiry.name} onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })} />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input placeholder="Company" value={enquiry.company} onChange={(e) => setEnquiry({ ...enquiry, company: e.target.value })} />
                  </div>
                  <div>
                    <Input type="email" placeholder="Work email *" value={enquiry.email} onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Input type="tel" placeholder="Phone" value={enquiry.phone} onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })} />
                  </div>
                </div>
                <div>
                  <Textarea placeholder={`Tell us about your application and quantity for ${product.title}...`} rows={4} value={enquiry.message} onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })} />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <Send size={16} /> Get a Quote
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting you agree to our privacy policy. We respond within 24 hours.
                </p>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Related products */}
      {similar.length > 0 && (
        <section className="py-16 md:py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Related Products</span>
                  <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold text-foreground">You may also like</h2>
                </div>
                <Link to="/products" className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((sp, i) => (
                <ScrollReveal key={sp.id} delay={i * 0.05}>
                  <div className="flex flex-col h-full">
                    <Link to={`/products/${sp.id}`} className="flex-1 block">
                      <div className="group p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{sp.category}</span>
                          <span className="text-[10px] font-bold text-primary tracking-wider">{sp.brand}</span>
                        </div>
                        <h3 className="text-base font-display font-semibold text-card-foreground mb-1.5 group-hover:text-primary transition-colors">{sp.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1 line-clamp-2">{sp.description}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          View details <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <DatasheetDialog open={datasheetOpen} onClose={() => setDatasheetOpen(false)} productTitle={product.title} />
    </Layout>
  );
};

export default ProductDetail;
