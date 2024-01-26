"use strict";
const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

// Retrieves all reservations for specified userId
const getUserReservations = async (req, res) => {

    const { userId } = req.params;
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const reservations = await db.collection('reservations').find({ 'userId': userId }).toArray();
        
        res.status(200).json({
            status: 200,
            data: reservations
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = getUserReservations;

