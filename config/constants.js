module.exports = {
    constants: {
        PASSWORD_MIN_LENGTH: 6,
        START_POINT_MIN_LENGTH: 4,
        END_POINT_MIN_LENGTH: 4,
        DATE_MIN_LENGTH: 6,
        TIME_MIN_LENGTH: 6,
        DESCRIPTION_MIN_LENGTH: 6,
        SEATS_MIN : 0,
        PASSWORD_REGEX: /^[A-Za-z0-9]+$/,
        CAR_IMAGE_URL_REGEX: /^https?/,
    },
    msg: {
        PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
        CONFIRMATION_PASSWORD_ERROR: "Your password and confirmation password do not match",
        PASSWORD_ONLY_ALPHABETICAL: "Password must contains only digits and/or latin letters",
        START_POINT_MIN_LENGTH: "Start point must be at least 4 characters",
        END_POINT_MIN_LENGTH: "End point must be at least 4 characters",
        DATE_MIN_LENGTH: "Date must be at least 6 characters",
        TIME_MIN_LENGTH: "Time must be at least 6 characters",
        CAR_IMAGE_URL_INVALID: "ImageUrl must start with http or https",
        DESCRIPTION_MIN_LENGTH: "Description must be at least 10 characters",
        SEATS_MIN : "Seats must be a positive number",
        WRONG_CREDENTIALS: "Wrong email and/or password",
        EMAIL_INVALID: "Email is not valid",
        EMAIL_IS_IN_USE: (email) => {
            return `EMAIL ${email} is already taken ...`
        },
        DB_CONNECTED: (host, name) => {
            return `Successfully connected to ${host} : db -> ${name}`
        },
        DB_CONNECTION_ERROR: "Connection error: ",
        APPLICATION_RUNNING: (port) => {
            return `Application is up & listening on port ${port} ...`;
        },
    }
}
