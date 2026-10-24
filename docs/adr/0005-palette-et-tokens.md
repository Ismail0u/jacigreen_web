# ADR 0005 — Palette et design tokens

**Statut :** Palette de marque adoptée comme référence fournie dans la mission ; les rôles des couleurs UI restent alignés sur l'accessibilité et les maquettes Stitch.

## Contexte
Les maquettes Stitch utilisent vert forêt, ivoire, sable et ocre. La mission fournit la palette de marque officielle exacte : vert `#3AA33D`, vert secondaire `#519152`, vert clair `#B8E3B8`, magenta `#B55996`, rose clair `#E0B5D3`, rose sombre `#A4648C`, gris `#7F7A77`, gris rosé `#B7AFB1`, blanc cassé `#F9F8F8`, blanc `#FFFFFF` et noir `#000000`.

## Décision proposée
Conserver la structure et les rôles de couleur de l'interface des maquettes Stitch. Enregistrer exactement les teintes de marque dans les tokens. Les teintes officielles dont le contraste est inférieur à 4,5:1 sur la surface restent décoratives, jamais du texte courant ; les actions et textes utilisent les variantes accessibles existantes. Le contraste du `magenta-text` est de 6,37:1 sur la surface. Les valeurs et les garde-fous de contraste sont vérifiés dans `tokens.test.ts`.

## Conséquences
La palette est centralisée dans `frontend/src/styles/tokens.css`. Le logo est fourni en PNG carré avec fond blanc opaque ; fournir une variante transparente si nécessaire.
