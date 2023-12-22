import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Ratings from "./RatingModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Books = db.define('book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    ratingId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Ratings,
            key: 'id',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: Users,
            key: 'uuid',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
            field: 'userId',
        },
    },
}, {
    freezeTableName: true
});

// Users.hasMany(Books);
Books.belongsTo(Users, { foreignKey: 'userId' });
Books.belongsTo(Ratings, { foreignKey: 'ratingId' });

export default Books;
