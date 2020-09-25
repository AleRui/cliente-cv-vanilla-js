# Cliente CV Vanilla Javascript
$ git init
---
$ npm init
---
$ npm install --save-dev eslint
Configuración:
$ npx eslint --init
Para que revise:
$ npx eslint src/js/index.js
---
$ npm install webpack webpack-cli --save-dev
Config package.json webpack
```
"scripts": {
    ...
    "dev": "webpack --config build/webpack.dev",
    "prod": "webpack --config build/webpack.prod"
    ...
},
```
Configuraciones de webpack en carpeta build
Librerias de los dos entorno DEV y PROD:
// Babel
npm i --save-dev @babel/core babel-loader @babel/preset-env
// Limpiar
npm i --save-dev clean-webpack-plugin
// Styles
npm i --save-dev sass-loader css-loader style-loader
// Files like fonts
npm i --save-dev file-loader
// Prefijos
npm i --save-dev autoprefixer
// Después de cargar todo el css (necesario para autoprefixer)
npm i --save-dev postcss-loader

Librerías necesarias PROD
// Purgar CSS
npm i --save-dev purgecss
// Uglify JS
npm i --save-dev uglifyjs-webpack-plugin
// Optimizar CSS
npm i --save-dev optimize-css-assets-webpack-plugin

// Crea el html file (No usado)
npm i --save-dev html-webpack-plugin
// Compilar Sass (No usado)
npm i --save-dev node-sass
// Como file loader pero puede devolver un DataURL
// si el archivo es más pequeño que el límite de bytes. (No usado)
npm i --save-dev url-loader
// Mergea varios archivos en uno
npm i --save-dev webpack-

// Compilar paquete en DEV
$ npm run dev
crea carpeta dist/ con archivo custom-dev.js
