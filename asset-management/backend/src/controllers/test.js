const bcrypt = require('bcrypt');

bcrypt.hash('shreyash', 10, (err, hash) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed Password:', hash);  // Use this value to update your database
    }
});

// $2b$10$pyyGFNXMyHW4.ROabg0ZxOa/gO49V2xaPVRja2ZI47h7Ac2f2s/ui



