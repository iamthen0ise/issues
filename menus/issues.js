const inquirer = require("inquirer");

async function issuesInquirer(data) {
  const returnValue = await inquirer
    .prompt([
      {
        type: "list",
        name: "repo",
        message: "Select issue",
        pageSize: 20,
        choices: [
          ...data.repository.issues.nodes.map((it) =>
            String(
              `${it.number}` +
                ` | ` +
                `${it.createdAt}` +
                ` | ` +
                `${it.title}` +
                ` | ` +
                `[${it.url}] `
            )
          ),
        ],
      },
    ])
    .then((answers) => {
      return answers;
    });

  return returnValue;
}

module.exports.issuesInquirer = issuesInquirer;
