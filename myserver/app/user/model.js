const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

let userSchema = Schema({
    full_name: {
        type: String,
        required: [true, 'Full name is required'],
        minlength: [3, 'Full name must be at least 3 characters'],
        maxlength: [50, 'Full name must be less than 50 characters']
    },
    customer_id: {
        type: Number,
    },

    email : {
        type: String,
        required: [true, 'Email is required'],
        maxlength: [50, 'Email must be less than 50 characters'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [50, 'Password must be less than 50 characters'],
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    token: [String]


}, {timestamps: true});

userSchema.path('email').validate((value) => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEX.test(value);
}, attr => `${attr} is not a valid email`);

userSchema.path('email').validate(async(value) => {
    try {
        // (1) Check if the email is already in the database
        const count = await this.model('User').count({email: value});

        // (2) If the email is already in the database, return false
        // (3) If the email is not in the database, return true
        // (4) If the email is in the
        return count === 0;
    } catch(err) {
        throw err
    }
}, attr => `${attr} is already in use`);

const HASH_ROUND = 10;
userSchema.pre('save', async function(next) { //? hook, before save run this program
    this.password = await bcrypt.hash(this.password, HASH_ROUND); //? jika menggunakan arrow function akan menangkap this global
    next();
});

//? mongoose not exist auto increment
//? add auto increment
userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});

module.exports = model('User', userSchema);
