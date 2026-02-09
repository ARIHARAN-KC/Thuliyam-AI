import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string;
  pageType?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  image,
  keywords,
  pageType = "website",
}) => {
  const siteName = "Thuliyam AI";
  const siteUrl = url || "https://thuliyam-ai.vercel.app";
  const previewImage = image || "https://thuliyam-ai.vercel.app/logo.png";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Site Name Signals (VERY IMPORTANT) */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Canonical */}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />
      <meta name="language" content="English" />

      {/* Structured Data (Google Site Name Fix) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            alternateName: "Thuliyam AI Deepfake Detection",
            url: siteUrl,
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
