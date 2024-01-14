"use strict";

const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

// Get a user based on their User ID
const getUser = async (req, res) => {

    const { userId } = req.params;
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const user = await db.collection('registered_users').findOne({ _id: userId });

        user ?
        res.status(200).json({
            status: 200,
            data: user
        }) :
        res.status(404).json({
            status: 404,
            message: 'No user found'
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = getUser;