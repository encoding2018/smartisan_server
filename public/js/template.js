$(() => {
        /*nav菜单弹出*/
        $('.menu-btn').on('click', () => {
                $('.nav-menu').toggleClass('nav-menu-active');
        });
        /*后退至上一页*/
        $('.btn.back').on('click', () => {
                history.go(-1);
        });
        /*记录前一页*/
        $(window).on('unload', () => {
                let url = location.pathname,
                        cookieUrl = $.cookie('url');
                if(!/^\/user/.test(url) && cookieUrl !== url){
                        $.cookie('url', url, {exports: '7', path: '/'});
                }
        });
        /*获取购物车商品数量*/
        getCartProductNum();
});
/*T.info提示信息*/
const T = {
        /*提示信息*/
        info: (t, j, f) => {
                /*删除正在显示中的dom*/
                $('.Info').remove();
                /*创建dom并接受参数进行显示*/
                let showDom = $('<div class="Info">' + t + '</div>').hide().css('zIndex', '999');
                $('body').append(showDom);
                if(j.time != undefined){
                        T.assist.timingRemove(showDom, j.time, f)
                }else{
                        if(j.time === 0){
                        }else T.assist.timingRemove(showDom, 2000, f);
                }
                /*使元素居中*/
                T.assist.middle(showDom);
        },
        confirmInfo: (text, j, f) => {
                let tText = '',
                        tBtnText = [];
                console.log(j.btn[0]);
                j.btn?tText = j.title:tText = '提示';
                if(j.btn){
                        tBtnText[0] = j.btn[0];
                        tBtnText[1] = j.btn[1]
                }else{
                        tBtnText[0] = '取消';
                        tBtnText[1] = '确定';
                }
                let wrapper = $('<div></div>').css('z-index', '999').hide();
                wrapper.append($('<div>' + tText + '</div><div>' + text + '</div><div><div class="btn">' + tBtnText[0] + '</div><div class="confirmBtn btn">' + tBtnText[1] + '</div></div>'));
                /*点击任意按钮关闭弹窗*/
                wrapper.find('.btn').on('click', () => {
                        T.assist.mask(false);
                });
                /*确定点击*/
                wrapper.find('.confirmBtn').on('click', () => {
                        T.assist.mask(false);
                        if(f) f();
                });
                /*将元素插入body*/
                $('body').append(wrapper.attr('class', 'confirmInfo T').fadeIn(100));
                /*加入动画*/
                wrapper.fadeIn(200);
                /*插入遮罩层*/
                T.assist.mask(true);
                /*使元素居中*/
                T.assist.middle(wrapper, true);
        },
        assist: {//辅助函数
                middle: (dom, state) => { /*使元素居中*/
                        let rShowDom = dom,
                                showDomW = rShowDom.css('width'),
                                showDomH = rShowDom.css('height'),
                                numW = parseInt(showDomW.replace('px', '') * 0.5),
                                numH = parseInt(showDomH.replace('px', '') * 0.5);
                        rShowDom.css('marginLeft', '-' + numW + 'px');
                        if(state){
                                rShowDom.css('marginTop', '-' + numH + 'px');
                        }
                        rShowDom.fadeIn(300);
                },
                timingRemove: (dom, time, f) => { /*定时删除元素并执行回调*/
                        if(!time) time = 2000;
                        setTimeout(() => {
                                dom.fadeOut(() => {
                                        dom.remove()
                                });
                                if(f) f();
                        }, time);
                },
                mask: (state) => {//遮罩层
                        let dom = $('<div class="shade" style="display: block;height: 100%;"></div>').hide();
                        if(state){
                                $('body').append(dom);
                                dom.fadeIn(100);
                        }else{
                                removeDom();
                        }

                        dom.on('click', () => {
                                removeDom();
                        });

                        /*移除遮罩及正在弹出的窗口*/
                        function removeDom(dom){
                                let TDomS = $('.T').add($('.shade'));
                                TDomS.fadeOut(200, () => {
                                        TDomS.remove();
                                })
                        }
                }
        }
};

function getCartProductNum(){
        $.ajax({
                url: '/cart/getnum',
                type: 'post',
                dataType: 'json',
                data: {
                        getNum: true,
                },
                success: (result) => {
                        let numDom = $('.cart-bubble');
                        if(result.num === 0){
                                numDom.fadeOut();
                        }else{
                                numDom.fadeIn();
                                numDom.text(result.num);
                        }
                }
        })
};