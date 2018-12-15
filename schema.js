const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

// Hardcoded data
// const customers = [{
//     id: '1',
//     name: 'Thierry Henry',
//     email: 'thierry@arsenal.dev',
//     age: 35
//   },
//   {
//     id: '2',
//     name: 'Dennis Bergkamp',
//     email: 'dennis@arsenal.dev',
//     age: 42
//   },
//   {
//     id: '3',
//     name: 'Robert Pires',
//     email: 'robert@arsenal.dev',
//     age: 37
//   }
// ]

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
				// for hardcoded data
				// for (let i = 0; i < customers.length; i++) {
				//   if (customers[i].id === args.id) {
				//     return customers[i];
				//   }
				// }
				return axios.get(`http://localhost:3000/customers/${args.id}`).then((res) => res.data);
			}
		},
		customers: {
			type: new GraphQLList(CustomerType),
			resolve(parent, args) {
				return axios.get(`http://localhost:3000/customers`).then((res) => res.data);
			}
		}
	}
});

const mutation = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		addCustomer: {
			type: CustomerType,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				email: {
					type: new GraphQLNonNull(GraphQLString)
				},
				age: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve(parent, args) {
				return axios
					.post(`http://localhost:3000/customers`, {
						name: args.name,
						email: args.email,
						age: args.age
					})
					.then((res) => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});
