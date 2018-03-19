var mongoose = require('mongoose');


var User = mongoose.model('user',{
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        minlength:1
    }
});


module.exports = {User};