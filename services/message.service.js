const DBService = require('./db.service');

module.exports = {
    saveMessage: _saveMessage,
    fetchAllMessages: _fetchAllMessages
}

function _saveMessage(params, cb){
    let msg = parseErrorObject(params);
    // Query database
    let sqlQuery = {
        query: 'insert into message( ' +
                    'messsage, ' +
                    'user, ' +
                    'tags, ' +
                    'dateCreated, ' +
                    'isError, ' +
                    'appName, ' +
                    'comment ' +
                ' ) VALUES ( ?, ?, ?, ?, ?, ?, ? )',
        queryParams: [msg.message,
                      msg.user,
                      msg.tags,
                      msg.dateCreated,
                      msg.isError,
                      msg.appName,
                      msg.comment]
    }

    DBService.queryDB(sqlQuery, cb);
}

function _fetchAllMessages(cb){
    // Query database

    let sqlQuery = {
        query: 'select messageId, message, user, dateCreated, isError, appName, comment from message;',
        queryParams: []
    }

    DBService.queryDB(sqlQuery, cb);
}

function parseErrorObject(appError){
    /* 
        appName: Application Name
        date: Date when error occured
        user: Username used by user to login
        name: User Full Name (if applicable)
        message: Message that occured in the app
        isError: Is this an error or a warning
        additionalComment: Any other relatable information that could benefit the developer
    */

    let msg = {
        appName: appError.appName || "Untitled App",
        dateCreated: new Date(),
        user: appError.user || "gen_user",
        tags: appError.tag || 'ERROR',
        message: appError.message,
        isError: appError.isError || true,
        comment: appError.comment || ""
    }

    return msg;
}