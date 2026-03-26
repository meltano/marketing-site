import type { GetStaticProps } from "next";

import ThankYouView from "@/components/pages/ThankYouView";
import { getThankYouData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getThankYouData>>;
};

export default function ThankYouPage({ data }: PageProps) {
  return <ThankYouView data={data} />;
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getThankYouData();
  return { props: { data }, revalidate: 3600 };
};
