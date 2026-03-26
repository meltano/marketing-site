import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import CommunityHero from "@/components/community/hero";
import Build from "@/components/community/build";
import Events from "@/components/community/events";
import Gear from "@/components/community/gear";
import { getCommunityData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getCommunityData>>;
};

export default function CommunityPage({ data }: PageProps) {
  const {
    metadata,
    featuredImage,
    themePicker,
    communityHero,
    communityBuild,
    communityEvents,
    communityGear,
  } = data.community.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
    communityHero?: unknown;
    communityBuild?: unknown;
    communityEvents?: unknown;
    communityGear?: unknown;
  };
  const metaImage = featuredImage?.node?.localFile?.publicURL;

  return (
    <>
      <BodyClass className={`dark ${themePicker?.themePicker ?? ""}`} />
      <Seo
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        image={metaImage}
      />
      <CommunityHero data={communityHero} />
      <Build data={communityBuild} />
      <Events data={communityEvents} />
      <Gear data={communityGear} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getCommunityData();
  return { props: { data }, revalidate: 3600 };
};
