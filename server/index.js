const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

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

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.static('./server/assets')); // Is this needed?
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(__dirname + '/'))

// ADD ENDPOINTS HERE //

// User
app.delete('/api/users/:userId', deleteUser); // Delete user data
app.get('/api/users', getUsers); // retrieve all users
app.get('/api/users/:userId', getUser); // retrieve single user
app.patch('/api/users/:userId', patchUser); // Update user information (Eventually create a password only EP)
app.post('/api/users', postUser); // Add a new user

// Reservations
app.delete('/api/reservations/:resId', deleteReservation);
app.get('/api/reservations', getReservations); // Get all reservations
app.get('/api/reservations/user/:userId', getUserReservations); // Get all res for a userId
app.get('/api/reservations/res/:resId', getReservation); // Get res by resId
app.patch('/api/reservations/:resId', patchReservation);
app.post('/api/reservations', postReservation);

// Availabilities & locations
app.get('/api/availabilities/:location', getAvailabilities); // retrieve availabilities for specific location
app.get('/api/locations', getLocations);

// Login 
app.post('/api/login', postLogin);

// CATCH ALL
app.get('*', (req, res) => res.status(404).json({status: 404, message: "PAGE NOT FOUND"}));

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));

module.exports = app;

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