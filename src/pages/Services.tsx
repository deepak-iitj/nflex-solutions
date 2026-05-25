import { Link } from "react-router-dom";
import { ArrowRight, Cpu, ScanEye, BrainCircuit, Database, Navigation, MonitorPlay, Bot, Activity, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import SEO from "@/components/SEO";
import heroVideo from "@/assets/hero_video.mp4";
import ctaVideo from "@/assets/autonomous-electric-car-factory-with-robotic-arms-assembling-battery-modules.mp4";
import imgDigitalTwin from "@/assets/verticals/digital_twin_sim.png";
import imgSpm from "@/assets/verticals/spm_machine.png";
import imgAiInspection from "@/assets/verticals/ai_inspection.png";
import imgPredictive from "@/assets/verticals/predictive_maintenance.png";
import imgSynthetic from "@/assets/verticals/synthetic_data.png";
import imgModel from "@/assets/verticals/model_training.png";
import imgMlops from "@/assets/verticals/mlops_dashboard.png";
import imgCloud from "@/assets/verticals/cloud_edge.png";
import imgFleet from "@/assets/verticals/fleet_control.png";


const capabilities = [
  {
    icon: MonitorPlay,
    image: imgDigitalTwin,
    title: "Digital Twin & Process Simulation",
    description: "Full factory and process simulation using advanced digital twins. We leverage Nvidia Omniverse and Isaac Sim to construct high-fidelity virtual environments for testing control logic, optimizing workflows, and de-risking physical deployments."
  },
  {
    icon: Bot,
    image: imgSpm,
    title: "Special Purpose Machines & Software",
    description: "End-to-end design and manufacturing of Special Purpose Machines (SPMs). We combine custom hardware engineering with specialized software solutions and precision sensor integrations to solve unique industrial automation challenges."
  },
  {
    icon: ScanEye,
    image: imgAiInspection,
    title: "AI-Based Quality Inspection",
    description: "High-speed, AI-based inspection systems capable of detecting sub-millimeter defects. We deploy robust multi-sensor fusion architectures to ensure zero-defect tolerance in critical manufacturing and sorting processes."
  },
  {
    icon: Activity,
    image: imgPredictive,
    title: "Predictive Maintenance & Root Cause Analysis",
    description: "Transition from reactive to proactive maintenance. We utilize continuous sensor monitoring and AI analytics to predict equipment failures before they happen and perform automated root cause analysis on production anomalies."
  },
  {
    icon: Database,
    image: imgSynthetic,
    title: "Raw & Synthetic Data Generation",
    description: "AI models require massive amounts of varied data. We manage the entire data lifecycle, from capturing raw sensor telemetry to programmatic synthetic data generation, ensuring your AI models are trained on robust edge-case datasets."
  },
  {
    icon: BrainCircuit,
    image: imgModel,
    title: "Model Training & Algorithm Development",
    description: "Bespoke algorithm development and end-to-end model training services. We build custom machine learning pipelines and deep neural networks tailored to your specific physical environments and operational constraints."
  },
  {
    icon: Cpu,
    image: imgMlops,
    title: "MLOps & AIOps Deployment",
    description: "Seamless deployment of machine learning and artificial intelligence models directly onto the factory floor. We establish robust MLOps and AIOps frameworks to ensure continuous model monitoring, retraining, and high-availability inference."
  },
  {
    icon: Cloud,
    image: imgCloud,
    title: "Cloud Services & Edge Architecture",
    description: "Bridging the gap between edge devices and the cloud. We architect scalable cloud services and secure edge compute clusters, facilitating massive data processing, real-time analytics, and fleet-wide model updates."
  },
  {
    icon: Navigation,
    image: imgFleet,
    title: "Advanced Navigation & Fleet Control",
    description: "Proprietary path-planning architectures for autonomous mobile robots. We implement continuous trajectory generation to ensure autonomous fleets navigate dynamic warehousing environments smoothly and safely."
  }
];

const Services = () => {
  return (
    <Layout>
      <SEO
        title="Services & Capabilities"
        description="NFlex Solutions – bridging cognitive AI with physical industrial automation. Custom robotics, vision analytics, LLM integrations, and intelligent IIoT."
        path="/services"
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
              Core Capabilities
            </span>
            <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-hero-foreground leading-tight tracking-tight">
              Bridging Cognitive AI & <span className="text-gradient">Physical Automation</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg text-hero-muted max-w-xl leading-relaxed">
              We eliminate the friction between software and physical hardware. By bringing mechatronics, advanced vision analytics, and cognitive intelligence under one roof, we deliver bespoke automation solutions that modernize operations.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <SectionHeading
                label="The Industrial Integration Bottleneck"
                title="Our Full-Stack Approach"
                centered={false}
              />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The industrial sector is undergoing a profound transformation. While digital enterprises have rapidly adopted Generative AI and Large Language Models (LLMs), the physical world of manufacturing, logistics, and heavy industry has lagged. 
                </p>
                <p>
                  When software development and hardware engineering operate in silos, failure is inevitable. High-level AI models operate with inherent latency, whereas physical robotic joints require zero-latency, deterministic control to function safely. Bridging this gap requires specialized architecture.
                </p>
                <p>
                  We build on modular, modern frameworks (like ROS2) to ensure scalable deployment. From advanced navigation stacks managing complex fleet traffic to dynamic manipulation frameworks handling variable objects, our software is built for the chaos of the real world.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-secondary/30 border border-border">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">The NFlex Advantage</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Deploying physical AI requires an integrator who understands the entire supply chain of automation. We manage the complexity of hardware procurement, safety certifications, and real-time software deployment so our clients can focus on production.
                </p>
                <ul className="space-y-3">
                  {['In-house mechatronics team', 'Specialized AI architectures', 'Hardware-in-the-loop (HIL) testing', 'Zero-latency deterministic control'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Verticals */}
      <section className="section-padding bg-secondary/50 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Service Verticals"
            title="Comprehensive Industrial Modern Tech"
            description="From simulation to reality, our expertise covers every facet of the intelligent manufacturing lifecycle."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {capabilities.map((cap, i) => (
              <ScrollReveal key={cap.title} delay={i * 0.1}>
                <div className="h-full rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col group shadow-md hover:shadow-primary/5">
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-background/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img src={cap.image} alt={cap.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mb-4 -mt-12 relative z-20 shadow-lg">
                      <cap.icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {cap.description}
                    </p>
                  </div>
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
              Ready to modernize your physical operations?
            </h2>
            <p className="text-hero-muted text-lg max-w-lg mx-auto mb-8">
              Contact our engineering team today to schedule a site evaluation and simulation discovery session.
            </p>
            <Link to="/contact">
              <Button size="lg" className="gap-2 text-base px-8">
                Schedule Discovery Call <ArrowRight size={18} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
