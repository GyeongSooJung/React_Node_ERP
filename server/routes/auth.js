var express = require('express');
var router = express.Router();

//Module
const bcrypt = require('bcrypt');
const xml2js = require('xml2js'); // xml 파싱 모듈
const axios = require('axios');
const request = require('request');

//query
const {modelQuery} = require('../schemas/query')
const {COLLECTION_NAME, QUERY} = require('../const/consts');

router.post('/signup', async (req, res, next) => {
    
    await modelQuery(QUERY.Create,COLLECTION_NAME.Company,{
      CNA : req.body.CNA,
      CNU : req.body.CNU,
      CAD : req.body.CAD,
      CEON : req.body.CEON,
      CEOP : req.body.CEOP,
      CTEL : req.body.CTEL,
      CFAX : req.body.CFAX,
      CEM : req.body.CEM
    },{})
    
    // await modelQuery(QUERY.Create,COLLECTION_NAME.Employee,{
    //   EID : req.body.CID,
    //   EPW : req.body.EPW,
    //   ENA : req.body.CEON,
    // },{})
    
    res.send({result : true});
})

router.post('/idcheck', async (req, res, next) => {
    try {
        const employeeone = await modelQuery(QUERY.Find,COLLECTION_NAME.Employee,{EID : req.body.EID},{});
        
        if(employeeone.length == 0) { 
        res.send({result : true});
        }
        else
        res.send({result : false});
    }
    catch(err) {
        console.log(err)
    }
})

// 사업자등록번호 검증
router.post('/cnucheck', async (req, res, next) => {
  const CNU = req.body.CNU;
  const CNU_CK = await postCRN(CNU);
  
  // Company Number check
  async function postCRN(crn){
    const postUrl = "https://teht.hometax.go.kr/wqAction.do?actionId=ATTABZAA001R08&screenId=UTEABAAA13&popupYn=false&realScreenId=";
    const xmlRaw = "<map id=\"ATTABZAA001R08\"><pubcUserNo/><mobYn>N</mobYn><inqrTrgtClCd>1</inqrTrgtClCd><txprDscmNo>{CRN}</txprDscmNo><dongCode>15</dongCode><psbSearch>Y</psbSearch><map id=\"userReqInfoVO\"/></map>";
      try {
        const result  = await axios.post(postUrl,xmlRaw.replace(/\{CRN\}/, crn),
          { headers: { 'Content-Type': 'text/xml' } });
        let CRNumber = await getCRNresultFromXml(result.data);
        
        if (CRNumber ==='부가가치세 일반과세자 입니다.') {
          CRNumber = "complete";
        } else {
          CRNumber = "failed";
        }
        
        const CRNone = await modelQuery(QUERY.Find,COLLECTION_NAME.Company,{CNU:CNU},{})
        if(CRNone.length != 0) {
            CRNumber = "duplicated"
        }
        
        
        return res.send({ CRNumber : CRNumber });
        
      } catch(err){
        console.error(err);
        next(err);
      }
          
  }
  
  function getCRNresultFromXml(dataString) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(dataString, // API 응답의 'data' 에 지정된 xml 값 추출, 파싱
        (err, res) => {
          if (err) reject(err);
          else resolve(res.map.trtCntn[0]); // trtCntn 이라는 TAG 의 값을 get
        });
    });
  }
});

module.exports = router;