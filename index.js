const convert = require("./libs/convert");

function help() {
  console.log(
    "\n\
      This program transforms gesyf template into contaplus template\n\
      Required 1 parameters:  gesyf_csv_file.csv\n\
      gesyf_csv_file.csv Path to the CSV file to transform\n\
    \n\
      Example node index.js sample/diario_2023\n\
    "
  );
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    return help();
  }
  if (["--help", "-h"].includes(args[0])) {
    return help();
  }

  convert(args[0]);
}

main();
