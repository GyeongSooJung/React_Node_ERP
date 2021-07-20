require('dotenv').config();
const mongoose = require('mongoose');

const config = require('../config/key')

const connect = () => {
    // const mongoCon = 'mongodb://test:test1234@18.140.74.102:9003/admin';
    
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(config.mongoURI, {dbName: 'ERP'}, {
    }, (error) => {
        if (error) {
            console.log('DB Connection is Error', error);
        }
        else {
            console.log('DB Connect is SuccessFul!');
        }
    }).then(()=>console.log('MongoDB Connected...'))
      .catch(err=>console.log(err));
};
mongoose.connection.on('error', (error) => {
    console.error('DB Error', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('DB is disconnected, Continue to Connect DB');
    connect();
});

module.exports = connect;