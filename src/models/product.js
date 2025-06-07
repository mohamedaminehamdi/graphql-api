import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import { User } from './user.js';

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB,
        allowNull: true,
    }
}, {
    timestamps: false
});
  
Product.belongsTo(User);
User.hasMany(Product);
  
export { Product };