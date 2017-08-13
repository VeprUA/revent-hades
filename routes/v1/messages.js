const express = require('express');
const router = express.Router();
const util = require('../../services/util');
const MessageService = require('../../services/message.service');

router.get('/', (req, res)=> {
    // Fetch all errors
    MessageService.fetchAllMessages((error, data)=>{
        return util.sendResponse(res, error, data);
    });
});

router.post('/add', (req, res)=> {
    // Add Error
    MessageService.saveMessage(req.body, (error, data)=>{
        return util.sendResponse(res, error, data);
    });
});

// TODO add more routes
/* router.get('/:errorId', (req, res)=>{
    // Fetch an error via errorId
    MessageService.fetchMessage(req.params, (error, data)=>{
        return util.sendResponse(res, error, data);
    });
}); */

module.exports = router;