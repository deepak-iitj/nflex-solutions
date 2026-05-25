import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, Filter, ShoppingCart, Sparkles, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import ScrollReveal from "@/components/ScrollReveal";
import SEO from "@/components/SEO";
import { ItemListJsonLd } from "@/components/JsonLd";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { brands, categories, getProductDisplayImage, type Product } from "@/data/products";

function ProductImage({ src, alt, brandFallback }: { src: string | undefined; alt: string; brandFallback: string }) {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
        <span className="text-4xl font-display font-bold text-muted-foreground/50">{brandFallback.charAt(0)}</span>
      </div>
    );
  }
  const isSick = brandFallback === "SICK";
  return (
    <img
      src={src}
      alt={alt}
      className={`brand-logo absolute inset-0 w-full h-full p-5 object-contain transition-transform duration-500 group-hover:scale-110 ${isSick ? "brand-logo--sick" : ""}`}
      onError={() => setError(true)}
    />
  );
}

type ViewMode = "grid" | "bento";

function ProductCard({ product, index, viewMode }: { product: Product; index: number; viewMode: ViewMode }) {
  const displayImage = getProductDisplayImage(product);
  const specEntries = Object.entries(product.specs).filter(([k]) => k.toLowerCase() !== "category");
  const firstSpec = specEntries[0];
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast({ title: "Added to cart", description: product.title });
  };

  const baseClasses =
    "group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col h-full";

  return (
    <Link to={`/products/${product.id}`} className={baseClasses}>
      <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/80 to-muted overflow-hidden">
        <ProductImage src={displayImage} alt={product.title} brandFallback={product.brand} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary text-primary-foreground shadow-lg">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 left-3 right-3 text-[10px] font-semibold uppercase tracking-wider text-white/90 drop-shadow-md">
          {product.brand}
        </span>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1 min-w-0">
        <span className="text-[11px] text-primary font-semibold uppercase tracking-wider mb-1">{product.category}</span>
        <h3 className="text-base md:text-lg font-display font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">{product.description}</p>

        {firstSpec && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-0.5">{firstSpec[0]}</p>
            <p className="text-xs font-semibold text-foreground truncate">{firstSpec[1]}</p>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
          <span className="text-sm font-semibold text-foreground">
            {product.price || "Contact for price"}
          </span>
          <div className="flex items-center gap-2">
            <Link to={`/products/${product.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
              Details <ArrowRight size={12} />
            </Link>
            <Button variant="outline" size="sm" className="gap-1.5 shrink-0" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(e); }}>
              <ShoppingCart size={14} /> Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

const Products = () => {
  const [searchParams] = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const catParam = searchParams.get("category") ?? "All";
  const { products } = useProducts();
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string>(catParam);
  const [search, setSearch] = useState(qParam);
  const [viewMode, setViewMode] = useState<ViewMode>("bento");

  useEffect(() => {
    setSearch(qParam);
  }, [qParam]);

  useEffect(() => {
    setActiveCategory(catParam);
  }, [catParam]);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchBrand = activeBrand === "All" || p.brand === activeBrand;
        const matchCategory = activeCategory === "All" || p.category === activeCategory;
        if (!matchBrand || !matchCategory) return false;
        if (search === "") return true;
        const term = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(term) ||
          p.brand.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
        );
      }),
    [products, activeBrand, activeCategory, search]
  );

  const categoryList = categories.filter((c) => c !== "All");
  const brandList = brands;

  return (
    <Layout>
      <SEO
        title="Industrial Automation Sensors & Products Catalog"
        description="Browse our comprehensive catalog of industrial automation sensors, IO modules, safety products, and connectivity solutions from top brands like ELCO, SICK, and EUCHNER."
        path="/products"
      />
      <ItemListJsonLd products={filtered} listName={`${activeBrand !== "All" ? activeBrand : "Industrial"} ${activeCategory !== "All" ? activeCategory : "Products"}`} />

      {/* Hero with search */}
      <section className="products-hero relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div className="absolute inset-0 products-hero-pattern opacity-[0.04]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm tracking-widest uppercase mb-4">
            <Sparkles size={14} /> Product catalog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-hero-foreground leading-tight tracking-tight">
            Find the right <span className="text-gradient">equipment</span>
          </h1>
          <p className="mt-4 text-lg text-hero-muted max-w-2xl mx-auto">
            {products.length}+ products from trusted brands. Search or filter by brand and category.
          </p>
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products or brands..."
                className="pl-11 pr-4 py-6 rounded-xl bg-background/90 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-muted focus-visible:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Filter size={16} className="text-muted-foreground hidden sm:block" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:inline">Filter</span>
            </div>
            <div className="flex-1 overflow-x-auto scrollbar-hide -mx-2">
              <div className="flex gap-2 pb-1 min-w-max px-2">
                <button
                  onClick={() => setActiveBrand("All")}
                  className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeBrand === "All"
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  All brands
                </button>
                {brandList.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setActiveBrand(brand)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      activeBrand === brand
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                <strong className="text-foreground">{filtered.length}</strong> products
              </span>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  title="Grid view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("bento")}
                  className={`p-2 ${viewMode === "bento" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  title="Bento view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>
          {/* Category row (mobile / more) */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/60">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-full mb-1">Category</span>
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === "All" ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted/80 text-muted-foreground hover:bg-muted"
              }`}
            >
              All
            </button>
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? "All" : cat)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat ? "bg-primary/15 text-primary border border-primary/30" : "bg-muted/80 text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <section className="products-grid-section bg-muted/30 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {filtered.length > 0 ? (
            <div
              className={
                viewMode === "bento"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
              }
            >
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} delay={Math.min(i * 0.02, 0.25)}>
                  <ProductCard product={product} index={i} viewMode={viewMode} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="text-center py-20 px-6 rounded-3xl border-2 border-dashed border-border bg-card/50">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search size={28} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">No products match your filters</h3>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Try a different search term, or clear brand and category filters to see everything.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setActiveBrand("All");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-hero-foreground mb-2">Need something custom?</h2>
              <p className="text-hero-muted">We source specialty equipment and design solutions tailored to your project.</p>
            </div>
            <Link to="/contact" className="shrink-0">
              <Button size="lg" className="gap-2 w-full md:w-auto">
                Talk to our experts <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
