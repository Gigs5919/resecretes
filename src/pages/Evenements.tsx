import { useState } from 'react';
import { MapPin, Clock, Users } from 'lucide-react';
import SignupModal from '../components/SignupModal';

type Evenement = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  maxSeats: number;
};

const evenements: Evenement[] = [
  {
    id: 1,
    title: 'Conférence innovation & tech',
    date: '10 avril 2026',
    time: '14h00',
    location: 'Paris La Défense',
    maxSeats: 50,
  },
  {
    id: 2,
    title: 'Workshop stratégie digitale',
    date: '17 avril 2026',
    time: '9h00',
    location: 'Lyon Part-Dieu',
    maxSeats: 20,
  },
  {
    id: 3,
    title: 'Soirée gala annuelle',
    date: '25 avril 2026',
    time: '19h00',
    location: 'Bordeaux Grand Théâtre',
    maxSeats: 100,
  },
  {
    id: 4,
    title: 'Masterclass leadership',
    date: '5 mai 2026',
    time: '10h00',
    location: 'Marseille Euromed',
    maxSeats: 30,
  },
];

export default function Evenements() {
  const [selectedEvenement, setSelectedEvenement] = useState<Evenement | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-stone-900 mb-3">Événements</h1>
        <p className="text-stone-600">
          Des événements d'envergure pour développer ton réseau et tes compétences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {evenements.map((evenement) => (
          <div
            key={evenement.id}
            className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-stone-900 mb-4">
              {evenement.title}
            </h3>

            <div className="space-y-2 mb-6">
              <div className="flex items-center text-stone-600 text-sm">
                <Clock className="w-4 h-4 mr-2 text-amber-700" />
                <span>{evenement.date} à {evenement.time}</span>
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-amber-700" />
                <span>{evenement.location}</span>
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <Users className="w-4 h-4 mr-2 text-amber-700" />
                <span>{evenement.maxSeats} places maximum</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedEvenement(evenement)}
              className="w-full bg-amber-700 text-white py-2.5 rounded-lg hover:bg-amber-800 transition-colors font-medium"
            >
              S'inscrire
            </button>
          </div>
        ))}
      </div>

      {selectedEvenement && (
        <SignupModal
          eventTitle={selectedEvenement.title}
          onClose={() => setSelectedEvenement(null)}
        />
      )}
    </div>
  );
}
