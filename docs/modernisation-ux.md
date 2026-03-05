# Modernisation UX — 3 modifications prioritaires

## 1) Refaire la navigation (mobile-first + URL réelles)
**Constat actuel**
- La navigation repose uniquement sur un `useState` local (`currentPage`) sans routes URL.
- Sur mobile, les 3 entrées sont affichées en ligne dans une barre simple.

**Modification proposée**
- Introduire `react-router-dom` (routes `/`, `/rencontres`, `/evenements`, `/catalogue`).
- Ajouter une navigation responsive moderne : barre sticky, menu mobile (drawer), état actif plus visible.
- Ajouter un fil d’Ariane court sur les pages internes.

**Impact UX attendu**
- Navigation plus claire, partage de liens possible, meilleure ergonomie mobile.

## 2) Moderniser les pages listes (recherche, filtres, statuts)
**Constat actuel**
- Les cartes de `Rencontres` / `Événements` affichent une liste statique sans tri, filtre ni recherche.
- Le CTA est identique partout (“S’inscrire”), sans signal fort de disponibilité.

**Modification proposée**
- Ajouter une barre de recherche + filtres (ville, date, type, nombre de places).
- Enrichir les cartes avec badges (“Places limitées”, “Complet”, “Nouveau”).
- Ajouter un toggle de vue (cartes / liste compacte) et skeleton loaders pour perception de vitesse.

**Impact UX attendu**
- Parcours plus rapide, meilleure lisibilité de l’offre, sensation d’interface plus premium.

## 3) Refaire le tunnel d’inscription en modal accessible et rassurante
**Constat actuel**
- Le modal d’inscription est simple, sans étape de validation, sans feedback d’erreurs détaillé, ni micro-copy de réassurance.

**Modification proposée**
- Transformer le formulaire en mini-stepper (Infos > Vérification > Confirmation).
- Ajouter validations inline (email, champs requis, messages clairs) + états loading/success/error.
- Ajouter éléments de confiance : “données privées”, délai de réponse, contact support.
- Renforcer l’accessibilité du modal (focus trap, fermeture clavier, labels/aria plus robustes).

**Impact UX attendu**
- Moins d’abandon, expérience plus professionnelle, meilleure confiance utilisateur.

## Ordre de mise en œuvre recommandé
1. Navigation + routing (fondation structurelle).
2. Tunnel d’inscription (impact conversion).
3. Recherche/filtres avancés sur les listes (impact engagement).
