import type { GetStaticPaths, GetStaticProps } from "next";

import PodcastEpisodeView from "@/components/pages/PodcastEpisodeView";
import { getPodcastEpisodeData, getPodcastEpisodeSlugs } from "@/lib/wp/site-pages";

type PageProps = {
  data: NonNullable<Awaited<ReturnType<typeof getPodcastEpisodeData>>>;
};

export default function PodcastEpisodePage({ data }: PageProps) {
  return <PodcastEpisodeView data={data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPodcastEpisodeSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { id: slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const rawId = params?.id;
  const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";
  if (!id) return { notFound: true };

  const data = await getPodcastEpisodeData(id);
  if (!data?.episode) return { notFound: true };

  return { props: { data }, revalidate: 86400 };
};
