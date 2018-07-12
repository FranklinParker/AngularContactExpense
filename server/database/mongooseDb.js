const mongoose = require('mongoose');
const config = require("../config/config");
console.log('db connection:', config);

function connectToDb() {
	const promiseLib = global.Promise;
	mongoose.Promise = global.Promise;
	const mongoDB = mongoose.connect(config.dbUrl, {
		promiseLibrary: promiseLib // Deprecation issue again
	});
	mongoDB
		.then(function (db) {
			console.log('Mongodb has been connected ');
		}).catch(function (err) {
		console.log('Error while trying to connect with mongodb');
		throw err;
	});
}

module.exports.connectToDb = connectToDb;



