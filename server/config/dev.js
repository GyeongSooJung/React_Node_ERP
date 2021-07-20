require('dotenv').config();

console.log("mongodb://"+process.env.MONGO_IP+":"+process.env.MONGO_PORT+"/admin");
module.exports =  {
    mongoURI : "mongodb://"+process.env.MONGO_IP+":"+process.env.MONGO_PORT+"/admin"
}