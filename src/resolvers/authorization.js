import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as user.');

  export const isProductOwner = combineResolvers(
    isAuthenticated,
    async (parent, { id }, { Product, me }) => {
    const product = await Product.findByPk(id, { raw: true });
  
    if (product.userId !== me.id) {
      throw new ForbiddenError('Not authenticated as product owner.');
    }
  
    return skip;
    }
);

export const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) =>
      role === 'ADMIN'
        ? skip
        : new ForbiddenError('Not authorized as admin.'),
);