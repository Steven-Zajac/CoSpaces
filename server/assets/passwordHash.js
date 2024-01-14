const bcrypt = require('bcrypt');

// Function that will has user passwords
const passwordHash = async (password) => {
    const saltRounds = 10; // Higher longer but more secure

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

module.exports = passwordHash;

