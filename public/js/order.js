$(function () {
    //页面加载完成计算价格
    let allPrice = 0,
        postagePrice = 0,
        amountPrice = 0,
        priceNum = 0;
    $('.productBar').each((i, v) => {
        let unitPrice = parseInt($(v).find('.nullPrice').text()),
            unitProductNum = parseInt($(v).find('.numBox>span:last-child').text());
        //计算总价
        allPrice += unitPrice * unitProductNum;
        //计算总共商品数量
        priceNum += unitProductNum;
    });
    //计算邮费
    allPrice <= 150 ? postagePrice = 15 : postagePrice = 0;
    //计算应付金额
    amountPrice = postagePrice + allPrice;
    /*————————信息渲染*/
    $('.floor3 .priceNum').text(priceNum);//商品总数
    $('.floor5 .allPrice').text(allPrice);//商品总价
    $('.floor5 .postagePrice').text(postagePrice);//邮费
    $('.amountPrice').text(amountPrice)//应付金额

    /*————————支付信息*/
    $('.payBtn').on('click', function () {
        T.confirmInfo('支付完成前请不要关闭本窗口', {time: 200, btn: ['重新选择支付方式', '已完成支付'], title: '正在支付'}, () => {
            let pDataNameS = '',//商品名称
                pDataTitleS = '',//商品介绍
                splitSign = '',//切割数组标记
                activeDomS = $('.productBar'),
                nameDomS = $('.productName'),
                titleDomS = $('.productTitle');
            activeDomS.each(i => {
                i === activeDomS.length - 1 ? splitSign = "" : splitSign = "&";//最后一位不加切割标记符
                pDataNameS += $(nameDomS[i]).text() + splitSign;
                pDataTitleS += $(titleDomS[i]).text() + splitSign;
            });
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
                    if (result.ok) {
                        window.location.href = '/';
                    }
                },
                error: () => {
                    T.info('网络错误', {time: 2000})
                }
            });
        });
    });
});