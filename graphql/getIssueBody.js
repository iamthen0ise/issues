function getIssueBody(repo, owner, issueId) {
  const data = `
    {
        repository(name: ${JSON.stringify(repo)}, owner: ${JSON.stringify(
    owner
  )}) {
          issue(number: ${parseInt(issueId)}) {
            number
            title
            createdAt
            bodyText
          }
        }
      }
    `;
  return data;
}

module.exports.getIssueBody = getIssueBody;
