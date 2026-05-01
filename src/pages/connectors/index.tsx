import type { GetStaticProps } from "next";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import Connectors, { type Connector } from "@/components/connectors";

type PageProps = {
  connectors: Connector[];
};

export default function ConnectorsPage({ connectors }: PageProps) {
  return (
    <>
      <BodyClass className="dark dark-header" />
      <Seo
        title="Connectors | Meltano"
        description="Explore all the connectors that Meltano supports."
      />
      <Connectors connectors={connectors} />
    </>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type MatatikaDataPlugin = {
  id: string;
  name: string;
  label: string | null;
  variant: string;
  logoUrl: string | null;
  pluginType: string;
};

type MatatikaResponse = {
  _embedded?: {
    dataplugins?: MatatikaDataPlugin[];
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function fetchFromWordPress(): Promise<Connector[]> {
  const wpUrl = process.env.WORDPRESS_URL;
  if (!wpUrl) throw new Error("WORDPRESS_URL not set");

  const res = await fetch(`${wpUrl}/wp-json/matatika/v1/connectors`);
  if (!res.ok) throw new Error(`WordPress endpoint returned ${res.status}`);

  return res.json();
}

async function fetchFromMatatika(): Promise<Connector[]> {
  const tokenRes = await fetch(process.env.MATATIKA_AUTH0_TOKEN_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.MATATIKA_AUTH0_CLIENT_ID,
      client_secret: process.env.MATATIKA_AUTH0_CLIENT_SECRET,
      audience: process.env.MATATIKA_AUTH0_AUDIENCE,
      grant_type: "client_credentials",
    }),
  });

  if (!tokenRes.ok)
    throw new Error(`Auth0 token request failed: ${tokenRes.status}`);

  const { access_token } = await tokenRes.json();

  const res = await fetch(
    `${process.env.MATATIKA_API_URL}/dataplugins?size=999&sort=label`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  );

  if (!res.ok)
    throw new Error(`Meltano dataplugins request failed: ${res.status}`);

  const data: MatatikaResponse = await res.json();
  const plugins = data._embedded?.dataplugins ?? [];

  return plugins.map((plugin) => {
    const logoUrl =
      plugin.logoUrl && plugin.logoUrl.toLowerCase().startsWith("http")
        ? plugin.logoUrl
        : plugin.logoUrl
          ? `${process.env.MATATIKA_APP_URL}${plugin.logoUrl}`
          : "";

    return { ...plugin, logoUrl };
  });
}

// ─── Data fetching ────────────────────────────────────────────────────────────

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const useWordPress = process.env.USE_WORDPRESS_CONNECTORS === "true";

  let connectors: Connector[];

  if (useWordPress) {
    connectors = await fetchFromWordPress();
  } else {
    connectors = await fetchFromMatatika();
    connectors = connectors.sort((a, b) =>
      (a.label ?? a.name).localeCompare(b.label ?? b.name),
    );
  }

  return { props: { connectors }, revalidate: 3600 };
};
