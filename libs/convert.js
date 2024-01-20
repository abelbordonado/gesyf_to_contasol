const fs = require("fs");
const path = require("path");
const csv = require("csv");
const csvWriter = require("csv-write-stream");

const { GESYF, CONTAPLUS } = require("./const");
const { writeProgress } = require("./utils");

function readCSV(filename, onRow) {
  let index = 0;
  return new Promise((resolve) =>
    fs
      .createReadStream(filename)
      .pipe(csv.parse({ delimiter: ";" }))
      .on("data", (r) => {
        onRow(r, index);
        index++;
      })
      .on("end", () => {
        resolve(index);
      })
  );
}

function parseGesif(row) {
  return {
    seat: row[GESYF.SEAT],
    date: row[GESYF.DATE],
    duty: row[GESYF.DUTY],
    amount_duty: row[GESYF.AMOUNT_DUTY],
    credit: row[GESYF.CREDIT],
    amount_credit: row[GESYF.AMOUNT_CREDIT],
    topic: row[GESYF.TOPIC],
  };
}

function gsifToContaPlus(gesif) {
  const base = {
    date: gesif.date,
    topic: gesif.topic,
    seat: gesif.seat,
  };

  // One gesif can hold 1 or 2 contaplus records
  const columns = [
    gesif.duty
      ? { ...base, duty: gesif.duty, amount_duty: gesif.amount_duty }
      : false,
    gesif.credit
      ? { ...base, credit: gesif.credit, amount_credit: gesif.amount_credit }
      : false,
  ];

  return columns.filter((item) => !!item);
}

function contaPlusToCsv(contaplus, diary) {
  const item = Array.from({ length: CONTAPLUS.TOTAL_COLUMNS }).fill("");

  item[CONTAPLUS.DIARY] = diary;
  item[CONTAPLUS.SEAT] = contaplus.seat;
  item[CONTAPLUS.DATE] = contaplus.date;
  item[CONTAPLUS.TOPIC] = contaplus.topic;
  // Only one can have value
  item[CONTAPLUS.ACCOUNT] = contaplus.duty || contaplus.credit;
  item[CONTAPLUS.AMOUNT_DUTY] = contaplus.amount_duty;
  item[CONTAPLUS.AMOUNT_CREDIT] = contaplus.amount_credit;
  return item;
}
function generateParser(writer) {
  const diaryCounter = { date: "", counter: 1 };
  return (row, index) => {
    // Skip the headers
    if (index < 2) {
      return null;
    }

    const gesyf = parseGesif(row);

    if (gesyf.date !== diaryCounter.date) {
      diaryCounter.date = gesyf.date;
      diaryCounter.counter = 1;
    }

    const contaplus = gsifToContaPlus(gesyf);

    contaplus.map((item) =>
      writer.write(contaPlusToCsv(item, diaryCounter.counter++))
    );

    writeProgress(
      Array.from({ length: index % 100 })
        .fill("■")
        .join("")
    );
  };
}
module.exports = async function convert(filePath) {
  if (!fs.existsSync(filePath)) {
    return console.log(`${filePath} not found`);
  }

  if (path.extname(filePath) !== ".csv") {
    return console.log(`Only CSV files are allowed`);
  }

  const writer = csvWriter({ headers: CONTAPLUS.HEADERS });
  writer.pipe(fs.createWriteStream("out.csv"));

  const convertRow = generateParser(writer);

  const total = await readCSV(filePath, convertRow);

  writer.end();

  writeProgress("");
  console.log(`\n\n Parsed ${total}\n`);
};
