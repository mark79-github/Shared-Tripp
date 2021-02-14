const {constants, msg} = require('../../config/constants');
const validator = require('validator');

module.exports = {
    user: {
        register(req, res, next) {
            let {email, password, rePassword} = req.body;

            let user = {
                errors: [],
            };

            email = validator.normalizeEmail(email.trim());
            if (!validator.isEmail(email)) {
                user.errors.push(msg.EMAIL_INVALID);
            } else {
                user.email = email.trim();
            }

            password = password.trim();
            if (password.length === 0 || password.length < constants.PASSWORD_MIN_LENGTH) {
                user.errors.push(msg.PASSWORD_MIN_LENGTH);
            }

            rePassword = rePassword.trim();
            if (password !== rePassword) {
                user.errors.push(msg.CONFIRMATION_PASSWORD_ERROR);
            }

            if (!constants.PASSWORD_REGEX.test(password)) {
                user.errors.push(msg.PASSWORD_ONLY_ALPHABETICAL);
            }

            if (!user.errors.length) {
                next();
                return;
            }
            res.render('users/register', {...user, message: user.errors.shift()});

        },
        login(req, res, next) {
            let {email, password} = req.body;

            let user = {
                errors: [],
            };

            email = validator.normalizeEmail(email.trim());

            if (!validator.isEmail(email)) {
                user.errors.push(msg.EMAIL_INVALID);
            } else {
                user.email = email;
            }

            password = password.trim();
            if (password.length === 0 || password.length < constants.PASSWORD_MIN_LENGTH) {
                user.errors.push(msg.PASSWORD_MIN_LENGTH);
            }

            if (!user.errors.length) {
                next();
                return;
            }
            res.render('users/login', {...user, message: user.errors.shift()})
        },
    }
}