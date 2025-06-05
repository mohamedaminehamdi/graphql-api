import { gql } from 'apollo-server-express';

export default gql`
    scalar Upload 
    
    extend type Query {
        getProduct(id: ID!): Product
        getAllProducts: [Product!]
        getMyProducts: [Product]
    }

    type Product {
        id: ID!
        name: String!
        description: String!
        price: Float!
        imageUrl: String
        user: User!
    }

    extend type Mutation {
        addProduct(name: String!, description: String!, price: Float!, image: Upload): Product!
        updateProduct(id: ID!, name: String!, description: String!, price: Float!, image: Upload): Product
        deleteProduct(id: ID!): Boolean!
        attachProductToUser(productId: ID!, userId: ID!): User
        removeProductFromUser(productId: ID!, userId: ID!): User
    }
`;