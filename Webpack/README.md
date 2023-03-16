# React/Typescript webpack config

## Steps
1. Install react
 ```
npm install react react-dom
```
2. Install babel
 ```
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react
```
3. Setup **.babelrc** file
```
{
	"presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
4. Install webpack
```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin --save-dev
```
5. Setup **webpack.config.js** file
```
const  path = require("path");

const  HtmlWebpackPlugin = require("html-webpack-plugin");

const  port = process.env.PORT ?? 8080;

module.exports = {

	mode:  "development",

	entry:  path.join(__dirname, "src", "index.tsx"),

	devtool:  "inline-source-map",

	output: {

		path:  path.join(__dirname, "/dist"),

		filename:  "[name].[fullhash].js",
		
		clean: true
	},

	devtool:  "inline-source-map",

	devServer: {

		host:  "localhost",

		port:  port,

		historyApiFallback:  true,

		open:  true,

	},

	module: {

	rules: [

		{

			test: /\.jsx?$/,

			exclude: /node_modules/,

			loader:  "babel-loader",

		},

		{

			test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,

			type:  "asset/resource",

		},

		{

			test: /\.tsx?$/,

			use:  "ts-loader",

			exclude: /node_modules/,

		},

		{

			test: /\.css$/,

			use: ["style-loader", "css-loader"],

		},

	],

	},

	resolve: {

		extensions: [".tsx", ".ts", ".js"],

	},

	plugins: [

		new  HtmlWebpackPlugin({

			template:  "public/index.html",

			publicPath:  "/",

		}),

	],
};
```
6. Install missing dependencies
```
npm install --save-dev style-loader css-loader typescript ts-loader
```
7. Setup tscongig.json file
```
{

	"compilerOptions": {

		"outDir": "./dist/",

		"module": "es2020",

		"target": "es5",

		"jsx": "react-jsx",

		"allowJs": true,

		"moduleResolution": "node",

		"sourceMap": true,

		"allowSyntheticDefaultImports": true

	},

	"exclude": ["node_modules"]

}
```
8. Create **index.html** file in public folder (public/index.html)
```
<!DOCTYPE  html>

<html>

	<head>

		<meta  charset="utf-8"  />

		<meta  http-equiv="X-UA-Compatible"  content="IE=edge"  />

		<title></title>

		<meta  name="description"  content=""  />

		<meta  name="viewport"  content="width=device-width, initial-scale=1"  />

		<link  rel="stylesheet"  href=""  />

	</head>

	<body>

		<div  id="root"></div>

	</body>

</html>
```
9. Add **App.tsx**, **index.tsx** to **src** folder
### App.tsx
```
import  React  from  "react";

function  App() {

	return  <h1>Hello React</h1>;

}

export  default  App;
``` 
### index.tsx
```
import  React  from  "react";

import  ReactDOM  from  "react-dom";

import  App  from  "./app";

ReactDOM.render(<App  />, document.getElementById("root"));
``` 
10. Add scripts to **package.json**
```
"scripts": {
	"start:dev": "webpack-dev-server --mode development --hot",
	"build": "webpack --mode production"
},
```
11. Init eslint
```
npm init @esling/config
```
12. Setup rules for eslint in **.eslintrc.json**
```
{

	"env": {

		"browser": true,

		"es2021": true

	},

	"extends": [

		"eslint:recommended",

		"plugin:react/recommended",

		"plugin:@typescript-eslint/recommended"

	],

	"overrides": [],

	"parser": "@typescript-eslint/parser",

	"parserOptions": {

		"ecmaVersion": "latest",

		"sourceType": "module"

	},

	"plugins": ["react", "@typescript-eslint"],

	"rules": {

		"@typescript-eslint/no-explicit-any": "warn",

		"newline-before-return": "warn",

		"semi": "warn",

		"jsx-quotes": ["warn", "prefer-double"],

		"quotes": ["warn", "double"],

		"react/jsx-key": "warn",

		"react/react-in-jsx-scope": "off"

	}

}
```
13. Add **.eslintignore** file
```
webpack.config.js
dist/*
node_modules
```


