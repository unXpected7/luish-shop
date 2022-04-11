const router = require('express').Router();
const cartController = require('./controller');
const {policies_check} = require('../../middlewares');

router.put(
    '/carts',
    policies_check('update', 'Cart'),
    cartController.update
);
router.get(
    '/carts',
    policies_check('read', 'Cart'),
    cartController.index
);

module.exports = router;