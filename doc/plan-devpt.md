# Plan de développement — association-estudiantine (ages)

Stack : Laravel + Inertia.js + React · MySQL (`ages`) · Merise (MCD/MLD)
Principe directeur : chaque module va de la migration jusqu'à la page réelle avant de passer au suivant. Pas de couche ajoutée sans justification.

---

## Module 0 — Fondations : Users, Rôles, RBAC

**Objectif** : trancher la question `users` + colonne `role` vs entités temporelles (`MANDAT`, `COMPOSITION_LISTE`, `COMMISSION_ELECTORALE`), puis construire la base sur laquelle tous les autres modules reposent.

**Décision à prendre en premier**
- [ ] Confirmer le modèle : `ETUDIANT` central + `MANDAT` (rôle temporel, lié à un `POSTE`/`BUREAU`, avec `date_debut`/`date_fin`) plutôt qu'une colonne `role` figée — cohérent avec le principe déjà retenu dans le MCD.
- [ ] Lister les 5 rôles et leur portée : Admin (technique, hors mandat), Bureau, Commission électorale, Président de liste, Étudiant (rôle par défaut).

**Tâches**
- [ ] Migration `users` : étendre Breeze avec matricule, filière, niveau, statut, photo (nullable), en gardant les 8 colonnes Breeze intactes.
- [ ] Migration `mandats` : `user_id`, `poste_id` (ou `role` enum si le MCD le permet), `date_debut`, `date_fin`, `actif`.
- [ ] Modèle `User` : relation `mandats()` (hasMany), accessor `mandatActif()` / `hasRole($role)`.
- [ ] Modèle `Mandat` : relation `user()`, scope `actifs()`.
- [ ] Seeder de rôles/postes de base pour développement local.
- [ ] Policies Laravel par rôle (ex. `MembrePolicy`, `FinancePolicy`) — commencer par une policy générique testée sur un seul module avant de dupliquer le pattern.
- [ ] Middleware ou Gate pour vérifier le mandat actif (pas juste l'existence d'un rôle — un mandat expiré ne doit plus donner accès).
- [ ] Page Inertia de connexion/dashboard minimal qui affiche le rôle actif de l'utilisateur (sanity check visuel que RBAC fonctionne).

**Definition of done** : un utilisateur Bureau et un utilisateur Étudiant se connectent et voient des menus différents, basés sur des données réelles en base — pas de Faker.

---

## Module 1 — Membres

**Objectif** : CRUD complet, sert de gabarit pour tous les modules suivants (le pattern migration → policy → controller → page sera réutilisé tel quel).

**Tâches**
- [ ] Migration `etudiants` (ou extension `users`) si des champs spécifiques manquent (filière, niveau, statut membre).
- [ ] `MembreController` : index (liste + pagination + filtre filière/niveau), show, edit, update. Pas de `Requests/` séparé tant que la validation reste simple (inline `$request->validate()`).
- [ ] Policy : Bureau peut tout voir/éditer, Étudiant voit seulement son propre profil.
- [ ] Pages Inertia : `Membres/Index.jsx`, `Membres/Show.jsx`, `Membres/Edit.jsx` — remplacer les blocs Faker existants du dashboard une fois prêt.
- [ ] Recherche/filtre côté serveur (pas de filtrage client sur toute la table si le nombre d'étudiants est grand).

**Definition of done** : liste réelle des membres, recherche fonctionnelle, permissions vérifiées.

---

## Module 2 — Cotisations / Finances

**Objectif** : reproduire la barre "Ma Contribution" du mockup avec des données réelles, + vue globale finances pour le Bureau.

**Tâches**
- [ ] Migrations `cotisations` (montant attendu par période/année) et `paiements` (table associative many-to-many `Paie` déjà identifiée dans le MCD).
- [ ] Modèle `Cotisation` / `Paiement`, relation avec `User`.
- [ ] Logique de calcul : montant payé, reste à payer, % payé (méthode sur le modèle, pas dans la vue).
- [ ] `CotisationController` : vue étudiant (sa propre contribution + historique) vs vue Bureau (finances globales, tous membres).
- [ ] Policy : un étudiant ne voit que ses propres paiements.
- [ ] Pages Inertia : `Cotisations/Show.jsx` (vue perso, reprend le design du mockup), `Finances/Index.jsx` (vue Bureau agrégée).
- [ ] Décider si un `Service` de calcul financier est nécessaire — probablement pas encore à ce stade (logique simple), à réévaluer si les rapports financiers se complexifient.

**Definition of done** : la carte "Ma Contribution" du dashboard affiche une vraie donnée issue de la base.

---

## Module 3 — Réunions, Activités, Annonces

**Objectif** : trois modules similaires en structure (CRUD + affichage chronologique), à traiter ensemble car le pattern est identique.

**Tâches communes aux trois**
- [ ] Migrations : `reunions` (date_heure, lieu, compte_rendu), `activites` (date_heure, lieu, description), `annonces` (titre, description, date_publication).
- [ ] Relations `Organise`/`Regroupe`/`Correspond` (1-n déjà résolues par simple FK selon le MCD).
- [ ] Controllers respectifs : index (à venir / passées), show, store, update (Bureau uniquement en écriture).
- [ ] Policies : lecture pour tous les membres actifs, écriture réservée au Bureau/rôle habilité.
- [ ] Pages Inertia : listes chronologiques (reprendre le style des cartes "Dernières annonces" / "Réunions à venir" du mockup), page détail par entité.
- [ ] Tri par date, distinction passé/à venir géré côté requête (scope Eloquent `aVenir()` / `passees()`).

**Definition of done** : les trois cartes du dashboard (annonces, réunions, activités) affichent des données réelles avec pagination/troncature cohérente avec le mockup.

---

## Module 4 — Élections (module le plus complexe)

**Objectif** : listes de candidats, vote, dépouillement — avec anonymat du bulletin garanti au niveau du schéma (déjà spécifié : `BULLETIN` désolidarisé de `ETUDIANT`, `PARTICIPATION_VOTE` séparé).

**Tâches**
- [ ] Migrations : `elections`, `listes_candidates`, `composition_liste` (association many-to-many candidats-liste), `bulletins` (sans FK vers `users`), `participation_vote` (FK vers `users`, preuve de participation uniquement, aucun lien vers le contenu du vote).
- [ ] Modèle `Election`, `ListeCandidate`, `Bulletin`, `ParticipationVote` — vérifier qu'aucune relation Eloquent ne permet de remonter d'un `Bulletin` à un `User`, même indirectement.
- [ ] **Service dédié `VoteService`** (justifié ici par la complexité — logique de dépouillement, vérification qu'un étudiant n'a pas déjà voté, calcul des résultats) : c'est le seul module où la couche `Services/` est justifiée à ce stade du projet.
- [ ] Policy stricte : Commission Électorale seule peut créer une élection/liste ; un étudiant ne peut voter qu'une fois (vérifié via `participation_vote`, jamais via le bulletin).
- [ ] Controller `ElectionController` : liste des élections, détail avec listes candidates (reprendre le layout de cartes du mockup), formulaire de vote, page résultats (visible seulement après clôture).
- [ ] Pages Inertia : `Elections/Show.jsx` (cartes candidats, badge "Terminé"/"En cours" comme dans le mockup), `Elections/Vote.jsx`, `Elections/Resultats.jsx`.
- [ ] Tests spécifiques : vérifier qu'il est impossible de relier un bulletin à un votant via requête SQL directe — pas juste via l'appli.

**Definition of done** : un vote peut être soumis, comptabilisé, et les résultats affichés, sans qu'aucune requête ne puisse relier un bulletin donné à un étudiant donné.

---

## Module 5 — Rapports / Dashboard agrégé

**Objectif** : une fois tous les modules réels, remplacer les derniers blocs Faker du dashboard par des agrégats réels et construire les rapports formels demandés dans le cahier des charges.

**Tâches**
- [ ] `DashboardController` : agréger les requêtes des modules précédents (dernières annonces, prochaines réunions, cotisation perso, élections en cours) — pas de nouvelle logique métier, juste de la composition.
- [ ] Rapports (probablement PDF ou export) : cotisations par période, participation aux réunions/activités, résultats d'élection archivés.
- [ ] Vérifier les performances des requêtes agrégées (eager loading, éviter le N+1 sur le dashboard qui touche 5 modules à la fois).

**Definition of done** : le dashboard du mockup fonctionne intégralement avec des données réelles, écran par écran identique à la maquette.

---

## Ordre recommandé et dépendances

```
Module 0 (Users/RBAC)  →  bloquant pour tout le reste
Module 1 (Membres)     →  valide le pattern CRUD complet
Module 2 (Cotisations) →  peut démarrer dès Module 0 terminé
Module 3 (Réunions/Activités/Annonces) → en parallèle possible avec Module 2
Module 4 (Élections)   →  démarrer en dernier, patterns déjà rodés
Module 5 (Rapports)    →  dépend de tous les précédents
```

Prochaine étape concrète : trancher le schéma `users`/`mandats` (Module 0) avant de toucher à quoi que ce soit d'autre.