require('dotenv').config();

module.exports = {
    mongoURI : 'mongodb://'+process.env.MONGO_ID+':'+process.env.MONGO_PWD+'@'+process.env.MONGO_IP+':'+process.env.MONGO_PORT+'/admin'
};