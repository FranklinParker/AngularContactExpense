const extend = Object.assign;

const userController = require('../controller/userController');
const contactController = require('../controller/contactController');

const contractorController = require('../controller/contractorController');


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
	app.post('/api/contact', checkAuth, apiHandler(contactController.saveContact));
	app.put('/api/contact', checkAuth, apiHandler(contactController.updateContact));
	app.get('/api/contact', checkAuth, apiHandler(contactController.getContacts));

	app.post('/api/contractor', checkAuth, apiHandler(contractorController.saveNewContractor));
	app.get('/api/contractor', checkAuth, apiHandler(contractorController.getAllContractors));
	app.put('/api/contractor', checkAuth, apiHandler(contractorController.updateContractor));


}