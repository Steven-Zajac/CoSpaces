const bcrypt = require('bcrypt');

const passwordVerify = async (onFile, userInput) => {
    try {
        const match = await bcrypt.compare(userInput, onFile);
        return match;
    } catch (error) {
        throw new Error(`Error hashing password: ${error.message}`);
    }
};

module.exports = passwordVerify;



/*
async function verifyPassword(storedHash, inputPassword) {
    try {
        // Compare the input password with the stored hash
        const match = await bcrypt.compare(inputPassword, storedHash);

        if (match) {
            console.log('Password is correct!');
        } else {
            console.log('Password is incorrect.');
        }
    } catch (error) {
        console.error('Error verifying password:', error);
    }
}

// Example usage
const storedHash = '$2b$10$K7qVk0gTuuHJtF2aX/WgUeCOAl1ndsjyCBTMzwzgotir5Q8Mh4Y0q'; // Replace with your hashed password
const inputPassword = 'Jenny123'; // Replace with the password you want to verify

verifyPassword(storedHash, inputPassword);
*/