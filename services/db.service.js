const sqlite  = require('sqlite3');
const fs  = require('fs');
const db = new sqlite.Database('./db/hades-db-01.sqlite', sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, onConnection);

module.exports = {
    queryDB: _queryDB,
    checkForErrors: _checkForErrors
}

function _queryDB(sqlQuery, cb){
    db.serialize(()=>{
        db.all(sqlQuery.query, sqlQuery.params, cb);
    });
}

function _checkForErrors(error){
    if(error){
        console.log(error);
        return false;
    }
}

function onConnection(con_error){
    console.log("Connecting...");
    _checkForErrors(con_error);

    let sqlQuery = {
        query: "SELECT name FROM sqlite_master WHERE type='table' and name not like 'sql_%';",
        params: []
    }

    console.log("Searching for db tables...");
    _queryDB(sqlQuery, (db_error, resultSet)=>{
        _checkForErrors(db_error);

        if(resultSet.length === 0){
            fs.readFile('./config/hades_DDL.sql', (file_error, data)=>{
                _checkForErrors(file_error);

                if(data){
                    console.log("Creating DB from DDL...");
                    sqlQuery.query = data.toString();

                    _queryDB(sqlQuery, (ddl_error)=>{
                        _checkForErrors(ddl_error);
                        console.log("Database created.");
                    });
                }
            });
        }else{
            console.log("Database loaded successfully");
        }
    });
}