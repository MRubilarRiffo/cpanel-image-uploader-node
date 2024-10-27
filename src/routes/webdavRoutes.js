const { Router } = require('express');
const uploadFile = require('../controllers/uploadFile');
const limiterMiddleware = require('../middleware/limiterMiddleware');
const upload = require('../middleware/multer');

const webdavRoutes = Router();

const maxCount = 100;

webdavRoutes.post('/upload', limiterMiddleware, upload.array('files', maxCount), uploadFile);

module.exports = webdavRoutes;