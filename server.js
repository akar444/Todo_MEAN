var mongo = require('./server/mongo');

function initExpress() {
    var app,
        router,
        express = require('express'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        expressSession = require('express-session'),
        initPassport = require('./server/user/init');


    app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(expressSession({secret: 'mySecretKey'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/client'));
    initPassport(passport);
    router = require('./server/routes/routes')(passport);
    app.use('/', router);

    app.listen(8000, function() {
      console.log('Listening on http://localhost:8000');
    });
}

mongo.connectMongo(function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    initExpress();
  }
});
