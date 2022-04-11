const router = require('express').Router();
const orderController = require('./controller');
const {policies_check} = require('../../middlewares');

router.post(
    '/orders',
    policies_check('create', 'Order'),
    orderController.store
);
router.get(
    '/orders',
    policies_check('view', 'Order'),
    orderController.index);

module.exports = router;
