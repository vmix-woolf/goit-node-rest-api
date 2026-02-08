import Joi from "joi";

// Схема для створення контакту (POST)
export const createContactSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(1).required(),
});

// Схема для оновлення контакту (PUT)
export const updateContactSchema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email(),
    phone: Joi.string().min(1),
}).min(1);
