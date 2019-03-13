const express = require('express');
const Router = express.Router();
const {query,httpResult} = require('../utils');

Router.post('/all', function(req, res, next){ //分类页首次拉取数据
        let {cid} = req.body;
        req.promise = query('CALL `p_getcategorydata`(?,?)',[0,cid])
                .then(result =>httpResult.success('',categoryDataProcess(result)) );
        next();
});

Router.post('/update', function(req, res, next){ //分类页上拉更新数据
        let {cid} = req.body;
        req.promise = query('CALL `p_getcategorydata`(?,?)',[cid,0])
                .then(result => httpResult.success('',categoryDataProcess(result)) );
        next();
});

//分类数据加工
function categoryDataProcess(data){
        let temp = [];
        data[0].forEach((v) => {
                let subTemp = {};
                subTemp.cid = v.cid;
                subTemp.title = v.name;
                subTemp.avatar = v.avatar;
                subTemp.data=data[1].filter(item => item.categorycid===v.cid);
                temp.push(subTemp);
        });
        return temp;
}

module.exports = Router;