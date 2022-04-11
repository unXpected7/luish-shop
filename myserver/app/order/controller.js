const CartItem = require('../cart-item/model');
const DeliveryAddress = require('../deliveryAddress/model');
const Order = require('../order/model');
const {Types} = require('mongoose');
const Orderitem = require('../order-item/model');

const store = async (req, res) => {
    try{
        let {delivery_fee, delivery_address} = req.body;
        let items = await CartItem.find({user: req.user._id}).populate('product');
        if(!items){
            return res.status(400).json({
                error: 1,
                message: 'Cart is empty'
            });
        }
        let address = await DeliveryAddress.findOne({_id: delivery_address});
        let order = new Order({
            _id: Types.ObjectId(),
            status: 'waiting payment',
            delivery_fee: delivery_fee,
            delivery_address: {
                street: address.street,
                district: address.district,
                regency: address.regency,
                province: address.province,
                detail: address.detail
            },
            user: req.user._id
        });
        let orderItems =    //? instance of OrderItem
            await Orderitem
            .insertMany(items.map(item => ({
                ...item,
                name: item.product.name,
                qty: parseInt(item.qty),
                price: parseInt(item.product.price),
                order: order._id
            })));
        orderItems.forEach(item => order.order_items.push(item));
        await order.save();
        await CartItem.deleteMany({user: req.user._id});
        return res.status(200).json(order);
    } catch(err){
        console.log(err);
        if(err.name === 'ValidationError'){
        return res.status(500).json({
            error: 1,
            message: err.message,
            fields: err.errors
        });
        }
        next(err);
    }
}

const index = async (req, res) => {
    try{
     let {skip = 0, limit = 10} = req.query;
     let count = await Order.find({user: req.user._id}).countDocuments();
     let orders =
        await Order
        .find({user: req.user._id})
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate('order_items')
        .sort({createdAt: -1});
     return res.status(200).json({
        data: orders.map(order => order.toJSON({virtuals: true})),
        count: count
     });
    } catch(err){
        if(err.name === 'ValidationError'){
        return res.status(500).json({
            error: 1,
            message: err.message,
            fields: err.errors
        });
        }
        next(err);
    }
}

module.exports = {
    store,
    index
}