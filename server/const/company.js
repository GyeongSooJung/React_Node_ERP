const COMPANY = {
    CNA : "CNA",
    CNU : "CNU",
    CAD : "CAD",
    CEON : "CEON",
    CEOP : "CEOP",
    CTEL : "CTEL",
    CFAX : "CFAX",
    CEM : "CEM",
    CCA : "CCA",
    CUA : "CUA",
    schema : {
        //Company Name
        CNA : {
            type : String,
            required : true
        },//Company Number
        CNU : {
            type : String,
            required : true,
            unique : true
        },//Company Address
        CAD : {
            type : String,
            required : true,
        },//CEO name
        CEON : {
            type : String,
            required : true,
        },//CEO Phone
        CEOP : {
            type : String,
            required : true,
        },//Company tel
        CTEL : {
            type : String,
            required : true,
        },//Company fax
        CFAX : {
            type : String,
            required : true,
        },//Company email
        CEM : {
            type : String,
            required : true,
        },//Comapny Create at
        CCA : {
            type : Date,
            default : Date.now
        },//Comapny Update at
        CUA : {
            type : Date,
            default : Date.now
        },
    }
}

exports.COMPANY = COMPANY;