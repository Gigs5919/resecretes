import { useState } from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import SignupModal from '../components/SignupModal';

type Rencontre = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  maxSeats: number;
};

const rencontres: Rencontre[] = [
  {
    id: 1,
    title: 'Petit-déjeuner stratégique',
    date: '15 mars 2026',
    time: '8h30',
    location: 'Paris 8e',
    maxSeats: 8,
  },
  {
    id: 2,
    title: 'Déjeuner networking confidentiel',
    date: '22 mars 2026',
    time: '12h00',
    location: 'Lyon 2e',
    maxSeats: 10,
  },
  {
    id: 3,
    title: 'Apéro entrepreneur·e·s',
    date: '28 mars 2026',
    time: '18h00',
    location: 'Bordeaux Centre',
    maxSeats: 12,
  },
  {
    id: 4,
    title: 'Table ronde business',
    date: '5 avril 2026',
    time: '14h00',
    location: 'Marseille Vieux-Port',
    maxSeats: 6,
  },
  {
    id: 5,
    title: 'Brunch du dimanche',
    date: '12 avril 2026',
    time: '11h00',
    location: 'Toulouse Capitole',
    maxSeats: 8,
  },
  {
    id: 6,
    title: 'Dîner exclusif',
    date: '18 avril 2026',
    time: '19h30',
    location: 'Nice Promenade',
    maxSeats: 10,
  },
];

export default function Rencontres() {
  const [selectedRencontre, setSelectedRencontre] = useState<Rencontre | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-stone-900 mb-3">Rencontres</h1>
        <p className="text-stone-600">
          Des rencontres intimistes pour créer des liens authentiques entre entrepreneur·e·s.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rencontres.map((rencontre) => (
          <div
            key={rencontre.id}
            className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-stone-900 mb-4">
              {rencontre.title}
            </h3>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-stone-600 text-sm">
                <Clock className="w-4 h-4 mr-2 text-amber-700" />
                <span>{rencontre.date} à {rencontre.time}</span>
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                <span>{rencontre.location}</span>
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <Users className="w-4 h-4 mr-2 text-amber-700" />
                <span>{rencontre.maxSeats} places maximum</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRencontre(rencontre)}
              className="w-full bg-amber-700 text-white py-2.5 rounded-lg hover:bg-amber-800 transition-colors font-medium"
            >
              S'inscrire
            </button>
          </div>
        ))}
      </div>

      {selectedRencontre && (
        <SignupModal
          eventTitle={selectedRencontre.title}
          onClose={() => setSelectedRencontre(null)}
        />
      )}
    </div>
  );
}
