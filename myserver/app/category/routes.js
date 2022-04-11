const router = require('express').Router();
const { policies_check } = require('../../middlewares');
const categoryController = require('./controller');

router.get('/categories', categoryController.index);
router.post('/categories',
    policies_check('create', 'Category'),
    categoryController.store
);
router.put('/categories/:id',
    policies_check('update', 'Category'),
    categoryController.update
);
router.delete('/categories/:id',
    policies_check('delete', 'Category'),
    categoryController.destroy
);

module.exports = router;