const db = require('../db');
const UserValidation = require('../Validation/UserValidation');
const AuthController = require('./AuthController');
const Joi = require('joi');
const bcrypt = require('bcryptjs');


module.exports = {

    async index(req, res, next){
        const { username, password } = req.body;
        const result = Joi.validate({username, password}, UserValidation.validateUserSchema);

        if(result.error){
            res.status(400);
            return next(result.error);
        }

        try{
            const snapshot = await db.collection('users').where('username', '==', username).get();
        
            
            if(snapshot.empty){
                const error = new Error('Unable to login.');
                res.status(401);
                return next(error);
            }

            if(snapshot.size > 1){
                console.log("Usuário duplicado:", username);
                
                const error = new Error('Unable to login.');
                res.status(401);
                return next(error);
            }

           
            snapshot.forEach(doc => {
                const user = doc.data();
                
                const bcryptResult = bcrypt.compareSync(password, user.password);
                
                
                if(!bcryptResult){
                    const error = new Error('Unable to login.');
                    res.status(401);
                    return next(error);
                }

                const token = AuthController.createUserToken({
                    username: user.username,
                    name: user.name
                });

                res.status(200);
                return res.json({
                    id: doc.id,
                    username,
                    token
                });

            });


        } catch(erro){
            console.log('login try catch error', erro);
            
            const err = new Error("Connection error. Try again later.");
            res.status(503);
            return next(err);
        }
    },

    async create(req, res, next) {
        const { username, name, password } = req.body;
        const result = Joi.validate({username, name, password}, UserValidation.createUserSchema);

        if(result.error){
            res.status(400);
            return next(result.error);
        }

        try{

            const snapshot = await db.collection('users').where('username', '==', username).get();
        
            
            if(!snapshot.empty){
                const error = new Error('Username already taken.');
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
                const token = AuthController.createUserToken({username, name});
                
                res.status(201);
                return res.json({
                    id: ref.id,
                    username,
                    token
                })
            })
            .catch(error => {
                console.log('insert user error:',error);
                
                const err = new Error('Not able to insert user.')
                res.status(503);
                return next(err);
            });

        
        }catch(error){
            console.log('create try catch error:', error);
            
            const err = new Error("Connection error. Try again later.");
            res.status(503);
            return next(err);
        };
        

    }
};