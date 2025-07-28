import { parse } from "@fast-csv/parse";
import Search from "./search";
import * as fs from "fs";
import path from "path";

const list: { url: string; area: string; people: []; message: string } = [];

fs.createReadStream(path.resolve("./data", "data.csv"))
  .pipe(parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) =>
    list.push({
      url: row.URL,
      area: row.Area,
      people: row.all_persons,
      message: row.Tweet,
    }),
  )
  .on("end", (rowCount: number) => console.log(list));

export default function Home() {
  return <Search />;
}
