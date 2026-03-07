import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { sendEmail } from "../services/emailService.js";

import User from "../models/user.js";
import {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
} from "../schemas/authSchemas.js";
import { avatarsDir } from "../utils/paths.js";

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

    // Генерація аватарки через gravatar
    const avatarURL = gravatar.url(email, { s: "250", d: "identicon" }, true);

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const newUser = await User.create({
        email,
        password: hashedPassword,
        avatarURL,
        verificationToken,
    });

    const verifyLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<a href="${verifyLink}">Verify your email</a>`,
    });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            avatarURL: newUser.avatarURL,
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

    const payload = { id: user.id };

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

// Оновлення subscription користувача
export const updateSubscription = async (req, res) => {
    const { error } = updateSubscriptionSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
        return res.status(401).json({ message: "Not authorized" });
    }

    await user.update({ subscription: req.body.subscription });

    res.status(200).json({
        email: user.email,
        subscription: user.subscription,
    });
};

// Оновлення аватарки користувача
export const updateAvatar = async (req, res, next) => {
    const tempPath = req.file?.path;

    try {
        if (!req.file) {
            const error = new Error("Avatar file is required");
            error.status = 400;
            throw error;
        }

        const ownerId = req.user.id;
        const ext = path.extname(req.file.originalname) || ".jpg";
        const filename = `${ownerId}_${Date.now()}${ext}`;

        // Створюємо папку, якщо її немає
        await fs.mkdir(avatarsDir, { recursive: true });

        const publicPath = path.join(avatarsDir, filename);

        // Переносимо файл з temp у public/avatars
        await fs.rename(tempPath, publicPath);

        const avatarURL = `/avatars/${filename}`;

        // Оновлюємо avatarURL у користувача
        await req.user.update({ avatarURL });

        res.status(200).json({ avatarURL });
    } catch (err) {
        // Якщо щось впало — прибираємо тимчасовий файл
        if (tempPath) {
            try {
                await fs.unlink(tempPath);
            } catch (_) {}
        }
        next(err);
    }
};

// Верифікація email користувача
export const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({
        where: { verificationToken },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.update({
        verify: true,
        verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" });
};