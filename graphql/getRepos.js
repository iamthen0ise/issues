const getRepos = `{
    viewer {
        starredRepositories {
            nodes {
            nameWithOwner
            issues {
                totalCount
                }
            }
        }
    }
}`;

module.exports = getRepos;
