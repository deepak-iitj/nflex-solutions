import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import contactVideo from "@/assets/automated-car-factory-with-robotic-arms-assembling-battery-modules.mp4";

const CONTACT_FORM_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!CONTACT_FORM_ACCESS_KEY) {
      toast({
        title: "Form not configured",
        description:
          "Please add VITE_WEB3FORMS_ACCESS_KEY to receive enquiries at Info@nflexsolutions.com",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: CONTACT_FORM_ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: form.subject || "Enquiry from NFlex Solutions website",
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({
          title: "Message sent!",
          description:
            "We'll get back to you at " + form.email + " within 24 hours.",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Could not send",
          description:
            data.message ||
            "Please try again or email us at info@nflexsolutions.com",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "Please try again or email us at info@nflexsolutions.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEO title="Contact" description="Get in touch with NFlex Solutions. Gurgaon, India. Email, phone, and contact form for quotes and enquiries." path="/contact" />
      {/* Hero */}
      <section className="relative hero-gradient pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover blur-[6px] scale-[1.05] opacity-40">
            <source src={contactVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="animate-fade-up text-primary font-medium text-sm tracking-widest uppercase mb-4 block">
              Contact
            </span>
            <h1 className="animate-fade-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-hero-foreground leading-tight tracking-tight">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg text-hero-muted max-w-xl leading-relaxed">
              Have a project in mind? Need a quote? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <ScrollReveal className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Get in Touch
                  </h2>
                  <div className="space-y-5">
                    <a
                      href="mailto:Info@nflexsolutions.com"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Mail size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          info@nflexsolutions.com
                        </p>
                      </div>
                    </a>
                    <a
                      href="tel:+918756170309"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          +91 87561 70309
                        </p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-foreground">
                          Midtown, T5 504, Sector 59, Gurgaon, 122001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="font-medium text-foreground">
                          Mon – Sat: 8AM – 6PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-foreground font-medium">
                    ⚡ We'll get back to you within 24 hours
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Our team reviews every inquiry and will reach out with the
                    best solution for your needs.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Form */}
            <ScrollReveal delay={0.1} className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl border border-border bg-card"
              >
                <h3 className="text-xl font-display font-semibold text-card-foreground mb-6">
                  Send us a Message
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Name
                    </label>
                    <Input
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Subject
                  </label>
                  <Input
                    placeholder="e.g. Quote for automation system"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your project or inquiry..."
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto gap-2 px-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
