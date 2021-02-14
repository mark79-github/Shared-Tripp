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
// •	The Starting Point - End Point - Starting and End point should be at least 4 characters long (each) and should be separated with single space, dash and another single space (" - ")
// •	The Date - Time - Date and Time should be at least 6 characters long (each) and should be separated with single space, dash and another single space (" - ")
// •	The CarImage - should be actual link refering to the car image
// •	The Seats should be positive number
// •	The description should be minimum 10 characters long
        create(req, res, next) {
            let {startAndEndPoint, dateTime, carImage, seats, description} = req.body;

            let tripp = {
                errors: [],
            };

            req.body.startPoint = startAndEndPoint.split(' - ')[0];
            req.body.endPoint = startAndEndPoint.split(' - ')[1];

            req.body.date = dateTime.split(' - ')[0];
            req.body.time = dateTime.split(' - ')[1];

            let startPoint = req.body.startPoint.trim();
            let endPoint = req.body.startPoint.trim();

            let date = req.body.date;
            let time = req.body.time;

            if (startPoint.length === 0 || startPoint.length < constants.START_POINT_MIN_LENGTH) {
                tripp.errors.push(msg.START_POINT_MIN_LENGTH);
            } else {
                tripp.startPoint = startPoint;
            }

            if (endPoint.length === 0 || endPoint.length < constants.END_POINT_MIN_LENGTH) {
                tripp.errors.push(msg.END_POINT_MIN_LENGTH);
            } else {
                tripp.endPoint = endPoint;
            }

            if (date.length === 0 || date.length < constants.DATE_MIN_LENGTH) {
                tripp.errors.push(msg.DATE_MIN_LENGTH);
            } else {
                tripp.date = date;
            }

            if (time.length === 0 || time.length < constants.TIME_MIN_LENGTH) {
                tripp.errors.push(msg.TIME_MIN_LENGTH);
            } else {
                tripp.time = time;
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