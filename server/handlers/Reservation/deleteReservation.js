"use strict";

const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

// Deletes selected reservation 
const deleteReservation = async(req, res) => {
    
    const { resId } = req.params;
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db('CoSpaces');
        
        // Check that reservation exists
        const resExists = await db.collection('reservations').findOne({ _id: resId });
        if (!resExists) {
            res.status(404).json({
                status: 404,
                message: "No reservation found"
            })
            return;
        }

        
        // Update availabilities collection before deleting reservation
        const query = {
            _id: resExists.location,
            month: resExists.date.getMonth().toString(),
            "days.day": resExists.date.getDate().toString()
        };
        const toUpdate = {"$inc": { "days.$.available": 1 } }

        const updateAvailability = await db.collection('availabilities').updateOne(query, toUpdate);
        // Case: Unable to increase availabilities
        if (!updateAvailability.modifiedCount) {
            res.status(409).json({
                status: 409,
                message: "Unable to delete reservation. Unable to modify availabilities"
            })
        } else {
            const deleteRes = await db.collection('reservations').deleteOne({ _id: resId });
            if (!deleteRes.deletedCount) {
                res.status(404).json({
                    status: 404,
                    message: "Availabilities updated. However, unable to complete reservation deletion"
                })
            } else {
                res.status(204).json({
                    status: 204,
                    message: "Reservation & data successfully deleted."
                })
            }
        }
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = deleteReservation;