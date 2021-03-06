# Cliente CV Vanilla Javascript
Recomendable crear un .editorconfig

---

$ git init

---

$ npm init

---

```bash
$ npm install --save-dev eslint
```

Configuración:
```bash
$ npx eslint --init
```

Para que revise:
```bash
$ npx eslint src/js/index.js
```

---

```bash
$ npm install webpack webpack-cli --save-dev
```

Config package.json webpack
```json
"scripts": {
    ...
    "dev": "webpack --config build/webpack.dev",
    "prod": "webpack --config build/webpack.prod",
    "watch": "webpack --watch --info-verbosity verbose"
    ...
},
```

Configuraciones de webpack en carpeta build

Librerias de los dos entorno DEV y PROD:

##### Babel
```bash
npm i --save-dev @babel/core babel-loader @babel/preset-env
npm i --save-dev @babel/plugin-transform-runtime
npm i --save @babel/runtime
```

##### Clean
```bash
npm i --save-dev clean-webpack-plugin
```

##### Styles
```bash
npm i --save-dev sass-loader css-loader style-loader
```

##### Files like fonts
```bash
npm i --save-dev file-loader
```

##### Prefixes
```bash
npm i --save-dev autoprefixer
npm i --save-dev autoprefixer@9.8.6
```

##### After charge all css (need to autoprefixer)
```bash
npm i --save-dev postcss-loader
npm i --save-dev postcss-loader@3.0.0
```

##### Create html file
```bash
npm i --save-dev html-webpack-plugin
```

##### Extract CSS to file
```bash
npm i mini-css-extract-plugin
```

##### Dev Server
npm i webpack-dev-server

#### Libraries need PROD

##### Purge CSS
```bash
npm i --save-dev purgecss
```

##### Uglify JS
```bash
npm i --save-dev uglifyjs-webpack-plugin
```

##### Optimize CSS
```bash
npm i --save-dev optimize-css-assets-webpack-plugin
```

##### Compile Sass
```bash
npm i --save-dev node-sass
```

##### Like file loader but can return one DataURL
(If file file is smaller than bytes limit. No used)
```bash
npm i --save-dev url-loader
```

##### Merge several files in one.
```bash
npm i --save-dev webpack-
```

##### Developed mode with Watch (detect changes)
```bash
$ npm run watch
```

Create folder dist/ with file main.js

// Compile package in DEV
```bash
$ npm run dev
```

Create folder dist/ with file custom-dev.js

---

### Libreria Axios pata peticiones Http

```bash
$ npm i --save-dev axios
```
