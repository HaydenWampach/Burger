const router = require('express').Router();
const burgerController = require('../../controllers/burgers_controller');

router.route('/')
    .get(burgerController.selectAll)
    .post(burgerController.insertOne);

router.route('/:id')
    .put(burgerController.updateOne)
    .delete(burgerController.deleteOne);

module.exports = router;