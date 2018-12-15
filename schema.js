const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// Hardcoded data
const customers = [{
    id: '1',
    name: 'Thierry Henry',
    email: 'thierry@arsenal.dev',
    age: 35
  },
  {
    id: '2',
    name: 'Dennis Bergkamp',
    email: 'dennis@arsenal.dev',
    age: 42
  },
  {
    id: '3',
    name: 'Robert Pires',
    email: 'robert@arsenal.dev',
    age: 37
  }
]

// Customer type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});

// root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});