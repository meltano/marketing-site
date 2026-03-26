import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import PricingCalculator from "@/components/PricingCalculator/PricingCalculator";
import { getPricingCalculatorData } from "@/lib/wp/site-pages";

type PageProps = {
  data: Awaited<ReturnType<typeof getPricingCalculatorData>>;
};

export default function PricingCalculatorPage({ data }: PageProps) {
  const node = data.pricingcalculator.nodes[0] as {
    themePicker?: { themePicker?: string };
    connectorPricing?: { connectors?: unknown[] };
  };
  const themePicker = node?.themePicker?.themePicker;
  const connectorPricing = node?.connectorPricing?.connectors;

  return (
    <>
      <BodyClass className={`dark ${themePicker ?? ""}`} />
      <PricingCalculator data={connectorPricing} />
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const data = await getPricingCalculatorData();
  return { props: { data }, revalidate: 3600 };
};
