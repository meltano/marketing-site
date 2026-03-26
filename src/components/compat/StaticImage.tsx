"use client";

import type { ImgHTMLAttributes } from "react";

import { STATIC_IMAGE_DIMENSIONS } from "@/lib/static-image-dimensions";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
  aspectRatio?: number;
};

function deriveAltFromSrc(src: string): string {
  const filename = src.split("/").pop() || src;
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

/** Maps Gatsby StaticImage paths (../assets/...) to /public/assets/... */
export default function StaticImage({
  src,
  alt,
  className,
  aspectRatio,
  ...rest
}: Props) {
  const path = src
    .replace(/^\.\.\/assets\//, "/assets/")
    .replace(/^\.\.\/\.\.\/assets\//, "/assets/")
    .replace(/^\.\.\/\.\.\/\.\.\/assets\//, "/assets/");

  const dims = STATIC_IMAGE_DIMENSIONS[path];
  const resolvedAlt =
    typeof alt === "string" && alt.trim().length > 0
      ? alt
      : path.includes("/assets/img/data/")
        ? deriveAltFromSrc(path)
        : alt ?? "";

  const resolvedStyle = aspectRatio
    ? { ...(rest.style ?? {}), aspectRatio }
    : rest.style;

  return (
    <img
      src={path}
      alt={resolvedAlt}
      className={className}
      style={resolvedStyle}
      width={dims?.width}
      height={dims?.height}
      {...rest}
    />
  );
}
