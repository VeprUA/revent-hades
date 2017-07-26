const DEFAULT_ERROR_TEMPLATE = {
    error_code: 500,
    error_message: "Error occured"
};

module.exports = {
    sendError: _sendError,
    sendServerError: _sendServerError,
    sendNotFoundError: _sendNotFoundError,
    sendNotAuthorizedError: _sendNotAuthorizedError
}

function _sendError(errcode, errmsg, options){
    let error = DEFAULT_ERROR_TEMPLATE;

    error.error_code = errcode || DEFAULT_ERROR_TEMPLATE.error_code;
    error.error_message = errmsg || DEFAULT_ERROR_TEMPLATE.error_message;

    if(options && options.renderToConsole){
        console.log(error);
    }

    return error;
}

function _sendServerError(errmsg){
    return _sendError(500, errmsg, {renderToConsole:true});
}

function _sendNotFoundError(){
    return _sendError(404, "The resource you are looking for does not exist or has been removed.");
}

function _sendNotAuthorizedError(){
    return _sendError(401, "The resource you are looking for requires a authorized credentials.");
}