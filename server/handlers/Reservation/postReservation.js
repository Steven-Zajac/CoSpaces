"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

// This will post a new reservation 
const postReservation = async (req, res) => {

    // Verify if fields are missing or empty
    const resValues = Object.values(req.body);
    const missingData = (resValues.some(item => item.trim() === '') || resValues.length !== 5);
    if (missingData) {
        res.status(404).json({
            status: 404,
            message: "Missing reservation data"
        })
        return;
    };

    // Parse data & create object for Mongo
    const { userId, location } = req.body;
    const date = new Date(req.body.year, req.body.month, req.body.day);
    const resData = { _id: uuidv4().slice(0,8), userId, date, location };

    const query = {
        _id: req.body.location,
        month: req.body.month,
        "days.day": req.body.day
    };
    
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        
        // Verify that the specified day has spots open
        const pipeline = [
            { $match: { _id: location, month: req.body.month } }, // filter by _id and month
            { $unwind: '$days' }, // deconstructs the days array -> { _id: 'rosemont', month: '1', days: { day: '1', available: 5 } }
            { $match: { 'days.day': req.body.day } }, // Match on the specified day 
            { $project: { available: '$days.available', _id: 0 } } // Include only the available key and drops the _id in output
        ];

        const isAvailable = await db.collection('availabilities').aggregate(pipeline).toArray();
        const numAvailable = isAvailable[0].available // grab the value for available
        // Case: Not enough spaces available
        if (numAvailable <= 0) {
            res.status(409).json({
                status: 409,
                message: "Unable to process, no more availabilities."
            })
        } else {
            const toUpdate = { "$inc": { "days.$.available": -1 } };
            const updatedAvailability = await db.collection('availabilities').updateOne(query, toUpdate);
            // Case: Unable to update available in availabilities collection
            if (!updatedAvailability.modifiedCount) {
                res.status(409).json({
                    status: 409,
                    message: "Unable to complete reservation, availabilities not updated."
                })
            } else {
                const addRes = await db.collection('reservations').insertOne(resData); 
                // Want to undo the decrease in availabilities if unable to push resData to collection
                if (!addRes.insertedId) {
                    const toUpdate = { "$inc": { "days.$.available": 1 } };
                    await db.collection('availabilities').updateOne(query, toUpdate);
                    res.status(404).json({
                        status: 404,
                        message: "Error finalizing reservation. "
                    })
                } else {
                    res.status(200).json({
                        status: 200,
                        data: resData._id
                    })
                }
            }
        }
    } catch (error){
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = postReservation;