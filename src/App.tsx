import { useState } from 'react';
import Home from './pages/Home';
import Rencontres from './pages/Rencontres';
import Evenements from './pages/Evenements';
import CatalogueSecret from './pages/CatalogueSecret';

type Page = 'home' | 'rencontres' | 'evenements' | 'catalogue';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'rencontres':
        return <Rencontres />;
      case 'evenements':
        return <Evenements />;
      case 'catalogue':
        return <CatalogueSecret />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <nav className="bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-xl font-semibold text-stone-900 hover:text-amber-700 transition-colors"
            >
              RES
            </button>
            <div className="flex gap-6">
              <button
                onClick={() => setCurrentPage('rencontres')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'rencontres'
                    ? 'text-amber-700'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Rencontres
              </button>
              <button
                onClick={() => setCurrentPage('evenements')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'evenements'
                    ? 'text-amber-700'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Événements
              </button>
              <button
                onClick={() => setCurrentPage('catalogue')}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'catalogue'
                    ? 'text-amber-700'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Catalogue Secret
              </button>
            </div>
          </div>
        </div>
      </nav>
      {renderPage()}
    </div>
  );
}

export default App;
