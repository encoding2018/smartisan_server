const express = require('express');
const Router = express.Router();
const {query,httpResult} = require('../utils');

/* get用户购物车数据 */
Router.post('/all', (req, res, next) => {
        let username = req.session.username;
        req.promise = query('CALL `p_getcart`(?)', [username])
                .then(result => httpResult.success('',{ok: true, data: result[0]}));
        next();
});

/*添加购物车操作*/ /*购物车商品 +1 也是再次实现*/
Router.post('/add', (req, res, next) => {
        req.promise = query('CALL `p_changecart`(?,?,?,?)', [1,req.session.username, req.body.pid, req.body.num])
                .then(result =>
                        httpResult.success('',{ok:true,msg:result[0][0].result!==1?'添加成功':'当前商品达到上限'}));
        next();
});

/*购物车商品-1*/
Router.post('/reduce', (req, res, next) => {
        let {pid} = req.body,{username} = req.session;
        req.promise = query('CALL `p_changecart`(2,?,?,0)',[username,pid])
                .then(result=>httpResult.success('',{ok:true}));
        next();
});

/*删除购物车商品*/
Router.post('/remove',(req,res,next)=>{
        let {pidArr} = req.body;
        req.promise = query('delete from `dt_cartdata` where `cartid` in (?)', [ pidArr ])
                .then(result=>httpResult.success('',{ok:true}));
        next();
});


module.exports = Router;