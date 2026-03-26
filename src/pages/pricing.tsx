import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import PricingHero from "@/components/pricing/hero";
import Partners from "@/components/partners";
import PriceTable from "@/components/pricing/pricetable";
import CostComparison from "@/components/pricing/costComparison";
import { getPricingData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getPricingData>>;
};

export default function PricingPage({ data }: PageProps) {
  const {
    metadata,
    featuredImage,
    themePicker,
    pricingHero,
    pricingTable,
    costComparison,
  } = data.pricing.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
    pricingHero?: unknown;
    pricingTable?: unknown;
    costComparison?: unknown;
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
      <PricingHero data={pricingHero} />
      <PriceTable data={pricingTable} />
      <CostComparison data={costComparison} />
      <Partners />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getPricingData();
  return { props: { data }, revalidate: 3600 };
};
