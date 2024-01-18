"use strict";

const { MongoClient } = require("mongodb");
require('dotenv').config();
const { MONGO_URI } = process.env;

// Deletes selected user profile
const deleteUser = async (req, res) => {
    
    const { userId } = req.params;
    const client = new MongoClient(MONGO_URI);

    try {
        await client.connect();
        const db = client.db('CoSpaces');

        // getUser to check if user even exists
        const userExists = await db.collection('users').findOne({ _id: userId });
        if (!userExists) {
            res.status(404).json({
                status: 404,
                message: "User not found"
            })
            return;
        }

        // Check if any existing reservations
        const userReservations = await db.collection('reservations').find({ 'userId': userId }).toArray();    
        // Case: if reservations, we must increase availabilities and delete reservations
        if (userReservations.length) {
            let modified = 0; // To compare how many res were modified
            for (const obj of userReservations) {          
                const query = { 
                    "_id": obj.location,
                    "days.day": obj.date.getDate().toString()
                };
                const toUpdate = {"$inc": { "days.$.available": 1}};
                const updatedAvailability = await db.collection('availabilities').updateOne(query, toUpdate);
                updatedAvailability.modifiedCount && (modified += 1)
            }
            // Availabilities were modified, proceed with deletion of reservations
            if (userReservations.length === modified) {
                const deletedRes = await db.collection('reservations').deleteMany({ 'userId': userId});
                // Reservations & Availabilities updates, now delete user
                if (userReservations.length === deletedRes.deletedCount) {
                    const deletedUser = await db.collection('users').deleteOne({ _id: userId });
                    if (deletedUser.deletedCount) {
                        res.status(204).json({
                            status: 204,
                            message: "User data deleted"
                        })
                    } else {
                        res.status(404).json({
                            status: 404,
                            message: "Error deleting user data"
                        })
                    }
                } else {
                    res.status(409).json({
                        status: 409,
                        message: "Error deleting reservations"
                    })
                }
            } else {
                res.status(409).json({
                    status: 409,
                    data: modified,
                    message: "Error updating availabilities collection."
                })
            }
        } else {
            // Case: user has no reservations, we can delete user (this will be the else)
            const deletedUser = await db.collection('users').deleteOne({ _id: userId });
            if (deletedUser.deletedCount) {
                res.status(204).json({
                    status: 204,
                    message: "User data deleted"
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Error deleting user data"
                })
            }
        }
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = deleteUser;
