import Head from "next/head";
import type { GetStaticProps } from "next";

import HomeView from "@/components/pages/HomeView";
import { getHomeData } from "@/lib/wp/home-data";

type HomeNode = {
  metadata?: { metaTitle?: string; metaDescription?: string };
  featuredImage?: { node?: { localFile?: { publicURL?: string } } };
};

type PageProps = {
  data: Awaited<ReturnType<typeof getHomeData>>;
};

export default function Home({ data }: PageProps) {
  const node = data.home.nodes[0] as HomeNode;
  const img = node.featuredImage?.node?.localFile?.publicURL;
  const title = node.metadata?.metaTitle ?? "Meltano";
  const description = node.metadata?.metaDescription ?? "";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="title" content={title} />
        {img ? (
          <meta property="og:image" content={`https://meltano.com${img}`} />
        ) : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <HomeView data={data} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getHomeData();
  return {
    props: { data },
    revalidate: 3600,
  };
};
