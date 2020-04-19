const blessed = require("blessed");

function mainScreen(screen) {
  return blessed.list({
    items: [],
    border: "line",
    content: "the list!",
    parent: screen,
    left: Math.round(screen.width / 4),
    mouse: true,
    keys: true,
    vi: true,
    top: 0,
    bottom: 0,
    width: Math.round(screen.width / 4) * 2,
    align: "right",
    tags: true,
    style: {
      bg: "magenta",
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

module.exports.mainScreen = mainScreen;
