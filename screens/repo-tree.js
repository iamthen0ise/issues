const blessed = require("blessed");

async function repoTree(data, screen) {
  return blessed.list({
    items: data,
    border: "line",
    content: "the list!",
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
}

module.exports.repoTree = repoTree;
