'use-strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 4000;

const {
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
} = require('./handlers');


express()
    .use(function(req, res, next) {
        res.header(
            'Access-Control-Allow-Methods',
            'OPTIONS, HEAD, GET, PUT POST, DELETE'
        );
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('./server/assets'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

// ADD ENDPOINTS HERE //

    // User
    .delete('/users/:userId', deleteUser) // Delete user data
    .get('/users', getUsers) // retrieve all users
    .get('/users/:userId', getUser) // retrieve single user
    .post('/users', postUser) // Add a new user
    .put('/users/:userId', putUser) // Update user information (Eventually create a password only EP)

    // Reservations
    .delete('/reservations/:resId', deleteReservation)
    .get('/reservations', getReservations) // Get all reservations
    .get('/reservations/:userId', getUserReservations) // Get all res for a userId
    .get('/reservation/:resId', getReservation) // Get res by resId
    .post('/reservations', postReservation)
    .put('/reservations/:resId', putReservation)
    // CATCH ALL
    .get('*', (req, res) => res.status(404).json({status: 404, message: "PAGE NOT FOUND"}))

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));
