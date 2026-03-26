import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { getPrivacyData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getPrivacyData>>;
};

export default function PrivacyPolicyPage({ data }: PageProps) {
  const { metadata, featuredImage, themePicker, content } = data.privacy.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
    content?: string;
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
      <div className="legal-teamplate">
        <div className="container-narrow">
          <div
            className="legal-content ml-margins"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getPrivacyData();
  return { props: { data }, revalidate: 3600 };
};
