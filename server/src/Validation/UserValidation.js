const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    name: Joi.string().required(),
    password: Joi.string().trim().min(10).required()
});
const validateUserSchema = Joi.object().keys({
    username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    password: Joi.string().trim().min(10).required()
});



module.exports = { createUserSchema, validateUserSchema };