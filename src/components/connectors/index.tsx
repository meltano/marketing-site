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
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 2.5H3C2.73478 2.5 2.48043 2.60536 2.29289 2.79289C2.10536 2.98043 2 3.23478 2 3.5V7C2 10.295 3.595 12.2919 4.93313 13.3869C6.37437 14.5656 7.80813 14.9656 7.87063 14.9825C7.95656 15.0059 8.04719 15.0059 8.13313 14.9825C8.19563 14.9656 9.6275 14.5656 11.0706 13.3869C12.405 12.2919 14 10.295 14 7V3.5C14 3.23478 13.8946 2.98043 13.7071 2.79289C13.5196 2.60536 13.2652 2.5 13 2.5ZM10.855 6.85375L7.355 10.3538C7.30856 10.4002 7.25342 10.4371 7.19272 10.4623C7.13202 10.4874 7.06696 10.5004 7.00125 10.5004C6.93554 10.5004 6.87048 10.4874 6.80978 10.4623C6.74908 10.4371 6.69394 10.4002 6.6475 10.3538L5.1475 8.85375C5.05368 8.75993 5.00097 8.63268 5.00097 8.5C5.00097 8.36732 5.05368 8.24007 5.1475 8.14625C5.24132 8.05243 5.36857 7.99972 5.50125 7.99972C5.63393 7.99972 5.76118 8.05243 5.855 8.14625L7 9.29313L10.1462 6.14625C10.1927 6.09979 10.2479 6.06294 10.3086 6.0378C10.3692 6.01266 10.4343 5.99972 10.5 5.99972C10.5657 5.99972 10.6308 6.01266 10.6914 6.0378C10.7521 6.06294 10.8073 6.09979 10.8538 6.14625C10.9002 6.1927 10.9371 6.24786 10.9622 6.30855C10.9873 6.36925 11.0003 6.4343 11.0003 6.5C11.0003 6.5657 10.9873 6.63075 10.9622 6.69145C10.9371 6.75214 10.9002 6.8073 10.8538 6.85375H10.855Z"
        fill="white"
      />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.2786 12.2269C10.3278 12.3024 10.3557 12.3897 10.3594 12.4797C10.3631 12.5697 10.3423 12.659 10.2995 12.7382C10.2566 12.8174 10.1931 12.8835 10.1157 12.9296C10.0383 12.9757 9.94993 13 9.85986 13.0001H0.638611C0.548546 13 0.460156 12.9757 0.38278 12.9296C0.305403 12.8835 0.241914 12.8174 0.19902 12.7382C0.156125 12.659 0.135418 12.5697 0.139087 12.4797C0.142755 12.3897 0.170663 12.3024 0.219861 12.2269C0.923677 11.1436 1.95892 10.3168 3.17111 9.87006C2.50098 9.42393 1.99222 8.77398 1.72005 8.01634C1.44788 7.2587 1.42675 6.43358 1.65979 5.663C1.89284 4.89242 2.36768 4.21729 3.01409 3.73745C3.66051 3.25761 4.44419 2.99854 5.24924 2.99854C6.05428 2.99854 6.83796 3.25761 7.48438 3.73745C8.1308 4.21729 8.60564 4.89242 8.83868 5.663C9.07172 6.43358 9.0506 7.2587 8.77843 8.01634C8.50625 8.77398 7.99749 9.42393 7.32736 9.87006C8.53955 10.3168 9.57479 11.1436 10.2786 12.2269ZM15.773 12.2176C15.069 11.1388 14.0361 10.3156 12.8274 9.87006C13.6185 9.33716 14.1768 8.52281 14.3886 7.59277C14.6005 6.66274 14.45 5.68692 13.9677 4.86395C13.4855 4.04098 12.7078 3.43271 11.7928 3.16295C10.8779 2.89319 9.89458 2.98223 9.04299 3.41193C9.01042 3.42875 8.98195 3.45251 8.9596 3.48155C8.93724 3.51059 8.92154 3.54419 8.91361 3.57997C8.90568 3.61575 8.90571 3.65283 8.9137 3.6886C8.92169 3.72436 8.93745 3.75793 8.95986 3.78693C9.59309 4.57681 9.95675 5.54871 9.99758 6.56025C10.0384 7.5718 9.75425 8.56984 9.18674 9.40818C9.15005 9.46297 9.1365 9.53003 9.14903 9.59476C9.16155 9.65949 9.19914 9.71666 9.25361 9.75381C9.99354 10.2702 10.627 10.9245 11.1192 11.6807C11.3178 11.9847 11.3989 12.3506 11.3474 12.7101C11.3416 12.7458 11.3436 12.7824 11.3533 12.8173C11.3631 12.8522 11.3803 12.8845 11.4038 12.9121C11.4273 12.9397 11.4565 12.9618 11.4893 12.977C11.5222 12.9922 11.558 13.0001 11.5942 13.0001H15.363C15.4731 13.0001 15.5801 12.9638 15.6675 12.8968C15.7548 12.8298 15.8176 12.7358 15.8461 12.6294C15.8635 12.5595 15.866 12.4867 15.8534 12.4157C15.8408 12.3448 15.8134 12.2772 15.773 12.2176Z"
        fill="white"
        fill-opacity="0.7"
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
      className="flex items-center gap-3 p-3 rounded-lg w-full sm:w-[270px] shrink-0 hover:brightness-110 transition-all"
      style={{ background: "rgba(255,255,255,0.11)" }}
    >
      <div className="bg-white rounded shrink-0 w-[46px] h-[46px] flex items-center justify-center overflow-hidden">
        {connector.logoUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={connector.logoUrl}
              alt={displayName}
              className="w-[24px] h-[24px] object-contain"
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
            className="inline-flex items-center gap-1 px-1.5 py-1 rounded text-[14px] text-white/80 self-start"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
            }}
          >
            <CloudIcon />
            Meltano Cloud
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 px-1.5 py-1 rounded text-[14px] text-white/80 self-start"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
            }}
          >
            <CommunityIcon />
            Meltano community
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
