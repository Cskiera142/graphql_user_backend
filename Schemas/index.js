const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull, // Import GraphQLNonNull for non-nullable types
} = graphql;

const UserType = require("./TypeDefs/UserType");
const userData = require("../MOCK_DATA.json");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
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
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) }, // ID is non-nullable
      },
      resolve(parent, args) {
        const userIndex = userData.findIndex((user) => user.id === args.id);
        if (userIndex !== -1) {
          const deletedUser = userData.splice(userIndex, 1)[0];
          return deletedUser;
        } else {
          throw new Error("User not found");
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
