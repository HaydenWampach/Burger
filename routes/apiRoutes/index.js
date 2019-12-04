const router = require('express').Router();
const burgerRoutes = require('./burger');

router.use('/burgers', burgerRoutes);

module.exports = router;