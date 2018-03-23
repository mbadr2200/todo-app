var mongoose = require('mongoose');

mongoose.promise = global.promise;
// mongoose.connect('mongodb://admin:123321@ds115579.mlab.com:15579/orders');
mongoose.connect(process.env.MONGODB_URI);


module.exports.mongoose = mongoose ;