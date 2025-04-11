const { Router } = require('express');

const webdavRoutes = require('./webdavRoutes');

const router = Router();
router.use('/webdav', webdavRoutes);

module.exports = router;