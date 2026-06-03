/**
 * SSR-safe Lucide IconNode → SVG string (no document).
 */
import type { IconNode } from "lucide";

export type { IconNode };

const defaultAttributes: Record<string, string | number> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
};

function attrsToString(attrs: Record<string, string | number | undefined>): string {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${String(value).replace(/"/g, "&quot;")}"`)
    .join(" ");
}

function nodeToString(node: IconNode[number]): string {
  const [tag, attrs] = node;
  return `<${tag} ${attrsToString(attrs as Record<string, string | number>)} />`;
}

export function iconToSvg(
  icon: IconNode,
  options: { size?: number; strokeWidth?: number; class?: string } = {},
): string {
  const size = options.size ?? 24;
  const strokeWidth = options.strokeWidth ?? 2;

  const svgAttrs: Record<string, string | number> = {
    ...defaultAttributes,
    width: size,
    height: size,
    "stroke-width": strokeWidth,
  };

  const inner = icon.map(nodeToString).join("");
  return `<svg ${attrsToString(svgAttrs)}>${inner}</svg>`;
}
