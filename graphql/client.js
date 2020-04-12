const { GraphQLClient } = require("graphql-request");
const endpoint = "https://api.github.com/graphql";

const token = process.env.GH_KEY;

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

module.exports = graphQLClient;
