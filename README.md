# MindAngularWorkspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

# Creazione nuova release

Basta eseguire un push con un tag che incrementi l'ultimo numero di versione.
Poi viene eseguito automaticamente il workflow di github `nuova-release.yaml`

# Aggiornamento npm

incrementare il numero di versione in package.json in projects/mind-angular-lib

- Modificare il numero di versione in package.json all'interno
  di mind-angular/projects/mind-angular-lib/package.json

- Eventualmente fare login :
  Vedi Authenticating with a personal access token
  [link](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

- Eseguire i seguenti comandi posizionandosi prima nella cartella mind-angular
  [link](https://angular.io/guide/creating-libraries#publishing-your-library)

```
ng build mind-angular-lib
cd dist/mind-angular-lib
npm publish
```
