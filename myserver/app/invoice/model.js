const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const InvoiceSchema = new Schema({

    sub_total: {
        type: Number,
        required: [true, 'Sub Total is required'],
    },
    delivery_fee: {
        type: Number,
        required: [true, 'Delivery Fee is required'],
    },
    delivery_address: {
        street: { type: String, required: [true, 'Street Address is required'] },
        district: { type: String, required: [true, 'District is required'] },
        regency: { type: String, required: [true, 'Regency is required'] },
        province: { type: String, required: [true, 'Province is required'] },
        detail: { type: String}
    },
    total: {
        type: Number,
        required: [true, 'Total is required'],
    },
    payment_status: {
        type: String,
        enum: ['waiting payment', 'paid'],
        default: 'waiting payment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, {Timestamps: true});

module.exports = model('Invoice', InvoiceSchema);