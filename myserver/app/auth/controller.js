const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const getToken = require('../../utils').getToken;

const register = async (req, res) => {
    try {
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.status(201).json({
            message: 'User created successfully',
            data: user
        });
    } catch (err) {
       // validation error
         if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        // other error
        next(err);
    }
};

const localStrategy = async (email, password, done) => {
    try {
        let user =
            await User.findOne({email: email})
            .select('-__v -createdAt -updatedAt -cart_items -token'); //? select all except __v, createdAt, updatedAt, cart_items, token
        if(!user) return done();
        if(bcrypt.compareSync(password, user.password)) {
            ({password, ...userWithoutPassword} = user.toJSON());
            return done(null, userWithoutPassword);
        }
    } catch (err) {
        done(err, null);
    }
    done();
};

const login = async (req, res) => {
    passport.authenticate('local', async function (err, user){
        if(err) return next (err);

        if(!user) return res.json({error: 1, message: 'Invalid email or password'});

        let signed = jwt.sign(user, config.secretkey);
        await User.findByIdAndUpdate(user._id, {$push: {token: signed}}); //? push token array to user
        res.json({
            message: 'Login success',
            user,
            token: signed
        })
    })  (req, res, next);
}

const logout = async (req, res, next) => {
    let token = getToken(req);

    let user = await User.findOneAndUpdate({token: {$in: [token]}}, {pull: {token: token}}, {useFindAndModify: false});
    if(!token || !user) {
        res.json({
            error: 1,
             message: 'No user found'
            });
        }

        return res.json({
            error: 0,
            message: 'Logout success'
        });

}

const me = (req, res) => {
    if(!req.user) {
        res.json({
        error: 1,
        message: 'You are not logged in or token expired'
        });
    }
    res.json(req.user);
}

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me
};
