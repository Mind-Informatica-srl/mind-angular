# MindAngularWorkspace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

# Aggiornamento npm

incrementare il numero di versione in package.json in projects/mind-angular-lib

- Modificare il numero di versione in package.json all'interno
  di mind-angular/projects/mind-angular-lib/package.json

- Eventualmente fare login :
  Vedi Authenticating with a personal access token
  [link](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)

- Eseguire i seguenti comandi posizionandosi prima nella cartella mind-angular

```
ng build mind-angular-lib
cd dist/mind-angular-lib
npm publish
```
