"use strict";
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

// This will retrieve a specific reservation by reservation ID
const getReservation = async(req, res) => {

    const { resId } = req.params;
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const reservation = await db.collection('reservations').findOne({ _id: resId });

        reservation ? 
        res.status(200).json({
            status: 200,
            data: reservation
        }) :
        res.status(404).json({
            status: 404,
            message: 'No reservation found'
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = getReservation;