import { renderOgImage, ogSize } from "../lib/og";
import { PRODUCT } from "../lib/site";

export const alt = PRODUCT.description;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: `${PRODUCT.name} by Eigensu`,
    title: "WhatsApp and email marketing for businesses built on repeat visits.",
    footer: `eigensu.in${PRODUCT.path}`,
  });
}
