/*商品分类*/

const productCategoryData = [
        {id: 1, name: '手机', avatar: '/img/categoryPoster/img1.png', typeName: [{name: '颜色', tName: 'color'}, {name: '容量', tName: 'capacity'}]},
        {id: 2, name: '壳套膜', avatar: '/img/categoryPoster/img2.png', typeName: [{name: '图案', tName: 'pattern'}]},
        {id: 3, name: '充电器材', avatar: '/img/categoryPoster/img3.png', typeName: [{name: '颜色', tName: 'color'}]},
        {id: 4, name: '耳机音响', avatar: '/img/categoryPoster/img4.png', typeName: [{name: '颜色', tName: 'color'}]},
        {id: 5, name: '畅呼吸', avatar: '/img/categoryPoster/img5.png', typeName: [{name: '颜色', tName: 'color'}]},
        {id: 6, name: '箱包类', avatar: '/img/categoryPoster/img6.png', typeName: [{name: '颜色', tName: 'color'}]},
        {id: 7, name: '鞋服', avatar: '/img/categoryPoster/img7.png', typeName: [{name: '颜色', tName: 'color'}, {name: '尺寸', tName: 'size'}, {name: '款式', tName: 'style'}]},
        {id: 8, name: '文具', avatar: '/img/categoryPoster/img8.png', typeName: [{name: '颜色', tName: 'color'}, {name: '规格', tName: 'specification'}]},
        {id: 9, name: '品牌精选', avatar: '/img/categoryPoster/img9.png', typeName: [{name: '颜色', tName: 'color'}]},
        {id: 10, name: '图书', avatar: '/img/categoryPoster/img10.png', typeName: [{name: '版本', tName: 'edition'}]},

];

/*商品推荐分类*/
const indexCategoryData = [
        {id: 1, name: '热卖商品',},
        {id: 2, name: '坚果系列手机及配件'},
        {id: 3, name: '坚果足迹系列'},
        {id: 4, name: '官方配件'},
        {id: 5, name: '畅呼吸系列'},
        {id: 6, name: '品牌周边'},
        {id: 7, name: '品牌精选'},
        {id: 8, name: '商品推荐'}
];
/*商品数据---*/
/*商品类型*/
const productType = {
        pro2s: [{type: '4G+64G', price: '1798'}, {type: '6G+64G', price: '1998'}, {type: '6G+128G', price: '2298'}],
        r1: [{type: '6G+64G', price: '2298'}, {type: '6G+128GB', price: '3299'}, {type: '8G+128GB', price: '3799'}, {type: '8G+512GB', price: '4999'}, {type: '8G+1T', price: '8848'}],
        3: [{type: '4G+32G', price: '1299'}, {type: '4G+128GB', price: '1999'}],
        pro2: [{type: '6G+64G', price: '1899'}]
};
const productData = [
        /*手机*/
        {id: 1, cid: [1], indexId: [1, 2], avatar: '/img/product/avatar/phone_pro2s_black.png', name: '坚果 Pro 2S', pTitle: '双系统，无限屏，骁龙 ™ 710 处理器 · 前置 1600 万像素摄像头 · 6.01 英寸全高清全面屏 · AI 通话降噪 · 人脸解锁 + 指纹解锁 ', title: '双系统，无限屏', price: filterType('pro2s', 'price'), capacity: filterType('pro2s', 'type'), color: ['黑色', '蓝色'], colorId: [1, 2], priceState: true},
        {id: 2, cid: [1], indexId: [1, 2], avatar: '/img/product/avatar/phone_pro2s_blue.png', name: '坚果 Pro 2S', pTitle: '双系统，无限屏，骁龙 ™ 710 处理器 · 前置 1600 万像素摄像头 · 6.01 英寸全高清全面屏 · AI 通话降噪 · 人脸解锁 + 指纹解锁 ', title: '双系统，无限屏', price: filterType('pro2s', 'price'), capacity: filterType('pro2s', 'type'), color: ['蓝色', '黑色'], colorId: [2, 1], priceState: true},
        {id: 3, cid: [1], indexId: [1, 2], avatar: '/img/product/avatar/phone_pro2_t_golden.png', name: '坚果 Pro2 特别版', pTitle: 'Qualcomm 骁龙 636 八核处理器 · 1200 万 + 500 万像素双摄像头 · 3500mAh 大电池 · 18W 快速充电 · 人脸解锁 + 指纹解锁', title: '漂亮得不像实力派', price: filterType('pro2', 'price'), capacity: filterType('pro2', 'type'), color: ['浅金色'], colorId: [3], priceState: true},
        {id: 4, cid: [1], indexId: [1, 2], avatar: '/img/product/avatar/phone_r1_blue.png', name: '坚果 R1', pTitle: '骁龙 845 处理器 · 光学防抖双摄像头 · 6.17 英寸压力感应屏幕 · 10W快速无线充电功能', title: '次时代旗舰手机，内藏来自未来的"电脑"', price: filterType('r1', 'price'), capacity: filterType('r1', 'type'), color: ['孔雀蓝'], colorId: [2], priceState: true},
        {id: 5, cid: [1], indexId: [2], avatar: '/img/product/avatar/phone_r1_white.png', name: '坚果 R1', pTitle: '骁龙 845 处理器 · 光学防抖双摄像头 · 6.17 英寸压力感应屏幕 · 10W快速无线充电功能', title: '次时代旗舰手机', price: filterType('r1', 'price'), capacity: filterType('r1', 'type'), color: ['白色'], priceState: true},
        {id: 6, cid: [1], indexId: [1], avatar: '/img/product/avatar/phone_3.png', name: '坚果 3', pTitle: '三面无边框 Almost，4000mAh 超巨型电池，双 1300 万诚实双摄，双面玻璃 + 金属中框，人脸解锁 + 指纹支付', title: '漂亮得不像实力派', price: filterType('r1', 'price'), capacity: filterType('3', 'type'), color: ['玫红色'], priceState: true},
        {id: 7, cid: [1], indexId: [1, 2], avatar: '/img/product/avatar/phone_3_golden.png', name: '坚果 3', pTitle: '三面无边框 Almost，4000mAh 超巨型电池，双 1300 万诚实双摄，双面玻璃 + 金属中框，人脸解锁 + 指纹支付', title: '漂亮得不像实力派', price: filterType('r1', 'price'), capacity: filterType('3', 'type'), color: ['浅金色'], priceState: true},
        /*壳套膜*/
        {id: 8, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_1.png', name: '薛定谔诞生', title: '1887 年 8 月 12 日', price: ['79'], pattern: ['薛定谔诞生']},
        {id: 9, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_2.png', name: '迈克尔·杰克逊出生', title: '1958 年 8 月 29 日', price: ['79'], pattern: ['迈克尔·杰克逊出生']},
        {id: 10, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_3.png', name: '阿加莎·克里斯蒂出生', title: '1890 年 9 月 15 日', price: ['79'], pattern: ['阿加莎·克里斯蒂出生']},
        {id: 11, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_4.png', name: '《肖申克的救赎》上映', title: '1994 年 9 月 23 日', price: ['79'], pattern: ['《肖申克的救赎》上映']},
        {id: 12, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_5.png', name: '本初子午线设立', title: '1884 年 10 月 13 日', price: ['79'], pattern: ['本初子午线设立']},
        {id: 13, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_6.png', name: '电子游戏《俄罗斯方块》发布', title: '1984 年 6 月 6 日', price: ['99'], pattern: ['电子游戏《俄罗斯方块》发布']},
        {id: 14, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_7.png', name: '《小王子》作者出生', title: '1900 年 6 月 29 日', price: ['99'], pattern: ['《小王子》作者出生']},
        {id: 15, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_8.png', name: '人类首次登上月球', title: '1969 年 7 月 20 日', price: ['99'], pattern: ['人类首次登上月球']},
        {id: 16, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_9.png', name: '切片面包被发明', title: '1928 年 7 月 7 日', price: ['99'], pattern: ['切片面包被发明']},
        {id: 17, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_10.png', name: '《惊魂记》在美国首演', title: '1960 年 6 月 16 日', price: ['99'], pattern: ['《惊魂记》在美国首演']},
        {id: 18, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_11.png', name: '人类首次登顶珠峰', title: '1953 年 5 月 29 日', price: ['99'], pattern: ['人类首次登顶珠峰']},
        {id: 19, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_12.png', name: '滑翔机之父李林塔尔出生', title: '1848 年 5 月 23 日', price: ['99'], pattern: ['滑翔机之父李林塔尔出生']},
        {id: 20, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_13.png', name: '人类首次飞越珠峰', title: '1933 年 4 月 3 日', price: ['79'], pattern: ['人类首次飞越珠峰']},
        {id: 21, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_14.png', name: '“深蓝”超级计算机', title: '1997 年 5 月 11 日', price: ['79'], pattern: ['“深蓝”超级计算机']},
        {id: 22, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_15.png', name: '乐高创始人出生', title: '1891 年 4 月 7 日', price: ['79'], pattern: ['乐高创始人出生']},
        {id: 23, cid: [2], indexId: [3], avatar: '/img/product/avatar/ke_16.png', name: '萨缪尔·摩尔斯出生', title: '1791 年 4 月 27 日', price: ['79'], pattern: ['萨缪尔·摩尔斯出生']},
        /*充电线材*/
        {id: 24, cid: [3], indexId: [4], avatar: '/img/product/avatar/parts_1.png', name: '坚果三脚架自拍杆', title: '两种模式，随时随地都能拍得开心', price: ['99'], color: ['黑色']},
        {id: 25, cid: [3], indexId: [4], avatar: '/img/product/avatar/parts_2.png', name: '坚果“电池形电池”移动电源', title: 'Type-C 接口、轻巧便携', price: ['49'], color: ['红色']},
        {id: 26, cid: [3], indexId: [4], avatar: '/img/product/avatar/parts_3.png', name: '车载充电器', title: '双口 & 快充', price: ['99'], color: ['黑色']},
        {id: 27, cid: [3], indexId: [4], avatar: '/img/product/avatar/parts_4.png', name: '快充移动电源', title: '10000mAh 双向快充', price: ['199'], color: ['白色']},
        {id: 28, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_5.png', name: '彩虹数据线', title: '七彩配色随机发货', price: ['19'], color: ['随机']},
        {id: 29, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_6.png', name: '坚果闹钟式无线充电座', title: '无线也能享受的 10W 快充', price: ['299'], color: ['白色']},
        {id: 30, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_7.png', name: '坚果饼式无线充电座', title: '放下手机就能享受的快速充电', price: ['129'], color: ['黑色']},
        {id: 31, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_8.png', name: '坚果 Type-C To Type-C 数据线', title: 'TPE 环保材质，PTC 过温保护', price: ['39'], color: ['白色']},
        {id: 32, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_9.png', name: '坚果 QuickCharge 4+ 快速充电器', title: '全面兼容的 18W 快速充电', price: ['59'], color: ['白色']},
        {id: 33, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_10.png', name: '原装充电器', title: '18W 安全快充', price: ['59'], color: ['白色']},
        {id: 34, cid: [3], indexId: [0], avatar: '/img/product/avatar/parts_11.png', name: '二合一数据线', title: 'Type-C & Micro-USB 双接口、夜间微光灯', price: ['39'], color: ['白色']},
        /*耳机音响*/
        {id: 35, cid: [4], indexId: [4], avatar: '/img/product/avatar/music_1.png', name: '坚果蓝牙小黑耳机', title: '一副干净的蓝牙耳机', price: ['99'], color: ['黑色']},
        {id: 36, cid: [4], indexId: [4], avatar: '/img/product/avatar/music_2.png', name: 'Smartisan 半入耳式耳机', title: '经典配色、专业调音', price: ['89'], color: ['红色']},
        {id: 37, cid: [4], indexId: [0], avatar: '/img/product/avatar/music_3.png', name: '半入耳式耳机 心动版', title: '哑光表面、专业级调音', price: ['99'], color: ['黑色']},
        {id: 38, cid: [4], indexId: [0], avatar: '/img/product/avatar/music_4.png', name: 'S-1001 圈铁耳机', title: '极简造型、复合振膜', price: ['199'], color: ['白色']},
        {id: 39, cid: [4], indexId: [8], avatar: '/img/product/avatar/music_5.png', name: '蓝牙运动耳机', title: 'IPX5 级防水设计、佩戴舒适', price: ['299'], color: ['红色']},
        {id: 40, cid: [4], indexId: [0], avatar: '/img/product/avatar/music_6.png', name: 'FIIL CARAT ', title: '蓝牙运动耳机', price: ['499'], color: ['黑色']},
        {id: 41, cid: [4], indexId: [0], avatar: '/img/product/avatar/music_7.png', name: 'FIIL Diva 蓝牙耳机', title: '手势触控、智能启停', price: ['999'], color: ['灰色']},
        {id: 42, cid: [4], indexId: [0], avatar: '/img/product/avatar/music_8.png', name: 'FIIL Diva Pro', title: '智能语音交互', price: ['1499'], color: ['灰色']},
        /*畅呼吸*/
        {id: 43, cid: [5], indexId: [1, 5], avatar: '/img/product/avatar/chang_2.png', name: '畅呼吸只能空气净化器', title: '超强净化能力、智能操控', price: ['3499'], color: ['白色']},
        {id: 44, cid: [5], indexId: [1, 5], avatar: '/img/product/avatar/chang_1.png', name: '畅呼吸智能空气净化器超级除甲醛版', title: '强力除甲醛，就选畅呼吸', price: ['3499'], color: ['白色']},
        {id: 45, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_3.png', name: '畅呼吸智能落地式加湿器', title: '健康无雾、便携上加水', price: ['1999'], color: ['白色']},
        {id: 46, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_4.png', name: '畅呼吸桌面式加湿器', title: '自然蒸发、无雾更健康', price: ['999'], color: ['白色']},
        {id: 47, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_5.png', name: '高效复合滤芯', title: '精选双层防护材质、过滤更精细', price: ['799'], color: ['白色']},
        {id: 48, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_6.png', name: '除甲醛活性炭滤芯', title: '专业除甲醛超级活性炭、满足多种除醛需求', price: ['699'], color: ['黑色']},
        {id: 49, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_7.png', name: '畅呼吸温湿度计', title: '极简外观设计，测量范围广', price: ['99'], color: ['白色']},
        {id: 50, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_8.png', name: '汽车空调滤清器', title: '四层防护、高效可靠', price: ['99'], color: ['白色']},
        {id: 51, cid: [5], indexId: [5], avatar: '/img/product/avatar/chang_9.png', name: '畅呼吸防护口罩', title: '五层防护、高达 98% 的平均过滤效率', price: ['9'], color: ['黑色']},
        /*箱包类*/
        {id: 52, cid: [6], indexId: [1, 7], avatar: '/img/product/avatar/box_1.png', name: '地平线8号旅行箱', title: '为了野心和远方', price: ['299'], color: ['黑色']},
        {id: 53, cid: [6], indexId: [7], avatar: '/img/product/avatar/box_2.png', name: '地平线 8 号商务旅行箱', title: '为了野心和远方', price: ['999'], color: ['银色']},
        /*鞋服*/
        {id: 54, cid: [7], indexId: [1], avatar: '/img/product/avatar/clothing_1.png', name: '卫衣圆领人类第一次不系绳太空行走', title: '风格简洁、舒适服帖', price: ['199'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3, 4, 5, 6]},
        {id: 55, cid: [7], indexId: [6], avatar: '/img/product/avatar/clothing_2.png', name: '卫衣 经典款', title: '风格简洁、舒适服帖', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['棕色'], colorId: [1, 2, 3, 4, 5, 6]},
        {id: 56, cid: [7], indexId: [6], avatar: '/img/product/avatar/clothing_3.png', name: '卫衣 圆领 经典款', title: '风格简洁、舒适服帖', price: ['199'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['浅黄色'], colorId: [1, 2, 3, 4, 5, 6]},
        {id: 57, cid: [7], indexId: [6], avatar: '/img/product/avatar/clothing_4.png', name: 'Smartisan 牛津纺衬衫', title: '一件无拘无束的舒适衬衫', price: ['199'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['长袖'], color: ['深蓝色'], colorId: [1, 2, 3, 4]},
        {id: 58, cid: [7], indexId: [6], avatar: '/img/product/avatar/clothing_5.png', name: '卫衣 本初子午线', title: '风格简洁、舒适服帖', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 59, cid: [7], indexId: [6], avatar: '/img/product/avatar/clothing_6.png', name: '卫衣 阿加莎·克里斯蒂出生', title: '风格简洁、舒适服帖', price: '249', size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 60, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_7.png', name: 'Smartisan 帆布鞋', title: '风格简洁、舒适服帖', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 61, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_8.png', name: '乐高创始人克里斯汀森出生', title: '一件内外兼修的舒适 T恤', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['深蓝色'], colorId: [1, 2, 3]},
        {id: 62, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_9.png', name: 'T恤 萌锤', title: '100% 美国 SUPIMA 棉、舒适拉绒质地', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['深蓝色'], colorId: [1, 2, 3]},
        {id: 63, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_10.png', name: 'Smartisan T恤 经典款', title: '100% 美国 SUPIMA 棉、舒适拉绒质地', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], color: ['黑色'], style: ['男款'], colorId: [1, 2, 3]},
        {id: 64, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_11.png', name: '第一个网络表情符', title: '100% 美国 SUPIMA 棉、舒适拉绒质地', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 65, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_12.png', name: '首次登陆月球', title: '100% 美国 SUPIMA 棉、舒适拉绒质地', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['深蓝色'], colorId: [1, 2, 3]},
        {id: 66, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_13.png', name: '卫衣 经典款 黑色', title: '风格简洁、舒适服帖', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 67, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_14.png', name: '卫衣 开衫 热血', title: '风格简洁、舒适服帖', price: ['299'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['深蓝色'], colorId: [1, 2, 3]},
        {id: 68, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_15.png', name: 'Polo衫 经典款', title: '一件表里如一的舒适 POLO 衫', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['白色'], colorId: [1, 2, 3]},
        {id: 69, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_16.png', name: '第一部 YouTube 视频上传', title: '一件内外兼修的舒适T恤', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 70, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_17.png', name: '首次成功飞越珠穆朗玛峰', title: '一件内外兼修的舒适T恤', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['白色'], colorId: [1, 2, 3]},
        {id: 71, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_18.png', name: '“深蓝”击败国际象棋冠军', title: '一件内外兼修的舒适T恤', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['白色'], colorId: [1, 2, 3]},
        {id: 72, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_19.png', name: '萨缪尔·摩尔斯出生', title: '一件内外兼修的舒适T恤', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['白色'], colorId: [1, 2, 3]},
        {id: 73, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_20.png', name: '伍迪·艾伦出生', title: '一件内外兼修的舒适T恤', price: ['149'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['深蓝色'], colorId: [1, 2, 3]},
        {id: 74, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_21.png', name: '卫衣 开衫 经典款', title: '风格简洁、舒适服帖', price: ['299'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 75, cid: [7], indexId: [8], avatar: '/img/product/avatar/clothing_22.png', name: '卫衣 热血', title: '风格简洁、舒适服帖', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['灰色'], colorId: [1, 2, 3]},
        {id: 76, cid: [7], indexId: [0], avatar: '/img/product/avatar/clothing_23.png', name: '卫衣 大爆炸', title: '风格简洁、舒适服帖', price: ['249'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['黑色'], colorId: [1, 2, 3]},
        {id: 77, cid: [7], indexId: [8], avatar: '/img/product/avatar/clothing_24.png', name: '卫衣 圆领 薛定谔诞生', title: '风格简洁、舒适服帖', price: ['199'], size: ['L', 'XL', 'XXL', 'XXXL'], style: ['男款'], color: ['灰色'], colorId: [1, 2, 3]},
        /*文具*/
        {id: 78, cid: [8], indexId: [0], avatar: '/img/product/avatar/stationery_1.png', name: '记事本', title: '优质米色纸、不洇不透', price: ['49'], color: ['白色'], specification: ['“足迹”系列1']},
        {id: 79, cid: [8], indexId: [8], avatar: '/img/product/avatar/stationery_2.png', name: '明信片', title: '优质卡纸、包装精致、色彩饱满', price: ['9'], color: ['咖啡色'], specification: ['105*150（单位：mm） 192 页 ']},
        /*品牌精选*/
        {id: 80, cid: [9], indexId: [7], avatar: '/img/product/avatar/thirdParty_1.png', name: 'bcase TITA 临时停车牌', title: '临时停车电话号码牌', price: ['39'], color: ['黑色']},
        {id: 81, cid: [9], indexId: [7], avatar: '/img/product/avatar/thirdParty_2.png', name: '绿联 HDMI 2.0 高清线', title: '4K超清，稳定不闪屏', price: ['22'], color: ['黑色']},
        {id: 82, cid: [9], indexId: [7], avatar: '/img/product/avatar/thirdParty_3.png', name: 'Ta Da Roll 大大卷身高尺', title: '留下孩子成长每一步', price: ['139'], color: ['白色']},
        {id: 83, cid: [9], indexId: [7], avatar: '/img/product/avatar/thirdParty_4.png', name: 'ACIL E1 颈挂式蓝牙耳机', title: '无感佩戴，一切变得简单', price: ['199'], color: ['黑色']},
        {id: 84, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_5.png', name: '绿联 Type C 转 HDMI 视频连接线', title: '坚果 R1 / Pro 2S 投屏连接线', price: ['159'], color: ['黑色']},
        {id: 85, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_10.png', name: '绿联 Type-C 转 HDMI 扩展坞', title: '智能拓展，小巧便携', price: ['199'], color: ['灰色']},
        {id: 86, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_6.png', name: '极米 H1S', title: '1080P 分辨率、左右梯形校正', price: ['4999'], color: ['黑色']},
        {id: 87, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_7.png', name: 'THE WHITE BRUSH ', title: '声波电动牙刷（五周年纪念版）', price: ['589'], color: ['白色']},
        {id: 88, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_9.png', name: '丹麦 AM mist 屏幕清洁喷雾', title: '擦拭喷雾二合一、方便携带、无毒环保', price: ['45'], color: ['粉色']},
        {id: 89, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_12.png', name: 'ORACLEEN 电动牙刷', title: '熊本熊系列牙龈护理电动牙刷', price: ['399'], color: ['黑色']},
        {id: 90, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_13.png', name: '小笨钟 Little Ben', title: '蹲下来，和孩子一起慢慢认时间', price: ['399'], color: ['白色']},
        {id: 91, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_14.png', name: '梨影茶具套装汝窑', title: '哑光汝窑一壶四杯茶具', price: ['599'], color: ['青色']},
        {id: 92, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_15.png', name: '拾趣下午茶陶瓷茶具套装', title: '哑光白瓷一壶四杯茶具', price: ['699'], color: ['白色']},
        {id: 93, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_16.png', name: 'ZK 双层玻璃单杯套装', title: '单人办公室泡茶杯', price: ['359'], color: ['透明色']},
        {id: 94, cid: [9], indexId: [8], avatar: '/img/product/avatar/thirdParty_17.png', name: '卵石对杯茶具套装', title: '高骨瓷卵石状对杯两个装', price: ['199'], color: ['黑色']},
        {id: 95, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_18.png', name: 'ZK 福碗陶瓷餐具套装', title: '高白瓷陶瓷日式餐具', price: ['299'], color: ['白色']},
        {id: 96, cid: [9], indexId: [8], avatar: '/img/product/avatar/thirdParty_19.png', name: '高白瓷陶瓷日式餐具', title: '极简几何 百变收纳', price: ['168'], color: ['木色']},
        {id: 97, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_20.png', name: '桌面置物架', title: '一块有颜有料的木头', price: ['139'], color: ['木色']},
        {id: 98, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_21.png', name: '茶素材汀壶电水壶', title: '一只好看的电水壶', price: ['698'], color: ['白色']},
        {id: 99, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_22.png', name: 'FIIL DIVA2 PRO', title: 'HIFI 播放器 智能佩戴感应 调控噪音', price: ['1899'], color: ['黑色']},
        {id: 100, cid: [9], indexId: [0], avatar: '/img/product/avatar/thirdParty_23.png', name: 'FIIL DIVA2', title: '语音搜歌 滑动触控', price: ['1199'], color: ['黑色']},
        {id: 101, cid: [9], indexId: [8], avatar: '/img/product/avatar/thirdParty_24.png', name: '极米 CC', title: 'JBL 音响、两万毫安续航力', price: ['2799'], color: ['白色']},
        /*图书*/
        {id: 102, cid: [10], indexId: [0], avatar: '/img/product/avatar/books_1.png', name: '《日本制造》', title: '盛田昭夫的日式经营学', price: ['58'], edition: ['平装版']},
        {id: 103, cid: [10], indexId: [8], avatar: '/img/product/avatar/books_2.png', name: '《索尼设计，塑造现代》', title: '索尼全盛时期工业设计作品首次集结成书并引进中国', price: ['259'], edition: ['平装版']},
        {id: 104, cid: [10], indexId: [0], avatar: '/img/product/avatar/books_3.png', name: '《深泽直人》', title: '首次面向中国读者介绍其作品', price: ['199'], edition: ['平装版']},
        {id: 105, cid: [10], indexId: [0], avatar: '/img/product/avatar/books_4.png', name: '《博朗设计》', title: '“二十世纪工业设计系列”第三部作品', price: ['259'], edition: ['平装版']},
];

/*过滤type属性*/
function filterType(name, value){let typeData = [];productType[name].forEach(v => {typeData.push(v[value]);});return typeData;}

/*其他数据*/
/*nav*/
const navMenuData = [
        {name: '锤子科技商城', src: '/',avatar:'/img/nav/nav_menu/nav-menu-1.png'},
        {name: '坚果 Pro 2S', src: '/items/2',avatar:'/img/nav/nav_menu/nav-menu-2.png'},
        {name: '坚果 R1', src: '/items/4',avatar:'/img/nav/nav_menu/nav-menu-3.png'},
        {name: '坚果TNT工作站', src: '/items/4',avatar:'/img/nav/nav_menu/nav-menu-4.png'},
        {name: '坚果3', src: '/items/6',avatar:'/img/nav/nav_menu/nav-menu-5.png'},
        {name: '坚果 Pro 2', src: '/items/3',avatar:'/img/nav/nav_menu/nav-menu-6.png'},
        {name: '8号商务旅行箱', src: '/items/52',avatar:'/img/nav/nav_menu/nav-menu-7.png'},
        {name: '8号旅行箱', src: '/items/53',avatar:'/img/nav/nav_menu/nav-menu-8.png'},
        {name: 'Smartisan OS', src: '/i',avatar:'/img/nav/nav_menu/nav-menu-9.png'},
        {name: '应用', src: '/',avatar:'/img/nav/nav_menu/nav-menu-10.png'},
        {name: '论坛', src: '/',avatar:'/img/nav/nav_menu/nav-menu-11.png'},
        {name: '服务支持', src: '/',avatar:'/img/nav/nav_menu/nav-menu-12.png'},
];
/*footerMenu*/
const footerMenuData = [
        {name: '首页', avatar: '/img/footerMenu/footerMenu-1.png',activeAvatar:'/img/footerMenu/footerMenu-1-active.png', url: '/'},
        {name: '分类', avatar: '/img/footerMenu/footerMenu-2.png',activeAvatar:'/img/footerMenu/footerMenu-2-active.png',  url: '/category'},
        {name: '购物车', avatar: '/img/footerMenu/footerMenu-3.png',activeAvatar:'/img/footerMenu/footerMenu-3-active.png',  url: '/cart'},
        {name: '个人中心', avatar: '/img/footerMenu/footerMenu-4.png',activeAvatar:'/img/footerMenu/footerMenu-4-active.png',  url: '/user'}
];
/*index-content*/
const indexMenuData = [
        {name: '新品首发', avatar: '/img/index/menu/index-menu-1.png', url: '/'},
        {name: '手机', avatar: '/img/index/menu/index-menu-2.png', url: '/category/index/2'},
        {name: '畅呼吸系列', avatar: '/img/index/menu/index-menu-3.png', url: '/category/index/5'},
        {name: '官方配件', avatar: '/img/index/menu/index-menu-4.png', url: '/category/index/4'},
        {name: '品牌周边', avatar: '/img/index/menu/index-menu-5.png', url: '/category/index/6'}
];
/*index-banner*/
const indexBannerData=[
        {id:1,avatar:'/img/banner/banner-img-1.png'},
        {id:2,avatar:'/img/banner/banner-img-2.png'}
];
/*导出数据*/
exports.product = productData; //商品数据
exports.indexCategory = indexCategoryData; //主页分类数据
exports.productCategory = productCategoryData; //分类页分类数据
exports.indexMenu = indexMenuData; //主页banner下部菜单数据
exports.navMenu = navMenuData; //NavMenu菜单数据
exports.footerMenu = footerMenuData; //footer 菜单数据
exports.indexBannerData=indexBannerData;
