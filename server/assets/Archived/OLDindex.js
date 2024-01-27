'use-strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 4000;

const {
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
    patchReservation,
    getAvailabilities,
    getLocations,
    postLogin,
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
    .delete('/api/users/:userId', deleteUser) // Delete user data
    .get('/api/users', getUsers) // retrieve all users
    .get('/api/users/:userId', getUser) // retrieve single user
    .patch('/api/users/:userId', patchUser) // Update user information (Eventually create a password only EP)
    .post('/api/users', postUser) // Add a new user

    // Reservations
    .delete('/api/reservations/:resId', deleteReservation)
    .get('/api/reservations', getReservations) // Get all reservations
    .get('/api/reservations/user/:userId', getUserReservations) // Get all res for a userId
    .get('/api/reservations/res/:resId', getReservation) // Get res by resId
    .patch('/api/reservations/:resId', patchReservation)
    .post('/api/reservations', postReservation)

    // Availabilities & locations
    .get('/api/availabilities/:location', getAvailabilities) // retrieve availabilities for specific location
    .get('/api/locations', getLocations)

    // Login 
    .post('/api/login', postLogin)

    // CATCH ALL
    .get('*', (req, res) => res.status(404).json({status: 404, message: "PAGE NOT FOUND"}))

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));

    /*
    {
    "version": 2,
    "builds": [
        { "src": "server/package.json", "use": "@vercel/node" },
        { "src": "client/package.json", "use": "@vercel/static-build", "config": { "distDir": "build" } }
    ],
    "routes": [
        { "src": "/api/(.*)", "dest": "/api/$1" },
        { "src": "/(.*)", "dest": "/client/build/$1" }
    ]
}*/