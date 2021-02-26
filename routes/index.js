const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// was client/build - threw errors - changed to public
router.use((req, res) => 
    res.sendFile(path.join(__dirname, "../client/public/index.html"))
);

module.exports = router;