#!/usr/bin/env node
"use strict";

require("dotenv").config();

const clear = require("clear");
const inquirer = require("inquirer");
const openurl = require("openurl");

const graphQLClient = require("./graphql/client.js");
const getRepos = require("./graphql/getRepos.js");
const getIssuesByRepo = require("./graphql/getIssuesByRepo.js");

const ora = require("ora");

async function main() {
  const [owner, repo] = await getRepository();
  clear();
  const result = await getIssues(repo, owner).then((res) => {
    return res;
  });
  let urlToOpen = JSON.stringify(result)
    .split("[")[1]
    .split("]")[0]
    .replace(/[{}\|\[\]'\"]$/g, "");
  return openurl.open(urlToOpen);
}

async function getRepository() {
  const spinner = ora("Loading Repositories").start();
  const data = await graphQLClient.request(getRepos).then(spinner.succeed());
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

async function getIssues(repo, owner) {
  const query = await getIssuesByRepo(repo, owner);
  const spinner = ora("Loading Issues").start();
  const data = await graphQLClient.request(query).then(spinner.succeed());
  const returnValue = await inquirer
    .prompt([
      {
        type: "list",
        name: "repo",
        message: "Select issue",
        pageSize: 20,
        choices: [
          ...data.repository.issues.nodes.map((it) =>
            String(`${it.title} : [${it.url}]`)
          ),
        ],
      },
    ])
    .then((answers) => {
      return answers;
    });
  return returnValue;
}

main().catch((error) => console.error(error));
