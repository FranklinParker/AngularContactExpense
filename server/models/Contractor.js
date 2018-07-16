const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const ContractorSchema = new Schema({
	companyName: {type: String, required: true},
	street: {type: String, required: true},
	contacts:[
		{name: String},
		{description: String}
	],
	servicesProvided:[String]
});
const Contractor = mongoose.model('Contractor', ContractorSchema);

module.exports.Contractor = Contractor;
