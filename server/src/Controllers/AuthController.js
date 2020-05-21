const { db } = require('../db');
const userSchema = require('../Validation/UserValidation');
const jwt = require('jsonwebtoken');

module.exports = {

    createUserToken(user){
        const paylod = {
            id: user.id,
            username: user.username,
            name: user.name
        };

        const token = jwt.sign(paylod, process.env.TOKEN_SECRET, {
            expiresIn: '1d'
        });

        return token;
    },

    verifyUserToken(token, username, id){

        try {
            const decode = jwt.verify(token, process.env.TOKEN_SECRET);

            if (decode.username != username || decode.id != id ){
                throw new Error('Invalid token');
            }
            
            return {user: decode};

        } catch (error) {

            return {error};
        }
        
    },

    checkToken(req, res, next){
        const authHeader = req.get('authorization');

        if (!authHeader){
            return next();
        }

        const token = authHeader.split(' ')[1];

        if(!token){
            return next();
        }

        try {
            const user = jwt.verify(token, process.env.TOKEN_SECRET);
    
            req.user = user;
            return next();
            
        } catch (error) {
            return next();
        }
    },

    isLoggedIn(req, res, next){
        if(!req.user){
            res.status(401);
            return res.json({
                error: "You must me logged in to use this route"
            })
        }

        next();
    }
}