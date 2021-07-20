const mongoose = require('mongoose');


const {
    USER,
    COMPANY,
    EMPLOYEE
} = require('../const/consts');

const { Schema } = mongoose;


const userSchema = new Schema(USER.schema, { collection : 'User'});
const companySchema = new Schema(COMPANY.schema, {collection : 'Company'});
const employeeSchema = new Schema(EMPLOYEE.schema, {collection : 'Employee'});

const User = mongoose.model('User',userSchema);
const Company = mongoose.model('Company',companySchema);
const Employee = mongoose.model('Employee',employeeSchema);

const COLLECTIONS = {
    "User" : User,
    "Company" : Company,
    "Employee" : Employee
}

module.exports = COLLECTIONS;