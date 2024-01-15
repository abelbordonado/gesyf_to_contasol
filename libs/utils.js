const readline = require("readline");

exports.writeProgress = (progress) => {
  readline.cursorTo(process.stdout, 0);
  readline.clearLine(process.stdout, 1);
  process.stdout.write(progress);
};
