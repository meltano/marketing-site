import { mapFeaturedImageField, mapMediaToGatsby } from "@/lib/wordpress";

/** Matches Gatsby `localFile { publicURL; childImageSharp { gatsbyImageData } }` for components. */
export function mediaToLocalChildSharp(
  node: Parameters<typeof mapMediaToGatsby>[0] | null | undefined
) {
  const m = mapMediaToGatsby(node ?? null);
  if (!m?.node?.localFile?.publicURL) return null;
  return {
    localFile: {
      publicURL: m.node.localFile.publicURL,
      childImageSharp: m.node.childImageSharp,
    },
  };
}

/** Simple `localFile.publicURL` (no sharp) — Gatsby shape. */
export function sourceUrlToLocalPublic(node: { sourceUrl?: string | null } | null | undefined) {
  const url = node?.sourceUrl;
  if (!url) return null;
  return { localFile: { publicURL: url } };
}

export function normalizeFeatured(node: Parameters<typeof mapFeaturedImageField>[0]) {
  return mapFeaturedImageField(node);
}
