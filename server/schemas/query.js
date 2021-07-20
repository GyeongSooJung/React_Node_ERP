const mongoose = require('mongoose');
const { Schema } = mongoose; 

const { COMPANY,EMPLOYEE,
        COLLECTION_NAME, QUERY
      } = require('../const/consts'); //consts 파일들
      
const Schemas = require('./schemas')

const { Alarm, Car, Cardelete, Company,
       Device, Devicedelete, Goods, GoodsOption,
       History, Notice, Order, OrderDetail,
       Point, Publish, Worker, Workerdelete
       } = Schemas; // 몽구스 model 파일들

exports.modelQuery = async (query,collection,doc,option) => {
    var doc = doc;
    
    var Collection = Schemas[collection];
    
    // console.log(Collection.prototype.schema.options.collection);
    
    var option = option;
    var one;
    var postJob; // 임의로 지정해줄 수도 있고, option으로 받아올 수도 있음 (부가적인 함수)
    
    if(option.postJob) {
        postJob = option.postJob;
    }
    
    var resResult = (result) => { //함수가 끝나고 실행되는 콜백함수
      if (postJob != null) {
         postJob();
      }
      return result;
    };
    
    
    if ( query == QUERY.Aggregate) {
        var aggregatearray = [];
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            if (doc.addFields) {
                aggregatearray.push({$addFields : doc.addFields});
            }
            if (doc.lookup) {
                aggregatearray.push({$lookup : doc.lookup});
            }
            if (doc.unwind) {
                aggregatearray.push({$unwind : doc.unwind});
            }
            if (doc.match) {
                aggregatearray.push({$match : doc.match});
            }
            if (doc.project) {
                aggregatearray.push({$project : doc.project});
            }
            if (doc.sort) {
                aggregatearray.push({$sort : doc.sort});
            }
            if (doc.limit) {
                aggregatearray.push({$limit : doc.limit});
            }
        }
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            var one = await Collection.aggregate([aggregatearray]).then(resResult);
        }
        
        return one;
        
    }
    
    else if ( query == QUERY.Create) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            
        }
        
        if (Object.keys(option).length != 0) {
        
        }
        
        else {
            one = await Collection.create(doc).then(resResult);
        }
        
        return one;
        
    }
    
    else if ( query == QUERY.InsertMany) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            
        }
        
        if (Object.keys(option).length != 0) {
            
        }
        
        else {
            one = await Collection.InsertMany(doc).then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Find) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            if(doc.searchOption && doc.projectOption) {
                var searchOption = doc.searchOption;
                var projectOption = doc.projectOption;
                
                if (Object.keys(option).length != 0) {
                    if(option.skip && option.limit && option.sort) {
                        one = await Collection.find(searchOption,projectOption).skip(option.skip).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(!option.skip && option.limit && option.sort) {
                        one = await Collection.find(searchOption,projectOption).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(option.skip && !option.limit && option.sort) {
                        one = await Collection.find(searchOption,projectOption).skip(option.skip).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && option.limit && !option.sort) {
                        one = await Collection.find(searchOption,projectOption).skip(option.skip).limit(option.limit).then(resResult);     
                    }
                    else if(!option.skip && !option.limit && option.sort) {
                        one = await Collection.find(searchOption,projectOption).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && !option.limit && !option.sort) {
                        one = await Collection.find(searchOption,projectOption).skip(option.skip).then(resResult);       
                    }
                    else if(!option.skip && option.limit && !option.sort) {
                        one = await Collection.find(searchOption,projectOption).limit(option.limit).then(resResult);     
                    }
                }
                else {
                    one = await Collection.find(searchOption,projectOption).then(resResult);
                
                }
            }
            else {
                if (Object.keys(option).length != 0) {
                    if(option.skip && option.limit && option.sort) {
                        one = await Collection.find(doc).skip(option.skip).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(!option.skip && option.limit && option.sort) {
                        one = await Collection.find(doc).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(option.skip && !option.limit && option.sort) {
                        one = await Collection.find(doc).skip(option.skip).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && option.limit && !option.sort) {
                        one = await Collection.find(doc).skip(option.skip).limit(option.limit).then(resResult);     
                    }
                    else if(!option.skip && !option.limit && option.sort) {
                        one = await Collection.find(doc).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && !option.limit && !option.sort) {
                        one = await Collection.find(doc).skip(option.skip).then(resResult);       
                    }
                    else if(!option.skip && option.limit && !option.sort) {
                        one = await Collection.find(doc).limit(option.limit).then(resResult);     
                    }
                }
                else {
                    one = await Collection.find(doc).then(resResult);
                
                }
            }
        }
        
        return one;
    }
    
    else if ( query == QUERY.Findone) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            if(doc.searchOption && doc.projectOption) {
                var searchOption = doc.searchOption;
                var projectOption = doc.projectOption;
                
                if (Object.keys(option).length != 0) {
                    if(option.skip && option.limit && option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).skip(option.skip).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(!option.skip && option.limit && option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(option.skip && !option.limit && option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).skip(option.skip).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && option.limit && !option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).skip(option.skip).limit(option.limit).then(resResult);     
                    }
                    else if(!option.skip && !option.limit && option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && !option.limit && !option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).skip(option.skip).then(resResult);       
                    }
                    else if(!option.skip && option.limit && !option.sort) {
                        one = await Collection.findOne(searchOption,projectOption).limit(option.limit).then(resResult);     
                    }
                }
                else {
                    one = await Collection.findOne(searchOption,projectOption).then(resResult);
                
                }
            }
            else {
                if (Object.keys(option).length != 0) {
                    if(option.skip && option.limit && option.sort) {
                        one = await Collection.findOne(doc).skip(option.skip).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(!option.skip && option.limit && option.sort) {
                        one = await Collection.findOne(doc).limit(option.limit).sort(option.sort).then(resResult);   
                    }
                    else if(option.skip && !option.limit && option.sort) {
                        one = await Collection.findOne(doc).skip(option.skip).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && option.limit && !option.sort) {
                        one = await Collection.findOne(doc).skip(option.skip).limit(option.limit).then(resResult);     
                    }
                    else if(!option.skip && !option.limit && option.sort) {
                        one = await Collection.findOne(doc).sort(option.sort).then(resResult);     
                    }
                    else if(option.skip && !option.limit && !option.sort) {
                        one = await Collection.findOne(doc).skip(option.skip).then(resResult);       
                    }
                    else if(!option.skip && option.limit && !option.sort) {
                        one = await Collection.findOne(doc).limit(option.limit).then(resResult);     
                    }
                }
                else {
                    one = await Collection.findOne(doc).then(resResult);
                
                }
            }
        }
        return one;
        
    }
    
    else if ( query == QUERY.Update) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            var where = doc.where;
            var update = doc.update;
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.where(where).update(update).setOptions({ runValidators: true }).exec().then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Updatemany) {
        switch (collection) {
            case COLLECTION_NAME.Company : 
                
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            var where = doc.where;
            var update = doc.update;
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.where(where).updateMany(update).setOptions({ runValidators: true }).exec().then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Updateone) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            var where = doc.where;
            var update = doc.update;
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.where(where).updateOne(update).then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Updateupsert) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            var where = doc.where;
            var update = doc.update;
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.update(where,update,{upsert : true}).then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Remove) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.remove(doc).then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Count) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.count(doc).then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.CountDoc) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.countDocuments(doc).then(resResult);
        }
        
        return one;
    }
    
    else if ( query == QUERY.Distinct) {
        
        switch (collection) {
            case COLLECTION_NAME.Company : 
                break;
            case COLLECTION_NAME.Employee :
                break;
        }
        
        if(doc != undefined) {
            var where = doc.where;
            var distinct = doc.distinct;
        }
        
        if (Object.keys(option).length != 0) {
            if (option.limit) {
                
            }
            if (option.sort) {
                
            }
        }
        else {
            one = await Collection.where(where).distinct(distinct).then(resResult);
        }
        
        return one;
    }
};
