const graphQLClient = require("../graphql/client.js");
const getIssuesByRepo = require("../graphql/getIssuesByRepo.js");
const ora = require("ora");

async function getIssues(repo, owner) {
  const query = await getIssuesByRepo(repo, owner);
  // const spinner = ora("Loading Issues").start();
  const data = await graphQLClient.request(query)
  // .then(spinner.succeed());
  return data;
}

module.exports.getIssues = getIssues;
