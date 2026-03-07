import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Contact from "./contact.js";

// Модель користувача
const User = sequelize.define(
    "user",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter",
        },
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
        avatarURL: {
            type: DataTypes.STRING,
        },
        verify: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        verificationToken: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

// Зв’язок користувач → контакти
User.hasMany(Contact, { foreignKey: "owner", as: "contacts" });
Contact.belongsTo(User, { foreignKey: "owner", as: "user" });

export default User;