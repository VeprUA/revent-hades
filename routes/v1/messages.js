const {router} = require('router');
const {util} = require('../../services/util')
const {MessageService} = require('./services/message.service');

router.post('/add', (req, res)=> {
    // Add Error
    MessageService.saveMessage(req.body, (error, data)=>{
        util.sendResponse(res, error, data);
    });
});

router.get('/', (req, res)=>{
    // Fetch all errors
    MessageService.fetchAllMessages((error, data)=>{
        
        // TODO: Add query filters
        util.sendResponse(res, error, data);
    });
});

router.get('/:errorId', (req, res)=>{
    // Fetch an error via errorId
    MessageService.fetchMessage(req.params, (error, data)=>{
        util.sendResponse(res, error, data);
    });
});

module.exports = router;