export type BagId = string;
type Step7Key = BagId;
type Step7Value = {
  children: { id: BagId; quantity: number }[];
  line?: number;
};
type Step7Data = Map<Step7Key, Step7Value>;

const RegexNumber = /\d+/g;

const getIdFromString = ({ rawId }: { rawId: string }) =>
  rawId.trim().split(" ").slice(0, 2).join(" ");

export const getData = ({ inputRaw }: { inputRaw: string }): Step7Data => {
  const data = new Map<Step7Key, Step7Value>();

  inputRaw.split("\n").forEach((inputLineRaw, line) => {
    const id = getIdFromString({ rawId: inputLineRaw.split("contain")[0] });
    const childrensRaw = inputLineRaw.split("contain")[1].trim();
    const children = childrensRaw
      .replace(".", "")
      .replace("no other bags", "")
      .split(",")
      .filter(Boolean)
      .map((childrenRaw) => {
        const quantity = Number(childrenRaw.match(RegexNumber));
        const childrenId = getIdFromString({
          rawId: childrenRaw.replace(`${quantity}`, ""),
        });

        data.set(childrenId, {
          children: data.get(childrenId)?.children || [],
        });

        return { id: childrenId, quantity };
      });

    data.set(id, { children, line });
  });

  return data;
};
