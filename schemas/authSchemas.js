import Joi from "joi";

// Схема реєстрації користувача
export const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Схема логіну користувача
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// Схема для оновлення subscription користувача
export const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid("starter", "pro", "business")
        .required(),
});

export const resendVerifySchema = Joi.object({
    email: Joi.string().email().required(),
});