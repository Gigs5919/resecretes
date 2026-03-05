import { useState, FormEvent } from 'react';
import { X, CheckCircle } from 'lucide-react';

type SignupModalProps = {
  eventTitle: string;
  onClose: () => void;
};

type FormData = {
  prenom: string;
  nom: string;
  email: string;
};

export default function SignupModal({ eventTitle, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">
              S'inscrire
            </h2>
            <p className="text-stone-600 mb-6 text-sm">
              {eventTitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-stone-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  required
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-stone-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors font-medium"
              >
                Confirmer l'inscription
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="flex justify-center mb-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-4">
              Inscription confirmée !
            </h2>

            <div className="bg-stone-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-stone-600 mb-2">
                <span className="font-medium text-stone-900">Prénom :</span> {formData.prenom}
              </p>
              <p className="text-sm text-stone-600 mb-2">
                <span className="font-medium text-stone-900">Nom :</span> {formData.nom}
              </p>
              <p className="text-sm text-stone-600">
                <span className="font-medium text-stone-900">Email :</span> {formData.email}
              </p>
            </div>

            <p className="text-stone-600 text-sm mb-6">
              Nous te contacterons par email pour confirmer les détails de l'événement.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800 transition-colors font-medium"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
