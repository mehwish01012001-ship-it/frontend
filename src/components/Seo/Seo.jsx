



import React from 'react';
import { Helmet } from 'react-helmet-async';

const Seo = ({ 
  title = 'RQ Fashion', 
  description = '', 
  keywords = '', 
  image = '', 
  ogImage = '',
  url = '', 
  canonicalUrl = '',
  ogType = 'website',
  ogTitle = '',
  ogDescription = '',
  twitterCard = 'summary_large_image',
  schemaMarkup = null,
  robots = 'index, follow',
  imageAlt = "RQ Fashion - Premium Women's Stitched Clothing & Luxury Pret"
}) => {
  // Base configuration environment variables
  const siteUrl = import.meta.env.VITE_APP_SITE_URL || 'https://frontend-one-wheat-45.vercel.app';

  // 1. Title Resolution (consistent branding fallback)
  const fullTitle = title.includes('RQ') ? title : `${title} | RQ Fashion`;

  // 2. Description Fallback
  const fullDescription = description || 'Premium fashion collection with latest trends and exclusive designs.';

  // 3. Canonical URL Resolution (checks absolute canonicalUrl first, then builds relative url)
  const finalCanonical = canonicalUrl || (url ? `${siteUrl}${url}` : siteUrl);

  // 4. Social Share Image Resolution (Facebook & Twitter require absolute image URLs)
  const chosenImage = ogImage || image || '/og-image.jpg';
  const absoluteImage = chosenImage.startsWith('http') ? chosenImage : `${siteUrl}${chosenImage}`;
  
  // Ensure we have a secure HTTPS URL format for the og:image:secure_url tag
  const secureImage = absoluteImage.replace(/^http:/i, 'https:');

  // 5. Open Graph Overrides
  const finalOgTitle = ogTitle || fullTitle;
  const finalOgDescription = ogDescription || fullDescription;

  // 6. Dynamic Meta Mime-Type Extraction for OG Image Type
  const getImageType = (imgUrl) => {
    if (imgUrl.endsWith('.png')) return 'image/png';
    if (imgUrl.endsWith('.webp')) return 'image/webp';
    return 'image/jpeg'; // Standard fallback
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Search Engine Crawler Control */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="bingbot" content={robots} />
      
      {/* Editorial & Security Metadata */}
      <meta name="author" content="RQ Fashion" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={secureImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content={getImageType(absoluteImage)} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_PK" />
      <meta property="og:site_name" content="RQ Fashion" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      
      {/* Canonical Link */}
      <link rel="canonical" href={finalCanonical} />

      {/* JSON-LD Structured Data Dynamic Injection */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;