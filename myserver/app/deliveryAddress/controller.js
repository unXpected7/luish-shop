const DeliveryAddress = require('./model');
const policyFor = require('../../utils');
const subject = require('@casl/ability');

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;
        let deliveryAddress = new DeliveryAddress({...payload, user: user._id});
        await deliveryAddress.save();
        return res.json(deliveryAddress);
    } catch(err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error:1,
                message: err.message,
                fields: err.errors
            });
        }

        next(err);
    }
}
const update = async (req, res, next) => {
    try {
        let {_id, ...payload} = req.body;
        let {id} = req.params.id;
        let deliveryAddress = await DeliveryAddress.findById(id);
        let policy = policyFor(req.user);
        let subjectAddress = subject('DeliveryAddress', {...deliveryAddress, user_id: deliveryAddress.user}); //? user_id: deliveryAddress.user
        if(!policy.can('update',subjectAddress)) {
            return res.json({
                error: 1,
                message: 'You are not authorized to update this delivery address'
        });
    }
    deliveryAddress = await DeliveryAddress.findByIdAndUpdate(id, payload, {new: true});
    return res.json(deliveryAddress);
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error:1,
                message: err.message,
                fields: err.errors
            });
        }   
    }
}

const destroy = async (req, res, next) => {
    try {
        let {id} = req.params.id;
        let deliveryAddress = await DeliveryAddress.findById(id);
        let policy = policyFor(req.user);
        let subjectAddress = subject('DeliveryAddress', {...deliveryAddress, user_id: deliveryAddress.user}); //? user_id: deliveryAddress.user
        if(!policy.can('delete',subjectAddress)) {
            return res.json({
                error: 1,
                message: 'You are not authorized to delete this delivery address'
        });
    }
    await DeliveryAddress.findByIdAndDelete(id);
    return res.json({
        message: 'Delivery address deleted successfully'
    });
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error:1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}
const index = async (req, res, next) => {
    try {
        let {skip, limit} = req.query;
        let count = await DeliveryAddress.find({user: req.user._id}).countDocuments();
        let deliveryAddresses = await DeliveryAddress
        .find({user: req.user._id})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .sort({createdAt: -1});
        return res.json({
            data: count, deliveryAddresses});
    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error:1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

module.exports = {
    store,
    update,
    destroy,
    index
}