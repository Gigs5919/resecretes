import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { CheckCircle, ShieldCheck, X } from 'lucide-react';

type SignupModalProps = {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  onClose: () => void;
};

type FormData = {
  prenom: string;
  nom: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  prenom: '',
  nom: '',
  email: '',
};

export default function SignupModal({
  eventTitle,
  eventDate,
  eventLocation,
  onClose,
}: SignupModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formData.prenom.trim()) {
      nextErrors.prenom = 'Le prénom est requis.';
    }

    if (!formData.nom.trim()) {
      nextErrors.nom = 'Le nom est requis.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Le format de cet email semble invalide.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onEscClose = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleContinue = () => {
    if (validate()) {
      setStep(2);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 700);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const StepPill = ({ index, label }: { index: number; label: string }) => (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        step >= index ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-500'
      }`}
    >
      {label}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
      onClick={onClose}
      onKeyDown={onEscClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex flex-wrap gap-2">
          <StepPill index={1} label="1. Infos" />
          <StepPill index={2} label="2. Vérification" />
          <StepPill index={3} label="3. Confirmation" />
        </div>

        {step === 1 && (
          <div>
            <h2 id="signup-modal-title" className="mb-2 text-2xl font-bold text-stone-900">
              S'inscrire à l'événement
            </h2>
            <p className="mb-6 text-sm text-stone-600">
              {eventTitle} · {eventDate} · {eventLocation}
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="prenom" className="mb-1 block text-sm font-medium text-stone-700">
                  Prénom
                </label>
                <input
                  id="prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={(e) => handleInputChange('prenom', e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-700"
                />
                {errors.prenom && <p className="mt-1 text-xs text-red-600">{errors.prenom}</p>}
              </div>

              <div>
                <label htmlFor="nom" className="mb-1 block text-sm font-medium text-stone-700">
                  Nom
                </label>
                <input
                  id="nom"
                  type="text"
                  value={formData.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-700"
                />
                {errors.nom && <p className="mt-1 text-xs text-red-600">{errors.nom}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-stone-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full rounded-lg border border-stone-300 px-4 py-2.5 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-amber-700"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800">
              <p className="mb-1 inline-flex items-center gap-1 font-semibold">
                <ShieldCheck className="h-4 w-4" /> Données confidentielles
              </p>
              <p>Vos informations restent privées. Réponse de confirmation sous 24h ouvrées.</p>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 w-full rounded-lg bg-amber-700 py-3 font-medium text-white transition-colors hover:bg-amber-800"
            >
              Continuer
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <h2 id="signup-modal-title" className="mb-2 text-2xl font-bold text-stone-900">
              Vérifie tes informations
            </h2>
            <p className="mb-5 text-sm text-stone-600">Merci de confirmer avant validation.</p>

            <div className="mb-6 space-y-2 rounded-lg bg-stone-50 p-4 text-sm text-stone-700">
              <p>
                <span className="font-semibold text-stone-900">Prénom :</span> {formData.prenom}
              </p>
              <p>
                <span className="font-semibold text-stone-900">Nom :</span> {formData.nom}
              </p>
              <p>
                <span className="font-semibold text-stone-900">Email :</span> {formData.email}
              </p>
              <p>
                <span className="font-semibold text-stone-900">Événement :</span> {eventTitle}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full rounded-lg border border-stone-300 py-3 font-medium text-stone-700 transition-colors hover:bg-stone-100"
              >
                Modifier
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-amber-700 py-3 font-medium text-white transition-colors hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Validation…' : 'Confirmer'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="py-2 text-center">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            <h2 id="signup-modal-title" className="mb-2 text-2xl font-bold text-stone-900">
              Inscription confirmée !
            </h2>
            <p className="mb-6 text-sm text-stone-600">
              Merci {formData.prenom}, nous revenons vers toi par email avec les prochains détails.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-amber-700 py-3 font-medium text-white transition-colors hover:bg-amber-800"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
