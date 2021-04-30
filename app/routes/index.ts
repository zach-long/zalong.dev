import express = require('express');
const router: express.Router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;