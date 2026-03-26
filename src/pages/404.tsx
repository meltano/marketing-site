import type { GetStaticProps } from "next";

import StaticImage from "@/components/compat/StaticImage";
import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { getNotFoundData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getNotFoundData>>;
};

export default function NotFoundPage({ data }: PageProps) {
  const { metadata, featuredImage, themePicker } = data.notfound.nodes[0] as {
    metadata?: { metaTitle?: string; metaDescription?: string };
    featuredImage?: { node?: { localFile?: { publicURL?: string } } };
    themePicker?: { themePicker?: string };
  };
  const metaImage = featuredImage?.node?.localFile?.publicURL;

  return (
    <>
      <BodyClass className={`page-404 light ${themePicker?.themePicker ?? ""}`} />
      <Seo
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        image={metaImage}
        article={false}
        summary=""
        date=""
      />

      <div className="container">
        <div className="page-content content-404 ml-margins">
          <StaticImage
            src="../assets/img/melty-flying.webp"
            className="melty-404"
            alt="Melty 404"
          />
          <h1 className="title-404 page-title">
            <span className="brackets">404</span>
          </h1>
          <h4 className="subtitle-404">Here Be Dragons</h4>
          <p className="p2 description-404">
            Do you see what you’re looking for below?
          </p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getNotFoundData();
  return { props: { data }, revalidate: 3600 };
};
