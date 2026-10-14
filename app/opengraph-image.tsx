import { renderOgImage, ogSize } from "./lib/og";
import { SITE } from "./lib/site";

export const alt = `${SITE.name}: systems for internal operations`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: SITE.name,
    title: "Internal systems that run themselves.",
    footer: "eigensu.in · Mumbai, India",
  });
}
