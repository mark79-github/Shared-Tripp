const {trippService} = require('../../services');

module.exports = async (req, res, next) => {
    if (req.user) {
        trippService.getById(req.params.trippId, false)
            .then((tripp) => {
                res.locals.isCreator = tripp.creator._id.toString() === req.user.id.toString();
                res.locals.isJoined = tripp.buddies.some(value => {
                    return value._id.toString() === req.user.id.toString();
                });
                res.locals.hasSeats = Number(tripp.seats) > 0;
            });
    }

    next();
}