import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, Filter, ShoppingCart, Grid3X3, List, LayoutGrid, X } from "lucide-react";
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
  return (
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 w-full h-full object-contain bg-white p-4 mix-blend-multiply transition-transform duration-700 group-hover:scale-110`}
      onError={() => setError(true)}
    />
  );
}

type ViewMode = "grid" | "list";

function ProductCard({ product }: { product: Product }) {
  const displayImage = getProductDisplayImage(product);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast({ title: "Added to cart", description: product.title });
  };

  return (
    <Link to={`/products/${product.id}`} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-secondary/30 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
        <ProductImage src={displayImage} alt={product.title} brandFallback={product.brand} />
        {product.badge && (
          <span className="absolute top-3 left-3 z-20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary text-primary-foreground shadow-sm">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">{product.category}</span>
        <h3 className="text-lg font-display font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-border/50">
          <span className="text-sm font-semibold text-foreground">
            {product.price || "Contact for Quote"}
          </span>
          <Button variant="secondary" size="sm" className="gap-2 shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={handleAddToCart}>
            <ShoppingCart size={14} /> Add
          </Button>
        </div>
      </div>
    </Link>
  );
}

function ProductListCard({ product }: { product: Product }) {
  const displayImage = getProductDisplayImage(product);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast({ title: "Added to cart", description: product.title });
  };

  const specEntries = Object.entries(product.specs).slice(0, 3);

  return (
    <Link to={`/products/${product.id}`} className="group flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300">
      <div className="relative w-full sm:w-48 h-40 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-secondary/30">
        <ProductImage src={displayImage} alt={product.title} brandFallback={product.brand} />
        {product.badge && (
          <span className="absolute top-2 left-2 z-20 text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-primary text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0 py-1">
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
            <h3 className="text-xl font-display font-semibold text-card-foreground group-hover:text-primary transition-colors mt-1">
              {product.title}
            </h3>
          </div>
          <span className="text-sm font-semibold whitespace-nowrap bg-secondary px-3 py-1 rounded-full text-secondary-foreground">
            {product.price || "Contact for Quote"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 max-w-2xl">{product.description}</p>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4">
          {specEntries.map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-medium">{k}:</span>
              <span className="text-foreground font-semibold truncate max-w-[120px]">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-end">
          <Button variant="default" size="sm" className="gap-2" onClick={handleAddToCart}>
            <ShoppingCart size={14} /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q") ?? "";
  const catParam = searchParams.get("category") ?? "All";
  const brandParam = searchParams.get("brand") ?? "All";
  const { products } = useProducts();
  const [activeBrand, setActiveBrand] = useState<string>(brandParam);
  const [activeCategory, setActiveCategory] = useState<string>(catParam);
  const [search, setSearch] = useState(qParam);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => setSearch(qParam), [qParam]);
  useEffect(() => setActiveCategory(catParam), [catParam]);
  useEffect(() => setActiveBrand(brandParam), [brandParam]);

  const updateQueryParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "All" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

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
      <SEO title="Industrial Catalog" description="Browse our Kuebler automation catalog." path="/products" />
      <ItemListJsonLd products={filtered} listName="Industrial Catalog" />

      {/* Slim Header */}
      <section className="relative pt-28 pb-10 overflow-hidden bg-hero-bg">
        <div className="absolute inset-0 products-hero-pattern opacity-[0.03]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-hero-foreground tracking-tight">
            Product <span className="text-primary">Catalog</span>
          </h1>
          <p className="mt-2 text-hero-muted text-sm md:text-base max-w-xl">
            Explore high-precision automation equipment, engineered for the most demanding industrial environments.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <section className="bg-secondary/20 min-h-[70vh]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-card p-4 rounded-xl border border-border">
            <span className="font-semibold">{filtered.length} Results</span>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsMobileFiltersOpen(true)}>
              <Filter size={16} /> Filters
            </Button>
          </div>

          {/* Sidebar */}
          <aside className={`fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:static lg:bg-transparent lg:backdrop-blur-none lg:w-64 xl:w-72 lg:shrink-0 transition-opacity ${isMobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}`}>
            <div className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-card p-6 shadow-2xl border-l border-border transform transition-transform lg:static lg:w-full lg:max-w-none lg:bg-transparent lg:p-0 lg:shadow-none lg:border-none lg:transform-none ${isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
              
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 -mr-2 text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">Search</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search catalog..."
                    className="pl-9 py-5 bg-card border-border shadow-sm focus-visible:ring-primary rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">Categories</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => updateQueryParams("category", "All")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === "All" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    All Categories
                  </button>
                  {categoryList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => updateQueryParams("category", cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === cat ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">Brands</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => updateQueryParams("brand", "All")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeBrand === "All" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    All Brands
                  </button>
                  {brandList.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => updateQueryParams("brand", brand)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeBrand === brand ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="hidden lg:flex items-center justify-between mb-6 bg-card p-3 px-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Showing <strong className="text-foreground">{filtered.length}</strong> results
                {activeCategory !== "All" && (
                  <>
                    <ArrowRight size={14} className="mx-1 opacity-50" />
                    <span className="text-primary font-medium">{activeCategory}</span>
                  </>
                )}
              </div>
              <div className="flex bg-muted/50 rounded-lg p-1 border border-border/50">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  title="Grid View"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                  title="List View"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Grid/List */}
            {filtered.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((product, i) => (
                  <ScrollReveal key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                    {viewMode === "grid" ? (
                      <ProductCard product={product} />
                    ) : (
                      <ProductListCard product={product} />
                    )}
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal>
                <div className="text-center py-24 px-6 rounded-3xl border-2 border-dashed border-border bg-card/30">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <Search size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-3">No matching products</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm leading-relaxed">
                    We couldn't find anything matching your current filters. Try adjusting your search or resetting categories.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch("");
                      setActiveBrand("All");
                      setActiveCategory("All");
                    }}
                    className="gap-2"
                  >
                    <Filter size={16} /> Clear all filters
                  </Button>
                </div>
              </ScrollReveal>
            )}
          </main>
        </div>
      </section>

    </Layout>
  );
};

export default Products;
