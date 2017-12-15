const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "./styles.css"
});

module.exports = {
  // Entry-filen som er i roden af projektet.
  // Fra denne starter hele applikationen.
  entry: "./src/index.js",

  // Output-mappe konfigureres her til ./dist
  // Her lægges webpacks outputfiler.
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },

  // Denne fortæller webpack-dev-server at indholdet skal serves fra ./dist
  // Dette er smart hvis man laver en stand-alone app, se README.md
  devServer: {
    contentBase: "./dist",
    proxy: {
      "/spot-service": {
        target: "http://devel06:8381",
        pathRewrite: { "^/spot-service": "" },
        secure: false
      }
    }
  },

  // Loader-konfigurationen er her.
  // Den parses **baglæns**, dvs. fra bunden!
  module: {
    rules: [
      // Babel-transpilation fra ny ES-standard til ES5.
      {
        test: /\.js$/, // Kør på alle .js-filer
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },

      // Transformer .less til .css
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [
            // Disse køres bagfra, så først læses .less-filen med less-loader, derefter med css-loader
            // og til sidst bliver de ekstraheret til en ekstern fil vha. ExtractTextPlugin
            {
              loader: "css-loader"
            },
            {
              loader: "less-loader"
            }
          ]
        })
      },

      //File loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    extractLess,
    // Fjern denne kommentar hvis du ønsker at index.html skal kopieres til dist-mappen ved kompilation.
    // Bemærk: Du skal samtidig slette de scripts og styles der inkluderes i index.html, da de indsættes automatisk af pluginnet.
    new HtmlPlugin({
      template: "index.html"
    })
  ]
};
