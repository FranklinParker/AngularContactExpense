const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
	try{
		const token = req.header('x-auth');
		console.log('token:' + token);
		const decodedToken = jwt.verify(token, config.secret);
		req.userData = { email: decodedToken.email, userId: decodedToken.userId};
		next();

	}catch(e){
		res.status(401).json({message: 'Auth Failed'});

	}

};

