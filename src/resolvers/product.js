import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, isAuthenticated, isProductOwner } from './authorization.js';

export default {
    Query: {
        getMyProducts: combineResolvers(
            isAuthenticated,
            async (parent, args, { me, Product }) => {
            return await Product.findAll({
                where: { userId: me.id } 
            });
            },
        ),
        getProduct: async (parent, { id }, { Product }) => {
            return await Product.findByPk(id);
        },
        getAllProducts: async (parent, args, { Product }) => {
            return await Product.findAll();
        },
    },

    Mutation: {
        addProduct: combineResolvers(
            isAuthenticated,
            async (parent, { name, description, price, image }, { me, Product }) => {
                console.log(me);
            const newProduct = await Product.create({
              name,
              description,
              price,
              userId: me.id,
              imageUrl: image ? await processUpload(image) : null
            });
            return newProduct;
            },
        ),
        updateProduct: combineResolvers(
            isProductOwner,
            async (parent, { id, name, description, price, image }, { Product }) => {
            const product = await Product.findByPk(id);
            if (!product) {
                throw new Error(`Product with id ${id} does not exist`);
            }
            await product.update({
                name,
                description,
                price,
                imageUrl: image ? await processUpload(image) : product.imageUrl,
            });
            return product;
            },
        ),
        deleteProduct: combineResolvers(
            isProductOwner,
            async (parent, { id }, { Product }) => {
            const product = await Product.findByPk(id);
            if (!product) {
                return false;
            }
            await product.destroy();
            return true;
            },
        ),
        attachProductToUser: combineResolvers(
            isAdmin,
            async (parent, { productId, userId }, { User, Product }) => {
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} not found.`);
            }

            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found.`);
            }

            await product.update({ userId });
            await user.addProduct(product);

            return user;
            },
        ),
        removeProductFromUser: combineResolvers(
            isAdmin,
            async (parent, { productId, userId }, { User, Product }) => {
            const user = await User.findByPk(userId);
            if (!user) {
              throw new Error(`User with ID ${userId} not found.`);
            }

            const product = await Product.findByPk(productId);
            if (!product) {
              throw new Error(`Product with ID ${productId} not found.`);
            }

            await user.removeProduct(product);

            return user;
            },
        ),
    },
    
    Product: {
        // user: async (product, args, { User }) => {
        //   return await User.findByPk(product.userId);
        // },
        user: async (product) => {
            return await product.getUser();
        }
    },
};