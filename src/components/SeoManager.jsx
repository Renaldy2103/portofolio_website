import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_SEO = {
  '/': {
    title: 'Moch Renaldy Syaputra — Backend, Full-Stack & AI Software Engineer',
    description:
      'Official portfolio of Moch Renaldy Syaputra — Software Engineer & Informatics Engineering student specializing in Python, FastAPI, PostgreSQL, React, TypeScript, Mobile Apps, and Computer Vision AI.',
  },
  '/projects': {
    title: 'Projects & Case Studies | Moch Renaldy Syaputra',
    description:
      'Explore 12+ software engineering projects and case studies by Moch Renaldy Syaputra across FastAPI backends, React & Expo mobile apps, IoT architectures, and YOLOv11 Computer Vision AI.',
  },
  '/certificates': {
    title: 'Certificates & Verified Credentials | Moch Renaldy Syaputra',
    description:
      'Verified industry certifications, BNSP national software engineering competency credentials, and Python & AI achievements of Moch Renaldy Syaputra.',
  },
};

function setMetaTag(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonicalLink(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Synchronizes document title, meta description, Open Graph URL/title, and canonical URL
 * across client-side route transitions.
 */
export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = ROUTE_SEO[pathname] || ROUTE_SEO['/'];
    const baseUrl = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/$/, '');
    const canonicalUrl = `${baseUrl}${pathname === '/' ? '/' : pathname}`;
    const ogImageUrl = `${baseUrl}/og-image.png`;

    document.title = seo.title;
    setMetaTag('name', 'description', seo.description);
    setMetaTag('property', 'og:title', seo.title);
    setMetaTag('property', 'og:description', seo.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('name', 'twitter:title', seo.title);
    setMetaTag('name', 'twitter:description', seo.description);
    setMetaTag('name', 'twitter:image', ogImageUrl);
    setCanonicalLink(canonicalUrl);
  }, [pathname]);

  return null;
}
