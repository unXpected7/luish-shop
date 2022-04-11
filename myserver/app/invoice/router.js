const router = require('express').Router();
const InvoiceController = require('./controller');

router.get('/invoices/:order_id', InvoiceController.show);

module.exports = router;