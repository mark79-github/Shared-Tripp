const {Tripp} = require('../models');

function getAll() {
    return Tripp.find({}).lean();
}

function getById(trippId, populateData) {
    if (populateData) {
        return Tripp.findById(trippId).populate('buddies').populate('creator').lean();
    } else {
        return Tripp.findById(trippId).lean();
    }
}

function create(data, userId) {

    const {startAndEndPoint, dateTime, carImage, seats, description} = data;

    let startPoint = startAndEndPoint.split(' - ')[0].trim();
    let endPoint = startAndEndPoint.split(' - ')[1].trim();

    let date = dateTime.split(' - ')[0].trim();
    let time = dateTime.split(' - ')[1].trim();

    let trip = new Tripp({
        startPoint,
        endPoint,
        date,
        time,
        carImage,
        seats,
        description,
        creator: userId,
    });
    return trip.save();
}

function remove(trippId) {
    return Tripp.findByIdAndDelete(trippId);
}

function join(trippId, userId) {
    return Tripp.findById(trippId)
        .then((tripp) => {
            if (Number(tripp.seats) === 0) {
                throw {message: "No seats available"}
            }
            tripp.buddies.push(userId);
            tripp.seats = Number(tripp.seats) - 1;
            return tripp.save();
        });
}

module.exports = {
    create,
    remove,
    getAll,
    getById,
    join,
}