# CLI Demo

Mini-site GitHub Pages autonome pour publier des démonstrations produites depuis Cursor CLI (APK téléchargeables ou pages Web).

## URL

https://francismanseau-oss.github.io/cli-demo/

## Catalogue

- Source de vérité : `demos.json`
- APK : `demos/apk/<Nom>.apk`
- Web : `demos/web/<Nom>/index.html`

## Notes

- Anti-indexation : `robots.txt` (`Disallow: /`) + meta `noindex, nofollow, noarchive`.
- Pas de sitemap. Les robots respectueux devraient s’abstenir d’indexer.
- Ce n’est **pas** une protection : l’URL reste accessible à quiconque la connaît, y compris des bots non respectueux.
- Site autonome (aucun lien depuis le site portfolio).
