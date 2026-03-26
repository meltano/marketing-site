"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type GatsbyImageData = {
  width?: number;
  height?: number;
  images?: { fallback?: { src?: string } };
  layout?: string;
};

type Props = {
  image: GatsbyImageData | { childImageSharp?: { gatsbyImageData?: GatsbyImageData } } | null | undefined;
  alt: string;
  className?: string;
  style?: CSSProperties;
};

function unwrap(data: Props["image"]): GatsbyImageData | null {
  if (!data) return null;
  const nested = (data as { childImageSharp?: { gatsbyImageData?: GatsbyImageData } })
    .childImageSharp?.gatsbyImageData;
  if (nested) return nested;
  return data as GatsbyImageData;
}

/** Accepts Gatsby-style gatsbyImageData or a plain remote URL string for WP sourceUrl. */
export function GatsbyImage({ image, alt, className, style }: Props) {
  const img = unwrap(image);
  if (!img) return null;
  const src =
    typeof img === "string"
      ? img
      : img.images?.fallback?.src ||
        (img as { src?: string }).src ||
        undefined;
  const w =
    typeof img === "string"
      ? 800
      : img.width || 800;
  const h =
    typeof img === "string"
      ? 600
      : img.height || 600;
  if (!src) return null;
  const isExternal = src.startsWith("http://") || src.startsWith("https://");
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={className}
      style={style}
      unoptimized={isExternal}
    />
  );
}
