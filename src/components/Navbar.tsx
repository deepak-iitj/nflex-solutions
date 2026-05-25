import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { categories } from "@/data/products";


const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Products", path: "/products" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleProductSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
    else navigate("/products");
    setSearchQuery("");
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-hero/80 backdrop-blur-xl border-b border-hero-foreground/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-display font-bold tracking-tight text-hero-foreground"><span className="text-primary">N</span>Flex Solutions</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.label === "Products") {
              return (
                <DropdownMenu key={item.path}>
                  <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 outline-none ${
                    location.pathname.startsWith(item.path)
                      ? "text-primary"
                      : "text-hero-muted hover:text-hero-foreground"
                  }`}>
                    {item.label} <ChevronDown size={14} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 max-h-[70vh] overflow-y-auto" align="start">
                    <DropdownMenuItem asChild>
                      <Link to="/products" className="cursor-pointer w-full">All Products</Link>
                    </DropdownMenuItem>
                    {categories.filter(c => c !== "All").map(category => (
                      <DropdownMenuItem key={category} asChild>
                        <Link to={`/products?category=${encodeURIComponent(category)}`} className="cursor-pointer w-full">
                          {category}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
                    ? "text-primary"
                    : "text-hero-muted hover:text-hero-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <form onSubmit={handleProductSearch} className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-hero-muted pointer-events-none" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`w-40 transition-all duration-200 bg-hero-foreground/5 border-hero-foreground/20 text-hero-foreground placeholder:text-hero-muted h-9 pl-9 pr-3 ${
                searchFocused || searchQuery ? "w-52" : ""
              }`}
              aria-label="Search products"
            />
          </form>
          <Link to="/cart" className="relative p-2 text-hero-foreground hover:text-primary transition-colors" aria-label="Cart">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          <Link to="/contact">
            <Button size="sm" className="font-medium">
              Get a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-hero-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-hero/95 backdrop-blur-xl border-b border-hero-foreground/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <form onSubmit={handleProductSearch} className="flex gap-2">
                <Search size={20} className="text-hero-muted shrink-0 mt-2.5" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-hero-foreground/10 border-hero-foreground/20 text-hero-foreground placeholder:text-hero-muted"
                  aria-label="Search products"
                />
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>
              {navItems.map((item) => {
                if (item.label === "Products") {
                  return (
                    <div key={item.path} className="flex flex-col gap-2">
                      <Link
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`text-lg font-medium py-2 transition-colors ${
                          location.pathname.startsWith(item.path)
                            ? "text-primary"
                            : "text-hero-muted hover:text-hero-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                      <div className="pl-4 flex flex-col gap-2 border-l border-hero-foreground/10 ml-2">
                        {categories.filter(c => c !== "All").map(category => (
                          <Link
                            key={category}
                            to={`/products?category=${encodeURIComponent(category)}`}
                            onClick={() => setMobileOpen(false)}
                            className="text-base text-hero-muted hover:text-hero-foreground transition-colors"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-medium py-2 transition-colors ${
                      location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
                        ? "text-primary"
                        : "text-hero-muted hover:text-hero-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-hero-muted hover:text-primary">
                <ShoppingCart size={20} /> Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button className="w-full mt-2">Get a Quote</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
