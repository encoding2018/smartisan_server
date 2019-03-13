$(function () {
    /*推出登陆按钮*/
    $('.logoutBtn').on('click', function () {
        $.ajax({
            url: '/user/signout',
            dataType: 'json',
            type: 'post',
            data: {
                act: 'signout'
            },
            success: (result) => {
                if (result.ok) {
                    T.info('退成登陆成功即将跳转到主页', {time: 2000}, () => {
                        window.location.href = '/';
                    });
                }
            },
            error: () => {

            }
        });
    });
});