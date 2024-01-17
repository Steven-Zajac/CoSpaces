"use strict";

const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;

// This will update user information 
const patchUser = async(req,res) => {
    // ensure that userId is retained throughout, this is what we will match on in MongoDB
    // req.body will be what we grab, will need to remove anything that remains unchanged. 
    console.log(req.query)
    console.log(req.body);

};

module.exports = patchUser;