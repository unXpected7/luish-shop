const router = require('express').Router();
const multer = require('multer'); // for upload images
const os = require('os');  //? untuk menyesuaikan directory
const { policies_check } = require('../../middlewares');

const productController = require('./controller');

router.post('/products',
    multer({dest: os.tmpdir()}).single('image'),
    policies_check('create', 'Product'),
    productController.store
);
router.put('/products/:id', 
    multer({dest: os.tmpdir()})
    .single('image'),
    policies_check('update', 'Product'),
    productController.update
);
router.delete('/products/:id',
    policies_check('delete', 'Product'),
    productController.destroy
);
router.get('/products',
    productController.index
);
//? tmpdir = akan diupload ke temporary directory, setiap OS punya folder temporary bawaan OS masing masing

module.exports = router;