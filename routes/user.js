const express = require('express');
const svgCaptcha = require('svg-captcha');
const Router = express.Router();

const {query,httpResult,resPromise} = require('../utils');

let loginActhCode = {},         /*验证码容器                   ---键：用户名 || 值：验证码 */
     changePwdState = {};      /*修改密码权限存储              ---键：用户名 || 值：布尔值*/

/*修改密码*/
Router.post('/changepwd', function(req, res,next){
        switch(req.body.act){
                case 'pictureAuth': //获取图片验证码
                        let svg = svgCaptcha.createMathExpr({size: 5});         //生成验证码
                        req.promise = resPromise(httpResult.success('',svg));
                        next();
                        break;
                case 'initialVerifyUser': //查询用户是否存在
                        let username = req.body.phoneCode;
                        req.promise = query('CALL `p_getuserstate`(?)', [username])
                                .then(result => {
                                        let {result:msg} = result[0][0],state = msg==='';
                                        return httpResult.success('',{ok:state,msg});
                                });
                        next();
                        break;
                case'noteAuth': //获取手机验证码
                        let Code = setAuth(req.body.phoneCode);
                        req.promise = resPromise(httpResult.success('',{ok: true, Code}));//返回验证码
                        next();
                        break;
                case'judgeAuth': //短信验证码 身份验证
                        let {authCode,phoneCode} = req.body,
                                serverCode = loginActhCode[phoneCode];
                        if(parseInt(authCode) === parseInt(serverCode)){                   //验证码---正确
                                req.promise = resPromise(httpResult.success('',{ok:true}));
                                next();
                                changePwdState[phoneCode] = true;                               //加入密码修改权限
                                req.session.changeUsername = phoneCode;                     //存储要修改的用户名
                                setTimeout(() => {                                              //修改权限2分钟后失效
                                       delete changePwdState[phoneCode];
                                }, 12000);
                                delete loginActhCode[phoneCode];                                  //验证码失效
                        }else{                                                                                        //验证码---错误
                                req.promise = resPromise(httpResult.success('',{ok:false,msg: '验证码错误'}));
                                next();
                                delete loginActhCode[phoneCode];                                  //验证码失效
                        }
                        break;
                case 'changePwd': // 修改密码
                        let {changeUsername} = req.session,{pwd}=req.body;
                        req.promise = query('CALL `p_setuserpwd`(?,?)',[changeUsername,pwd])
                                .then(result=>{
                                        let {result:msg} = result[0][0],state = msg==='';
                                        delete changePwdState[changeUsername];              //删除密码修改状态
                                        delete req.session.username;                                    //清除登陆状态
                                        return httpResult.success('',{ok:state,msg});
                                });
                        next();
                        break;
        }
});
/*登陆*/
Router.post('/signin', function(req, res,next){
        let {username,password} = req.body;
        req.promise = query('CALL `p_signin`(?,?)', [username, password])
                .then(result => {
                        let {result:msg}= result[0][0],state = msg ==='';
                        if(state) req.session.username = username;                              //登陆成功 存储用户名
                        return httpResult.success('',{ok:state,msg});
                });
        next();
});
/*注册*/
Router.post('/signup', function(req, res,next){
        switch(req.body.act){
                case 'acthCode'://获取验证码
                        let {phoneCode} = req.body;
                        req.promise = query('CALL `p_signup`(?,?,?)', [1, phoneCode, 0])
                                .then(result => {
                                        let {result:msg} = result[0][0],state = msg==='';       //如手机号未被注册 返回验证码
                                        return httpResult.success('',{ok:state,msg:state ? setAuth(phoneCode): msg });
                                });
                        next();
                        break;
                case 'signup'://注册
                        let {phoneCode:phone,msgCode,password} = req.body;
                        /*判断验证码*/
                        if(parseInt(loginActhCode[phone]) === parseInt(msgCode)){
                                /*添加用户数据*/
                                req.promise = query('CALL `p_signup`(?,?,?)', [0, phone, password])
                                        .then(result => {
                                                let {result:msg} = result[0][0],state = msg==='';
                                                return httpResult.success('',{ok:state,msg}); //返回注册状态
                                        });
                                delete loginActhCode[phone];                                          //注册成功验证码失效
                                req.session.username = phone;                                         //注册成功后自动登录
                                next();
                        }else{ //验证码不匹配
                                req.promise = resPromise(httpResult.success('', {ok: false, msg: '验证码错误'}));
                                next();
                        }
                        break;
        }
});
/*个人信息*/
Router.post('/account', function(req, res,next){
        let {username} = req.session,state = !!username;
        req.promise = resPromise(httpResult.success('', {ok:state,username}));
        next();
});

/*退出登录*/
Router.post('/signout', function(req, res,next){
        delete req.session.username;
        req.promise = resPromise(httpResult.success('', {ok:true}));
        next();
});
//验证码创建，存储函数
function setAuth(uId){
        /*创建随机4位验证码*/
        let acthCode = '';
        for(let i = 0; i < 4; i++){
                acthCode += '' + parseInt(Math.random() * 10);
        }
        /*记录验证码*/
        loginActhCode[uId] = acthCode;
        /*5分钟后失效*/
        setTimeout(function(){
                loginActhCode[uId] = undefined;
        }, 1000 * 60 * 5);
        return acthCode;
}

module.exports = Router;
