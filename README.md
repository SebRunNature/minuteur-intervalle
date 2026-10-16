# Minuteur HIIT & Trail — Run Nature

Minuteur d'intervalles gratuit, **hors ligne** et **installable** sur mobile, par [Seb Run Nature](https://sebrunnature.github.io/minuteur-intervalle/).
Deux modes : **Intervalles** (HIIT, Tabata, côtes, endurance) et **Trail** (séance de côtes générée automatiquement pour **tapis de course**, avec guidage vocal). Pensé pour les tapis simples (type salle de sport) qui n'ont pas de programmes de dénivelé automatiques.

👉 **Utiliser l'appli : <https://sebrunnature.github.io/minuteur-intervalle/>**

## Fonctionnalités

- **Mode Intervalles** : réglage de l'effort, du repos, du nombre d'exercices, de tours et du repos entre les tours. Protocoles prédéfinis : **Tabata**, **HIIT**, **Côtes**, **Endurance**.
- **Mode Trail** : générateur automatique de séance à partir de la distance, du D+ et de la durée, avec blocs longs, phases au choix, sommets et préavis avant chaque changement d'inclinaison.
- **Guidage vocal** en français et bips (annonce des phases, compte à rebours 3-2-1, début et fin de séance).
- **Réglages de la voix** : choix de la voix de l'appareil (homme ou femme), styles *Normale*, *Grave*, *Robot* et *Coach*, curseurs de hauteur et de vitesse, bouton de test.
- **Écran de séance clair** : chrono dans un grand cercle, flèche par phase, pourcentage d'inclinaison bien visible, aperçu de la phase suivante et mini profil de la séance.
- **Fonctionne hors ligne** (PWA) et s'installe sur l'écran d'accueil.
- Écran maintenu allumé pendant la séance, vibrations, mode jour/nuit, plein écran.
- **Liens de séance partageables** (mode Intervalles) : par exemple `?effort=60&repos=90&exo=8&tours=2&trepos=90`.
- Les réglages sont **mémorisés sur l'appareil**.

## Mode Trail : comment ça marche

### Le générateur

Tu renseignes :

| Champ | Rôle |
|---|---|
| **Distance** (km) | Sert au ratio de dénivelé, et à la durée si elle est laissée vide |
| **D+** (m) | Sert au ratio de dénivelé |
| **Durée** (min), facultative | Durée visée de la séance. Vide = **automatique** |
| **Longueur des blocs** | 3, 5 ou 8 min pour chaque montée et chaque descente |
| **Phases de chaque tour** | Montée (toujours), **Descente** (activée par défaut), **Plat** et **Marche récup** (désactivés par défaut) |

Sur un tapis manuel, chaque changement d'inclinaison demande un geste : les **blocs longs** et les **phases au choix** réduisent le nombre de changements. L'aperçu indique le nombre de changements d'inclinaison de la séance.

Le **ratio de dénivelé** (D+ ÷ distance, en m/km) choisit l'inclinaison de la montée et celle de la descente :

| Ratio | Montée | Descente |
|---|---|---|
| < 20 | 5 % | 1 % |
| 20 à 60 | 7 % | 1 % |
| 60 à 100 | 9 % | 1 % |
| 100 à 150 | 12 % | **0 %** (grande descente) |
| ≥ 150 | 15 % (**montée sèche**, marche rapide) | **0 %** (grande descente) |

### Durée totale estimée

```
durée totale = 5 min d'échauffement + (nombre de tours × durée d'un tour) + 5 min de retour au calme
```

La durée d'un tour est la somme des phases activées (montée et descente = longueur des blocs, plat = 2 min, marche récup = 1 min).

Le **nombre de tours** se calcule ainsi :

- **Durée saisie** : `tours = (durée − 10 min) ÷ durée d'un tour`, arrondi, avec 1 tour minimum. La durée réelle peut donc s'écarter un peu de la cible (c'est un multiple de tour).
- **Durée vide (automatique)** : le nombre de tours est déduit de la distance (distance ÷ 2,5, entre 3 et 8 tours ; distance ÷ 1,5, entre 4 et 10 tours en montée sèche), pour que la séance reste cohérente (30 km ne donne pas une séance de 45 min).

**Exemple** : 6,7 km, 140 m de D+, 40 min, blocs de 5 min → ratio 21 → montée à 7 %, descente à 1 % → 10 min par tour → 3 tours → 5 + 30 + 5 = **40 min**, soit 7 changements d'inclinaison.

### Inclinaisons sur tapis

| Phase | Inclinaison |
|---|---|
| Échauffement, retour au calme, **plat**, **marche récup** | **2 %** (simule la route) |
| Montée | 5 à 15 % selon le profil |
| Descente | **1 %** |
| Grande descente | **0 %** |

### Pendant la séance

- **Flèche et couleur par phase**, gros pourcentage d'inclinaison au centre du cercle (tapis).
- **Sommets** : un sommet par montée, avec une barre de **montée cumulée**. La voix annonce « Sommet 2 sur 3 atteint ! » à la fin de chaque montée. Aucune vitesse n'est nécessaire.
- **Préavis de 10 secondes** avant un changement d'inclinaison : bandeau orange (« Dans 10 s : descends à 1 % ») et annonce vocale, pour avoir le temps de régler le tapis.
- Aperçu de la phase suivante et mini profil de la séance avec ta position.

## Protocoles du mode Intervalles

| Protocole | Effort | Repos | Exercices | Tours | Repos entre tours |
|---|---|---|---|---|---|
| Tabata | 20 s | 10 s | 8 | 1 | — |
| HIIT | 40 s | 20 s | 10 | 3 | 60 s |
| Côtes | 60 s | 90 s | 8 | 2 | 90 s |
| Endurance | 180 s | 60 s | 6 | 2 | 120 s |

## Installer l'appli

1. Ouvre <https://sebrunnature.github.io/minuteur-intervalle/> dans Chrome (Android) ou Safari (iPhone).
2. Menu du navigateur → **Ajouter à l'écran d'accueil** / **Installer l'application**.
3. Elle fonctionne ensuite **sans connexion**.

> Après une mise à jour, recharge l'appli : la version installée peut rester en cache un moment.

## Voix : bon à savoir

- Les voix proposées dépendent de ton **téléphone ou navigateur** (voix françaises installées sur l'appareil).
- Le style **Robot** (voix très grave) est plus efficace avec une voix d'homme. Certains appareils ignorent le réglage de hauteur, le rendu varie.

## Technique

Application web **sans dépendance ni étape de build** :

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'appli (HTML, CSS, JavaScript) |
| `sw.js` | Service worker (mode hors ligne) |
| `manifest.json` | Manifeste PWA (installation) |
| `icon-192.png`, `icon-512.png`, `icon_minuteur.svg` | Icônes |

Pour la lancer en local, ouvre `index.html` dans un navigateur, ou sers le dossier avec n'importe quel serveur statique.
Elle utilise l'API Web Speech (voix), l'API Wake Lock (écran allumé) et le `localStorage` (réglages).

## Auteur

**Seb Run Nature**

- 🌐 Site web : [run-nature.com](https://run-nature.com)
- 👤 À propos : [À propos de Run Nature Luxembourg](https://run-nature.com/a-propos-de-run-nature-luxembourg/)
