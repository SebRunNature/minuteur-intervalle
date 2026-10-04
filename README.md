# Minuteur HIIT & Trail — Run Nature

Minuteur d'intervalles gratuit, **hors ligne** et **installable** sur mobile, par [Seb Run Nature](https://sebrunnature.github.io/minuteur-intervalle/).
Deux modes : **Intervalles** (HIIT, Tabata, côtes, endurance) et **Trail** (séance générée automatiquement pour le tapis, le terrain vallonné ou le plat), avec guidage vocal.

👉 **Utiliser l'appli : <https://sebrunnature.github.io/minuteur-intervalle/>**

## Fonctionnalités

- **Mode Intervalles** : réglage de l'effort, du repos, du nombre d'exercices, de tours et du repos entre les tours. Protocoles prédéfinis : **Tabata**, **HIIT**, **Côtes**, **Endurance**.
- **Mode Trail** : générateur automatique de séance à partir de la distance, du D+ et de la durée.
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

Le **ratio de dénivelé** (D+ ÷ distance, en m/km) choisit le profil de la montée :

| Ratio | Montée | Inclinaison | Descente |
|---|---|---|---|
| < 20 | 2 min | 5 % | 1 % |
| 20 à 60 | 3 min | 7 % | 1 % |
| 60 à 100 | 4 min | 9 % | 1 % |
| 100 à 150 | 3 min | 12 % | **0 %** (grande descente) |
| ≥ 150 | 2 min, **montée sèche** (marche rapide) | 15 % | **0 %** (grande descente) |

Chaque **tour** enchaîne quatre phases : **montée → plat → descente → marche récup**.
La durée de la descente vaut environ 70 % de celle de la montée, le plat dure 2 min et la marche récup 1 min.

### Durée totale estimée

```
durée totale = 5 min d'échauffement + (nombre de tours × durée d'un tour) + 5 min de retour au calme
```

Le **nombre de tours** se calcule ainsi :

- **Durée saisie** : `tours = (durée − 10 min) ÷ durée d'un tour`, arrondi, avec 1 tour minimum. La durée réelle peut donc s'écarter un peu de la cible (c'est un multiple de tour).
- **Durée vide (automatique)** : le nombre de tours est déduit de la distance (distance ÷ 2,5, entre 3 et 8 tours ; distance ÷ 1,5, entre 4 et 10 tours en montée sèche), pour que la séance reste cohérente (30 km ne donne pas une séance de 45 min).

**Exemple** : 10 km, 500 m de D+, 45 min → ratio 50 → montée de 3 min à 7 %, plat 2 min, descente 2 min, marche 1 min = 8 min par tour → 4 tours → 5 + 32 + 5 = **42 min**.

L'aperçu de la séance affiche le détail de ce calcul.

### Inclinaisons sur tapis

| Phase | Inclinaison |
|---|---|
| Échauffement, retour au calme, **plat**, **marche récup** | **2 %** (simule la route) |
| Montée | 5 à 15 % selon le profil |
| Descente | **1 %** |
| Grande descente | **0 %** |

### Terrains

- **Tapis** : l'inclinaison s'affiche sur chaque segment et dans un gros badge pendant la séance.
- **Vallonné** : montée → vraie côte si possible, descente → profite de la pente.
- **Plat / ville** : fartlek structuré, sans relief nécessaire (montée = accélère, descente = relâche).

En Vallonné et Plat / ville, seuls la flèche et le libellé sont affichés, sans pourcentage.

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
