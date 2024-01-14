"user strict";

const { v4: uuidv4 } = require("uuid");
//const bcrypt = require('bcrypt');
const passwordHash = require('../../assets/passwordHash');
const { MongoClient } = require("mongodb");
require('dotenv').config();

const { MONGO_URI } = process.env;

// Adds a new user to the collection
const addUser = async (req, res) => {
    const userData = { _id: uuidv4().slice(0,8), ...req.body }; // Create user data object
    const userValues = Object.values(userData); // Extract only the values to usee later
    const client = new MongoClient(MONGO_URI);

    // Validate missing data
    const missingData = (userValues.some(item => item.trim() === '') || userValues.length !== 6);
    if (missingData) {
        res.status(404).json({
            status: 404,
            message: "Missing user data"
        })
        return;
    }

    try {
        const passwordHashed = await passwordHash(userData.password);
        userData['password'] = passwordHashed; // replace with hashed password

        await client.connect();
        const db = client.db('CoSpaces');
        const emailExists = await db.collection('registered_users').findOne({ email: userData.email });
        const phoneExists = await db.collection('registered_users').findOne({ phone: userData.phone });
        
        // Ensures that phone number or email is not already in system
        if (emailExists || phoneExists) {
            res.status(409).json({
                status: 409,
                message: "Email or phone number already registered"
            })
            return;
        }
        const pushRes = await db.collection('registered_users').insertOne(userData);
        if (!pushRes.insertedId) {
            res.status(404).json({
                status: 404,
                message: "There has been an error with your registration"
            })
        } else {
            res.status(200).json({
                status: 200,
                data: userData._id
            })
        }
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = addUser;