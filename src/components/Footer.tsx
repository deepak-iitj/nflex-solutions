import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="surface-dark border-t border-hero-foreground/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-3xl font-display font-bold tracking-tight text-hero-foreground"><span className="text-primary">N</span>Flex Solutions</span>
            </Link>
            <p className="text-hero-muted text-sm leading-relaxed">
              Elevating businesses through cutting-edge industrial automation
              and electrical solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-hero-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Services", path: "/services" },
                { label: "Products", path: "/products" },
                { label: "Cart", path: "/cart" },
                { label: "Case Studies", path: "/case-studies" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-hero-muted text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-display font-semibold text-hero-foreground mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-hero-muted">
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Industrial Automation
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Electrical Distribution
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Control Systems
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-primary transition-colors"
                >
                  Energy Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-hero-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-hero-muted">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span>
                  B30/4 Wave Executive Floor, Wave City, Ghaziabad, UP, India,
                  201015
                </span>
              </li>
              <li>
                <a
                  href="tel:+919873100982"
                  className="flex items-center gap-3 text-sm text-hero-muted hover:text-primary transition-colors"
                >
                  <Phone size={16} className="text-primary shrink-0" />
                  +91 9873100982
                </a>
              </li>
              <li>
                <a
                  href="mailto:Info@nflexsolutions.com"
                  className="flex items-center gap-3 text-sm text-hero-muted hover:text-primary transition-colors"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  info@nflexsolutions.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hero-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-hero-muted text-xs">
            © {new Date().getFullYear()} NFlex Solutions. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-xs text-hero-muted">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
