import { Helmet } from "react-helmet-async";

const SITE_URL = "https://nflexsolutions.com";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article" | "product";
  image?: string;
}

export default function SEO({ title, description, path = "", type = "website", image }: SEOProps) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const fullTitle = title.includes("NFlex Solutions") ? title : `${title} | NFlex Solutions`;
  const ogImage = image || `${SITE_URL}/placeholder.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="NFlex Solutions" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
