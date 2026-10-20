import { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';
import { ToolConfig, CategoryMeta } from '../../types';
import { getToolRatingData, ToolRatingData } from './toolReviews';

export interface SEOMetaManagerProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string[];
  tool?: ToolConfig;
  category?: CategoryMeta;
  categoryTools?: ToolConfig[];
  isHome?: boolean;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

export function SEOMetaManager({
  title,
  description,
  canonicalPath,
  keywords,
  tool,
  category,
  categoryTools,
  isHome,
  noindex = false,
  ogType = 'website',
  ogImage
}: SEOMetaManagerProps) {
  // 1. Resolve Title
  const resolvedTitle =
    title ||
    (tool
      ? `${tool.h1} - Free 2026 Online Calculator | ${siteConfig.siteName}`
      : category
      ? `${category.name} Calculators & Tools (2026 Directory) | ${siteConfig.siteName}`
      : isHome
      ? `${siteConfig.siteName} - Free Authoritative Online Calculators & Converters`
      : `${siteConfig.siteName} - Audited Online Tools`);

  // 2. Resolve Description
  const resolvedDescription =
    description ||
    (tool
      ? tool.metaDescription
      : category
      ? category.shortDesc
      : siteConfig.tagline);

  // 3. Resolve Canonical URL
  const cleanPath =
    canonicalPath ||
    (tool
      ? `/${tool.categoryId}/${tool.slug}/`
      : category
      ? `/${category.slug}/`
      : isHome
      ? '/'
      : typeof window !== 'undefined'
      ? window.location.pathname
      : '/');

  const baseDomain =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : siteConfig.domain;

  const fullCanonicalUrl = `${siteConfig.domain}${
    cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  }`;

  // 4. Resolve Image
  const resolvedImage =
    ogImage ||
    `${siteConfig.domain}/og-preview.png`;

  // 5. Resolve Keywords
  const resolvedKeywords =
    keywords ||
    (tool
      ? [tool.primaryKeyword, ...tool.supportingKeywords]
      : category
      ? [category.name.toLowerCase(), `${category.name.toLowerCase()} calculator`, 'free online tools', 'calculation formulas']
      : ['online calculators', 'financial calculator', 'math calculator', 'tax calculator', 'free converters']);

  useEffect(() => {
    // A. Update Document Title
    document.title = resolvedTitle;

    // Helper function to safely update or append meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // B. Standard Meta Tags
    setMetaTag('name', 'description', resolvedDescription);
    setMetaTag('name', 'keywords', resolvedKeywords.join(', '));
    setMetaTag('name', 'author', siteConfig.siteName);
    setMetaTag('name', 'google-site-verification', '74MV4eRv1APjCCHDF9HywdPGIqy77X0z7tRdtZgA9eA');
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');

    // C. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullCanonicalUrl);

    // D. OpenGraph Meta Tags
    setMetaTag('property', 'og:title', resolvedTitle);
    setMetaTag('property', 'og:description', resolvedDescription);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:site_name', siteConfig.siteName);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', resolvedImage);
    setMetaTag('property', 'og:locale', 'en_US');

    // E. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', resolvedTitle);
    setMetaTag('name', 'twitter:description', resolvedDescription);
    setMetaTag('name', 'twitter:image', resolvedImage);
    setMetaTag('name', 'twitter:site', `@${siteConfig.siteName.toLowerCase()}`);

    // F. Structured Data JSON-LD Generation
    const existingJsonLd = document.getElementById('laptools-dynamic-jsonld');
    if (existingJsonLd) existingJsonLd.remove();

    const schemas: object[] = [];

    // Global Organization Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: siteConfig.domain,
      logo: `${siteConfig.domain}/logo.svg`,
      email: siteConfig.contactEmail,
      founder: {
        '@type': 'Organization',
        name: siteConfig.ownerName
      },
      sameAs: [
        'https://twitter.com/laptools',
        'https://github.com/laptools'
      ]
    });

    // 1. Homepage Schema (WebSite with Sitelinks SearchAction)
    if (isHome) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.siteName,
        url: siteConfig.domain,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.domain}/?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      });
    }

    // 2. Category Hub Schema (CollectionPage + ItemList)
    if (category) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category.name} Calculators & Formula Tools`,
        description: category.intro,
        url: fullCanonicalUrl,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: (categoryTools || []).map((t, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: t.h1,
            url: `${siteConfig.domain}/${t.categoryId}/${t.slug}/`
          }))
        }
      });

      // Category Breadcrumb
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.domain
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: category.name,
            item: fullCanonicalUrl
          }
        ]
      });
    }

    // 3. Calculator Tool Schema (SoftwareApplication with Rich Review & Rating Snippets)
    if (tool) {
      const ratingData: ToolRatingData = getToolRatingData(tool.slug, tool.categoryId, tool.h1);

      // BreadcrumbList for SERP rich hierarchy
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.domain
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: tool.categoryId.replace(/-/g, ' ').toUpperCase(),
            item: `${siteConfig.domain}/${tool.categoryId}/`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: tool.h1,
            item: fullCanonicalUrl
          }
        ]
      });

      // Map application categories to standard schema definitions
      const categoryMapping: Record<string, string> = {
        FinanceApplication: 'FinanceApplication',
        UtilitiesApplication: 'UtilitiesApplication',
        HealthApplication: 'HealthApplication',
        EducationalApplication: 'EducationalApplication'
      };

      const officialAppCategory = categoryMapping[tool.schemaCategory] || 'UtilitiesApplication';

      // SoftwareApplication Schema with AggregateRating and User Reviews
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: tool.h1,
        alternateName: tool.title,
        headline: tool.title,
        url: fullCanonicalUrl,
        applicationCategory: officialAppCategory,
        operatingSystem: 'All, Any modern web browser',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '2026.1',
        inLanguage: 'en-US',
        isAccessibleForFree: true,
        description: tool.metaDescription,
        datePublished: '2026-01-01',
        dateModified: tool.lastUpdated || '2026-10-15',
        author: {
          '@type': 'Organization',
          name: siteConfig.siteName,
          url: siteConfig.domain
        },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.siteName,
          url: siteConfig.domain
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        },
        featureList: [
          tool.formulaTitle,
          'Instant client-side calculation with zero server delays',
          'Exportable calculation results and printable summaries',
          'Interactive worked step-by-step mathematical proofs',
          'Audited against 2026 statutory standards'
        ],
        // Aggregate Rating for Google Search Golden Stars snippet
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: ratingData.ratingValue.toString(),
          ratingCount: ratingData.ratingCount,
          reviewCount: ratingData.reviewCount,
          bestRating: ratingData.bestRating.toString(),
          worstRating: ratingData.worstRating.toString()
        },
        // Verified User Reviews
        review: ratingData.reviews.map((r) => ({
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: r.author
          },
          datePublished: r.datePublished,
          name: r.reviewTitle,
          reviewBody: r.reviewBody,
          reviewRating: {
            '@type': 'Rating',
            ratingValue: r.ratingValue.toString(),
            bestRating: '5',
            worstRating: '1'
          }
        }))
      });

      // FAQPage Schema for SERP accordion snippets
      if (tool.faqs && tool.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer
            }
          }))
        });
      }
    }

    // Inject JSON-LD Script tag
    const script = document.createElement('script');
    script.id = 'laptools-dynamic-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('laptools-dynamic-jsonld');
      if (s) s.remove();
    };
  }, [
    resolvedTitle,
    resolvedDescription,
    fullCanonicalUrl,
    resolvedKeywords,
    resolvedImage,
    tool,
    category,
    categoryTools,
    isHome,
    noindex,
    ogType
  ]);

  return null;
}
