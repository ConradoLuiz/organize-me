const Joi = require('joi');

const createUserSchema = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    name: Joi.string().trim().required(),
    password: Joi.string().trim().min(10).required()
});
const validateUserSchema = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
    password: Joi.string().trim().min(10).required()
});
const validateUsername = Joi.object().keys({
    username: Joi.string().trim().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required()
});





module.exports = { createUserSchema, validateUserSchema, validateUsername };