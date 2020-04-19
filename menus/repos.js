const inquirer = require("inquirer");

async function repoInquirer(data) {
  const returnValue = await inquirer
    .prompt([
      {
        type: "list",
        name: "repo",
        message: "Select repo to view",
        pageSize: 20,
        choices: [
          ...data.viewer.starredRepositories.nodes.map((it) =>
            String(`${it.nameWithOwner}:${it.issues.totalCount}`)
          ),
        ],
      },
    ])
    .then(function (answers) {
      return answers.repo.split(":")[0].split("/");
    });
  return returnValue;
}

module.exports.repoInquirer = repoInquirer;
