"use strict";

const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

//This will update an existing reservation (limited to seating only)
const patchReservation = async(req, res) => {

    const { resId } = req.params;
    const patchData = req.body;

    // Rid of empty strings or spaces
    Object.keys(patchData).forEach(key => {
        if (typeof patchData[key] === 'string' && patchData[key].trim() === ''){
            delete patchData[key]
        }
    });

    // Case: Nothing to be changed 
    if (Object.keys(patchData).length !== 4) {
        res.status(409).json({
            status: 409,
            message: "Missing data. Please make sure to select a date and a location"
        })
        return;
    }

    // Format new object to use for comparison 
    const date = new Date(patchData.year, patchData.month, patchData.day);
    const newData = { date: date, location: patchData.location }

    const client = new MongoClient(MONGO_URI);
    try {

        // Retrieve original reservation data
        await client.connect();
        const db = client.db('CoSpaces');
        const originalData = await db.collection('reservations').findOne({ _id: resId })
        
        // Case: No reservation found. raise error and exit. 
        if (!originalData) {
            res.status(404).json({
                status: 404,
                message: "Invalid reservation ID. Reservation not found."
            })
            return;
        }        

        // Verify the differences between reservations
        const newDate = newData.date.getTime() !== originalData.date.getTime();
        const newLocation = newData.location !== originalData.location;

        // Case: Both date and location are the same as original reservation. Nothing to update
        if (!newDate && !newLocation) {
            res.status(404).json({
                status: 404,
                message: "No updates, same date and location provided"
            })
            return;
        }

        // Case: Change in either date or location
        if (newDate || newLocation) {

            // Verify availabilities for new date and/or location (Use original patchData from req.body)
            const pipeline = [
                { $match: { _id: patchData.location, month: patchData.month } },
                { $unwind: '$days' }, // deconstructs -> { _id: 'rosemont', month: '1', days: { day: '1', available: 5 } }
                { $match: { 'days.day': patchData.day } },
                { $project: { available: '$days.available', _id: 0 } } // drop _id
            ];

            const isAvailable = await db.collection('availabilities').aggregate(pipeline).toArray();
            // If aggregate doesn't return anything
            if (!isAvailable.length) {
                res.status(409).json({
                    status: 409,
                    message: "No availabilities found."
                })
                return;
            }
    
            const numAvailable = isAvailable[0].available // grab the available value 
            // Case: Not enough spaces available 
            if (numAvailable <= 0) {
                res.status(409).json({
                    status: 409,
                    message: "Unable to process. No more spots left."
                })
            } else {
                // Want to update availabilities for new request
                const newResQuery = {
                    _id: patchData.location, 
                    month: patchData.month,
                    "days.day": patchData.day
                }
                const toUpdateDrop = { $inc: { "days.$.available": -1 } };
                const updatedNewAvailability = await db.collection('availabilities').updateOne(newResQuery, toUpdateDrop);
                // Case: New spot wasn't grabbed
                if (!updatedNewAvailability.modifiedCount) {
                    res.status(409).json({
                        status: 409,
                        message: "Unable to reserve at new location. Availabilities not updated"
                    })
                } else {
                    // Continue on with releasing original spot. 
                    const originalResQuery = {
                        _id: originalData.location, 
                        month: originalData.date.getMonth().toString(),
                        "days.day": originalData.date.getDate().toString()
                    };
                    const toUpdateAdd = { $inc: { "days.$.available": 1 } };
                    const updatedOldAvailability = await db.collection('availabilities').updateOne(originalResQuery, toUpdateAdd);
                    // Case: Old spot was not released, must release now spot
                    if (!updatedOldAvailability.modifiedCount) {
                        await db.collection('availabilities').updateOne(newResQuery, toUpdateAdd);
                        res.status(409).json({
                            status: 409,
                            message: "Error securing new spot. Old spot retained."
                        })
                    } else {
                        // Availabilities have been swapped. Now update reservation document 
                        const updatedRes = await db.collection('reservations').updateOne({ _id: resId }, { $set: newData  });
                        // Case: Reservation document not updated. Undo changes in availabilities collection. 
                        if (!updatedRes.modifiedCount) {
                            await db.collection('availabilities').updateOne(newResQuery, toUpdateAdd);
                            await db.collection('availabilities').updateOne(originalResQuery, toUpdateDrop);
                            res.status(409).json({
                                status: 409,
                                message: "Unable to update reservation. Reservation unchanged"
                            })
                        } else {
                            res.status(200).json({
                                status: 200,
                                data: newData
                            })
                        }
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

module.exports = patchReservation;