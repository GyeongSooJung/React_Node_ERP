const EMPLOYEE = {
    EID : "EID",
    EPW : "EPW",
    ENA : "ENA",
    EAD : "EAD",
    EPH : "EPH",
    EEM : "EEM",
    EAU : "EAU",
    CID : "CID",
    ECA : "ECA",
    EUA : "EUA",
    schema  : {
        //Employee ID
        EID : {
            type : String,
            required : true
        },//Employee PW
        EPW : {
            type : String,
            required : true
        },//Employee Name
        ENA : {
            type : String,
            required : true
        },//Employee Address
        EAD : {
            type : String,
            required : true
        },//Employee Phone
        EPH : {
            type : String,
            required : true,
        },//Employee Email
        EEM : {
            type : String,
            required : true,
        },//Employee Authority
        EAU : {
            type : String,
        },
        //Company ID
        CID : {
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