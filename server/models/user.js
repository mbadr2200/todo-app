const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByToken = function (token) {
    
    // search for the user with the token provided 
    var User = this,
    decoded;
    
    try{
        decoded = jwt.verify(token,'thesecret');
    }catch(e){
        return Promise.reject();
    }
    // return to chain then on the server js  
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
    
};

UserSchema.statics.findByCredentials = function(email,password){
    
    var User = this;
    
    return User.findOne({email}).then((user) => {
        
        if(!user){
            return Promise.reject();
        }
        
        return new Promise((resolve,reject) => {
            bcrypt.compare(password,user.password,(err,res) => {
                if(res){
                    resolve(user);
                }else{
                    reject();
                }     
            });
        });
    });
};


UserSchema.pre('save', function (next) {
    
    var user = this;
    
    if (user.isModified('password')){
        bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(user.password,salt,(err,hash) => {
                user.password = hash;
                next();
            });
        });
    }else{
        next()
    }
});

UserSchema.methods.removeToken = function (token) {
  
    var user = this;
    return user.update({
        $pull:{
            tokens:{token}
        }
    });

};

var User = mongoose.model('user',UserSchema);


module.exports = {User};