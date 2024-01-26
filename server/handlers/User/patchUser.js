"use strict";

const passwordHash = require('../../assets/passwordHash');

const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

// This will update user information 
const patchUser = async (req, res) => {

    // Might face an issue with how FE and BE transmit data

    // Retrieve user information
    const { userId } = req.params; 
    const userData = req.body;

    // Ensure we are only keeping the items that have new data
    Object.keys(userData).forEach(key => {
        if (typeof userData[key] === 'string' && userData[key].trim() === '') {
            delete userData[key];
        }
    });

    /*
    // Case: nothing to be changed
    if (!Object.keys(userData).length) {
        res.status(204).json({
            status: 204,
            message: "No user data to modify"
        })
        return;
    };*/

    const client = new MongoClient(MONGO_URI);
    try {
        // New password? -> encrypt.  for later use
        ('password' in userData) && (userData['password'] = await passwordHash(userData.password));

        await client.connect();
        const db = client.db('CoSpaces');
        const updatedUser = await db.collection('users').updateOne({ _id: userId }, { $set: userData });
        if (!updatedUser.matchedCount) {
            res.status(404).json({
                status: 404,
                message: "There has been an error updating user data. User not found."
            })
        } else if (updatedUser.matchedCount && !updatedUser.modifiedCount){
            res.status(409).json({
                status: 409,
                message: "User data not updated. No new data provided."
            })
        } else {
            res.status(200).json({
                status: 200,
                data: userData // Want to send user data to inform what was successfully changed server side
            })
        }    
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = patchUser;