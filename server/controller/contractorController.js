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
 * update a contractor
 *
 *
 * @param params
 * @returns {Promise<*>}
 */
const updateContractor = async (params) => {
	const contractorData = params.actionData;

	try {

		const contact = new Contact({
			firstName: contractorData.firstName,
			lastName: contractorData.lastName,
			email: contractorData.email,
			phone: contractorData.phone,
			_id: contractorData.id
		});
		const contactorRec =  await Contact.updateOne({_id: contractorData.id}, contractor);
		return {
			success: true,
			record: contactorRec
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
	updateContractor,
	getAllContractors
}