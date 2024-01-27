"use strict";

const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

// Retrieves all available locations
const getLocations = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const NUMLOCATIONS = 2; // To be modified, ensures we grabbed all available locations

    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const locationObjs = await db.collection('availabilities').find({}, { projection: { _id: 1 } }).toArray()
        const locations =  locationObjs.map(item => item._id);
        
        (locations.length === NUMLOCATIONS) ? 
        res.status(200).json({
            status: 200,
            data: locations
        }) :
        res.status(404).json({
            status: 404,
            message: "Locations not found"
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    } finally {
        await client.close();
    }
};


module.exports = getLocations;