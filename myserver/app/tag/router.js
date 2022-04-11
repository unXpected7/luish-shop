const router = require('express').Router();
const { policies_check } = require('../../middlewares');
const tagController = require('./controller');

router.get('/tags', tagController.index);
router.post('/tags',
    policies_check('create', 'Tag'),
    tagController.store
);
router.put('/tags/:id',
    policies_check('update', 'Tag'),
    tagController.update
);
router.delete('/tags/:id',
    policies_check('delete', 'Tag'),
    tagController.destroy
);
router.get('/tags/:id', tagController.show);

module.exports = router;