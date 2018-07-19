const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const ContractorSchema = new Schema({
	companyName: {type: String, required: true},
	servicesProvided: [String],
	address: {
		street: {type: String},
		city: {type: String},
		state: {type: String},
		zip: {type: String},
	},
	contacts: [{
		name: {type: String},
		description: {type: String},
		phone: {type: String},
		email: {type: String}
	}],
	invoices: [{
		description: {type: String},
		invoiceDate: {type: Date},
		invoiceLines: [{
			itemDescription: {type: String},
			amount: {type: Number}
		}]
	}]
});

const Contractor = mongoose.model('Contractor', ContractorSchema);

module.exports.Contractor = Contractor;
