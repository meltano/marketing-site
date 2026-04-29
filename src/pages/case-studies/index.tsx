import type { GetStaticProps } from "next";

import CaseStudiesView from "@/components/pages/CaseStudiesView";
import { getCaseStudiesData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getCaseStudiesData>>;
};

export default function CaseStudiesPage({ data }: PageProps) {
  return <CaseStudiesView data={data} />;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getCaseStudiesData();
  return { props: { data }, revalidate: 3600 };
};
