const config = require('../config/config');
const User = require('../models/User').User;
const findUserConfirmPassword = require('../models/User').findUserConfirmPassword;

/**
 * register a user making sure the email does not exist
 *
 *
 * @param params
 * @returns {Promise<*>}
 */
const registerUser = async (params) => {
	const userData = params.actionData;

	try {
		const userSearchRec = await User.findOne({email: userData.email });

		if(userSearchRec){
			return {
				success: false,
				message: 'This Email/user exists'
			};
		}
		const user = new User({
			firstName: userData.firstName,
			lastName: userData.lastName,
			email: userData.email,
			password: userData.password
		});
		const userRecord = await user.save();
		return {
			success: true,
			record: userRecord
		};
	} catch (e) {
		return {
			success: false,
			message: e.message
		};
	}

};
/**
 * login and get a token
 *
 * @param params
 * @returns {Promise<*>}
 */
const login = async (params)=>{
	const user =  params.actionData;
	try{
		const loginResult = await findUserConfirmPassword(user.email,user.password);
		console.log('loginResult', loginResult);
		return loginResult;
	}catch(e){
		console.log('error', e);
		return {
			success: false,
			message: e
		};
	}
}

module.exports = {
	registerUser,
	login
}


