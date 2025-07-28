import { parse } from "@fast-csv/parse";
import Search from "./search";
import * as fs from "fs";
import path from "path";

const list: { url: string; area: string; people: []; message: string } = [];

const formatInput = (input: string): string => {
  return input
    .replaceAll(`'`, '"')
    .replaceAll("\\", "")
    .replaceAll(`"s`, `'s`)
    .replaceAll(`O"`, `O'`)
    .replaceAll(`s" `, `s' `)
    .replaceAll(`Donald Trump" - Residents`, `Donald Trump - Residents`)
    .replaceAll(`THREATENING TO',`, `THREATENING TO",`)
    .replaceAll('""', '"');
};

const parsePeople = (input: string): [] => {
  return JSON.parse(formatInput(input));
};

fs.createReadStream(path.resolve("./data", "data.csv"))
  .pipe(parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    const clean = {
      url: row.URL,
      area: row.Area,
      message: row.Tweet,
    };

    try {
      clean.people = row.all_persons !== "" ? parsePeople(row.all_persons) : [];
    } catch (e) {
      console.log(formatInput(row.all_persons));
    }

    try {
      clean.area = JSON.parse(formatInput(row.Area));
    } catch (e) {
      console.log(row.Area);
    }

    list.push(clean);
  })
  .on("end", (rowCount: number) => {
    fs.writeFileSync("./data/data.json", JSON.stringify(list, null, "  "));
    console.log("Done", rowCount);
  });
