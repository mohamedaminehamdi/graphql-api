import { sequelize } from '../db.js';
import { User } from './user.js';
import { Product } from './product.js';

const models = {
  User,
  Product,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

export { sequelize, models };