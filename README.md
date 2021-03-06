# Webpack Starter Kit

Klonet fra det kongelige biblioteks webpack-starter-kit og tilføjet et simpelt vue start up.

Dette er et minimalt starter kit til at komme igang med et javascript-projekt med:

* Nyeste Javascript-standard (ES2017)
* Har support for node-moduler fra [npmjs.org](https://npmjs.org)
* LESS-kompilation
* Webpack bundling både til udvikling, med watch mode og til produktionsbrug.

## Installation

Enten kan dette starter-kit bruges i et eksiterende projekt eller som et nyt projekt fra bunden.

1. Klon dette repository

2. Gå ind i den nye mappe, og fjern `.git`-mappen. Hvis det er et nyt projekt, så skriv `git init` igen for at gå et frisk repository.

3. Kør `npm install` inde fra mappen for at installere dependencies.

## Test at det virker

Kør `npm run build:dev` fra dette projekts rodmappe. Der skulle gerne komme et webpack-output.

Åbn `index.html` der ligger i roden af projektet i en webbrowser, og der skulle gerne være en lille dynamisk webside, som webpack har kompileret fra `src/` mappen.

## Brug

Kompiler js-filer (inkl node-moduler) til `./dist/bundle.js` og less-filer til `./dist/styles.css` uden minification:

```
# uden watch mode
npm run build:dev

# med watch mode
npm run build:watch
```

Kompiler js og less til produktion til `./dist/bundle.js` og `./dist/styles.css`, med minification:

```
npm run build:prod
```

## Brug i en standalone JS-app

### Automatisk kopiering af index.html til dist-mappen

Dette er egnet til en stand-alone JS-app, hvor alle statiske filer inkl. `index.html` samles i `dist`-mappen, som da er lige til at sætte i produktion.

For at slå dette skal en kodeblok indkommenteres i bunden af `webpack.config.js`, så HtmlPlugin indgår som plugin:

```
new HtmlPlugin({
  template: "index.html"
})
```

Desuden skal loading af `js` og `css`-filer i `index.html` fjernes, da det fremover vil blive indsat automatisk af pluginnet.

Der er kommentarer til at gøre dette i begge filer.

### Automatiske reloads med webpack-dev-server

Når automatisk kopiering af index.html er slået til, kan man bruge `webpack-dev-server` til udviklingen. Dette giver automatiske refreshes af websiden, og giver et meget hurtigt workflow.

Kør da:

```
npm run build:devserver
```

# Om det tekniske

## Webpack-konfiguration

Webpack **transformerer** inputfilen til den gamle ES5-standard, og er samtidig **module bundler**, så man kan bruge flere separate filer i sit projekt, som samles til én fil.

Konfigurationen sker i `webpack.config.js`. Der er skrevet kommentarer i den, så man kan se hvad der foregår.

Dokumentation for yderligere konfiguration af webpack kan findes her:
[https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)

### Om understøttede browsere

I dette projekt er babel konfigureret til at bruge `preset-env`, som hjælper én med kun at bruge de transformationer som er nødvendige.

Den kan konfigureres på mange måder, f.eks. til at have understøttelse for 99% af de anvendte browsere ifølge statistikker.

Vi bruger den til at kompilere til de seneste 2 versioner af alle browsere.

Læs mere om dette hos [BabelJS](https://babeljs.io/env/#by-targeting-specific-browsers-babel-can-do-less-work-so-you-can-ship-native-es2015-)
