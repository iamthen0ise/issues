const graphQLClient = require("../graphql/client.js");
const getRepos = require("../graphql/getRepos.js");
const ora = require("ora");

async function getRepository() {
  let response = Array();
  // const spinner = ora("Loading Repositories").start();
  const data = await graphQLClient.request(getRepos);
  // .then(spinner.succeed());
  // [
  //   ...repoData.viewer.starredRepositories.nodes.map((it) =>
  //     String(`${it.nameWithOwner}:${it.issues.totalCount}`)
  //   ),
  // ]
  data.viewer.starredRepositories.nodes.forEach((element) => {
    dataObject = new Object();
    dataObject.name = element.nameWithOwner;
    dataObject.total = element.issues.totalCount;
    dataObject.repr = String(
      `${element.nameWithOwner}:${element.issues.totalCount}`
    );
    response.push(dataObject);
  });
  return response;
}

module.exports.getRepository = getRepository;
