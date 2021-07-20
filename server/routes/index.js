var express = require('express');
var router = express.Router();

const {User} = require('../schemas/schemas');

//query
const {modelQuery} = require('../schemas/query')
const {COLLECTION_NAME, QUERY} = require('../const/consts');


router.get('/', function (req, res, next) {
    res.end('index route / ');
})

router.post('/register', (req,res) => {
    
    const user = new User(req.body)
    
    user.save((err, userInfo) => {
        if (err) return res.json({ success : false, err})
        return res.status(200).json({
            success : true
        })
    })
    
});

router.post('/login', (req,res) => {
    
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            });

})



module.exports = router;