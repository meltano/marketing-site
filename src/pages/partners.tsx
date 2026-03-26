import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import PartnersHero from "@/components/partners/hero";
import Meet from "@/components/partners/meet";
import Separator from "@/components/partners/separator";
import Join from "@/components/partners/join";
import { getPartnersData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getPartnersData>>;
};

export default function PartnersPage({ data }: PageProps) {
  const {
    metadata,
    featuredImage,
    themePicker,
    partnersHero,
    partnersMeet,
    partnersForm,
  } = data.partners.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
    partnersHero?: unknown;
    partnersMeet?: unknown;
    partnersForm?: unknown;
  };
  const metaImage = featuredImage?.node?.localFile?.publicURL;

  return (
    <>
      <BodyClass className={themePicker?.themePicker ?? ""} />
      <Seo
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        image={metaImage}
      />
      <PartnersHero data={partnersHero} />
      <Meet data={partnersMeet} />
      <Separator />
      <Join data={partnersForm} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getPartnersData();
  return { props: { data }, revalidate: 3600 };
};
