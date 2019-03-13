const express = require('express');
const Router = express.Router();

const {httpResult} = require('../utils');

Router.use('*',(req,res,next)=>{
        let reg = /\/all|\/update|^\/category|^\/user|^\/product/;                      /*不需要验证的地址*/
        if(reg.test(req.baseUrl)) next();
        else if(!req.session.username) res.send(httpResult.unlogin()); else next();
});


module.exports = Router;