const router = require('express').Router();
const deliveryAddressController = require('./controller');
const {policies_check} = require('../../middlewares');

router.post(
    '/delivery-addresses',
    policies_check('create', 'DeliveryAddress'),
    deliveryAddressController.store
);
router.put(
    '/delivery-addresses/:id',
    policies_check('update', 'DeliveryAddress'),
    deliveryAddressController.update
);

router.delete(
    '/delivery-addresses/:id',
    policies_check('delete', 'DeliveryAddress'),
    deliveryAddressController.destroy
);

router.get(
    '/delivery-addresses',
    policies_check('view', 'DeliveryAddress'),
    deliveryAddressController.index
)
module.exports = router;