import { useMemo, useState } from 'react';
import { List, LayoutGrid, MapPin, Clock, Users } from 'lucide-react';
import SignupModal from '../components/SignupModal';
import PageIntro from '../components/PageIntro';

type Rencontre = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  maxSeats: number;
};

const rencontres: Rencontre[] = [
  {
    id: 1,
    title: 'Petit-déjeuner stratégique',
    date: '15 mars 2026',
    time: '8h30',
    location: 'Paris 8e',
    city: 'Paris',
    maxSeats: 8,
  },
  {
    id: 2,
    title: 'Déjeuner networking confidentiel',
    date: '22 mars 2026',
    time: '12h00',
    location: 'Lyon 2e',
    city: 'Lyon',
    maxSeats: 10,
  },
  {
    id: 3,
    title: 'Apéro entrepreneur·e·s',
    date: '28 mars 2026',
    time: '18h00',
    location: 'Bordeaux Centre',
    city: 'Bordeaux',
    maxSeats: 12,
  },
  {
    id: 4,
    title: 'Table ronde business',
    date: '5 avril 2026',
    time: '14h00',
    location: 'Marseille Vieux-Port',
    city: 'Marseille',
    maxSeats: 6,
  },
  {
    id: 5,
    title: 'Brunch du dimanche',
    date: '12 avril 2026',
    time: '11h00',
    location: 'Toulouse Capitole',
    city: 'Toulouse',
    maxSeats: 8,
  },
  {
    id: 6,
    title: 'Dîner exclusif',
    date: '18 avril 2026',
    time: '19h30',
    location: 'Nice Promenade',
    city: 'Nice',
    maxSeats: 10,
  },
];

const getStatus = (maxSeats: number) => {
  if (maxSeats <= 6) return { label: 'Places limitées', classes: 'bg-red-100 text-red-700' };
  if (maxSeats >= 11) return { label: 'Nouveau', classes: 'bg-emerald-100 text-emerald-700' };
  return { label: 'Ouvert', classes: 'bg-amber-100 text-amber-700' };
};

export default function Rencontres() {
  const [selectedRencontre, setSelectedRencontre] = useState<Rencontre | null>(null);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('Toutes');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const cities = useMemo(
    () => ['Toutes', ...new Set(rencontres.map((rencontre) => rencontre.city))],
    []
  );

  const filteredRencontres = useMemo(
    () =>
      rencontres.filter((rencontre) => {
        const matchesSearch =
          rencontre.title.toLowerCase().includes(search.toLowerCase()) ||
          rencontre.location.toLowerCase().includes(search.toLowerCase());
        const matchesCity = cityFilter === 'Toutes' || rencontre.city === cityFilter;
        return matchesSearch && matchesCity;
      }),
    [cityFilter, search]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageIntro
        title="Rencontres"
        description="Des rencontres intimistes pour créer des liens authentiques entre entrepreneur·e·s."
      />

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un thème ou une localisation"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-700"
          />
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-700"
          >
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="inline-flex rounded-lg border border-stone-200 p-1">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`rounded-md px-3 py-2 ${
              viewMode === 'grid' ? 'bg-amber-700 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
            aria-label="Vue grille"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`rounded-md px-3 py-2 ${
              viewMode === 'list' ? 'bg-amber-700 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
            aria-label="Vue liste"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filteredRencontres.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          Aucun résultat pour cette recherche. Essaie un autre mot-clé ou une autre ville.
        </p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
          {filteredRencontres.map((rencontre) => {
            const status = getStatus(rencontre.maxSeats);

            return (
              <div
                key={rencontre.id}
                className={`rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg ${
                  viewMode === 'list' ? 'sm:flex sm:items-center sm:justify-between' : ''
                }`}
              >
                <div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.classes}`}>
                    {status.label}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-stone-900">{rencontre.title}</h3>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-stone-600">
                      <Clock className="mr-2 h-4 w-4 text-amber-700" />
                      <span>
                        {rencontre.date} à {rencontre.time}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-stone-600">
                      <MapPin className="mr-2 h-4 w-4 text-amber-700" />
                      <span>{rencontre.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-stone-600">
                      <Users className="mr-2 h-4 w-4 text-amber-700" />
                      <span>{rencontre.maxSeats} places maximum</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRencontre(rencontre)}
                  className="mt-6 w-full rounded-lg bg-amber-700 py-2.5 font-medium text-white transition-colors hover:bg-amber-800 sm:mt-0 sm:w-auto sm:px-5"
                >
                  S'inscrire
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedRencontre && (
        <SignupModal
          eventTitle={selectedRencontre.title}
          eventDate={`${selectedRencontre.date} à ${selectedRencontre.time}`}
          eventLocation={selectedRencontre.location}
          onClose={() => setSelectedRencontre(null)}
        />
      )}
    </div>
  );
}
