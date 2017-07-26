const {config} = require('../config/db.config');
const {mysql} = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.db.hostname,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

module.exports = {
    queryDB: _queryDB
}

function _queryDB(sqlQuery, cb){
    pool.getConnection((error, connection) =>{
        if(!error){
            return cb(error);
        }else{
            connection.query(sqlQuery.query, sqlQuery.queryParams, (queryError, results) => {
                connection.destroy();
                if(queryError){
                    return cb(queryError);
                }else{
                    return cb(null, results);
                }
            });
        }
    })
}
