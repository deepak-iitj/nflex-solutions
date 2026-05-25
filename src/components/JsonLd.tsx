import { Helmet } from "react-helmet-async";
import { Product, getProductDisplayImage } from "@/data/products";

const SITE_URL = "https://nflexsolutions.com";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NFlex Solutions",
    url: SITE_URL,
    logo: `${SITE_URL}/elco.jpeg`,
    description: "Industrial Automation & Electrical Solutions – Gurgaon, India",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B30/4 Wave Executive Floor, Wave City",
      addressLocality: "Ghaziabad",
      addressRegion: "UP",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@nflexsolutions.com",
      telephone: "+91-8756170309",
      contactType: "customer service",
      areaServed: "IN",
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NFlex Solutions",
    url: SITE_URL,
    description: "Industrial Automation & Electrical Solutions – Gurgaon, India",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/products?search={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}


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
