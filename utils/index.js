const mysql = require('mysql');

function resPromise(data){ //成功状态的
       return new Promise((resolve,reject)=>{
               resolve(data);
        });
}

const httpResult = {
        // 成功(服务器处理成功且返回了客户端最期望的正确结果)
        success: (message, data) => ({ status: 200, message, data }),
        // 失败(服务器处理成功但结果不是客户端最期望的: 如用户名不存在，密码错误等等)
        failure: (message, data) => ({ status: 199, message, data }),
        // 校验登录状态失败
        unlogin: () => ({ status: 401, message: '', data: null }),
        // 失败(服务器处理时发生内部错误：如文件读写失败，执行sql语句出错等等)
        error: error => ({ status: 500, message: error.message, data: error })
        // 注：message携带http请求处理结果信息，特别是当status不为200时，message特别有用；
        // 但请求端到底要不要弹出message给用户看，怎么用这里不关心。
};

/*---数据库封装---*/

// 创建连接池对象
const pool = mysql.createPool({
        connectionLimit: 10,
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'smartisan'
});

function query(sql, params=[]){
        return new Promise((resolve, reject) => {
                pool.getConnection((err, connection) => {
                        if(err) { reject(err); return; }
                        connection.query(sql, params, (err, results, fields) => {
                                connection.release();
                                if(err) reject(err);
                                else resolve(results);
                        });
                });
        });
}

module.exports = {query,resPromise,httpResult};