"user strict";

const jsonWebTkn = require('jsonwebtoken');
const passwordHash = require('../assets/passwordHash');
const passwordVerify = require('../assets/passwordVerify');

const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGO_URI } = process.env;

// import a user validation function 

// This will log the user in
const postLogin = async (req, res) => {

    const loginData = req.body;
    const { password } = req.body;

    // Clean object up
    Object.keys(loginData).forEach(key => {
        if (typeof loginData[key] === 'string' && loginData[key].trim() === '') {
            delete loginData[key]
        }
    });
    // Case: Empty fields
    if (!Object.keys(loginData).length) {
        res.status(409).json({
            status: 409,
            message: "Fields cannot be empty"
        })
        return;
    }

    // Delete known key. Allow phone or email
    delete loginData.password;

    // Store email or phone number
    const loginValue = loginData.loginId;

    // check whether number of email passed for MongoDB
    if (!isNaN(parseInt(loginValue))) {
        // assign loginValue to new phone key 
        loginData['phone'] = loginValue;
    } else {
        // assign loginValue to new email key 
        loginData['email'] = loginValue
    }

    // Now delete loginId key
    delete loginData.loginId;

    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('CoSpaces');

        // Match with user in db on email or phone number
        const user = await db.collection('users').findOne(loginData);
        // Case: No match
        if (!user) {
            res.status(404).json({
                status: 404,
                message: 'Invalid email or phone number'
            })
            return;
        }

        const validKey = await passwordVerify(user.password, password)
        if (!validKey) {
            res.status(401).json({
                status: 401,
                message: "Invalid password"
            })
        } else {
            // token will be used for later authentication (stretch)
            const token = jsonWebTkn.sign({ userId: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
            //console.log(jsonWebTkn.verify(token, process.env.JWT_SECRETKEY))
            res.status(200).json({
                status: 200,
                data: [token, user._id]
            })
        } 

    } catch (error) {
        res.status(500).json({status: 500, message: error.message});
    } finally {
        await client.close();
    }


    // Grab user inputs, then match mongo document that has that email address
    // Grab the user data, which includes the hashed password, compare the hashed password
    // if valid continue on, if not alert. 
    //




};

module.exports = postLogin;