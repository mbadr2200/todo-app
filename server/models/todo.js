var mongoose = require('mongoose');

var Todo = mongoose.model('Todo' , {
    text:{
        type:String,
        required: true,
        trim:true,
        minlength:1
    },
    completed:{
        type: Boolean,
        defualt:false
    },
    completedAt:{
        type:Number,
        defualt:null  
    }
});

module.exports = {Todo};