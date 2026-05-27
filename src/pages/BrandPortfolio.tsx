import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { brandLogoUrls } from "@/data/brandLogos";

// Enriched Partner Data
const partners = [
  {
    id: "KUEBLER",
    name: "Kübler Group",
    description: "Our principal partner. A global leader in position and motion sensors, slip rings, and functional safety technology.",
    expertise: ["Encoders", "Slip Rings", "Safety Modules"],
    logoFallback: "K",
    color: "from-blue-500/10 to-transparent",
    borderColor: "group-hover:border-blue-500/40",
    isPrincipal: true,
  },
  {
    id: "Siemens",
    name: "Siemens",
    description: "Pioneering the digital enterprise with advanced PLCs, drives, and totally integrated automation solutions.",
    expertise: ["SIMATIC PLCs", "SINAMICS Drives", "TIA Portal"],
    logoFallback: "S",
    color: "from-teal-500/10 to-transparent",
    borderColor: "group-hover:border-teal-500/40",
  },
  {
    id: "Rockwell",
    name: "Rockwell Automation",
    description: "Connecting the imaginations of people with the potential of technology to expand what is humanly possible.",
    expertise: ["Allen-Bradley", "CompactLogix", "PowerFlex"],
    logoFallback: "R",
    color: "from-red-600/10 to-transparent",
    borderColor: "group-hover:border-red-600/40",
  },
  {
    id: "Schneider",
    name: "Schneider Electric",
    description: "Driving digital transformation of energy management and automation in homes, buildings, data centers, and industries.",
    expertise: ["Modicon PLCs", "Altivar Drives", "TeSys"],
    logoFallback: "S",
    color: "from-green-600/10 to-transparent",
    borderColor: "group-hover:border-green-600/40",
  },
  {
    id: "Mitsubishi",
    name: "Mitsubishi Electric",
    description: "Delivering advanced factory automation equipment for reliable, high-speed, and precision manufacturing.",
    expertise: ["MELSEC PLCs", "GOT HMIs", "Inverters"],
    logoFallback: "M",
    color: "from-red-500/10 to-transparent",
    borderColor: "group-hover:border-red-500/40",
  },
  {
    id: "Honeywell",
    name: "Honeywell",
    description: "Innovating process control and safety systems to optimize plant performance and enterprise operations.",
    expertise: ["Experion PKS", "Transmitters", "ControlEdge"],
    logoFallback: "H",
    color: "from-amber-500/10 to-transparent",
    borderColor: "group-hover:border-amber-500/40",
  },
  {
    id: "SICK",
    name: "SICK",
    description: "Leading sensor intelligence. Providing solutions for factory, logistics, and process automation.",
    expertise: ["Safety Scanners", "Photoelectric", "LIDAR"],
    logoFallback: "S",
    color: "from-blue-600/10 to-transparent",
    borderColor: "group-hover:border-blue-600/40",
  },
  {
    id: "EUCHNER",
    name: "EUCHNER",
    description: "Ensuring industrial safety engineering with high-quality interlocking and access management systems.",
    expertise: ["MGB Gate Boxes", "RFID Keys", "Safety Switches"],
    logoFallback: "E",
    color: "from-green-500/10 to-transparent",
    borderColor: "group-hover:border-green-500/40",
  }
];

const BrandPortfolio = () => {
  return (
    <Layout>
      <SEO title="Technology Partners" description="Explore our network of global OEM partners." path="/brands" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-secondary/30">
        <div className="absolute inset-0 products-hero-pattern opacity-[0.03]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground tracking-tight mb-6">
              Our Technology <span className="text-primary">Partners</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We collaborate with the world's leading industrial OEMs to bring you cutting-edge automation, motion control, and functional safety solutions.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="bg-secondary/10 py-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, idx) => (
              <ScrollReveal key={partner.id} delay={idx * 0.1} className={`group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${partner.borderColor}`}>
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                <div className="relative p-8 h-full flex flex-col">
                  {/* Header: Logo / Name */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-12 flex items-center justify-start">
                      {brandLogoUrls[partner.id] ? (
                        <img 
                          src={brandLogoUrls[partner.id]} 
                          alt={partner.name} 
                          className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                        />
                      ) : (
                        <span className="text-2xl font-display font-bold text-foreground">{partner.logoFallback}</span>
                      )}
                    </div>
                    {partner.isPrincipal && (
                      <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                        Principal Partner
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-display font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {partner.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {partner.expertise.map(tag => (
                      <span key={tag} className="text-xs font-medium text-foreground bg-secondary px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <Link 
                    to={`/products?brand=${encodeURIComponent(partner.id)}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    View Products
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-display font-bold mb-6 text-foreground">Need a Custom Integrated Solution?</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Our engineering team seamlessly integrates hardware from all our partners into unified, high-performance control systems tailored to your facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105">
                Contact Engineering
              </Link>
              <Link to="/products" className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-border bg-background text-foreground font-semibold hover:bg-secondary transition-all">
                Browse Full Catalog
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </Layout>
  );
};

export default BrandPortfolio;
