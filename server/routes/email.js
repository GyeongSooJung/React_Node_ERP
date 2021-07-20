//Express
const express = require('express');
const router = express.Router();
//Module
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
//Schemas
const {modelQuery} = require('../schemas/query')
const {COLLECTION_NAME, QUERY} = require('../const/consts');

// -- Start Code -- //

// nodemailer 설정
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "mk.manager2020@gmail.com",
      pass: "yqjxicpqomgtowig"
  },
  tls: {
      rejectUnauthorized: false
  }
});

// 이메일 전송
router.post('/send', async (req, res, next) => {
  const reademailaddress = req.body.EEM;
  
  const exEA = await modelQuery(QUERY.Find,COLLECTION_NAME.Company,{ "EA" : reademailaddress },{});
  try {
    // 이메일이 중복됐을 때
    if(exEA.length != 0) {
      return res.send({ result : 'exist' });
    }
    else {
      let authNum = Math.random().toString().substr(2,6);
      console.log(authNum);
      const hashAuth = await bcrypt.hash(authNum, 12);
      console.log(req.cookies)
      const mailOptions = {
        from: "mk.manager2020@gmail.com",
        to: reademailaddress,
        subject: "MK_ERP 인증번호 관련 메일 입니다.",
        text: "인증번호는 " + authNum + " 입니다.",
        html: "<div style='font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 540px; height: 600px; border-top: 4px solid #348fe2; margin: 100px auto; padding: 30px 0; box-sizing: border-box;'>"+
              "<h1 style='margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;'>"+
              "<span style='font-size: 15px; margin: 0 0 10px 3px;'>MK_</span><br />"+
              "<span style='color: #348fe2;'>인증번호</span> 안내입니다."+
              "</h1>"+
              "<p style='font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;'>"+
              "안녕하세요.<br />"+
              "요청하신 인증번호가 생성되었습니다.<br />"+
              "감사합니다."+
              "</p>"+
              
              "<p style='font-size: 16px; margin: 40px 5px 20px; line-height: 28px;'>"+
              "인증번호: <br />"+
              "<span style='font-size: 24px;'>"+authNum+"</span>"+
              "</p>"+
              "<div style='border-top: 1px solid #DDD; padding: 5px;'>"+
              "</div>"+
              "</div>",
      };
      await smtpTransport.sendMail(mailOptions, (err, res) => {
        if(err) {
          console.log(err);
        } else{
          console.log('success');
        }
        smtpTransport.close();
      });
      
      return res.send({ result : 'send', hashAuth : hashAuth });
    }
  } catch (err) {
    res.send({ result : 'fail' });
    console.error(err);
    next(err);
  }
});

// 이메일 인증
router.post('/cert', async (req, res, next) => {
  const CEA = req.body.CEA;
  const CEA2 = req.body.CEA2;
  console.log(CEA,CEA2,bcrypt.compareSync(CEA, CEA2))
  
  try {
    if(bcrypt.compareSync(CEA, CEA2)) {
      res.send({ result : 'success' });
    }
    else {
      res.send({ result : 'fail' });
    }
  } catch(err) {
    res.send({ result : 'fail' });
    console.error(err);
    next(err);
  }
});

module.exports = router;