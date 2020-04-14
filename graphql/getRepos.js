const getRepos = `{
    viewer {
        starredRepositories {
            nodes {
            nameWithOwner
            issues(filterBy: {states: OPEN}) {
                totalCount
                }
            }
        }
    }
}`;

module.exports = getRepos;
