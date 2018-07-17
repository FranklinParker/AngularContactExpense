const Contractor = require('../models/Contractor').Contractor;

/**
 * save a new contractor
 *
 *
 * @param params
 * @returns {Promise<*>}
 */
const saveNewContractor = async (params) => {
	const contractorData = params.actionData;
	console.log('contractorData', contractorData);
	try {
		const contactSearch = await Contractor.findOne({companyName: contractorData.companyName });
		console.log('contactSearch', contactSearch);
		if(contactSearch){
			return {
				success: false,
				message: 'This contractor name  exists'
			};
		}
		const contactor = new Contractor(
			contractorData
		);
		const contractorRec = await contactor.save();
		const numberRecords = await Contractor.count();
		return {
			success: true,
			record: contractorRec,
			numberRecords: numberRecords
		};
	} catch (e) {
		return {
			success: false,
			message: e.message
		};
	}

};


/**
 * update a contact
 *
 *
 * @param params
 * @returns {Promise<*>}
 */
const updateContact = async (params) => {
	const contactData = params.actionData;

	try {

		const contact = new Contact({
			firstName: contactData.firstName,
			lastName: contactData.lastName,
			email: contactData.email,
			phone: contactData.phone,
			_id: contactData.id
		});
		const contactRec =  await Contact.updateOne({_id: contactData.id}, contact);
		return {
			success: true,
			record: contactRec
		};
	} catch (e) {
		return {
			success: false,
			message: e.message
		};
	}

};
/**
 * get a list of contractors
 *
 * @param params
 * @returns {Promise<*>}
 */

const getAllContractors = async (params)=>{
	console.log('getAllContractors - params', params);
	const pageSize = params.query.pageSize;
	const currentPage = params.query.currentPage;
	const contactQuery = Contractor.find();
	const count = await Contractor.count();
	if (pageSize && currentPage) {
		contactQuery.skip(+pageSize * (+currentPage - 1))
			.limit(+pageSize);
	}
	try {
		const contractorRecords = await contactQuery;

		return {
			success: true,
			records: contractorRecords,
			numberRecords: count
		};
	} catch (e) {
		return {
			success: false,
			message: e.message
		};
	}
}


module.exports ={
	saveNewContractor,
	updateContact,
	getAllContractors
}