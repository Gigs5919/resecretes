import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import CatalogueSecret from './pages/CatalogueSecret';
import Evenements from './pages/Evenements';
import Home from './pages/Home';
import Rencontres from './pages/Rencontres';

type RoutePath = '/' | '/rencontres' | '/evenements' | '/catalogue';

const navItems: Array<{ label: string; path: RoutePath }> = [
  { label: 'Accueil', path: '/' },
  { label: 'Rencontres', path: '/rencontres' },
  { label: 'Événements', path: '/evenements' },
  { label: 'Catalogue Secret', path: '/catalogue' },
];

const normalizePath = (path: string): RoutePath => {
  if (path === '/rencontres' || path === '/evenements' || path === '/catalogue') {
    return path;
  }
  return '/';
};

function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(normalizePath(window.location.pathname));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: RoutePath) => {
    if (path === currentPath) {
      setIsMobileMenuOpen(false);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setIsMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/rencontres':
        return <Rencontres />;
      case '/evenements':
        return <Evenements />;
      case '/catalogue':
        return <CatalogueSecret />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 via-stone-50 to-white text-stone-900">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            className="text-lg font-bold tracking-tight text-stone-900 transition-colors hover:text-amber-700"
            onClick={() => navigate('/')}
          >
            RES
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  currentPath === item.path
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {isMobileMenuOpen && (
          <div className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`rounded-full px-4 py-2 text-left text-sm font-medium transition-all ${
                    currentPath === item.path
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
