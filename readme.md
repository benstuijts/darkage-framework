# Darkage Framework

### Inhoud
De volgende zaken zijn opgenomen in dit framework:

* Express JS
* EJS
* Webpack
* React JS -> Flux
* Passport JS
* Socket.io

### Directory structuur DEVELOPMENT

/
    documentation.txt
    webpack.config.js
    package.json

/node_modules

/server
    /models
    /routes
    	game_routes.js
    	admin_routes.js
    	test_routes.js

    /socket.io.server

    gameserver.js

/public
    /css
    /images
    /views

    darkage.min.js              Dit is de gebundelde js file na compiling door Webpack

/client
    /isometricEngine
    /socket.io.client
    /userinterface              based on React JS

    entry.js                    Entrypoint van Webpack!!!

### Directory structuur DEPLOYMENT

/
	package.json

/server

/public

### Package.json

```sh
{
  "name": "darkage",
  "version": "1.0.0",
  "description": "",
  "main": "gameserver.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./server/gameserver.js"
  },
  "author": "Ben Stuijts",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.0",
    "cookie-parser": "^1.4.1",
    "ejs": "^2.4.1",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "jsonfile": "^2.2.3",
    "mongoose": "^4.4.4",
    "passport": "^0.3.2",
    "react": "^0.14.7",
    "react-dom": "^0.14.7",
    "webpack": "^1.12.13"
  },
  "devDependencies": {
    "babel-loader": "^6.2.3",
    "babel-plugin-add-module-exports": "^0.1.2",
    "babel-plugin-react-html-attrs": "^2.0.0",
    "babel-plugin-transform-class-properties": "^6.5.2",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-preset-es2015": "^6.5.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "webpack-dev-server": "^1.14.1"
  }
}
```

### Webpack.config.js

```sh
var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
	context: __dirname + "",
	devtools: debug ? "inline-sourcemap" : null,
	entry: __dirname + "/client/entry.js",
	output: {
		path: __dirname + "/public_html",
		filename: "darkage.min.js"
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
	],
};
```

# Dillinger

Dillinger is a cloud-enabled, mobile-ready, offline-storage, AngularJS powered HTML5 Markdown editor.

  - Type some Markdown on the left
  - See HTML in the right
  - Magic

Markdown is a lightweight markup language based on the formatting conventions that people naturally use in email.  As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is *actually* written in Markdown! To get a feel for Markdown's syntax, type some text into the left window and watch the results in the right.

### Version
3.2.7

### Tech

Dillinger uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [Marked] - a super fast port of Markdown to JavaScript
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [keymaster.js] - awesome keyboard handler lib by [@thomasfuchs]
* [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

You need Gulp installed globally:

```sh
$ npm i -g gulp
```

```sh
$ git clone [git-repo-url] dillinger
$ cd dillinger
$ npm i -d
$ gulp build --prod
$ NODE_ENV=production node app
```

### Plugins

Dillinger is currently extended with the following plugins

* Dropbox
* Github
* Google Drive
* OneDrive

Readmes, how to use them in your own application can be found here:

* [plugins/dropbox/README.md] [PlDb]
* [plugins/github/README.md] [PlGh]
* [plugins/googledrive/README.md] [PlGd]
* [plugins/onedrive/README.md] [PlOd]

### Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma start
```

### Docker
Dillinger is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 80, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd dillinger
docker build -t <youruser>/dillinger:latest .
```
This will create the dillinger image and pull in the necessary dependencies. Once done, run the Docker and map the port to whatever you wish on your host. In this example, we simply map port 80 of the host to port 80 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 80:80 --restart="always" <youruser>/dillinger:latest
```

Verify the deployment by navigating to your server address in your preferred browser.

### N|Solid and NGINX

More details coming soon.

#### docker-compose.yml

Change the path for the nginx conf mounting path to your full path, not mine!

### Todos

 - Write Tests
 - Rethink Github Save
 - Add Code Comments
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [marked]: <https://github.com/chjj/marked>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [keymaster.js]: <https://github.com/madrobby/keymaster>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]:  <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
