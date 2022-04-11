const {subject} = require('@casl/ability');
const Invoice = require('../invoice/model');
const {policyFor} = require('../../utils');

const show = async (req, res) => {
    try {
        
        let policy = policyFor(req.user);
        let subjectInvoice = subject('Invoice', {...invoice, users_id: invoice.users_id});
        if(!policy.can('read', subjectInvoice)) {
            return res.status(403).json({
                message: 'You are not authorized to view this invoice',
                error: 'Forbidden'
            });
        }
        let {order_id} = req.params;
        let invoice = 
            await Invoice
            .findOne({order: order_id})
            .populate('order')
            .populate('user');
        return res.status(200).json(invoice);
    } catch(error) {
        return res.status(500).json({
            message: 'Error when trying to show invoice',
            error: error.message
        });
    }
}
module.exports = {
    show
}
