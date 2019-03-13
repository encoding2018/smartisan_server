const express = require('express');
const Router = express.Router();
const {query,httpResult,resPromise} = require('../utils');

/*添加订单并删除购物车信息*/
Router.post('/add',(req,res,next)=>{
        let {username:name} = req.session, {price,state,pid,siteId} = req.body,time=new Date().toLocaleString();
        let sql='INSERT `dt_orderpid` (`orderid`,`orderpid`,`userid`,`ordernum`) VALUES (?,?,?,?)',
                sql2 = 'DELETE from `dt_cartdata` where `userid` = ? AND `cartpid` in (?)';
        query('CALL `p_order`(?,?,?,?,?)',[name,time,state,price,siteId])
                .then(result=>{
                        let {userid,orderid} = result[0][0],pidS=[];
                        pid.forEach(({pid,num})=>{query(sql,[orderid,pid,userid,num]);pidS.push(pid);});
                        return {pidS,userid};
                })
                .then(({pidS,userid})=>{query(sql2,[userid,pidS])})
                .then(()=>httpResult.success('',{ok:true,msg:'提交成功'}))
                .then(result=>req.promise=resPromise(result))
                .then(()=>next())
});

/*获取订单信息*/
Router.post('/get', (req, res, next)=>{
        req.promise = query('CALL `p_getorder`(?)', [req.session.username])
                .then(result =>
                        httpResult.success('',{ok: true, order: result[0], orderProduct: result[1]}));
        next();
});
module.exports = Router;