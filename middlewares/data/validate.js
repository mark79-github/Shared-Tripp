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
    },
    tripp: {
        create(req, res, next) {
            let {startAndEndPoint, dateTime, carImage, seats, description} = req.body;

            let tripp = {
                errors: [],
            };

            startAndEndPoint = startAndEndPoint.trim();
            if (!constants.START_END_POINT_REGEX.test(startAndEndPoint)) {
                tripp.errors.push(msg.START_END_POINT_INVALID);
            } else {
                tripp.startAndEndPoint = startAndEndPoint;
            }

            dateTime = dateTime.trim();
            if (!constants.DATETIME_REGEX.test(dateTime)) {
                tripp.errors.push(msg.DATETIME_INVALID);
            } else {
                tripp.dateTime = dateTime;
            }

            if (!constants.CAR_IMAGE_URL_REGEX.test(carImage)) {
                tripp.errors.push(msg.CAR_IMAGE_URL_INVALID);
            } else {
                tripp.carImage = carImage;
            }

            if (!validator.isInt(seats) || Number(seats) < constants.SEATS_MIN) {
                tripp.errors.push(msg.SEATS_MIN);
            } else {
                tripp.seats = seats;
            }

            if (description.length === 0 || description.length < constants.DESCRIPTION_MIN_LENGTH) {
                tripp.errors.push(msg.DESCRIPTION_MIN_LENGTH);
            } else {
                tripp.description = description;
            }

            if (!tripp.errors.length) {
                next();
                return;
            }

            res.render('tripps/create', {...tripp, message: tripp.errors.shift()})
        }
    }
}