"use strict";

const { MongoClient } = require("mongodb");
require('dotenv').config();
const { MONGO_URI } = process.env;

// This will retrieve all reservations 
const getReservations = async(req, res) => {

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const reservations = await db.collection('reservations').find().toArray();

        reservations ?
        res.status(200).json({
            status: 200,
            data: reservations
        }) :
        res.status(404).json({
            status: 404,
            message: "No reservations found."
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = getReservations;