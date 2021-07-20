const EMPLOYEE = {
    EID : "EID",
    EPW : "EPW",
    ENA : "ENA",
    EAD : "EAD",
    EPH : "EPH",
    EEM : "EEM",
    EAU : "EAU",
    CNU : "CNU",
    ECA : "ECA",
    EUA : "EUA",
    schema  : {
        //Employee ID
        EID : {
            type : String,
        },//Employee PW
        EPW : {
            type : String,
        },//Employee Name
        ENA : {
            type : String,
        },//Employee Address
        EAD : {
            type : String,
        },//Employee Phone
        EPH : {
            type : String,
        },//Employee Email
        EEM : {
            type : String,
        },//Employee Authority
        EAU : {
            type : String,
        },
        //Company Number
        CNU : {
            type : String,
        },//Employee Create at
        ECA : {
            type : Date,
            default : Date.now
        },//Employee Update at
        EUA : {
            type : Date,
            default : Date.now
        }
    }
}

exports.EMPLOYEE = EMPLOYEE;