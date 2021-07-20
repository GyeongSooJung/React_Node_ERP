const USER = {
    name : "name",
    schema : {
        name : {
            type : String,
            maxlength : 50
        },
        email : {
            type : String,
            trim : true,
            unique : 1
        },
        password : {
            type : String,
            minlength : 5
        },
        lastname : {
            type : String,
            maxlength : 50
        },
        role : {
            type : Number,
            default : 0
        },
        image : String,
        token : {
            type : String
        },
        tokenExp : {
            type : Number
        }
    }
}

exports.USER = USER;