import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import heroVideo from "@/assets/hero_video.mp4";
import ctaVideo from "@/assets/autonomous-electric-car-factory-with-robotic-arms-assembling-battery-modules.mp4";

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every system we design is engineered for accuracy, reliability, and peak performance.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description:
      "We stay ahead of the curve, adopting the latest technologies to give our clients a competitive edge.",
  },
  {
    icon: Heart,
    title: "Partnership",
    description:
      "We build lasting relationships, working as an extension of your team from concept to commissioning.",
  },
];

const milestones = [
  {
    year: "2020",
    event: "Founded as a specialized electrical solutions provider",
  },
  {
    year: "2021",
    event: "Expanded into industrial automation and PLC systems",
  },
  { year: "2023", event: "ISO 9001 certified, 200th project milestone" },
  {
    year: "2025",
    event: "Launched energy management and IoT integration services",
  },
  { year: "2026", event: "500+ clients served across 12 industries" },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About Us"
        description="NFlex Solutions – industrial automation and electrical solutions. Our story, values, and expertise. Ghaziabad, India."
        path="/about"
      />
      {/* Hero */}
      <section className="relative hero-gradient pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-[4px] scale-[1.05] opacity-40">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <span className="animate-fade-up text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              About Us
            </span>
            <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-hero-foreground leading-tight tracking-tight">
              Built on Expertise,{" "}
              <span className="text-gradient">Driven by Results</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg text-hero-muted max-w-xl leading-relaxed">
              NFlex Solutions is a trusted partner in industrial automation
              and electrical solutions, combining deep engineering expertise
              with a commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <SectionHeading
                label="Our Story"
                title="From Vision to Industry Leader"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2009, NFlex Solutions began as a small team of
                  electrical engineers with a bold vision: to bring world-class
                  automation technology to businesses of all sizes.
                </p>
                <p>
                  Over the years, we've grown into a full-service industrial
                  solutions provider, trusted by manufacturers, energy
                  companies, and infrastructure developers across the region.
                  Our approach is simple—listen to our clients, design with
                  precision, and deliver on time, every time.
                </p>
                <p>
                  Today, with a team of 50+ engineers and partnerships with
                  leading global brands, we're proud to be the go-to partner for
                  businesses looking to modernize, optimize, and scale.
                </p>
              </div>
            </ScrollReveal>

            {/* Timeline */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex gap-5 group">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5" />
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-8">
                      <span className="text-primary font-display font-bold text-sm">
                        {m.year}
                      </span>
                      <p className="text-muted-foreground text-sm mt-1">
                        {m.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Values"
            title="What Drives Us"
            description="Three principles guide every project, every decision, every relationship."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="p-8 rounded-xl border border-border bg-card text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <v.icon size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-card-foreground mb-2">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-[5px] scale-110 opacity-40">
            <source src={ctaVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-hero-foreground mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-hero-muted text-lg max-w-lg mx-auto mb-8">
              Let's discuss how NFlex Solutions can help streamline your
              operations and power your growth.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gap-2 text-base px-8">
                Get in Touch <ArrowRight size={18} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
