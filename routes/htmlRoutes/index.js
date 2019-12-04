const router = require('express').Router();
const burgerController = require('../../controllers/burgers_controller');

router.route('/')
    .get(burgerController.selectAll);

module.exports = router;