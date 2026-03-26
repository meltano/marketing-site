import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import AboutHero from "@/components/about/hero";
import Mission from "@/components/about/mission";
import Quote from "@/components/about/quote";
import Story from "@/components/about/story";
import Values from "@/components/about/values";
import Contributors from "@/components/about/contributors";
import { getAboutData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getAboutData>>;
};

export default function AboutPage({ data }: PageProps) {
  const {
    metadata,
    featuredImage,
    aboutHero,
    aboutMission,
    aboutQuote,
    aboutStory,
    aboutValues,
    aboutContributors,
    themePicker,
  } = data.about.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
    aboutHero?: unknown;
    aboutMission?: unknown;
    aboutQuote?: unknown;
    aboutStory?: unknown;
    aboutValues?: unknown;
    aboutContributors?: unknown;
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
      <AboutHero data={aboutHero} />
      <Mission data={aboutMission} />
      <Quote data={aboutQuote} />
      <Story data={aboutStory} />
      <Values data={aboutValues} />
      <Contributors data={aboutContributors} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getAboutData();
  return { props: { data }, revalidate: 3600 };
};
