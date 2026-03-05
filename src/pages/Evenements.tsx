import { useMemo, useState } from 'react';
import { List, LayoutGrid, MapPin, Clock, Users } from 'lucide-react';
import SignupModal from '../components/SignupModal';
import PageIntro from '../components/PageIntro';

type Evenement = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  maxSeats: number;
  type: 'Conférence' | 'Workshop' | 'Gala' | 'Masterclass';
};

const evenements: Evenement[] = [
  {
    id: 1,
    title: 'Conférence innovation & tech',
    date: '10 avril 2026',
    time: '14h00',
    location: 'Paris La Défense',
    city: 'Paris',
    maxSeats: 50,
    type: 'Conférence',
  },
  {
    id: 2,
    title: 'Workshop stratégie digitale',
    date: '17 avril 2026',
    time: '9h00',
    location: 'Lyon Part-Dieu',
    city: 'Lyon',
    maxSeats: 20,
    type: 'Workshop',
  },
  {
    id: 3,
    title: 'Soirée gala annuelle',
    date: '25 avril 2026',
    time: '19h00',
    location: 'Bordeaux Grand Théâtre',
    city: 'Bordeaux',
    maxSeats: 100,
    type: 'Gala',
  },
  {
    id: 4,
    title: 'Masterclass leadership',
    date: '5 mai 2026',
    time: '10h00',
    location: 'Marseille Euromed',
    city: 'Marseille',
    maxSeats: 30,
    type: 'Masterclass',
  },
];

const statusByType: Record<Evenement['type'], { label: string; classes: string }> = {
  Conférence: { label: 'Nouveau', classes: 'bg-emerald-100 text-emerald-700' },
  Workshop: { label: 'Places limitées', classes: 'bg-red-100 text-red-700' },
  Gala: { label: 'Premium', classes: 'bg-violet-100 text-violet-700' },
  Masterclass: { label: 'Populaire', classes: 'bg-amber-100 text-amber-700' },
};

export default function Evenements() {
  const [selectedEvenement, setSelectedEvenement] = useState<Evenement | null>(null);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('Toutes');
  const [typeFilter, setTypeFilter] = useState('Tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const cities = useMemo(() => ['Toutes', ...new Set(evenements.map((event) => event.city))], []);
  const eventTypes = useMemo(
    () => ['Tous', ...new Set(evenements.map((event) => event.type))],
    []
  );

  const filteredEvents = useMemo(
    () =>
      evenements.filter((event) => {
        const matchesSearch =
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.location.toLowerCase().includes(search.toLowerCase());
        const matchesCity = cityFilter === 'Toutes' || event.city === cityFilter;
        const matchesType = typeFilter === 'Tous' || event.type === typeFilter;

        return matchesSearch && matchesCity && matchesType;
      }),
    [cityFilter, search, typeFilter]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageIntro
        title="Événements"
        description="Des événements d'envergure pour développer ton réseau et tes compétences."
      />

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un événement ou une localisation"
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-700"
          >
            {eventTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="inline-flex w-fit rounded-lg border border-stone-200 p-1">
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

      {filteredEvents.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-500">
          Aucun résultat avec ces filtres. Ajuste tes critères pour voir plus d'options.
        </p>
      ) : (
        <div className={viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2' : 'space-y-4'}>
          {filteredEvents.map((event) => {
            const status = statusByType[event.type];

            return (
              <div
                key={event.id}
                className={`rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg ${
                  viewMode === 'list' ? 'sm:flex sm:items-center sm:justify-between' : ''
                }`}
              >
                <div>
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.classes}`}>
                    {status.label}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-stone-900">{event.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">{event.type}</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-stone-600">
                      <Clock className="mr-2 h-4 w-4 text-amber-700" />
                      <span>
                        {event.date} à {event.time}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-stone-600">
                      <MapPin className="mr-2 h-4 w-4 text-amber-700" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-stone-600">
                      <Users className="mr-2 h-4 w-4 text-amber-700" />
                      <span>{event.maxSeats} places maximum</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvenement(event)}
                  className="mt-6 w-full rounded-lg bg-amber-700 py-2.5 font-medium text-white transition-colors hover:bg-amber-800 sm:mt-0 sm:w-auto sm:px-5"
                >
                  S'inscrire
                </button>
              </div>
            );
          })}
        </div>
      )}

      {selectedEvenement && (
        <SignupModal
          eventTitle={selectedEvenement.title}
          eventDate={`${selectedEvenement.date} à ${selectedEvenement.time}`}
          eventLocation={selectedEvenement.location}
          onClose={() => setSelectedEvenement(null)}
        />
      )}
    </div>
  );
}
