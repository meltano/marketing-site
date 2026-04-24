import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export type Connector = {
  id: string;
  name: string;
  label: string | null;
  variant: string;
  logoUrl: string;
  pluginType: string;
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function CloudIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M11.0833 5.83333C10.7986 4.24479 9.41667 3.08333 7.875 3.08333C6.69792 3.08333 5.66667 3.70833 5.10417 4.66667C3.79167 4.8125 2.77083 5.9375 2.77083 7.29167C2.77083 8.75 3.9375 9.91667 5.39583 9.91667H10.7917C11.9583 9.91667 12.9167 8.95833 12.9167 7.79167C12.9167 6.66667 12.0417 5.75 11.0833 5.83333Z"
        stroke="#4A64F5"
        strokeWidth="0.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="7" cy="4.5" r="2" stroke="#9C5FE0" strokeWidth="0.875" />
      <path
        d="M3 11C3 9.34315 4.79086 8 7 8C9.20914 8 11 9.34315 11 11"
        stroke="#9C5FE0"
        strokeWidth="0.875"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="7" cy="7" r="4.5" stroke="#6b7280" strokeWidth="1.2" />
      <path
        d="M10.5 10.5L13 13"
        stroke="#6b7280"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── No Results Empty State ───────────────────────────────────────────────────

function NoConnectorsFound({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div
        className="flex flex-col items-center gap-5 px-12 py-10 rounded-xl text-center"
        style={{
          background: "rgba(10, 12, 30, 0.8)",
          border: "1px solid rgba(59, 100, 255, 0.6)",
          boxShadow:
            "0 0 32px rgba(59, 100, 255, 0.2), inset 0 0 32px rgba(59, 100, 255, 0.05)",
          maxWidth: 1200,
          maxHeight: 600,
          width: "100%",
        }}
      >
        {/* Mascot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/img/melty.svg"
          alt="Melty mascot"
          className="w-[250px] h-auto object-contain"
        />

        {/* Text */}
        <div className="flex flex-col gap-1.5">
          <p
            className="text-white font-semibold text-[16px] leading-snug"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            This connector is not available on Meltano Cloud or Community.
          </p>
          <p
            className="text-white/50 text-[14px] leading-snug"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            Although this connector is not available, we can develop it for you!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-medium text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all cursor-pointer"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.33325 7C2.33325 4.42267 4.42259 2.33333 6.99992 2.33333C8.57992 2.33333 9.97459 3.108 10.8333 4.29167M11.6666 7C11.6666 9.57733 9.57725 11.6667 6.99992 11.6667C5.41992 11.6667 4.02525 10.892 3.16659 9.70833"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <path
                d="M9.91675 4.08333L10.8334 4.29167L11.0834 3.20833"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.08325 9.91667L3.16659 9.70833L2.91659 10.7917"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Reset
          </button>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-medium text-white transition-all"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              background: "linear-gradient(135deg, #3B54F4 0%, #5B6FF5 100%)",
              boxShadow: "0 2px 12px rgba(59, 84, 244, 0.4)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.25 1.75L6.41667 7.58333M12.25 1.75L8.75 12.25L6.41667 7.58333M12.25 1.75L1.75 5.25L6.41667 7.58333"
                stroke="white"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder logo ─────────────────────────────────────────────────────────

function LogoPlaceholder({ name }: { name: string }) {
  const letter = name.charAt(0).toUpperCase();
  return (
    <div className="w-[30px] h-[30px] rounded flex items-center justify-center bg-[#2a1f4a]">
      <span
        className="text-[13px] font-semibold text-[#a78bfa] leading-none"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {letter}
      </span>
    </div>
  );
}

// ─── Connector Card ───────────────────────────────────────────────────────────

function ConnectorCard({ connector }: { connector: Connector }) {
  const isCloud = connector.variant === "matatika";
  const displayName = connector.label ?? connector.name;
  const href = { pathname: `/connectors/${connector.name}` };

  function handleClick() {
    sessionStorage.setItem("selectedConnector", JSON.stringify(connector));
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="flex items-center gap-2 p-3 border border-white/10 rounded-lg w-full sm:w-[288px] shrink-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
    >
      <div className="bg-white rounded shrink-0 w-[46px] h-[46px] flex items-center justify-center overflow-hidden border border-white/10">
        {connector.logoUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={connector.logoUrl}
              alt={displayName}
              className="w-[30px] h-[30px] object-contain"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = "none";
                const sibling = img.nextElementSibling as HTMLElement | null;
                if (sibling) sibling.style.display = "flex";
              }}
            />
            <span style={{ display: "none" }}>
              <LogoPlaceholder name={displayName} />
            </span>
          </>
        ) : (
          <LogoPlaceholder name={displayName} />
        )}
      </div>
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <p
          className="font-semibold text-[16px] text-white truncate leading-snug"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {displayName}
        </p>
        {isCloud ? (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-1 rounded text-[12px] text-white/80 self-start"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              background: "rgba(74, 100, 245, 0.2)",
            }}
          >
            <CloudIcon />
            Meltano Cloud
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-1 rounded text-[12px] text-white/80 self-start"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              background: "rgba(188, 122, 255, 0.15)",
            }}
          >
            <CommunityIcon />
            Meltano Community
          </span>
        )}
      </div>
    </Link>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type TabValue = "all" | "cloud" | "community";

const TABS: { label: string; value: TabValue }[] = [
  { label: "All", value: "all" },
  { label: "Meltano Cloud", value: "cloud" },
  { label: "Meltano Community", value: "community" },
];

type ConnectorsProps = {
  connectors: Connector[];
};

export default function Connectors({ connectors }: ConnectorsProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [ready, setReady] = useState(false);

  // Initialise from URL query params once router is ready
  useEffect(() => {
    if (!router.isReady || ready) return;
    const q = (router.query.q as string) ?? "";
    const tab = (router.query.tab as string) ?? "";
    if (q) setSearch(q);
    if (tab === "cloud" || tab === "community") setActiveTab(tab as TabValue);
    setReady(true);
  }, [router.isReady]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    return connectors.filter((c) => {
      const displayName = c.label ?? c.name;
      const matchesSearch = displayName
        .toLowerCase()
        .includes(search.toLowerCase());
      const isCloud = c.variant === "matatika";
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "cloud" && isCloud) ||
        (activeTab === "community" && !isCloud);
      return matchesSearch && matchesTab;
    });
  }, [connectors, search, activeTab]);

  // Persist state to URL so back-navigation restores it.
  // Only save the search query when it produces results.
  useEffect(() => {
    if (!ready) return;
    const query: Record<string, string> = {};
    if (search && filtered.length > 0) query.q = search;
    if (activeTab !== "all") query.tab = activeTab;
    router.replace({ pathname: "/connectors", query }, undefined, {
      shallow: true,
    });
  }, [search, activeTab, ready, filtered.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="container flex flex-col gap-16"
      style={{
        marginTop: "calc(36px + var(--navbar-height, 80px))",
      }}
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3
          className="text-[36px] font-bold leading-tight w-full m-0 text-white"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Connectors
        </h3>
        <p
          className="text-[16px] leading-[20px] font-normal w-full text-white/60"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Explore all the connectors that Meltano supports.
        </p>
      </div>

      {/* Controls + Grid */}
      <div className="flex flex-col gap-8 w-full">
        {/* Search */}
        <div className="flex items-center gap-3 border border-white/10 rounded-lg px-4 py-[14px] w-full bg-white/5">
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search connectors.."
            className="bg-transparent text-[16px] text-white placeholder-white/30 outline-none w-full leading-snug"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="shrink-0 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Tabs + Grid */}
        <div className="flex flex-col gap-4 w-full">
          {/* Segment control */}
          <div className="bg-white/5 border border-white/10 p-1 rounded-lg inline-flex self-start">
            <div className="flex gap-1">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`px-[10px] py-[6px] rounded-md text-[12px] leading-[1.2] tracking-[-0.24px] whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-white/10 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.3)] text-white font-semibold"
                        : "text-white/40 font-normal hover:text-white/70"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Connector grid */}
          {filtered.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {filtered.map((connector) => (
                <ConnectorCard key={connector.id} connector={connector} />
              ))}
            </div>
          ) : (
            <NoConnectorsFound
              onReset={() => {
                setSearch("");
                setActiveTab("all");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
