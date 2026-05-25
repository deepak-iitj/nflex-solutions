import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";

const Terms = () => {
  return (
    <Layout>
      <SEO title="Terms of Service" description="NFlex Solutions terms of service. Use of website and services." path="/terms" />
      <section className="hero-gradient pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-hero-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-hero-foreground">
            Terms of Service
          </h1>
          <p className="mt-2 text-hero-muted">
            Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the NFlex Solutions website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">2. Use of Website</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may use our website for lawful purposes only. You must not use it in any way that could damage, disable, or impair the site or interfere with others' use. Content and product information are for general reference; specifications and availability are subject to change.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">3. Quotes and Orders</h2>
            <p className="text-muted-foreground leading-relaxed">
              Quotes provided are indicative and subject to confirmation. Orders are binding only when accepted in writing by NFlex Solutions. Prices and delivery terms are as agreed in the order confirmation.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">4. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content on this website (text, graphics, logos, and layout) is the property of NFlex Solutions or its licensors. You may not reproduce, distribute, or use it for commercial purposes without our prior written consent.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">5. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by law, NFlex Solutions shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or our services. Our liability is limited to the extent permitted under applicable law.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">6. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Gurgaon, Haryana.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <h2 className="text-xl font-display font-bold text-foreground mt-8 mb-2">7. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, contact NFlex Solutions at Midtown, T5 504, Sector 59, Gurgaon, Haryana, India 122001. Email:{" "}
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

export default Terms;
