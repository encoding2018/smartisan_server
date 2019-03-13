$(function () {
    let checkBtnState = false,
        reg = /(?:^1[3456789]|^9[28])\d{9}$/,
        signUpBtnState = false;
    /*显示重复密码*/
    $('.bdPwdBtn input').on('focus', function () {
        $('.bdPwdBox').slideDown();
    });
    /*获取验证码*/
    let btnState = true;
    /*获取验证码点击*/
    $('.acthCodeBtn').on('click', function () {
        /*处理验证码*/
        let phoneNumDom = $('.phoneText');
        /*注册按钮是否被激活 ,获取一次验证码后60s内按钮为禁用状态*/
        if (btnState) {
            /*手机号是否正确*/
            if (reg.test(phoneNumDom.val())) {
                $.ajax({
                    url: '/user/signup',
                    type: 'post',
                    data: {
                        act: 'acthCode',
                        phoneNum: phoneNumDom.val()
                    },
                    success: function (result) {
                        if (result.ok) {
                            T.info('验证码:' + result.Code, {time: 3000});
                            /*获取验证码后禁用按钮*/
                            btnState = false;
                            authCodeBtn_Down();
                        } else {
                            T.info(result.msg, {time: 2000});
                        }
                    }
                });

                /*成功获取到验证码后锁定按钮并开始倒计时*/
                function authCodeBtn_Down() {
                    let timeNum = 60,
                        btndom = $('.acthCodeBtn'),
                        textInterval = setInterval(function () {
                            numBtn();
                        }, 1000);
                    numBtn();

                    /*倒计时函数*/
                    function numBtn() {
                        btndom.css('color', 'rgb(229,229,229)');
                        btndom.val('重新发送' + '(' + timeNum + ')');
                        timeNum--;
                        if (timeNum === 0) {
                            clearInterval(textInterval);
                            btndom.val('获取验证码');
                            btndom.css('color', '#2ea5e5');
                            btnState = true;
                        }
                    }
                }
            } else {
                T.info('手机号格式错误', {time: 2000})
            }
        }
    });
    /*注册*/
    $('.signUpBtn').on('click', function () {
        let pwdDom1 = $('[name=pwd]').val().trim(),
            pwdDom2 = $('[name=pwd1]').val().trim(),
            phoneNum = $('[name=phoneNum]').val().trim();
        /*注册按钮是否激活*/
        if (signUpBtnState) {
            if (pwdDom1 === pwdDom2) {
                /*注册操作*/
                $.ajax({
                    url: '/user/signup',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        act: 'signup',
                        phoneNum: phoneNum,
                        acthCode: $('[name=acthCode]').val().trim(),
                        pwd: pwdDom1,
                    },
                    success: (items) => {
                        /*如注册成功自动登录*/
                        if (items.ok) {
                            T.info(items.msg + ':即将自动登录', {time: 3000});
                            setTimeout(() => {
                                $.ajax({
                                    url: '/user/signin',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {
                                        autoLog: true,
                                        username: phoneNum,
                                        password: pwdDom1,
                                    },
                                    success: (result) => {
                                        T.info(result.msg + '即将跳转', {time: 2000});
                                        window.location.href = '/';
                                    }
                                    ,
                                    error: () => {
                                        T.info('通讯错误', {time: 2000});
                                    }
                                });
                            }, 2000);
                        } else {
                            T.info(items.msg, {time: 2000});
                        }
                    },
                    error: () => {
                        T.info('通讯错误', {time: 2000});
                    }
                })
            } else {
                T.info('两次输入的密码不一致', {time: 2000});
            }
        }
        /*判断手机号*/
        if (!reg.test($('.phoneText').val().trim())) {
            T.info('手机号不正确', {time: 2000});
        }
    });
    /**/
    $('input').on('input', function () {
        inputState();
    });
    /*阅读法律声明*/
    $('.checkBtn').on('click', function () {
        $(this).toggleClass('checkBtnActive');
        inputState();
        checkBtnState ? false : true;
    });

    function inputState() {
        let reg1 = /(?:^1[3456789]|^9[28])\d{9}$/,
            state = true;
        $('input').each((i, v) => {
            if ($(v).val().trim() === '') {
                state = false;
            }
        });
        if (state && $('.checkBtnActive')[0] !== undefined && reg.test($('[name=phoneNum]').val())) {
            $('.signUpBtn').css('background', 'linear-gradient(rgb(111, 148, 232), rgb(81, 120, 223))');
            signUpBtnState = true;
        } else {
            $('.signUpBtn').css('background', 'linear-gradient(rgba(111, 148, 232, 0.5), rgba(81, 120, 223, 0.5))');
            signUpBtnState = false;
        }
    };
});

