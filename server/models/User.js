const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const config = require('../config/config');
const jwt = require('jsonwebtoken');


const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  roles: [{type: String}]
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        next(new Error('error gen salt'));
      } else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            next(new Error('error gen salt'));
          }
          user.password = hash;
          next();
        });
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email','firstName','lastName','roles']);
};

UserSchema.plugin(mongooseUniqueValidator);


const User = mongoose.model('User', UserSchema);

const findUserConfirmPassword = async (email, password) => {
    try{
			const user = await User.findOne({email: email});
			if(!user){
			  return {
			    success: false,
          message: 'Invalid Login'
        }
      }
			const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch){
				const token = jwt.sign({email: user.email, userId: user._id},
					config.secret, {expiresIn: config.expireJwtSeconds});
				return {
					success: true,
					record: user,
          token: token,
					expiresInSeconds: config.expireJwtSeconds
				}
      }else{
				return {
					success: false,
					message:  'Invalid Login'
				}
      }


		}catch(e){
			return {
				success: false,
				message: 'Login Failed - System Error'
			}

    }



}

module.exports.findUserConfirmPassword = findUserConfirmPassword;

module.exports.User = User;
