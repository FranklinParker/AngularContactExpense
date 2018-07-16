const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ContractorSchema = new Schema({
	companyName: {type: String, required: true},
	servicesProvided:[String],
	address: {
		street: {type: String},
		city: {type: String},
		state: {type: String},
		zip: {type: String},
	},
	contacts:[
		{name: String},
		{description: String},
		{phone: String},
		{email: String}
	]
});

const Contractor = mongoose.model('Contractor', ContractorSchema);

module.exports.Contractor = Contractor;
