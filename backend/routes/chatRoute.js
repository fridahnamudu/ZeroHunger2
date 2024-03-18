const express = require('express');
const chatController = require('../controllers/chatController');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.use(authenticate);
router.post('/', chatController);

module.exports = router;
