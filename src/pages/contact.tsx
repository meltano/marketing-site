import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import ContactHero from "@/components/contact/hero";
import ContactForm from "@/components/contact/form";
import { getContactData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getContactData>>;
};

export default function ContactPage({ data }: PageProps) {
  const { metadata, featuredImage, themePicker, contactHero, contactForm } =
    data.contact.nodes[0] as {
      metadata?: { metaTitle?: string; metaDescription?: string };
      featuredImage?: { node?: { localFile?: { publicURL?: string } } };
      themePicker?: { themePicker?: string };
      contactHero?: unknown;
      contactForm?: unknown;
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
      <ContactHero data={contactHero} />
      <ContactForm data={contactForm} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getContactData();
  return { props: { data }, revalidate: 3600 };
};
