const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema =  new mongoose.Schema({

    email:{
        type:String,
        trim:true,
        required:true,
        minlength:1,
        unique:true,
        validate: {
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7
    },
    tokens:[{
        access:{ 
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
    
});

UserSchema.methods.toJSON = function () {

    var user = this,
        userObject =  user.toObject();

    return _.pick(userObject,['_id','email']);

};

 UserSchema.methods.generateAuthToken = function () {

    // generate the token 
    var user = this,
        access = 'auth',
        token = jwt.sign({
            _id:user._id.toHexString(),
             access
            }, 'thesecret' ).toString();
    
    // push the token into the tokens array
    user.tokens.push({access,token});

    // save the user with the genrated token 
    return user.save()
    .then(() => {
        return token;
    });
 };

var User = mongoose.model('user',UserSchema);


module.exports = {User};