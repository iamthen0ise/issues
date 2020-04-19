const blessed = require("blessed");

const header = blessed.text({
  top: "top",
  left: "left",
  width: "100%",
  height: "1",
  content: "Issues app v.1",
  fg: "gray",
  bg: "magenta",
  tags: true,
});

module.exports = header;
