const RIPEMD160 = require('ripemd160')
const crypto = require('crypto')

// Generate random 32byte secret and create RIPEMD160 hash from it 
crypto.randomBytes(32, function(err, buffer) {
    console.log("\nSecret:\t\t\t", buffer.toString('hex'));
    hashedSecret = new RIPEMD160().update(buffer).digest('hex')
    console.log("\Hashed Secret:\t\t", hashedSecret, "\n")
});