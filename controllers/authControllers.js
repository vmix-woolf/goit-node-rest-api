import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { registerSchema } from "../schemas/authSchemas.js";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/authSchemas.js";

// Реєстрація користувача
export const register = async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

// Логін користувача
export const login = async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
        id: user.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    await user.update({ token });

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

// Логаут користувача
export const logout = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    await user.update({ token: null });

    res.status(204).send();
};

// Отримання поточного користувача
export const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    return res.status(200).json({
        email,
        subscription,
    });
};