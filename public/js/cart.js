$(function () {
    let downOrderBtnState = false,
        bottomBtnState = false;
    /*单个选中按钮*/
    $('.checkBtn').on('click', function () {
        $(this).toggleClass('checkBtnActive');
        priceCalc();
        let btnDom1 = $('.floor2 .checkBtn'),
            btnDom2 = $('.floor2 .checkBtnActive');
        /*全部选中后点亮全选按钮*/
        if (btnDom1.length <= btnDom2.length) {
            $('.checkAll').addClass('checkBtnActive');
        } else {
            $('.checkAll').removeClass('checkBtnActive');
        }
        /*选中至少一件商品后点亮结算按钮*/
        downOrderActive();

    });
    /*底部下单&删除商品按钮*/
    $('.bottomBtn').on('click', function () {
        if (downOrderBtnState) {
            if (bottomBtnClassState) {//下单操作
                let activeDom = $('.checkBtnActive').parents('.priceBox'),
                    produceData = '',
                    domLength = activeDom.length,
                    splitSign = "&";
                activeDom.each((i, v) => {
                    let unitProductData = {},
                        dom = $(v);
                    unitProductData.avatar = dom.find('img').attr('src');
                    unitProductData.pName = dom.find('.textBox>.title').text();
                    unitProductData.pTitle = dom.find('.textBox>.text').text();
                    unitProductData.pPrice = dom.find('.price>.text').text();
                    unitProductData.pNum = dom.find('.numBox .num').text();
                    i === domLength - 1 ? splitSign = "" : splitSign = "&";
                    produceData += JSON.stringify(unitProductData).trim() + splitSign;
                });
                $.ajax({
                    url: '/order',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        act: 'setData',
                        data: produceData
                    },
                    success: (result) => {
                        if (result.ok) {
                            window.location.href = '/order';
                        }
                    },
                    error: () => {
                        T.info('通讯错误', {time: 2000})
                    }
                })
            } else {//删除商品操作
                /*加工要删除的商品数据*/
                let activeDomS = $('.floor2 .checkBtnActive'),
                    nameDomS = activeDomS.parents('.priceBox').find('.title'),
                    titleDomS = activeDomS.parents('.priceBox').find('.textBox').children('.text');
                let pDataNameS = '',//商品名称
                    pDataTitleS = '',//商品介绍
                    splitSign = '';//切割数组标记
                activeDomS.each(i => {
                    i === activeDomS.length - 1 ? splitSign = "" : splitSign = "&";//最后一位不加切割标记符
                    pDataNameS += $(nameDomS[i]).text() + splitSign;
                    pDataTitleS += $(titleDomS[i]).text() + splitSign;
                });
                /*选中至少一个商品发送删除请求*/
                if (activeDomS.length !== 0) {
                    T.confirmInfo('确定删除这 ' + selectNum + ' 件商品?', {time: 200, btn: ['取消', '确定'], title: '提示'}, () => {
                        $.ajax({
                            url: '/cart/changecart',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                act: 'remove',
                                pNameS: pDataNameS,
                                pTitleS: pDataTitleS,
                            },
                            success: (result) => {
                                if (result) {
                                    let removeDom = $('.floor2 .checkBtnActive').parent('.priceBox');
                                    removeDom.slideUp(300, () => {
                                        removeDom.remove();
                                        if ($('.floor2 .price').length === 0) {
                                            window.location.href = '/cart';
                                        }
                                    });
                                }
                            },
                            error: () => {
                                T.info('网络错误', {time: 2000})
                            }
                        })
                    });
                }
            }
        } else {
            T.info('未选择商品', {time: 1000});
        }
    });
    /*全选按钮*/
    let btnState = true;
    $('.checkAll').on('click', function () {
        $(this).toggleClass('checkBtnActive');
        let domTemp = $('.floor2 .checkBtn');
        if (btnState) {
            domTemp.addClass('checkBtnActive');
            btnState = false;
        } else {
            domTemp.removeClass('checkBtnActive');
            btnState = true;
        }
        /*计算合计价格*/
        priceCalc();
        /*下单按钮亮起*/
        downOrderActive();
    });
    /*商品加减操作*/
    $('.numBtn>*').on('click', function () {
        let pNum = parseInt($(this).parent('.numBtn').find('.number').text());
        switch ($(this).attr('class').trim()) {
            case 'addNum':
                pNum >= 3 ? T.info('达到最大购买数量', {time: 2000}) : pNum++;
                break;
            case 'minus':
                pNum <= 1 ? 1 : pNum--;
                break;
        }
        /*发送更改请求*/
        let name = $(this).parents('.textBox').find('.title').text().trim(),
            text = $(this).parents('.textBox').children('.text').text().trim();
        $.ajax({
            url: '/cart/changecart',
            type: 'post',
            dataType: 'json',
            data: {
                act: 'changeNum',
                pName: name,
                pType: text,
                pNum: pNum,
            },
            success: (result) => {
                /*请求成功后渲染价格*/
                if (result.ok) {
                    changeNum(this);
                }
            },
            error: () => {
                T.info('通讯错误', {time: 2000});
            }
        });

        /*价格渲染函数*/
        function changeNum(Dom) {
            $(Dom).parents('.price').find('.number').text(pNum);
            $(Dom).parents('.price').find('.num').text(pNum);
        }
    });
    /*编辑切换界面操作*/
    let compileBtnState = true,
        bottomBtnClassState = true;
    $('.compile').on('click', function () {
        /*重置底部按钮状态*/
        downOrderActive();
        /*重置全选按钮状态*/
        btnState = true;
        /*取消所有选中*/
        $('.checkBtn').removeClass('checkBtnActive');
        /*重新计算*/
        priceCalc();
        let Dom1 = $('.numBox').add('.floor1'),//头部领取优惠券&数量显示盒子
            Dom2 = $('.numBtn'),//加减按钮
            Dom3 = $('.showContent'),//内容盒子
            Dom4 = $('.priceShowBox'),//底部价格显示区域
            Dom5 = $('.bottomBtn'),//底部 删除商品&立即下单 按钮
            Dom6 = $('.activeNum');//选中数量显示
        if (compileBtnState) {
            Dom1.hide();
            Dom2.show().css('display', 'flex');
            Dom3.css('margin', '0');
            Dom4.css('opacity', '0');
            Dom5.text('删除商品').removeClass('downOrderActive removeActive');
            Dom6.css('color', '#d44d44');
            bottomBtnState = false;
            bottomBtnClassState = false;
            compileBtnState = false; //编辑按钮状态
            $(this).find('span').text('完成');
        } else {
            Dom1.show();
            Dom2.hide();
            Dom3.css('marginTop', '1.5rem');
            Dom4.css('opacity', '1');
            Dom5.text('现在结算').removeClass('downOrderActive removeActive');
            Dom6.css('color', 'rgb(153, 153, 153)');
            compileBtnState = true;
            bottomBtnClassState = true;
            bottomBtnState = true;
            $(this).find('span').text('编辑');
        }
    });

    /*选中至少一件商品后点亮结算按钮*/
    function downOrderActive() {
        let btnDom = $('.bottomBtn');
        if ($('.floor2 .checkBtnActive').length >= 1) {
            downOrderBtnState = true;
            bottomBtnClassState ? btnDom.addClass('downOrderActive') : btnDom.addClass('removeActive')
        } else {
            bottomBtnClassState ? btnDom.removeClass('downOrderActive') : btnDom.removeClass('removeActive');
            downOrderBtnState = false;
        }
    }

    /*计算选中后的合计价格与合计数量*/
    let selectNum = 0;

    function priceCalc() {
        let selectPrice = 0, //选中的总价格
            //选中的总数量
            btnActiveDomS = $('.floor2 .checkBtnActive');
        selectNum = 0;//数量重置
        btnActiveDomS.each((i, v) => {
            let priceTemp = parseInt($(v).parent('.priceBox').find('.price>.text').text().trim()),
                numTemp = parseInt($(v).parent('.priceBox').find('.price .num').text().trim());
            /*叠加数量*/
            selectNum += numTemp;
            /*叠加价格*/
            selectPrice += priceTemp * numTemp;
        });
        /*计算价格*/
        $('.totalPrice').text(selectPrice + '.00');
        /*计算包邮差额*/
        let balance = selectPrice;
        if (balance < 150) {
            $('.balanceText').text('还差￥' + (150 - balance) + '.00元包邮');
        } else {
            $('.balanceText').text('已享免邮费');
        }
        /*渲染选中数量*/
        $('.activeNum').text(selectNum);
    };
});



