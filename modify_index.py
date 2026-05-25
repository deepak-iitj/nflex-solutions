import re

with open('src/pages/Index.tsx', 'r') as f:
    content = f.read()

# 1. Import products
import_statement = "import { brands, products, getProductDisplayImage } from \"@/data/products\";\n"
content = re.sub(r'import { brands } from "@/data/products";', import_statement, content)

# 2. Add Featured Products Section before CASE STUDIES
featured_products_section = """
      {/* FEATURED KUEBLER PRODUCTS */}
      <section className="section-padding bg-secondary/20 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Featured Products"
            title="Premium KÜBLER Components"
            description="Explore our flagship range of high-precision encoders, slip rings, and measurement devices."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <Link to={`/products/${p.id}`} className="group block h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300">
                  <div className="relative h-48 bg-secondary/30 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <img
                      src={getProductDisplayImage(p)}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 z-20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary text-primary-foreground shadow-sm">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 h-[calc(100%-12rem)]">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">{p.category}</span>
                    <h3 className="text-lg font-display font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                      <span className="text-sm font-semibold text-foreground">
                        {p.price || "Contact for Quote"}
                      </span>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-10">
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                Browse Full Catalog <ArrowRight size={16} />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
"""

content = content.replace("{/* CASE STUDIES */}", featured_products_section + "\n      {/* CASE STUDIES */}")

with open('src/pages/Index.tsx', 'w') as f:
    f.write(content)

print("Updated Index.tsx")
