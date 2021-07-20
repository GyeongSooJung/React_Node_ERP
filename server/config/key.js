require('dotenv').config();

if(process.env.node_env === 'prod') {
    module.exports = require('./prod')
}
else {
    module.exports = require('./dev')
}