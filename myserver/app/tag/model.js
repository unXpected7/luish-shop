const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const tagSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'Tag name must be at least 3 characters'],
        maxlength: [50, 'Tag name must be at most 50 characters'],
        required: [true, 'Tag name is required']
    },
})

module.exports = model('Tag', tagSchema);