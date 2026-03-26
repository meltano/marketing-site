import type { GetStaticProps } from "next";

import BlogView from "@/components/pages/BlogView";
import { getBlogData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getBlogData>>;
};

export default function BlogPage({ data }: PageProps) {
  return <BlogView data={data} />;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getBlogData();
  return { props: { data }, revalidate: 3600 };
};
