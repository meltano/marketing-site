import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import ProductHero from "@/components/product/hero";
import ProductTabs from "@/components/product/tabs";
import { CtaYourself } from "@/components/cta";
import Related from "@/components/related";
import { getProductData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getProductData>>;
};

export default function ProductPage({ data }: PageProps) {
  const {
    metadata,
    featuredImage,
    themePicker,
    productHero,
    productTabs,
    latest,
  } = data.product.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
    productHero?: unknown;
    productTabs?: unknown;
    latest?: unknown;
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
      <div className="product-glow-bg" />
      <ProductHero data={productHero} />
      <ProductTabs data={productTabs} />
      <CtaYourself />
      <Related data={latest} posts={data.stickyPosts} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getProductData();
  return { props: { data }, revalidate: 3600 };
};
