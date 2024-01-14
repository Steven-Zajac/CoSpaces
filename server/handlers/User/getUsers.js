"use strict";

const { MongoClient } = require("mongodb");
require('dotenv').config();
const { MONGO_URI } = process.env;

// retrieves all users 
const getUsers = async (req, res) => {

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');
        const users = await db.collection('registered_users').find().toArray();

        users ?
        res.status(200).json({
            status: 200,
            data: users
        }) :
        res.status(404).json({
            status: 404,
            message: "No users found."
        })
    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }
};

module.exports = getUsers;