import re

with open('src/components/JsonLd.tsx', 'r') as f:
    content = f.read()

# Add new imports if needed. We need Product type from products.ts
if 'import { Product } from "@/data/products";' not in content:
    content = content.replace('import { Helmet } from "react-helmet-async";', 'import { Helmet } from "react-helmet-async";\nimport { Product, getProductDisplayImage } from "@/data/products";')

new_schemas = """
export function ProductJsonLd({ product }: { product: Product }) {
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": [
      getProductDisplayImage(product) ? `${SITE_URL}${getProductDisplayImage(product)}` : `${SITE_URL}/placeholder.svg`
    ],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/products/${product.id}`,
      "priceCurrency": "INR",
      "price": "0",
      "priceValidUntil": "2030-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "NFlex Solutions"
      }
    }
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function ItemListJsonLd({ products, listName }: { products: Product[], listName: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": listName,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${SITE_URL}/products/${product.id}`
    }))
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function BreadcrumbListJsonLd({ items }: { items: { name: string, url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
"""

with open('src/components/JsonLd.tsx', 'w') as f:
    f.write(content + "\n" + new_schemas)

print("Updated JsonLd.tsx")
