const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	street: {type: String},
	city: {type: String},
	state: {type: String},
	zip: {type: String},
});

const ContractorSchema = new Schema({
	companyName: {type: String, required: true},
	address: AddressSchema,
	contacts:[
		{name: String},
		{description: String}
	],
	servicesProvided:[String]
});

const Contractor = mongoose.model('Contractor', ContractorSchema);

module.exports.Contractor = Contractor;
