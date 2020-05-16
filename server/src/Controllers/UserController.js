const db = require('../db');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    name: Joi.string().required(),
    password: Joi.string().trim().min(10).required()
});

module.exports = {
    async create(req, res, next) {
        const { username, name, password } = req.body;
        const result = Joi.validate({username, name, password}, userSchema);

        if(result.error){
            res.status(400);
            return next(result.error);
        }

        try{

            const snapshot = await db.collection('users').where('username', '==', username).get()
        
            
            if(!snapshot.empty){
                const error = new Error('Username already taken.')
                res.status(409);
                return next(error);
            }
            
            const hashedPassword = bcrypt.hashSync(password, 12);

            const newUser = {
                username,
                name,
                password: hashedPassword
            }

            db.collection('users').add(newUser).then(ref => {
                res.status(201);
                return res.json({
                    id: ref.id
                })
            })
            .catch(error => {
                const err = new Error('Not able to insert user.')
                res.status(503);
                return next(err);
            });

        
        }catch(error){
            console.log(error);
            const err = new Error("Connection error. Try again later.");
            res.status(503);
            return next(err);
        };
        

    }
};