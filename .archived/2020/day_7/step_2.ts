import * as fs from "fs";
import { getData } from "./utils";

const inputRaw = fs.readFileSync("input.txt", "utf8");

const getNbOfChildrenBag = ({
  data,
  searchBag,
}: {
  data: ReturnType<typeof getData>;
  searchBag: string;
}) => {
  const parentSearchBag = Array.from(data).filter(
    ([bagId]) => bagId === searchBag
  )[0];
  const [, { children }] = parentSearchBag;

  if (!children.length) {
    return 0;
  }

  let nbBag = 0;

  children.forEach(({ id, quantity }) => {
    const nbOfChildrenBag = getNbOfChildrenBag({ data, searchBag: id });
    const nbOutsideBag = quantity;

    nbBag += nbOutsideBag + quantity * nbOfChildrenBag;
  });

  return nbBag;
};

const solvePuzzle = ({
  data,
  searchBag,
}: {
  data: ReturnType<typeof getData>;
  searchBag: string;
}) => getNbOfChildrenBag({ data, searchBag });

console.log(
  solvePuzzle({
    data: getData({ inputRaw }),
    searchBag: "shiny gold",
  })
);
