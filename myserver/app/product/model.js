const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema({

    name: {
        type: String,
        minlength: [3, 'Panjang nama Makanan minimal 3 karakter'],
        required: [true, 'Nama makanan harus diisi']
    },

    description: {
        type: String,
        maxlength: [1000, 'Panjang deskripsi maksimal 1000 karakter']
    },

    price: {
        type: Number,
        default: 0
    },

    image_url: String,

    tags: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category' //? reference to Category model
    },

}, {timestamps: true}); //? createTimea and UpdateTime

module.exports = model('Product', productSchema);