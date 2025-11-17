"use strict";

const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { isEmail: true }
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            },

            role: {
                type: DataTypes.ENUM("admin", "user"),
                defaultValue: "user"
            }
        },
        {
            tableName: "users",
            timestamps: true,
            underscored: true
        }
    );

    User.beforeCreate(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
    });

    User.beforeUpdate(async (user) => {
        if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    return User;
};
