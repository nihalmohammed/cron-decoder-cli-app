#!/usr/bin/env node

import { boundaries } from "./constants.mjs";

const nameOfUnit = [
  "minute",
  "hour",
  "day of month",
  "month",
  "day of week",
  "command",
];

const spaceForUnitName = 14;

function decodeCronExpression(cronExpressionArray) {
  const lengthOfCronExpressionArray = cronExpressionArray.length;
  for (let i = 0; i < cronExpressionArray.length - 1; i++) {
    const expresssion = cronExpressionArray[i];
    let result,
      lowerBound = boundaries[nameOfUnit[i].replace(/\s+/g, "")].lowerBound,
      upperBound = boundaries[nameOfUnit[i].replace(/\s+/g, "")].upperBound,
      incrementer = 1;

    if (expresssion.includes(",")) {
      result = expresssion.split(",");
      result = result.join(" ");
    } else if (expresssion.includes("-")) {
      let splittedExp = expresssion.split("-");
      lowerBound = Number(splittedExp[0]);
      upperBound = Number(splittedExp[1]);
      result = fetchSeriesValues(upperBound, lowerBound, incrementer);
    } else if (!isNaN(expresssion)) {
      result = expresssion;
    } else if (expresssion.includes("/")) {
      let splittedExp = expresssion.split("/");
      lowerBound = expresssion[0] === "*" ? 0 : Number(splittedExp[0]);
      incrementer = Number(splittedExp[1]);
      result = fetchSeriesValues(upperBound, lowerBound, incrementer);
    } else if (expresssion == "*") {
      result = fetchSeriesValues(upperBound, lowerBound, incrementer);
    }

    console.log(
      `${nameOfUnit[i]}${" ".repeat(spaceForUnitName - nameOfUnit[i].length)}` +
        result
    );
  }

  console.log(
    `${nameOfUnit[lengthOfCronExpressionArray - 1]}${" ".repeat(
      spaceForUnitName - nameOfUnit[lengthOfCronExpressionArray - 1].length
    )}` + cronExpressionArray[lengthOfCronExpressionArray - 1]
  );
}

const fetchSeriesValues = (upperBound, lowerBound, incrementer) => {
  let result = "";

  for (let i = lowerBound; i <= upperBound; i = i + incrementer) {
    result = result + i + " ";
  }

  return result;
};

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Please provide a string to capitalize.");
  process.exit(1);
}

const cronExpressionArray = args[0].split(" ");

decodeCronExpression(cronExpressionArray);
