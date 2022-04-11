const { AbilityBuilder, Ability } = require("@casl/ability");

const getToken= (req) => {
    let token =
        req.headers.authorization
        ? req.headers.authorization.replace('Bearer', '')
        : null;
    return token && token.length ? token : null;
}
// policy
const policies = {
    guest(user,{can}) {
        can('read', 'Product');
    },
    user(user, {can}) {
        can('view', 'Order');
        can('create', 'Order');
        can('read', 'Order', {users_id: user.id});
        can('update', 'User', {users_id: user.id});
        can('read', 'Cart', {users_id: user.id});
        can('update', 'Cart', {users_id: user.id});
        can('view', 'DeliveryAddress');
        can('create', 'DeliveryAddress', {users_id: user.id});
        can('update', 'DeliveryAddress', {users_id: user.id});
        can('delete', 'DeliveryAddress', {users_id: user.id});
        can('read', 'Invoice', {users_id: user.id});
    },
    admin(user,{can}) {
        can('manage', 'all');
    },
}
const policyFor = (user) => {
    let builder = new AbilityBuilder();
    if(user && typeof policies[user.role] === 'function') {
        policies[user.role](user, builder);
    } else {
       policies['guest'](user, builder);
    }
    return new Ability(builder.rules)
}

module.exports = {
    getToken,
    policyFor
}