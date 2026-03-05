import { ArrowRight, BookOpen, Calendar, Users } from 'lucide-react';

type HomeProps = {
  onNavigate: (path: '/' | '/rencontres' | '/evenements' | '/catalogue') => void;
};

const featureCards = [
  {
    title: 'Rencontres',
    description: 'Découvre nos prochaines rencontres intimistes entre entrepreneur·e·s.',
    to: '/rencontres' as const,
    icon: Users,
  },
  {
    title: 'Événements',
    description: 'Explore les événements spéciaux organisés pour la communauté.',
    to: '/evenements' as const,
    icon: Calendar,
  },
  {
    title: 'Catalogue Secret',
    description: 'Accède au répertoire confidentiel des membres du réseau.',
    to: '/catalogue' as const,
    icon: BookOpen,
  },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <section className="mb-12 rounded-3xl border border-stone-200/80 bg-white p-8 shadow-sm sm:p-12">
        <p className="mb-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
          Communauté privée
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Rencontres Entrepreneur·e·s Secrètes
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-stone-600 sm:text-lg">
          Un réseau confidentiel d'entrepreneur·e·s qui se rencontrent dans la discrétion pour
          partager expériences, défis et opportunités.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/rencontres')}
            className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-800"
          >
            Voir les rencontres
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('/evenements')}
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:bg-stone-100"
          >
            Explorer les événements
          </button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {featureCards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => onNavigate(card.to)}
              className="group rounded-2xl border border-stone-200 bg-white p-7 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-700 group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-2 text-lg font-semibold text-stone-900">{card.title}</h2>
              <p className="text-sm leading-relaxed text-stone-600">{card.description}</p>
            </button>
          );
        })}
      </section>
    </div>
  );
}
