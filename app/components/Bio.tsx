import type { BioBlock } from "../content";

function linkFor(block: BioBlock, marks: string[] | undefined) {
  if (!marks?.length) return undefined;
  return block.markDefs?.find((definition) => marks.includes(definition._key) && definition.href)?.href;
}

export function Bio({ blocks }: { blocks: BioBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <p key={block._key}>
          {block.children.map((span) => {
            const href = linkFor(block, span.marks);
            if (!href) return <span key={span._key}>{span.text}</span>;
            const external = href.startsWith("http");
            return (
              <a
                key={span._key}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {span.text}
              </a>
            );
          })}
        </p>
      ))}
    </>
  );
}
