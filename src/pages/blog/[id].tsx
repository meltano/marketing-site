import type { GetStaticPaths, GetStaticProps } from "next";

import BlogPageView from "@/components/pages/BlogPageView";
import { getBlogPostData, getBlogPostSlugs } from "@/lib/wp/site-pages";

type PageProps = {
  data: NonNullable<Awaited<ReturnType<typeof getBlogPostData>>>;
};

export default function BlogPostPage({ data }: PageProps) {
  return <BlogPageView data={data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getBlogPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { id: slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const rawId = params?.id;
  const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";
  if (!id) return { notFound: true };

  const data = await getBlogPostData(id);
  if (!data?.post) return { notFound: true };

  return { props: { data }, revalidate: 86400 };
};
