import 'dotenv/config';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import express from "express";
import { ApolloServer, AuthenticationError, } from "apollo-server-express";

import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js";
import { models, sequelize }  from "./models/index.js";
import { seedDatabase } from './seed.js';
const { User, Product } = models;


const app = express();
app.use(cors());

const getMe = async (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Verify the token
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      // Add the decoded token to the context
      return payload;
    } catch (err) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
  // return {};
};

async function startServer() {
    const apolloServer = new ApolloServer({
      typeDefs: schema,
      resolvers,
      context: async ({ req }) => {
        const me = await getMe(req);
        return {
          User,
          Product,
          me,
          secret: process.env.SECRET,
        }
      },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sync the User and Product models with the database schema to create the "users" and "products" tables
    return sequelize.sync({ force: true });
  })
  .then(() => {
    console.log('User and Product tables created successfully.');

    // Seed the database with some users
    return seedDatabase();
  })
  .then(() => {
    console.log('Database seeded successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


  app.listen({ port: 4000 }, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });  