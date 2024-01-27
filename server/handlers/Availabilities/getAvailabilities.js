"user strict";

const { MongoClient } = require("mongodb");
require('dotenv').config();
const { MONGO_URI } = process.env;

// Retrieves the availabilities for specific location
const getAvailabilities = async (req, res) => {

    const { location } = req.params;
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const availabilities = await db.collection('availabilities').find({ _id: location }).toArray();

        (availabilities.length) ?
        res.status(200).json({
            status: 200,
            data: availabilities
        }) :
        res.status(404).json({
            status: 404,
            message: "No location data found"
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = getAvailabilities;