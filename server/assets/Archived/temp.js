const bcrypt = require('bcrypt');
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
const storedHash = '$2b$10$0WXtHxFPDcJqZV5ThyHzkePCQrilCK3k3Xg.TA8zic.RMJwwp6dLm'; // Replace with your hashed password
const inputPassword = 'jenny123'; // Replace with the password you want to verify

//verifyPassword(storedHash, inputPassword);

const randomBytes = require('crypto').randomBytes(64).toString('hex');
console.log(randomBytes)

