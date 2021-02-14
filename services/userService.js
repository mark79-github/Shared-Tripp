const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {msg} = require('../config/constants');
// const bcrypt = require('bcrypt');

async function register(data) {

    const {email} = data;

    // let user = await User.findOne({email});
    // if (user) throw {message: 'email is in use'};
    //
    // user = new User(data);
    // return user.save();

    await User.findOne({email})
        .then((user) => {
            if (user) {
                throw {message: msg.EMAIL_IS_IN_USE(email)}
            }
            return new User(data).save();
        });
}

function login(data) {
    const {email, password} = data;

    // let user = await User.findOne({email}) || {};
    // let isMatch = await bcrypt.compare(password, user.password || '');
    //
    // if (!user || !isMatch) {
    //     throw {message: 'Wrong email and/or password'}
    // }
    // return jwt.sign({id: user._id, email: user.email}, config.secret, {expiresIn: "1h"});

    // return User.findOne({email})
    //     .then((user) => {
    //         if (bcrypt.compareSync(password, user.password || '')) {
    //             return jwt.sign({id: user._id, email: user.email}, config.secret, {expiresIn: "60s"});
    //         } else {
    //             return '';
    //         }
    //     });

    return User.findOne({email})
        .then((user) => {
            if (user) {
                return Promise.all([user.comparePasswords(password), user])
            }
            return [false];
        }).then(([isMatch, user]) => {
            if (isMatch) {
                return jwt.sign({id: user._id, email: user.email}, config.privateKey, {expiresIn: "1h"});
            } else {
                return '';
            }
        });
}

module.exports = {
    register,
    login
}
