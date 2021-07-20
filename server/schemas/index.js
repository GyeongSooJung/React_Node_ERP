require('dotenv').config();
const mongoose = require('mongoose');

const config = require('../config/key');
console.log(config.mongoURI);

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(config.mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false,
        dbName: 'ERP'
    }, {
    }, (error) => {
        if (error) {
            console.log('DB Connection is Error', error);
        }
        else {
            console.log('DB Connect is SuccessFul!');
        }
    }).then(() => console.log("몽고연결"))
        .catch(err => console.log(err));
};
mongoose.connection.on('error', (error) => {
    console.error('DB Error', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('DB is disconnected, Continue to Connect DB');
    connect();
});

module.exports = connect;