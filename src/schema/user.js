import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        me: User
        myProducts: [Product!]
        getUser(id: ID!): User
        getAllUsers: [User!]
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        role: String
        products: [Product]
    }

    extend type Mutation {
        signIn(email: String!, password: String!): Token!
        createUser(input: UserInput!): User!
        updateUser(id: ID!, input: UserInput!): User!
        deleteUser(id: ID!): Boolean!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        role: String
    }
    
    type Token {
        token: String!
    }

`;