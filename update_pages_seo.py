import re

# UPDATE ProductDetail.tsx
with open('src/pages/ProductDetail.tsx', 'r') as f:
    pd_content = f.read()

# Add imports
if 'import { ProductJsonLd, BreadcrumbListJsonLd }' not in pd_content:
    pd_content = pd_content.replace('import SEO from "@/components/SEO";', 'import SEO from "@/components/SEO";\nimport { ProductJsonLd, BreadcrumbListJsonLd } from "@/components/JsonLd";')

# Inject components
pd_injection = """
      <SEO title={product.title} description={product.description} path={`/products/${product.id}`} type="product" />
      <ProductJsonLd product={product} />
      <BreadcrumbListJsonLd items={[{ name: "Home", url: "/" }, { name: "Products", url: "/products" }, { name: product.title, url: `/products/${product.id}` }]} />
"""
pd_content = pd_content.replace('<SEO title={product.title} description={product.description} path={`/products/${product.id}`} type="product" />', pd_injection)

with open('src/pages/ProductDetail.tsx', 'w') as f:
    f.write(pd_content)

# UPDATE Products.tsx
with open('src/pages/Products.tsx', 'r') as f:
    p_content = f.read()

if 'import { ItemListJsonLd }' not in p_content:
    p_content = p_content.replace('import SEO from "@/components/SEO";', 'import SEO from "@/components/SEO";\nimport { ItemListJsonLd } from "@/components/JsonLd";')

p_injection = """
      <SEO
        title="Industrial Automation Sensors & Products Catalog"
        description="Browse our comprehensive catalog of industrial automation sensors, IO modules, safety products, and connectivity solutions from top brands like ELCO, SICK, and EUCHNER."
        path="/products"
      />
      <ItemListJsonLd products={filtered} listName={`${activeBrand !== "All" ? activeBrand : "Industrial"} ${activeCategory !== "All" ? activeCategory : "Products"}`} />
"""
# Find the existing SEO component in Products.tsx and replace it.
# It might be spread across multiple lines. Let's use regex.
p_content = re.sub(r'<SEO\s+title="[^"]+"\s+description="[^"]+"\s+path="/products"\s+/>', p_injection.strip(), p_content, flags=re.DOTALL)

with open('src/pages/Products.tsx', 'w') as f:
    f.write(p_content)

print("Updated ProductDetail.tsx and Products.tsx")
