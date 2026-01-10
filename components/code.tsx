import { Pre, RawCode, highlight } from "codehike/code";

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark");
  return (
    <Pre
      code={highlighted}
      className="rounded-lg overflow-x-auto my-4"
      style={{
        backgroundColor: "#24292e",
        padding: "1rem",
      }}
    />
  );
}
