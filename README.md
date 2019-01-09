# koa-usercenter-system
This is a user center system which use koa.js, mysql, js, html, css, reactJs to code it.

# the system directories
```
.
├── app
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   │   ├── api
│   │   ├── page
│   │   └── web
│   ├── services
│   └── utils
├── bin
├── config
├── front-end
│   └── admin
│       ├── public
│       └── src
├── logs
├── public
│   ├── admin
│   │   └── static
│   └── error
│       └── css
├── test
└── uploads
    └── images
```

# how to use
before you use, you should copy database.config.example.js,server.config.exmaple.js in config dir.
```sh
$ cd confg
$ copy database.config.example.js database.config.js
$ copy server.config.example.js server.config.js
```
And then, according to your actual situation, you can modify these 2 config file.
- PS.  The config file is relatively simple, so I don't want to explain detail.
```sh
$ vim  config.file.
```

At last, you should do install lib, and run it.
```sh
$ npm install
// if your environment is dev, you should use:
// the first command is webpack build in dev, and the second is run serve.
$ npm run dev && npm run serve
// if your environment is production, you should make sure you had installed pm2.
// if your not installed pm2, you can use this command to installed it.
$ npm install -g pm2
// you shoud build it before you use pm2;
$ npm run build
// and then use this command to deploy system.
$ npm run start:prod
```

# how to build

the front end use react, and use create-recat-app to create app, so you can:
```sh
$ cd front-end/admin
// dev environment
$ npm run start
// prod environment
$ npm run build

// all command you can see package.json
```

# The last.
 If you have any question, you can submit issuse for me.
 
# License

[MIT](LICENSE)