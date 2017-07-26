const {DBService} = require('db.service');

module.exports = {
    saveMessage: _saveMessage,
    fetchAllMessages: _fetchAllMessages
}

function _saveMessage(params, cb){
    let msg = parseErrorObject(params);
    // Query database
    let sqlQuery = {
        query: 'insert into hades_messages.errors ( ' +
                    'errorMessage, ' +
                    'userName, ' +
                    'userFullName, ' +
                    'tag' +
                    'dateCreated, ' +
                    'isError, ' +
                    'appName, ' +
                    'comment ' +
                ' ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ? )',
        queryParams: [msg.message,
                      msg.user,
                      msg.name,
                      msg.tag,
                      msg.date,
                      msg.isError,
                      msg.appName,
                      msg.additionalComment]
    }

    DBService.queryDB(sqlQuery, cb);
}

function _fetchAllMessages(cb){
    // Query database

    let sqlQuery = {
        query: 'select errorMessage, userName, userFullName, dateCreated, isError, appName, comment from hades_messages.errors',
        queryParams: []
    }

    DBService.queryDB(sqlQuery, cb);
}

function parseErrorObject(appError){
    /* 
        appName: Application Name
        date: Date when error occured
        user: Username used by user to login
        userId: User ID (if applicable)
        name: User Full Name (if applicable)
        message: Message that occured in the app
        isError: Is this an error or a warning
        additionalComment: Any other relatable information that could benefit the developer
    */

    let msg = {
        appName: appError.appName || "Untitled App",
        date: new Date(),
        user: appError.user || "gen_user",
        name: appError.name || appError.user,
        tag: appError.tag || 'ERROR',
        message: appError.message,
        isError: appError.isError || true,
        additionalComment: appError.additionalComment || ""
    }

    return msg;
}