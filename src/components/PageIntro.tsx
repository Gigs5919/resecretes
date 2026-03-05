type PageIntroProps = {
  title: string;
  description: string;
};

export default function PageIntro({ title, description }: PageIntroProps) {
  return (
    <div className="mb-8 rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm sm:mb-10 sm:p-8">
      <nav className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-stone-500">
        <a href="/" className="transition-colors hover:text-stone-700">
          Accueil
        </a>
        <span aria-hidden="true">/</span>
        <span className="text-stone-700">{title}</span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-stone-900">{title}</h1>
      <p className="text-sm leading-relaxed text-stone-600 sm:text-base">{description}</p>
    </div>
  );
}
