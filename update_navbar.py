import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { categories } from "@/data/products";
"""

content = re.sub(
    r'import { Link, useLocation, useNavigate } from "react-router-dom";.*?import { useCart } from "@/contexts/CartContext";',
    imports,
    content,
    flags=re.DOTALL
)

# Desktop nav
desktop_old = """        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
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
          ))}"""

desktop_new = """        {/* Desktop Nav */}
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
          })}"""

content = content.replace(desktop_old, desktop_new)

# Mobile nav
mobile_old = """              {navItems.map((item) => (
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
              ))}"""

mobile_new = """              {navItems.map((item) => {
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
              })}"""

content = content.replace(mobile_old, mobile_new)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)

print("Updated Navbar")
