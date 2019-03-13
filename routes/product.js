const express = require('express');
const Router = express.Router();
const {query,httpResult} = require('../utils');

Router.post('/all', (req, res, next) => {                                                              // 商品数据
        let id = req.body.id;
        req.promise = query('CALL `p_getproductdata`(?)',[id])
                .then(result =>
                        httpResult.success('',{...result[0][0],data:result[1]}));
        next();
});

module.exports = Router;