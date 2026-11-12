import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';

import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { ServicePage } from './pages/ServicePage';
import { LocationPage } from './pages/LocationPage';
import { LocationDetailPage } from './pages/LocationDetailPage';
import { ContactPage } from './pages/ContactPage';
import { KemitraanPage } from './pages/KemitraanPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ArtikelIndexPage } from './pages/ArtikelIndexPage.tsx';
import { ArtikelPostPage } from './pages/ArtikelPostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PUBLISHED_POSTS } from './data/posts.generated';
import { TOTAL_ARTICLE_PAGES } from './routes';
import { getRouteMeta } from './site.config';

interface AppProps {
  initialPath?: string;
}

export default function App({ initialPath }: AppProps) {
  // Normalize path removing trailing slash unless root
  const normalize = (p: string) => {
    if (!p) return '/';
    const clean = p.replace(/\/+$/, '');
    return clean === '' ? '/' : clean;
  };

  const getClientPath = () => {
    if (typeof window !== 'undefined') {
      return normalize(window.location.pathname);
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<string>(
    normalize(initialPath || getClientPath())
  );

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const meta = getRouteMeta(currentPath);
      if (meta?.title) {
        document.title = meta.title;
      }
    }
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getClientPath());
    };

    window.addEventListener('popstate', handlePopState);

    // Global link interceptor for client-side routing on internal <a> tags
    const handleAnchorClick = (e: MouseEvent) => {
      // Don't intercept if modifier keys pressed or not left click
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      // Only intercept internal links starting with /
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        target.target !== '_blank' &&
        !target.hasAttribute('download')
      ) {
        e.preventDefault();
        const cleanHref = normalize(href);
        if (cleanHref !== currentPath) {
          window.history.pushState({}, '', cleanHref);
          setCurrentPath(cleanHref);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [currentPath]);

  // Page Routing
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/product':
        return <ProductPage />;
      case '/service':
        return <ServicePage />;
      case '/location':
        return <LocationPage />;
      case '/location/madiun':
        return <LocationDetailPage slug="madiun" />;
      case '/location/jombang':
        return <LocationDetailPage slug="jombang" />;
      case '/location/ponorogo':
        return <LocationDetailPage slug="ponorogo" />;
      case '/location/kertosono':
        return <LocationDetailPage slug="kertosono" />;
      case '/kemitraan':
        return <KemitraanPage />;
      case '/contact':
        return <ContactPage />;
      case '/kebijakan-privasi':
        return <PrivacyPolicyPage />;
      case '/artikel':
        return <ArtikelIndexPage page={1} />;
      default: {
        if (currentPath.startsWith('/artikel/halaman/')) {
          const numStr = currentPath.slice('/artikel/halaman/'.length);
          if (/^\d+$/.test(numStr)) {
            const pageNum = Number(numStr);
            if (pageNum >= 2 && pageNum <= TOTAL_ARTICLE_PAGES) {
              return <ArtikelIndexPage page={pageNum} />;
            }
          }
          return <NotFoundPage />;
        }

        if (currentPath.startsWith('/artikel/')) {
          const slug = currentPath.slice('/artikel/'.length);
          if (slug && !slug.includes('/') && PUBLISHED_POSTS.some((p) => p.slug === slug)) {
            return <ArtikelPostPage slug={slug} />;
          }
          return <NotFoundPage />;
        }

        return <NotFoundPage />;
      }
    }
  };


  return (
    <div className="min-h-screen bg-[#fff8f0] text-[#1f1b11] flex flex-col font-sans selection:bg-[#960011] selection:text-white pb-16 md:pb-0 w-full max-w-full overflow-x-clip">
      {/* Fixed Sticky Header */}
      <Header currentPath={currentPath} />

      {/* Main Content Area */}
      <div className="min-h-screen bg-[#fff8f0] text-[#1f1b11] flex flex-col font-sans selection:bg-[#960011] selection:text-white pb-16 md:pb-0 w-full overflow-x-hidden relative">
        <main className="flex-1 w-full min-w-0" id="main-content">
          {renderCurrentPage()}
        </main>
        <Footer />
      </div>

      {/* Mobile Floating Quick Bar */}
      <MobileQuickBar />
    </div>
  );
}
