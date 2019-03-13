const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
/*session*/
const session = require('express-session');
/*配置信息*/
const config = require('./config');
/*路由*/
/*登录验证*/

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const categoryRouter = require('./routes/catagory');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const SiteRouter = require('./routes/site');
const resRouter = require('./routes/res');
const isLoginRouter = require('./routes/isLogin');
const app = express();

// 模板引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session(config.session));
app.use(express.static(path.join(__dirname, 'public')));

/*登陆判断*/
app.use('*',isLoginRouter);
/*路由配置*/
app.use('/', indexRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/user', usersRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/site',SiteRouter);
app.use('*',resRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next){
        next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development'?err:{};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
});

module.exports = app;
