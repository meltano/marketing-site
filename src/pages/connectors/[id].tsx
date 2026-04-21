import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";
import { type Connector } from "@/components/connectors";

// ─── Icons ────────────────────────────────────────────────────────────────────

function CaretLeftIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M4.5 9L7.5 12L13.5 6"
        stroke="#4A64F5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIconPurple() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M4.5 9L7.5 12L13.5 6"
        stroke="#BC7AFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect
        x="3"
        y="5"
        width="14"
        height="12"
        rx="2"
        stroke="white"
        strokeWidth="1.5"
      />
      <path
        d="M3 9H17"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 3V6M13 3V6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="7" cy="13" r="1" fill="white" />
      <circle cx="10" cy="13" r="1" fill="white" />
      <circle cx="13" cy="13" r="1" fill="white" />
    </svg>
  );
}

function CloudShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M8 2L3 4.5V8C3 11 5.5 13.5 8 14C10.5 13.5 13 11 13 8V4.5L8 2Z"
        stroke="#7B96FF"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="rgba(74,100,245,0.2)"
      />
      <path
        d="M6 8L7.5 9.5L10 7"
        stroke="#7B96FF"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommunityPeopleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="6" cy="5" r="2" stroke="#BC7AFF" strokeWidth="1.2" />
      <path
        d="M2 13.5C2 11.015 3.791 9 6 9C8.209 9 10 11.015 10 13.5"
        stroke="#BC7AFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="11.5" cy="5.5" r="1.5" stroke="#BC7AFF" strokeWidth="1.2" />
      <path
        d="M13 13.5C13 11.567 12.052 9.916 10.629 9.186"
        stroke="#BC7AFF"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
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
        d="M8.5 2H12V5.5M12 2L7 7M5.5 3H3C2.45 3 2 3.45 2 4V11C2 11.55 2.45 12 3 12H10C10.55 12 11 11.55 11 11V8.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Logo placeholder ─────────────────────────────────────────────────────────

function LogoPlaceholder({ name, size = 46 }: { name: string; size?: number }) {
  return (
    <div
      className="rounded flex items-center justify-center bg-[#2a1f4a]"
      style={{ width: size, height: size }}
    >
      <span
        className="font-semibold text-[#a78bfa] leading-none"
        style={{ fontSize: size * 0.38, fontFamily: "'Inter', sans-serif" }}
      >
        {(name ?? "?").charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

// ─── Connector logo with fallback ─────────────────────────────────────────────

function ConnectorLogo({
  url,
  label,
  size = 46,
}: {
  url: string | null;
  label: string;
  size?: number;
}) {
  if (!url) return <LogoPlaceholder name={label} size={size} />;
  return (
    <div
      className="bg-white rounded flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={label}
        style={{ width: size * 0.7, height: size * 0.7, objectFit: "contain" }}
        onError={(e) => {
          const img = e.target as HTMLImageElement;
          img.style.display = "none";
          const sibling = img.nextElementSibling as HTMLElement | null;
          if (sibling) sibling.style.display = "flex";
        }}
      />
      <span style={{ display: "none" }}>
        <LogoPlaceholder name={label} size={size * 0.7} />
      </span>
    </div>
  );
}

// ─── Plugin-type badge ────────────────────────────────────────────────────────

function TypeBadge({ isCloud }: { isCloud: boolean }) {
  if (isCloud) {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[14px] font-normal leading-none"
        style={{
          background: "rgba(58,100,250,0.15)",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'Hanken Grotesk', sans-serif",
          width: "fit-content",
        }}
      >
        <CloudShieldIcon />
        Meltano Cloud
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[14px] font-normal leading-none"
      style={{
        background: "rgba(188,122,255,0.2)",
        color: "rgba(255,255,255,0.9)",
        fontFamily: "'Hanken Grotesk', sans-serif",
        width: "fit-content",
      }}
    >
      <CommunityPeopleIcon />
      Meltano community
    </span>
  );
}

// ─── Rich markdown renderer ───────────────────────────────────────────────────

function RichMarkdownBlock({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  function renderInline(str: string): React.ReactNode {
    // Handle bold **text** or __text__
    const parts = str.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
    return parts.map((part, idx) => {
      if (/^(\*\*|__)(.+)(\*\*|__)$/.test(part)) {
        const inner = part.replace(/^(\*\*|__)/, "").replace(/(\*\*|__)$/, "");
        return (
          <strong key={idx} className="font-semibold text-white">
            {inner}
          </strong>
        );
      }
      return part;
    });
  }

  while (i < lines.length) {
    const line = lines[i];

    // Heading: ## or # etc
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      const sizes = [
        "text-[20px]",
        "text-[17px]",
        "text-[15px]",
        "text-[14px]",
      ];
      elements.push(
        <p
          key={i}
          className={`font-semibold text-white mt-4 mb-1 ${sizes[headingMatch[1].length - 1] ?? "text-[15px]"}`}
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {headingMatch[2]}
        </p>,
      );
      i++;
      continue;
    }

    // Ordered list block
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="flex flex-col gap-1.5 pl-0 list-none">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex gap-2 text-[15px] text-white/70 leading-relaxed"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              <span className="text-[#7B96FF] shrink-0 font-medium min-w-[20px]">
                {j + 1}.
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // Unordered list block
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="flex flex-col gap-1.5 list-none pl-0">
          {items.map((item, j) => (
            <li
              key={j}
              className="flex gap-2 text-[15px] text-white/70 leading-relaxed"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              <span className="text-[#9C5FE0] mt-1 shrink-0">•</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // Empty line
    if (line.trim() === "" || line.trim() === "​") {
      i++;
      continue;
    }

    // Italic line (*text* or _text_)
    if (/^\*[^*]/.test(line) && line.endsWith("*")) {
      elements.push(
        <p
          key={i}
          className="text-[14px] text-white/50 italic leading-relaxed"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {line.replace(/^\*/, "").replace(/\*$/, "")}
        </p>,
      );
      i++;
      continue;
    }

    // Bold-only line (entire line is bold heading like **Settings**)
    if (/^\*\*[^*]+\*\*$/.test(line.trim())) {
      const inner = line.trim().replace(/^\*\*/, "").replace(/\*\*$/, "");
      elements.push(
        <p
          key={i}
          className="font-semibold text-white text-[15px] mt-3 mb-0.5"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          {inner}
        </p>,
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p
        key={i}
        className="text-[15px] text-white/70 leading-relaxed"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {renderInline(line)}
      </p>,
    );
    i++;
  }

  return <div className="flex flex-col gap-3">{elements}</div>;
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`rounded animate-pulse bg-white/10 ${className ?? ""}`} />
  );
}

// ─── Sidebar: Meltano Cloud connector card ───────────────────────────────────

function CloudSidebarCard({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col gap-4 p-5 rounded-lg"
      style={{
        background: "rgba(58,100,250,0.07)",
        border: "1px solid rgba(58,100,250,0.2)",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CloudShieldIcon />
          <span
            className="text-[15px] font-semibold text-white tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Meltano Connector
          </span>
        </div>
        <p
          className="text-[13px] text-white/60 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label} connector is available on Meltano. It is built, maintained,
          supported, and tested by Meltano.
        </p>
      </div>

      <a
        href="https://meetings.hubspot.com/aphethean/45-min-demo-meeting?uuid=ff906b81-7e0b-4c2d-ad44-cc654abd18d8"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
        style={{
          background: "#3A64FA",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <CalendarIcon />
        Book a demo
      </a>
    </div>
  );
}

// ─── Sidebar: Meltano Community connector card ────────────────────────────────

function CommunitySidebarCard({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col gap-4 p-5 rounded-lg"
      style={{
        background: "rgba(188,122,255,0.07)",
        border: "1px solid rgba(188,122,255,0.25)",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CommunityPeopleIcon />
          <span
            className="text-[15px] font-semibold text-white tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Meltano Community Connector
          </span>
        </div>
        <p
          className="text-[13px] text-white/60 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {label} connector is available on Meltano Community. It is built by
          our growing community of over 5000+ developers. Refer to the Install
          section below to verify the readiness of this connector.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectorDetailPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  const [connector, setConnector] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const raw = sessionStorage.getItem("selectedConnector");
    if (raw) {
      const base: Connector = JSON.parse(raw);
      if (base.id === id) {
        setConnector(base);
        setLoading(false);
      }
    }
  }, [id]);

  const label = connector?.label ?? connector?.name ?? "Connector";
  const variant = connector?.variant ?? connector?.name ?? "";
  const seoDescription = `${label} connector for Meltano. Build reliable data pipelines powered by ${label}.`;
  const isCloud = connector?.variant === "matatika";

  // Conditional theme tokens
  const headerBg = isCloud ? "rgba(58,100,250,0.05)" : "rgba(188,122,255,0.08)";
  const headerBorder = isCloud
    ? "rgba(58,100,250,0.18)"
    : "rgba(188,122,255,0.28)";

  return (
    <>
      <BodyClass className="dark dark-header" />
      <Seo
        title={`${label} Connector | Meltano`}
        description={seoDescription}
      />

      <div
        className="min-h-screen"
        style={{ paddingTop: "var(--navbar-height, 80px)" }}
      >
        {/* ── Subtle top gradient ──────────────────────────────────────────── */}
        <div
          className="absolute inset-x-0 top-0 h-[300px] pointer-events-none"
          style={{
            background: isCloud
              ? "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(58,100,250,0.12) 0%, transparent 70%)"
              : "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(188,122,255,0.1) 0%, transparent 70%)",
          }}
        />

        <div className="relative px-6 md:px-16 lg:px-[120px] pt-10 pb-20">
          {/* ── Back link ──────────────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 font-semibold text-white/70 hover:text-white transition-colors mb-5"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              cursor: "pointer",
            }}
          >
            <CaretLeftIcon />
            Back to all connectors
          </button>

          {/* ── Header card ────────────────────────────────────────────────── */}
          <div
            className="flex gap-4 items-start p-6 md:p-8 rounded-lg mb-8 mt-2 shrink-0 w-full"
            style={{
              background: connector ? headerBg : "rgba(255,255,255,0.04)",
              border: `1px solid ${connector ? headerBorder : "rgba(255,255,255,0.1)"}`,
            }}
          >
            {connector ? (
              <ConnectorLogo url={connector.logoUrl} label={label} size={46} />
            ) : (
              <Skeleton className="w-[46px] h-[46px] rounded shrink-0" />
            )}

            <div className="flex flex-col gap-2 min-w-0">
              {/* Name + badge */}
              <div className="flex flex-col gap-1.5">
                {connector ? (
                  <h5
                    className="text-[24px] font-semibold text-white leading-tight m-0 truncate"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                  >
                    {label}
                  </h5>
                ) : (
                  <Skeleton className="h-6 w-36" />
                )}

                {connector ? (
                  <TypeBadge isCloud={isCloud} />
                ) : (
                  <Skeleton className="h-5 w-24 rounded-full" />
                )}
              </div>

              {/* Technical name / variant */}
              {connector ? (
                <p
                  className="text-[14px] text-white/50 leading-normal"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  {connector.name} ({variant} variant)
                </p>
              ) : (
                <Skeleton className="h-4 w-52" />
              )}
            </div>
          </div>

          {/* ── Two-column layout ──────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: description */}
            <div
              className="flex-1 min-w-0 rounded-lg p-6 md:p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(156,95,224,0.15)",
                backdropFilter: "blur(6px)",
              }}
            >
              {loading ? (
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[92%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-[88%]" />
                  <Skeleton className="h-4 w-[70%]" />
                </div>
              ) : connector?.fullDescription ? (
                <RichMarkdownBlock text={connector.fullDescription} />
              ) : (
                <p
                  className="text-[15px] text-white/50 leading-relaxed"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                >
                  No description available for this connector.
                </p>
              )}
            </div>

            {/* Right: sidebar */}
            <div className="flex flex-col gap-6 w-full lg:w-[360px] shrink-0">
              {/* Cloud or Community primary card */}
              {connector ? (
                isCloud ? (
                  <CloudSidebarCard label={label} />
                ) : (
                  <CommunitySidebarCard label={label} />
                )
              ) : (
                <Skeleton className="h-40 w-full rounded-lg" />
              )}

              {/* Support card */}
              <div
                className="flex flex-col gap-4 p-5 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span
                  className="text-[15px] font-semibold text-white tracking-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Support
                </span>

                {isCloud ? (
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Premium support with issue logging",
                      "99.99% uptime",
                      "Slack community",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckIcon />
                        <span
                          className="text-[13px] text-white/60"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Open source & free to use",
                      "Community supported",
                      "Slack community",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckIconPurple />
                        <span
                          className="text-[13px] text-white/60"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Links card (docs / repo) — cloud only, community shows these in primary card */}
              {(connector?.docs || connector?.repo) && (
                <div
                  className="flex flex-col gap-3 p-5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <span
                    className="text-[15px] font-semibold text-white tracking-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Resources
                  </span>
                  <div className="flex flex-col gap-2">
                    {connector.docs && (
                      <a
                        href={connector.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <ExternalLinkIcon />
                        Documentation
                      </a>
                    )}
                    {connector.repo && (
                      <a
                        href={connector.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <ExternalLinkIcon />
                        View source code
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
