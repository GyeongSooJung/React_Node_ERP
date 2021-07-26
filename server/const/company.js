const COMPANY = {
    CNA : "CNA",
    CNU : "CNU",
    CAD : "CAD",
    CEON : "CEON",
    CEOP : "CEOP",
    CTEL : "CTEL",
    CFAX : "CFAX",
    CEM : "CEM",
    CTY : "CTY",
    CTO : "CTO",
    CCA : "CCA",
    CUA : "CUA",
    schema : {
        //Company Name
        CNA : {
            type : String
        },//Company Number
        CNU : {
            type : String,
            unique : true
        },//Company Address
        CAD : {
            type : String,
        },//CEO name
        CEON : {
            type : String,
        },//CEO Phone
        CEOP : {
            type : String,
        },//Company tel
        CTEL : {
            type : String,
        },//Company fax
        CFAX : {
            type : String,
        },//Company email
        CEM : {
            type : String,
        },//Company type
        CTY : {
            type : String
        },//Company TOB
        CTO : {
            type : String
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