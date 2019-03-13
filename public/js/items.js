$(() => {
        const mySwiper = new Swiper('.swiper-container', {
                autoplay: true,
        });
        /*属性菜单栏------*/
        /*打开属性菜单*/
        $('.selectType').on('click', () => {
                $('.content').animate({scrollTop: 0}, 100);
                controlMenu(true);
        });
        /*点击遮罩层关闭属性菜单*/
        $('.shade').on('click', () => {
                controlMenu(false);
        });
        /*加入购物车*/
        $('.addCart').on('click', () => {
                /*发送加入购物车请求*/
                $.ajax({
                        url: '/cart/add',
                        type: 'post',
                        dataType: 'json',
                        data: {
                                pid: window.location.pathname.replace('/items/', ''),
                                pName: $('.pName').text(),
                                price: $('.productInfo .price>span:last-child').text(),
                                pType: getType(),
                                pTitle: $('.productInfo .text.pTitle').text(),
                                pNum: $('.typeTextBox>div>div:last-child .cTitle').text().trim(),
                        },
                        success: (result) => {
                                /*关闭窗口*/
                                controlMenu(false, () => {
                                        /*调用通知信息弹出函数*/
                                        if(result.ok){
                                                T.info('加入购物车成功', {time: 1000});
                                                getCartProductNum();
                                        }else{
                                                if(result.login){
                                                        T.info(result.msg, {time: 2000});
                                                        getCartProductNum();
                                                        buyBtn
                                                }else{
                                                        T.info(result.msg, {time: 2000}, () => {
                                                                window.location.href = '/user/signin'
                                                        });
                                                }
                                        }
                                });
                        },
                        error:
                                () => {
                                        T.info('请求服务器失败', {time: 1000});
                                }
                });

                function getType(){
                        let pDataTemp = '',
                                tDom = $('.typeTextBox .cTitle');
                        for(let i = 0; i < tDom.length - 1; i++){
                                if(i >= 1){
                                        pDataTemp += ' • ' + $(tDom[i]).text();
                                }else{
                                        pDataTemp += $(tDom[i]).text();
                                }
                        }
                        return pDataTemp;
                }
        });
        /*数量加减*/
        $('.numBtn>div').on('click', (e) => {
                let Dom = $(e.target),
                        numDom = $('.number'),
                        number = parseInt(numDom.text());
                switch(Dom.attr('class')){
                        case $('.addNum').attr('class') :
                                if(number !== 3) number++; else T.info('达到最大购买数量', {time: 1000});
                                break;
                        case $('.minus').attr('class') :
                                if(number !== 1) number--;
                                break;
                }
                numDom.text(number);
                /*渲染数据*/
                rendererData();
        });
        /*选择版本*/
        $('.typeMenuText').on('click', (e) => {
                let Dom = $(e.target);
                Dom.parents('.typeMenuBox').find('.check').removeClass('check');
                Dom.addClass('check');
                /*渲染数据*/
                rendererData(Dom);
        });
        /*立即购买*/
        $('.buyBtn').on('click', () => {
                let unitProductData = {};
                unitProductData.avatar = $('.imgBox-slide').attr('style').replace("background-image: url(\'", '').replace("\')", "");
                unitProductData.pName = $('.productInfo .pName').text();
                unitProductData.pTitle = $('.productType').text();
                unitProductData.pPrice = $('.productInfo .price>span:last-child').text();
                unitProductData.pNum = $('.numBtn .number').text();
                $.ajax({
                        url: '/order',
                        type: 'post',
                        dataType: 'json',
                        data: {
                                act: 'setData',
                                data: JSON.stringify(unitProductData).trim()
                        },
                        success: (result) => {
                                if(result.ok){
                                        window.location.href = '/order';
                                }else{
                                        T.info('未登录,即将跳转到登录页面', {time: 2000}, () => {
                                                location.href = '/user/signin';
                                        });
                                }
                        },
                        error: () => {
                                T.info('通讯错误', {time: 2000})
                        }
                })
        });
});

/*菜单开关控制*/
function controlMenu(type, f){
        let Dom = $('.typeMenu').add('.shade');
        type?Dom.fadeIn(100):Dom.fadeOut(100);
        if(f) f();
}

/*重新渲染选中数据*/
function rendererData(){
        let dataArr = [];
        /*菜单头部区域信息渲染*/
        $('.typeMenuBox .check').add('.number').each((i, v) => {
                dataArr.push($(v).text().trim());
        });
        /*已选版本区域渲染*/
        $('.selectType .cTitle').each((i, v) => {
                $(v).text(dataArr[i]);
        });
        /*选中数量信息渲染*/
        $('.topTitle').each((i, v) => {
                $(v).text(dataArr[i]);
        });
        /*价格数据渲染*/
        let unitPrice = $('.typeMenuText.check').find('.priceData').data('price'),
                showPriceDom = $('.typeMenu .price>span:last-child').add('.productInfo .price>span:last-child');
        if(unitPrice !== undefined){
                showPriceDom.text(unitPrice + '.00');
        }
}