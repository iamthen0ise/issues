const graphQLClient = require("../graphql/client.js");
const { getIssueBody } = require("../graphql/getIssueBody.js");
const ora = require("ora");

async function getIssueBodyQ(repo, owner, issueId) {
  const query = getIssueBody(repo, owner, issueId);
  // const spinner = ora("Loading Issues").start();
  const data = await graphQLClient.request(query);
  // .then(spinner.succeed());
  return data;
}

module.exports.getIssueBodyQ = getIssueBodyQ;
