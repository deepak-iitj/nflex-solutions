import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Privacy = () => {
  return (
    <Layout>
      <SEO title="Privacy Policy" description="NFlex Solutions privacy policy. How we collect, use, and protect your information." path="/privacy" />
      <section className="hero-gradient pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-hero-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-hero-foreground">
            Privacy Policy
          </h1>
          <p className="mt-2 text-hero-muted">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
          <ScrollReveal>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              NFlex Solutions ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may collect information you provide directly (e.g. name, email, phone, company, and message content when you contact us or request a quote), and information collected automatically (e.g. IP address, browser type, and usage data) when you browse our site.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your information to respond to enquiries, send quotes, improve our website and services, send relevant updates (with your consent), and comply with legal obligations.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">4. Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell your personal data. We may share information with service providers who assist our operations (e.g. hosting, email) under strict confidentiality, or when required by law.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">5. Data Security and Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organisational measures to protect your data. We retain your information only as long as necessary for the purposes stated in this policy or as required by law.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may request access, correction, or deletion of your personal data, or withdraw consent where applicable. Contact us at{" "}
              <a href="mailto:Info@nflexsolutions.com" className="text-primary hover:underline">
                Info@nflexsolutions.com
              </a>{" "}
              for any privacy-related requests.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              NFlex Solutions, B30/4 Wave Executive Floor, Wave City, Ghaziabad, UP, India. Email:{" "}
              <a href="mailto:Info@nflexsolutions.com" className="text-primary hover:underline">
                Info@nflexsolutions.com
              </a>
              , Phone:{" "}
              <a href="tel:+918756170309" className="text-primary hover:underline">
                +91 87561 70309
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
