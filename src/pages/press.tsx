import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import PressHero from "@/components/press/hero";
import PressTabs from "@/components/press/tabs";
import { getPressData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getPressData>>;
};

export default function PressPage({ data }: PageProps) {
  const { metadata, featuredImage, themePicker, pressHero, pressTabs } =
    data.press.nodes[0] as {
      metadata?: { metaTitle?: string; metaDescription?: string };
      featuredImage?: { node?: { localFile?: { publicURL?: string } } };
      themePicker?: { themePicker?: string };
      pressHero?: unknown;
      pressTabs?: unknown;
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
      <PressHero data={pressHero} />
      <PressTabs data={pressTabs} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getPressData();
  return { props: { data }, revalidate: 3600 };
};
