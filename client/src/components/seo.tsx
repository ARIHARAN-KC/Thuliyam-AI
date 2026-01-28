import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string; // Added this line
  pageType?: string; // Added this line
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  url, 
  image,
  keywords,
  pageType = "website"
}) => {
  const siteUrl = url || "https://thuliyam-ai.vercel.app";
  const previewImage = image || "https://thuliyam-ai.vercel.app/logo.png";
  const siteName = "Thuliyam AI";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Thuliyam AI" />
    </Head>
  );
};

export default SEO;