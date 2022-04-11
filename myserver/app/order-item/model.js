const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const orderItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    qty: {
        type: Number,
        required: [true, 'Qty is required'],
        min: [1, 'Qty must be at least 1'],
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
});

module.exports = model('OrderItem', orderItemSchema);