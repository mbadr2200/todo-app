var mongoose = require('mongoose');

mongoose.promise = global.promise;
// mongoose.connect('mongodb://admin:123321@ds115579.mlab.com:15579/orders');
mongoose.connect(process.env.MONGODB_URI||'mongodb://user:123@ds119049.mlab.com:19049/todo-app');

module.exports.mongoose = mongoose ;