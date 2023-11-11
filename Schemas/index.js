const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const userData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        if (args.id) {
          return userData
            .filter((user) => user.id === args.id)
            .map((user) => ({
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              password: user.password,
            }));
        } else {
          return userData.map((user) => ({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            password: user.password,
          }));
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return args;
      },
    },
  },
});

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
