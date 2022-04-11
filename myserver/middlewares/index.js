const {getToken, policyFor} = require('../utils');
const jwt = require('jsonwebtoken');
const config = require('../app/config');
const User = require('../app/user/model');

function decodeToken() {
    return async function(req, res, next) {
        try {
            let token = getToken(req);

        if(!token) return next();

        req.user = jwt.verify(token, config.secretkey);

        let user = await User.findOne({token: {$in: [token]}});

        if(!user) {
            res.json({
                error: 1,
                message: 'token expired'
            });
        }
        } catch (err) {
            if(err && err.name === 'JsonWebTokenError') {
                return res.json({
                    error: 1,
                    message: 'invalid token'
                });
            }
            next(err);
        }

        return next();
    }
}
//? middleware for access control
const  policies_check= (action, subject) =>{
    return async (req, res, next) => {
        let policy = policyFor(req.user);
        if(!policy.can(action, subject)) {
            return res.json({
                error: 1,
                message: 'you are not allowed to do this action'
            })
        }
        return next();
    }
}

            


module.exports = {
    decodeToken,
    policies_check
    };