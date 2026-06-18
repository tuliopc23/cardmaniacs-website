import type { CollectionEntry } from "astro:content";

export const DOC_SECTION_ORDER = [
  "Introduction",
  "Getting Started",
  "Guides",
  "Reference",
] as const;

export type DocEntry = CollectionEntry<"docs">;

export function sortDocs(docs: DocEntry[]): DocEntry[] {
  return [...docs].sort((a, b) => (a.data.order ?? 0) - (b.data.order ?? 0));
}

/** Groups docs by section with stable section ordering for hub and sidebar nav. */
export function groupDocsBySection(docs: DocEntry[]): [string, DocEntry[]][] {
  const sorted = sortDocs(docs);
  const sections = new Map<string, DocEntry[]>();

  for (const doc of sorted) {
    const section = doc.data.section ?? "General";
    if (!sections.has(section)) sections.set(section, []);
    sections.get(section)!.push(doc);
  }

  const ordered: [string, DocEntry[]][] = [];
  for (const name of DOC_SECTION_ORDER) {
    const items = sections.get(name);
    if (items) ordered.push([name, items]);
  }
  for (const [name, items] of sections) {
    if (!DOC_SECTION_ORDER.includes(name as (typeof DOC_SECTION_ORDER)[number])) {
      ordered.push([name, items]);
    }
  }

  return ordered;
}

export function docNeighbors(
  docs: DocEntry[],
  currentId: string,
): { previous?: DocEntry; next?: DocEntry } {
  const sorted = sortDocs(docs);
  const index = sorted.findIndex((doc) => doc.id === currentId);
  if (index < 0) return {};

  return {
    previous: index > 0 ? sorted[index - 1] : undefined,
    next: index < sorted.length - 1 ? sorted[index + 1] : undefined,
  };
}
