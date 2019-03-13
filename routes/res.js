const express = require('express');
const Router = express.Router();

Router.use('*',(req,res,next)=>{
        if(!req.promise) {next(); return}
        req.promise
                .then(result=>{
                        res.send(result); //返回数据
                })
                .catch(error=>{
                        res.send(error) //服务器错误
                });

});

module.exports=Router;