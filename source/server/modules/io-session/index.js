var config = {};
config.server = {
	host: 'localhost',
	port: 6379,
	ttl: 7 * 24 * 60 * 60, // 7 days
	db: 0, // integer
	// pass: 'password'
};
config.secret = 'node-project-(9:)&*(&*TIH%)*&(*T0989yuih74z7Z3jV!gmp5p*@#^Gball';
config.key = 'node-project-session';

var session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	sessionStore = new RedisStore(config.server);

module.exports = ['http', function (io, http) {
	var _plugin = io.register('session');
	http.use(session({
		name: config.key,
		resave: true, // Don't save session if unmodified
		saveUninitialized: true, // Create session each time
		store: sessionStore,
		secret: config.secret,
		cookie: {
			secure: false
		}
	}));
}];