#!/usr/bin/env node
"use strict";

require("dotenv").config();

async function main() {
  const blessed = require("blessed");
  const contrib = require("blessed-contrib");

  let currRepo = null;
  let currOwner = null;
  let currIssue = null;

  let program = blessed.program();

  let screen = blessed.screen({
    program: program,
    smartCSR: true,
    dockBorders: true,
    title: "Issues",
  });

  const markdown = contrib.markdown(screen);
  let issuesList = blessed.list({
    items: [],
    border: "line",
    content: "Issues",
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    left: 0,
    top: 0,
    left: Math.round(screen.width / 4),
    bottom: 0,
    width: Math.round(screen.width / 4),
    align: "left",
    tags: true,
    style: {
      fg: function (el) {
        if (el.type === "box" && el.parent.type === "list") {
          return -1;
        }
        return -1;
      },
      selected: {
        bg: "blue",
      },
      item: {
        hover: {
          bg: "blue",
        },
      },
    },
  });

  const { getRepository } = require("./backend/repos.js");
  const { getIssues } = require("./backend/issues.js");
  const { getIssueBodyQ } = require("./backend/issueBody.js");
  let repositoryObject = await getRepository();

  const repoList = blessed.list({
    items: repositoryObject.map((it) => it.repr),
    border: "line",
    content: "Repositories",
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    left: 0,
    top: 0,
    bottom: 0,
    width: Math.round(screen.width / 4),
    align: "left",
    tags: true,
    style: {
      fg: function (el) {
        if (el.type === "box" && el.parent.type === "list") {
          return -1;
        }
        return -1;
      },
      selected: {
        bg: "blue",
      },
      item: {
        hover: {
          bg: "blue",
        },
      },
    },
  });

  repoList.on("select", async (node) => {
    const [owner, repo] = node.content.split(":")[0].split("/");
    currOwner = owner;
    currRepo = repo;
    let data = await getIssues(currRepo, currOwner);
    let choices = [
      ...data.repository.issues.nodes.map((it) =>
        String(
          `#${it.number}` +
            ` | ` +
            // `${it.createdAt}` +
            // ` | ` +
            `${it.title}` +
            ` | `
          // +
          // `[${it.url}] `
        )
      ),
    ];
    issuesList.clearItems();
    choices.forEach(function (issue) {
      issuesList.addItem(issue);
    });
    screen.render();

    issuesList.focus();
  });

  screen.append(repoList);
  repoList.focus();
  screen.append(issuesList);

  let issueBox = blessed.box({
    border: "line",
    content: null,
    parent: screen,
    mouse: true,
    keys: true,
    vi: true,
    left: Math.round(screen.width / 2),
    top: 0,
    bottom: 0,
    width: Math.round(screen.width / 2) - 1,
    align: "left",
    tags: true,
    style: {
      fg: function (el) {
        if (el.type === "box" && el.parent.type === "list") {
          return -1;
        }
        return -1;
      },
      selected: {
        bg: "blue",
      },
      item: {
        hover: {
          bg: "blue",
        },
      },
    },
  });

  issuesList.on("select", async (node) => {
    let issueId = node.content.split("|")[0].replace("#", "");
    // currIssue = issueId;
    let issueBody = await getIssueBodyQ(currRepo, currOwner, issueId);
    issueBox.content = `
      #${issueBody.repository.issue.number}\n
      title: ${issueBody.repository.issue.title}\n
      created at: ${issueBody.repository.issue.createdAt}\n
      body:\n${issueBody.repository.issue.bodyText}
    `;
    screen.render();
    issueBox.focus();
  });

  screen.append(issueBox);

  screen.render();

  // Quit on Escape, q, or Control-C.
  screen.key(["escape", "q", "C-c"], function (ch, key) {
    return process.exit(0);
  });

  issuesList.key(["backspace", "b"], function (ch, key) {
    repoList.focus();
  });

  issueBox.key(["backspace", "b"], function (ch, key) {
    issuesList.focus();
  });
}

main();
