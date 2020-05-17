const db = require('../db');
const userSchema = require('../Validation/UserValidation');
const jwt = require('jsonwebtoken');

module.exports = {

    createUserToken(user){
        const paylod = {
            username: user.username,
            name: user.name
        };

        const token = jwt.sign(paylod, process.env.TOKEN_SECRET, {
            expiresIn: '1d'
        });

        return token;
    }
}