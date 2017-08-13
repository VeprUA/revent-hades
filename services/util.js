const ErrorService = require('./error.service');
module.exports = {
    sendResponse: _sendResponse
}

function _sendResponse(res, error, data){
    if(error){
        if(error.status === 500){
            return res.status(500).send(ErrorService.sendServerError(error.message));
        }else if(error.status === 404){
            return res.status(404).send(ErrorService.sendNotFoundError());
        }else if(error.status === 401){
            return res.status(401).send(ErrorService.sendNotAuthorizedError());
        }else{
            return res.status(error.status).send(ErrorService.sendError(error.status, error.message, {renderToConsole:true}));
        }
    }else{
        return res.status(200).send(data);
    }
}