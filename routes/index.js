const express = require('express');
const Router = express.Router();

const {query,httpResult} = require('../utils');
/*主页首次拉取数据*/
Router.post('/all', function(req, res, next){
        req.promise = query('CALL `p_getindexdata`(?,?)',[0,1])
                .then(result =>httpResult.success('',DataProcess(result)));
        next();
});

/*上拉加载数据*/
Router.post('/update',function(req,res,next){
        let {cid}=req.body;
        req.promise = query('CALL `p_getindexdata`(?,?)',[cid,0])
                .then(result => httpResult.success('',DataProcess([result[0],result[1]],true)));
        next();
});

// 主页商品分类数据加工
function DataProcess(data,state){
        let product = [],poster = {};
        data[0].forEach((v, i) => {
                let subTemp = {};
                subTemp.cid = v.indexcategorycid;
                subTemp.title = v.indexcategoryname;
                subTemp.data=data[1].filter(item => item.indexcid = v.indexcategorycid);
                product.push(subTemp);
        });
        if(state) return product; //上拉更新数据
        poster.top = data[2].filter(item => item.cid === 1);
        poster.bottom = data[2].filter(item => item.cid === 2);
        return {product,poster,banner:data[3],bannerMenu:data[4]}; //首页首次加载数据
}

module.exports = Router;
