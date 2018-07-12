const extend = Object.assign;

const testController = require('../controller/testController');
const userController = require('../controller/userController');
const contactController = require('../controller/contactController');


const checkAuth = require('../auth/checkAuth');
/**
 * method to parse all request objects and send to a method
 * that does not deal with request but a paramaterized request object
 *
 *
 * @param businessMethod
 * @param message
 * @returns {Function}
 */
const apiHandler = (businessMethod, message) => {
	return async function (req, res) {
		try {
			const result = await businessMethod({
				actionData: req.body || {},
				query: extend(extend({
						$method: req.method
					}, req.query || {}),
					req.params || {}),
				user: req.userData
			});
			res.status(201).json(result);
		} catch (e) {
			res.status(401).json({message: e.message});
		}
	}

}


module.exports.initRouter = (app) => {
	app.post('/api/register', apiHandler(userController.registerUser));
	app.post('/api/login', apiHandler(userController.login));
	//
	app.post('/api/contact',checkAuth, apiHandler(contactController.saveContact));
  app.put('/api/contact',checkAuth, apiHandler(contactController.updateContact));
  app.get('/api/contact',checkAuth, apiHandler(contactController.getContacts));

  app.get('/api/test/:id', apiHandler(testController.getData));
	app.get('/api/test',checkAuth, apiHandler(testController.getData));
	app.get('/api/testSecure', checkAuth, apiHandler(testController.getDataSecure));
	app.post('/api/testpost', checkAuth, apiHandler(testController.getDataPost));

}