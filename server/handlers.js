
// User
const deleteUser = require('./handlers/User/deleteUser');
const getUsers = require('./handlers/User/getUsers');
const getUser = require('./handlers/User/getUser');
const postUser = require('./handlers/User/postUser');
const patchUser = require('./handlers/User/patchUser');

// Reservation 
const deleteReservation = require('./handlers/Reservation/deleteReservation');
const getReservations = require('./handlers/Reservation/getReservations');
const getReservation = require('./handlers/Reservation/getReservation');
const getUserReservations = require('./handlers/Reservation/getUserReservations');
const postReservation = require('./handlers/Reservation/postReservation');
const putReservation = require('./handlers/Reservation/putReservation');

// Availabilities
const getAvailabilities = require('./handlers/Availabilities/getAvailabilities');

module.exports = {
    deleteUser,
    getUsers,
    getUser,
    postUser,
    patchUser,
    deleteReservation,
    getReservations,
    getReservation,
    getUserReservations,
    postReservation,
    putReservation,
    getAvailabilities,
};