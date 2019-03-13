exports.session = {
        secret: "session server",
        resave: true,
        rolling:true,
        saveUninitialized: false,
        cookie: {
                path: '/',
                httpOnly: true,
                maxAge: 1000*60*20
        },
};
exports.authPaths = [
        /^\/cart/, /^\/user(?!\/login)/
];