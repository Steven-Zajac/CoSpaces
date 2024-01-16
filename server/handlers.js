
// User
const deleteUser = require('./handlers/User/deleteUser');
const getUsers = require('./handlers/User/getUsers');
const getUser = require('./handlers/User/getUser');
const postUser = require('./handlers/User/postUser');
const putUser = require('./handlers/User/putUser');

// Reservation 
const deleteReservation = require('./handlers/Reservation/deleteReservation');
const getReservations = require('./handlers/Reservation/getReservations');
const getReservation = require('./handlers/Reservation/getReservation');
const getUserReservations = require('./handlers/Reservation/getUserReservations');
const postReservation = require('./handlers/Reservation/postReservation');
const putReservation = require('./handlers/Reservation/putReservation');

module.exports = {
    deleteUser,
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteReservation,
    getReservations,
    getReservation,
    getUserReservations,
    postReservation,
    putReservation
};