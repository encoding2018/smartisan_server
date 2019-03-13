const express = require('express');
const Router = express.Router();
const {query, httpResult} = require('../utils');

/*新增地址*/
Router.post('/add', function(req, res, next){
        let username = req.session.username;
        let {name, phone, areaCode, fixedLinePhone, detailedSite, province, city, dist} = req.body;
        req.promise = query('CALL `p_addsite`(?,?,?,?,?,?,?,?,?)',
                [username,name, phone, areaCode, fixedLinePhone, detailedSite, province, city, dist])
                .then(result => httpResult.success('',{ok:true}));
        next();
});
/*获取地址*/
Router.post('/get', function(req, res, next){
        let {username} = req.session;
        req.promise = query('CALL `p_getsite`(?)', [username])
                .then(result =>
                        httpResult.success('',{ok: true, data: result[0]}));
        next();
});
/*修改信息*/
Router.post('/change', function(req, res, next){
        switch(req.body.act){
                case 'get':
                        req.promise = query('select * from `dt_site` where `id` = ?', [req.body.id])
                                .then(result =>
                                        httpResult.success('', result[0]));
                        next();
                        break;
                case 'change':
                        const {name,phone,areaCode,fixedLinePhone,detailedSite,province,city,dist,id} = req.body.data;
                        let sql = 'update `dt_site` set `name` = ?,`phone` = ?,areaCode = ?,`fixedLinePhone` = ?,`detailedSite`=?,`province` = ?,`city`=?,`dist`=? where `id` = ?';
                        let data = [name,phone,areaCode,fixedLinePhone,detailedSite,province,city,dist,id];
                        req.promise = query(sql, data)
                                .then(result =>httpResult.success('',{ok:true}));
                        next();
                        break;
                case 'remove':
                        req.promise = query('delete from `dt_site` where `id` = ?', [req.body.id])
                                .then(() =>httpResult.success('',{ok: true}));
                        next();
                        break;
        }
});

module.exports = Router;
