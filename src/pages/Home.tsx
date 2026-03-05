import { Users, Calendar, BookOpen } from 'lucide-react';

type HomeProps = {
  onNavigate: (page: 'rencontres' | 'evenements' | 'catalogue') => void;
};

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4">
          Rencontres Entrepreneur·e·s Secrètes
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Un réseau confidentiel d'entrepreneur·e·s qui se rencontrent dans la discrétion
          pour partager expériences, défis et opportunités.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('rencontres')}
          className="bg-white rounded-xl p-8 border border-stone-200 hover:border-amber-700 hover:shadow-lg transition-all text-left group"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-700 transition-colors">
            <Users className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Rencontres</h3>
          <p className="text-stone-600 text-sm">
            Découvre nos prochaines rencontres intimistes entre entrepreneur·e·s.
          </p>
        </button>

        <button
          onClick={() => onNavigate('evenements')}
          className="bg-white rounded-xl p-8 border border-stone-200 hover:border-amber-700 hover:shadow-lg transition-all text-left group"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-700 transition-colors">
            <Calendar className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Événements</h3>
          <p className="text-stone-600 text-sm">
            Explore les événements spéciaux organisés pour la communauté.
          </p>
        </button>

        <button
          onClick={() => onNavigate('catalogue')}
          className="bg-white rounded-xl p-8 border border-stone-200 hover:border-amber-700 hover:shadow-lg transition-all text-left group"
        >
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-700 transition-colors">
            <BookOpen className="w-6 h-6 text-amber-700 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Catalogue Secret</h3>
          <p className="text-stone-600 text-sm">
            Accède au répertoire confidentiel des membres du réseau.
          </p>
        </button>
      </div>
    </div>
  );
}
