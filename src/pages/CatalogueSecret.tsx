import { ExternalLink, MapPin, Briefcase } from 'lucide-react';
import PageIntro from '../components/PageIntro';

type Profile = {
  id: number;
  name: string;
  activity: string;
  city: string;
  link: string;
};

const profiles: Profile[] = [
  { id: 1, name: 'Sophie Martin', activity: 'Tech & Innovation', city: 'Paris', link: 'https://example.com/sophie' },
  { id: 2, name: 'Alexandre Dubois', activity: 'Conseil stratégique', city: 'Lyon', link: 'https://example.com/alexandre' },
  { id: 3, name: 'Léa Bernard', activity: 'E-commerce & Retail', city: 'Bordeaux', link: 'https://example.com/lea' },
  { id: 4, name: 'Thomas Petit', activity: 'Finance & Investissement', city: 'Marseille', link: 'https://example.com/thomas' },
  { id: 5, name: 'Camille Laurent', activity: 'Marketing digital', city: 'Toulouse', link: 'https://example.com/camille' },
  { id: 6, name: 'Julien Moreau', activity: 'Immobilier & Patrimoine', city: 'Nice', link: 'https://example.com/julien' },
  { id: 7, name: 'Emma Fournier', activity: 'Santé & Bien-être', city: 'Nantes', link: 'https://example.com/emma' },
  { id: 8, name: 'Lucas Girard', activity: 'Industrie & Manufacturing', city: 'Lille', link: 'https://example.com/lucas' },
];

export default function CatalogueSecret() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageIntro
        title="Catalogue Secret"
        description="Découvre les profils des entrepreneur·e·s de notre réseau confidentiel."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-stone-900">{profile.name}</h3>
            </div>

            <div className="mb-4 space-y-2">
              <div className="flex items-start text-sm text-stone-600">
                <Briefcase className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700" />
                <span>{profile.activity}</span>
              </div>
              <div className="flex items-center text-sm text-stone-600">
                <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-amber-700" />
                <span>{profile.city}</span>
              </div>
            </div>

            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800"
            >
              Voir le profil
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
