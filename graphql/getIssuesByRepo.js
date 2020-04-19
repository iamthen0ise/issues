let getIssuesByRepo = function (repo, owner) {
  const data = `
    {
        repository(name: ${JSON.stringify(repo)}, owner: ${JSON.stringify(
    owner
  )}) {
        issues(orderBy: {field: CREATED_AT, direction: DESC}, states: OPEN, first: 100) {
            nodes {
            title
            url
            number
            createdAt
            }
        }
        }
    }
    `;
  return data;
};

module.exports = getIssuesByRepo;
