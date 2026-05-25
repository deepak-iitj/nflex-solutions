import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, Calendar, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCaseStudyBySlug, getOtherCaseStudies } from "@/data/caseStudies";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;
  const others = study ? getOtherCaseStudies(study.slug) : [];

  if (!study) {
    return (
      <Layout>
        <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <h1 className="text-3xl font-display font-bold text-hero-foreground">Case study not found</h1>
            <Link to="/case-studies" className="mt-6 inline-block">
              <Button variant="outline" className="gap-2 border-hero-foreground/20 text-hero-foreground">
                <ArrowLeft size={16} /> Back to Case Studies
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title={study.title} description={study.excerpt} path={`/case-studies/${study.slug}`} type="article" />
      <section className="hero-gradient pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Case Studies", path: "/case-studies" }, { label: study.title }]} className="mb-4" />
          <Link
            to="/case-studies"
            className="animate-fade-up inline-flex items-center gap-2 text-sm text-hero-muted hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft size={14} /> Back to Case Studies
          </Link>
          <div className="flex flex-wrap gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 text-sm text-hero-muted">
              <FolderOpen size={14} />
              {study.industry}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-hero-muted">
              <Calendar size={14} />
              {study.year}
            </span>
          </div>
          <h1 className="animate-fade-up-delay-1 text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-hero-foreground leading-tight tracking-tight">
            {study.title}
          </h1>
          <p className="animate-fade-up-delay-2 mt-4 text-lg text-hero-muted max-w-2xl">
            {study.excerpt}
          </p>
          {study.client && (
            <p className="animate-fade-up-delay-3 mt-2 text-sm text-hero-muted flex items-center gap-2">
              <Building2 size={14} />
              {study.client}
            </p>
          )}
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xl font-display font-bold text-foreground mb-3">Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-display font-bold text-foreground mt-10 mb-3">Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-display font-bold text-foreground mt-10 mb-4">Results</h2>
            <ul className="space-y-2">
              {study.results.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          {study.technologies && study.technologies.length > 0 && (
            <ScrollReveal delay={0.15}>
              <h2 className="text-xl font-display font-bold text-foreground mt-10 mb-3">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {others.length > 0 && (
        <section className="section-padding bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">More case studies</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((s, i) => (
                <ScrollReveal key={s.slug} delay={i * 0.05}>
                  <Link to={`/case-studies/${s.slug}`}>
                    <div className="group p-5 rounded-xl border border-border bg-card card-hover h-full flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.industry} · {s.year}</span>
                      <h3 className="text-base font-display font-semibold text-card-foreground mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{s.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="surface-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-hero-foreground mb-3">
              Start your project
            </h2>
            <p className="text-hero-muted mb-6">
              Tell us your challenge and we'll outline a solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2 px-8">
                  Contact Us <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="gap-2 px-8 border-hero-foreground/20 text-hero-foreground hover:bg-hero-foreground/10">
                  View Products
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDetail;
