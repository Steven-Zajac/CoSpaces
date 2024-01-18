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
        // Case: User has no reservations, we can delete user. 
        if (!userReservations.length) {
            const deletedUser = await db.collection('users').deleteOne({ _id: userId });
            if (!deletedUser.deletedCount) {
                res.status(404).json({
                    status: 404,
                    message: "Error deleting user"
                })
            } else {
                res.status(204).json({
                    status: 204,
                    message: "User data deleted"
                })
            }
        } else { 
            let modified = 0; // To compare how many res were modified
            // Iterates and updates availabilities that were used up by user
            for (const obj of userReservations) {          
                const query = { 
                    "_id": obj.location,
                    "days.day": obj.date.getDate().toString()
                };
                const toUpdate = {"$inc": { "days.$.available": 1}};
                const updatedAvailability = await db.collection('availabilities').updateOne(query, toUpdate);
                updatedAvailability.modifiedCount && (modified += 1)
            }
            // Case: Not all availabilities were modified
            if (userReservations.length !== modified) {
                res.status(409).json({
                    status: 409,
                    data: modified,
                    message: "Unable to delete user. Unable to modify all availabilities."
                })
            } else {
                const deletedRes = await db.collection('reservations').deleteMany({ 'userId': userId});
                // Case: Not all reservations were deleted
                if (userReservations.length !== deletedRes.deletedCount){
                    res.status(409).json({
                        status: 409,
                        message: "Error deleting all user reservations"
                    })
                } else {
                    const deletedUser = await db.collection('users').deleteOne({ _id: userId });
                    // Case: User data was not deleted
                    if (!deletedUser.deletedCount) {
                        res.status(404).json({
                            status: 404,
                            message: "Error deleting user data"
                        })
                    } else {
                        res.status(204).json({
                            status: 204,
                            message: "User data deleted"
                        })
                    } 
                }
            }
        }
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = deleteUser;
