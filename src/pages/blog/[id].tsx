import type { GetStaticProps, GetStaticPaths } from "next";

import BlogPageView from "@/components/pages/BlogPageView";
import { getBlogPostData, getBlogPostSlugs } from "@/lib/wp/site-pages";

type PageProps = {
  data: NonNullable<Awaited<ReturnType<typeof getBlogPostData>>>;
};

export default function BlogPostPage({ data }: PageProps) {
  return <BlogPageView data={data} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await getBlogPostSlugs();
    return {
      paths: slugs.map((id) => ({ params: { id } })),
      fallback: "blocking",
    };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const rawId = params?.id;
  const id = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "";
  if (!id) {
    return { notFound: true };
  }
  try {
    const data = await getBlogPostData(id);
    if (!data?.post) {
      return { notFound: true, revalidate: 60 };
    }
    return { props: { data }, revalidate: 3600 };
  } catch {
    // WPGraphQL was temporarily unavailable — retry via ISR shortly
    return { notFound: true, revalidate: 60 };
  }
};