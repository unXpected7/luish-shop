const {Schema, model} = require('mongoose');

const deliveryAddressSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name Address is required'],
        maxlength: [50, 'Name Address must be less than 50 characters'],
    },
    street: {
        type: String,
        required: [true, 'Street Address is required'],
        maxlength: [50, 'Street Address must be less than 50 characters'],
    },
    district: {
        type: String,
        required: [true, 'District is required'],
        maxlength: [50, 'District must be less than 50 characters'],
    },
    regency: {
        type: String,
        required: [true, 'Regency is required'],
        maxlength: [50, 'Regency must be less than 50 characters'],
    },
    province: {
        type: String,
        required: [true, 'Province is required'],
        maxlength: [50, 'Province must be less than 50 characters'],
    },
    detail: {
        type: String,
        required: [true, 'Detail Address is required'],
        maxlength: [255, 'Detail Address must be less than 255 characters'],
    },
    user: { //? one to one to user
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }
}, {Timestamps: true});

module.exports = model('DeliveryAddress', deliveryAddressSchema);
