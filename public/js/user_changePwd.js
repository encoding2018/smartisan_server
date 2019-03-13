$(function () {
    //存储验证码
    let acthText = '';
    //获取初始验证码
    auth();
    //点击切换验证码
    let reg = /(?:^1[3456789]|^9[28])\d{9}$/;
    //重新获取验证码
    $('.authBox').on('click', () => {
        auth();
    });
    //图片验证码下一步按钮
    $('.prevBtn').on('click', function () {
        let userName = $('[name=use]').val().trim();
        if (reg.test(userName)) {
            if ($('[name=pwd]').val().trim() === acthText) {
                $.ajax({
                    url: '/user/changepwd',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        act: 'initialVerifyUser',
                        userName: userName
                    },
                    success: function (result) {
                        if (result.ok) {
                            window.location.href = '/user/changepwd/?state=verify'
                        } else {
                            T.info(result.msg, {time: 2000});
                        }
                    },
                    error: function () {
                        T.info('通讯错误', {time: 2000});
                    }
                })
            } else {
                T.info('验证码错误', {time: 2000})
                auth();
            }
        } else {
            T.info('手机号格式错误', {time: 2000})
        }
    });
    //验证身份下一步按钮
    $('.verifyPrevBtn').on('click', function () {
        $.ajax({
            url: '/user/changepwd',
            dataType: 'json',
            type: 'post',
            data: {
                act: 'judgeAuth',
                auth: $('.auth').val().trim(),
            },
            success: function (result) {
                console.log(result);
                if (result.ok) {
                    window.location.href = '/user/changepwd/?state=change'
                } else {
                    T.info(result.msg, {time: 2000});
                }
            },
            error: function () {

            }
        })
    });
    //修改密码确认按钮
    $('.affirmBtn').on('click', function () {
        let pwd1 = $('[name=pwd1]').val().trim(),
            pwd3 = $('[name=pwd2]').val().trim();
        if (pwd1 === pwd3) {
            if (pwd1.length >= 8) {
                $.ajax({
                    url: '/user/changepwd',
                    dataType: 'json',
                    type: 'post',
                    data: {
                        act: 'changePwd',
                        nwePwd: pwd1,
                    },
                    success: function (result) {
                        if (result.ok) {
                            T.info('修改成功即将跳转', {time: 2000}, function () {
                                window.location.href = '/user/signin'
                            });
                        } else {
                            T.info(result.msg, {time: 2000}, function () {
                                window.location.href = '/user/changepwd/?state=initial'
                            });
                        }
                    },
                    error: function () {
                        T.info('通讯错误', {time: 2000});
                    },
                })
            } else {
                T.info('密码最少8位任意字符', {time: 2000})
            }
        } else {
            T.info('两次输入的密码不相同', {time: 2000});
        }
    });
    //监听输入
    $('input').on('input', function () {
        if (reg.test($('[name=use]').val().trim()) && $('[name=pwd]').val().trim() !== '') {
            $('.prevBtn').addClass('active');
        } else {
            $('.prevBtn').removeClass('active');
        }
    });
    $('.auth').on('input', function () {
        if ($(this).val().trim() !== '') {
            $('.verifyPrevBtn').addClass('active');
        } else {
            $('.verifyPrevBtn').removeClass('active');
        }
    });
    let pwdDom = $('[name=pwd1]').add('[name=pwd2]');
    $(pwdDom).on('input', function () {
        if (pwdDom.eq(0).val().trim().length >= 8 && pwdDom.eq(1).val().trim().length >= 8) {
            $('.affirmBtn').addClass('active');
        } else {
            $('.affirmBtn').removeClass('active');
        }
    });
    /*获取验证码*/
    let btnState = true;
    /*获取短信验证码*/
    $('.acthCodeBtn').on('click', function () {
        /*处理验证码*/
        /*注册按钮是否被激活 ,获取一次验证码后60s内按钮为禁用状态*/
        if (btnState) {
            /*手机号是否正确*/
            $.ajax({
                url: '/user/changepwd',
                type: 'post',
                data: {
                    act: 'noteAuth',
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
                    btnDom = $('.acthCodeBtn'),
                    textInterval = setInterval(function () {
                        numBtn();
                    }, 1000);
                numBtn();

                /*倒计时函数*/
                function numBtn() {
                    btnDom.css({
                        color: 'rgb(153,153,153)',
                    });
                    btnDom.val('重新发送' + '(' + timeNum + ')');
                    timeNum--;
                    if (timeNum === 0) {
                        clearInterval(textInterval);
                        btnDom.val('获取验证码');
                        btnDom.css('color', '#2ea5e5');
                        btnState = true;
                    }
                }
            }
        }
    });


    //获取图片验证码
    function auth() {
        $.ajax({
            url: '/user/changepwd',
            type: 'post',
            dataType: 'json',
            data: {
                act: 'auth'
            },
            success: function (result) {
                $('.authBox svg').remove();
                $('.authBox').append($(result.data));
                acthText = result.text;
                console.log(acthText);
            }
        })
    }
});