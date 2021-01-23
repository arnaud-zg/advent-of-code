import * as fs from "fs";
import { BagId, getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getNbOfParentsBag = ({
  data,
  searchBag,
  history = new Set<BagId>(),
}: {
  data: ReturnType<typeof getData>;
  searchBag: string;
  history?: Set<BagId>;
}) => {
  const containedSearchBag = Array.from(data).filter(([, { children }]) =>
    children.find(({ id }) => id === searchBag)
  );

  containedSearchBag.forEach(([id]) => {
    if (!history.has(id)) {
      history.add(id);

      getNbOfParentsBag({ data, searchBag: id, history });
    }
  });

  return history.size;
};

const solvePuzzle = ({
  data,
  searchBag,
}: {
  data: ReturnType<typeof getData>;
  searchBag: string;
}) => getNbOfParentsBag({ data, searchBag });

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
    searchBag: "shiny gold",
  })
);
