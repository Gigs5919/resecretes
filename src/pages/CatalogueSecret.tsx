import { ExternalLink, MapPin, Briefcase } from 'lucide-react';

type Profile = {
  id: number;
  name: string;
  activity: string;
  city: string;
  link: string;
};

const profiles: Profile[] = [
  {
    id: 1,
    name: 'Sophie Martin',
    activity: 'Tech & Innovation',
    city: 'Paris',
    link: 'https://example.com/sophie',
  },
  {
    id: 2,
    name: 'Alexandre Dubois',
    activity: 'Conseil stratégique',
    city: 'Lyon',
    link: 'https://example.com/alexandre',
  },
  {
    id: 3,
    name: 'Léa Bernard',
    activity: 'E-commerce & Retail',
    city: 'Bordeaux',
    link: 'https://example.com/lea',
  },
  {
    id: 4,
    name: 'Thomas Petit',
    activity: 'Finance & Investissement',
    city: 'Marseille',
    link: 'https://example.com/thomas',
  },
  {
    id: 5,
    name: 'Camille Laurent',
    activity: 'Marketing digital',
    city: 'Toulouse',
    link: 'https://example.com/camille',
  },
  {
    id: 6,
    name: 'Julien Moreau',
    activity: 'Immobilier & Patrimoine',
    city: 'Nice',
    link: 'https://example.com/julien',
  },
  {
    id: 7,
    name: 'Emma Fournier',
    activity: 'Santé & Bien-être',
    city: 'Nantes',
    link: 'https://example.com/emma',
  },
  {
    id: 8,
    name: 'Lucas Girard',
    activity: 'Industrie & Manufacturing',
    city: 'Lille',
    link: 'https://example.com/lucas',
  },
];

export default function CatalogueSecret() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-stone-900 mb-3">Catalogue Secret</h1>
        <p className="text-stone-600">
          Découvre les profils des entrepreneur·e·s de notre réseau confidentiel.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg transition-shadow"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-stone-900 mb-1">
                {profile.name}
              </h3>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start text-stone-600 text-sm">
                <Briefcase className="w-4 h-4 mr-2 mt-0.5 text-amber-700 flex-shrink-0" />
                <span>{profile.activity}</span>
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-amber-700 flex-shrink-0" />
                <span>{profile.city}</span>
              </div>
            </div>

            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-amber-700 hover:text-amber-800 text-sm font-medium"
            >
              Voir le profil
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
