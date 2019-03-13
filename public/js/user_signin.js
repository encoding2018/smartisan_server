$(function () {
    let reg = /(?:^1[3456789]|^9[28])\d{9}$/,
        signinBtnState = false;
    /*自动登录按钮*/
    $('.checkBtn').on('click', function () {
        $(this).toggleClass('checkBtnActive');
    });
    /*判定输入内容 正确 登陆按钮高亮*/
    $('input').on('input', function () {
        let inputState = true,
            btnDom = $('.signInBtn');
        $('input').each((i, v) => {
            if ($(v).val().trim() === '') {
                inputState = false;
            }
        });
        if (inputState && reg.test($('[name=use]').val().trim())) {
            btnDom.css('background', 'linear-gradient(rgba(111, 148, 232, 1), rgba(81, 120, 223, 1))');
            signinBtnState = true;
        } else {
            btnDom.css('background', 'linear-gradient(rgba(111, 148, 232, 0.5), rgba(81, 120, 223, 0.5))');
            signinBtnState = false;
        }
    });
    /*登录*/
    $('.signInBtn').on('click', function () {
        let useDom = $('[name=use]').val().trim(),
            pwdDom = $('[name=pwd]').val().trim();

        if (reg.test(useDom)) {
            if (pwdDom !== '') {
                if (signinBtnState) {
                    /*自动登录是否勾选*/
                    let autoLogState = true;
                    $('.checkBtnActive') === undefined ? autoLogState = false : autoLogState = true;
                    $.ajax({
                        url: '/user/signin',
                        dataType: 'json',
                        type: 'post',
                        data: {
                            autoLog: autoLogState,
                            username: useDom,
                            password: pwdDom
                        },
                        success: (result) => {
                            if (result.ok) {
                                T.info(result.msg + '即将跳转', {time: 2000});
                                setTimeout(() => {
                                    window.location.href = $.cookie('url');
                                }, 2000)
                            } else {
                                T.info(result.msg, {time: 2000});
                            }
                        }
                        ,
                        error: () => {
                            T.info('通讯错误', {time: 2000});
                        }
                    });
                }
            } else {
                T.info('密码不能为空', {time: 2000});
            }
        } else {
            T.info('手机号格式错误', {time: 2000});
        }
    });
});