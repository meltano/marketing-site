import type { GetStaticProps } from "next";

import PodcastView from "@/components/pages/PodcastView";
import { getPodcastData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getPodcastData>>;
};

export default function PodcastPage({ data }: PageProps) {
  return <PodcastView data={data} />;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getPodcastData();
  return { props: { data }, revalidate: 86400 };
};
