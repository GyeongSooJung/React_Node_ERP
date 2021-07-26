var express = require('express');
var router = express.Router();

//리스트 배열 보내기
router.post('/', function (req, res, next) { 
    res.send({id : "@@@@@"});
})

//데이터 삭제하기
router.post('/delete', function (req, res, next) {
    
    console.log("delete : " + JSON.stringify(req.body));
    //삭제 성공했을 때 rows를 비워주기위해 다시 보내야함
    res.send({result : true, deleteData : {}});
})

//데이터 등록하기
router.post('/create', function (req, res, next) {
    
    console.log("create : " + JSON.stringify(req.body));
    
    res.send({result : true, createDate : {}});
})


module.exports = router;