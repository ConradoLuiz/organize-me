const {db, admin} = require('../db');
const AuthController = require('./AuthController');
const UserValidation = require('../Validation/UserValidation');
const Joi = require('joi');

module.exports = {

    async index(req, res, next){
        const { username, id } = req.user;
        
        try {
            // 
            const snapshot = await db.collection('users').doc(id).collection('notes').get();
            const notes = [];
            
            snapshot.forEach(doc => notes.push( { id: doc.id, ...doc.data() } ));
            
            
            return res.json({ notes });

        } catch (error) {
            console.log('get notes try catch error', error);
            
            const err = new Error("Connection error. Try again later.");
            res.status(503);
            return next(err);
        }

    },

    async create(req, res, next){
        const { title } = req.body;
        const user = req.user;
        
        try {

            const newNote = {
                title,
                content: '',
                text_content: '',
                is_completed: false,
                updated_at: admin.firestore.FieldValue.serverTimestamp(), 
                created_at: admin.firestore.FieldValue.serverTimestamp()
            }

            

            db.collection('users').doc(user.id).collection('notes').add(newNote).then(ref => {
                 
                res.status(201);
                return res.json({
                    id: ref.id
                })
            })

        } catch (error) {
            console.log('create note try catch error', error);
            
            const err = new Error("Connection error. Try again later.");
            res.status(503);
            return next(err);
        }
    },

    async save(req, res, next){
        const { id, title, text_content, content, is_completed } = req.body;
        const user = req.user;

        try{

            const updatedNote = {
                title,
                text_content,
                content,
                is_completed,
                updated_at: admin.firestore.FieldValue.serverTimestamp()
            }

            db.collection('users').doc(user.id).collection('notes').doc(id).set(updatedNote, {merge: true});

            res.status(200);
            return res.json({
                status: 'Updated'
            });

        } catch(error){
            console.log('update note try catch error', error);
            
            const err = new Error("Connection error. Try again later.");
            res.status(503);
            return next(err);
        }

        
    }
}