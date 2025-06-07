import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 42],
        },
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false
});

User.findByLogin = async login => {
    let user = await User.findOne({
        where: { email: login },
    });

    return user;
};

User.beforeBulkCreate(async users => {
    for (const user of users) {
        user.password = await user.generatePasswordHash();
    }
    
});

User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
};

User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

  
export { User };