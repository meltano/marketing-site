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

function SupportCheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M19.5 3.75H4.5C4.10218 3.75 3.72064 3.90804 3.43934 4.18934C3.15804 4.47064 3 4.85218 3 5.25V10.5C3 15.4425 5.3925 18.4378 7.39969 20.0803C9.56156 21.8484 11.7122 22.4484 11.8059 22.4738C11.9348 22.5088 12.0708 22.5088 12.1997 22.4738C12.2934 22.4484 14.4413 21.8484 16.6059 20.0803C18.6075 18.4378 21 15.4425 21 10.5V5.25C21 4.85218 20.842 4.47064 20.5607 4.18934C20.2794 3.90804 19.8978 3.75 19.5 3.75ZM16.2825 10.2806L11.0325 15.5306C10.9628 15.6004 10.8801 15.6557 10.7891 15.6934C10.698 15.7312 10.6004 15.7506 10.5019 15.7506C10.4033 15.7506 10.3057 15.7312 10.2147 15.6934C10.1236 15.6557 10.0409 15.6004 9.97125 15.5306L7.72125 13.2806C7.58052 13.1399 7.50146 12.949 7.50146 12.75C7.50146 12.551 7.58052 12.3601 7.72125 12.2194C7.86198 12.0786 8.05285 11.9996 8.25187 11.9996C8.4509 11.9996 8.64177 12.0786 8.7825 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8485 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806H16.2825Z"
        fill="#6081FB"
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M15.4189 18.3403C15.4927 18.4534 15.5346 18.5844 15.5401 18.7194C15.5456 18.8544 15.5145 18.9884 15.4502 19.1072C15.3858 19.226 15.2906 19.3252 15.1745 19.3943C15.0585 19.4634 14.9259 19.4999 14.7908 19.5H0.958893C0.823795 19.4999 0.69121 19.4634 0.575146 19.3943C0.459082 19.3252 0.363848 19.226 0.299506 19.1072C0.235165 18.9884 0.204104 18.8544 0.209607 18.7194C0.21511 18.5844 0.256971 18.4534 0.330768 18.3403C1.38649 16.7152 2.93935 15.4751 4.75764 14.805C3.75245 14.1358 2.9893 13.1609 2.58105 12.0244C2.17279 10.8879 2.1411 9.65024 2.49067 8.49437C2.84023 7.3385 3.55249 6.32581 4.52212 5.60605C5.49174 4.88629 6.66726 4.49768 7.87483 4.49768C9.0824 4.49768 10.2579 4.88629 11.2275 5.60605C12.1972 6.32581 12.9094 7.3385 13.259 8.49437C13.6086 9.65024 13.5769 10.8879 13.1686 12.0244C12.7604 13.1609 11.9972 14.1358 10.992 14.805C12.8103 15.4751 14.3632 16.7152 15.4189 18.3403ZM23.6605 18.3262C22.6044 16.708 21.0551 15.4732 19.242 14.805C20.4287 14.0056 21.2662 12.7841 21.5839 11.389C21.9017 9.99398 21.676 8.53026 20.9526 7.2958C20.2292 6.06134 19.0626 5.14894 17.6902 4.7443C16.3178 4.33967 14.8428 4.47322 13.5655 5.11778C13.5166 5.143 13.4739 5.17865 13.4404 5.2222C13.4068 5.26576 13.3833 5.31616 13.3714 5.36983C13.3595 5.4235 13.3595 5.47912 13.3715 5.53277C13.3835 5.58642 13.4072 5.63678 13.4408 5.68028C14.3906 6.8651 14.9361 8.32294 14.9973 9.84026C15.0586 11.3576 14.6324 12.8546 13.7811 14.1122C13.7261 14.1943 13.7057 14.2949 13.7245 14.392C13.7433 14.4891 13.7997 14.5749 13.8814 14.6306C14.9913 15.4052 15.9414 16.3866 16.6798 17.5209C16.9776 17.977 17.0993 18.5258 17.022 19.065C17.0133 19.1186 17.0164 19.1735 17.031 19.2258C17.0456 19.2781 17.0714 19.3267 17.1066 19.368C17.1419 19.4094 17.1857 19.4426 17.235 19.4654C17.2843 19.4882 17.338 19.5 17.3923 19.5H23.0455C23.2106 19.5 23.3712 19.4456 23.5022 19.345C23.6332 19.2445 23.7274 19.1036 23.7701 18.944C23.7962 18.8391 23.7999 18.7299 23.781 18.6234C23.7621 18.517 23.7211 18.4157 23.6605 18.3262Z"
        fill="#BC7AFF"
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
              className="flex gap-2 text-[15px] text-white leading-relaxed"
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
              className="flex gap-2 text-[15px] text-white leading-relaxed"
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
          className="text-[14px] text-white italic leading-relaxed"
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
        className="text-[15px] text-white leading-relaxed"
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

// ─── Shared CTA buttons ───────────────────────────────────────────────────────

function SidebarCTAButtons() {
  return (
    <div className="flex gap-2">
      <a
        href="/contact"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg w-full text-[15px] font-semibold transition-opacity hover:opacity-90"
        style={{
          background: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "#1D2939",
        }}
      >
        Get Started
      </a>
      <a
        href="https://meetings.hubspot.com/kyle-john"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg w-full text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
        style={{
          background: "#3A64FA",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        Book a demo
      </a>
    </div>
  );
}

// ─── Sidebar: Meltano Cloud connector card ───────────────────────────────────

function CloudSidebarCard({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col gap-4 p-5 rounded-lg"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(156,95,224,0.15)",
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <SupportCheckIcon />
          <span
            className="text-[15px] font-semibold text-white tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Meltano Cloud Connector
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
      <SidebarCTAButtons />
    </div>
  );
}

// ─── Sidebar: Meltano Community connector card ────────────────────────────────

function CommunitySidebarCard({ label }: { label: string }) {
  return (
    <div
      className="flex flex-col gap-4 p-5 rounded-lg"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(156,95,224,0.15)",
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
      <SidebarCTAButtons />
    </div>
  );
}

// ─── Support content ──────────────────────────────────────────────────────────

const CLOUD_SUPPORT_ITEMS = [
  {
    title: "Expert support",
    description:
      "Direct access to the team that built and maintains Meltano Cloud. Same-day responses during UK business hours. When something breaks, we fix it fast because we know exactly how it works.",
  },
  {
    title: "Rigorously tested",
    description:
      "Every connector goes through comprehensive testing and quality checks before production. Daily monitoring catches issues before they hit your pipelines. We don't just wrap open-source taps and hope for the best. We validate, we test, we maintain.",
  },
  {
    title: "No maintenance overhead",
    description:
      "API changes. Connector updates. Schema drift. Breaking changes from upstream sources. We handle it all. Your team focuses on using data. Our team focuses on making sure it's there when you need it.",
  },
  {
    title: "Access to Meltano Slack community",
    description:
      "Join 5,500+ data engineers and analytics practitioners. The community is active, helpful, and always on. Good for quick questions, sharing patterns, and learning what others are building.",
  },
] as const;

const COMMUNITY_SUPPORT_ITEM = {
  title: "Access to Meltano Slack community",
  description:
    "Join 5,500+ data engineers and analytics practitioners. The community is active, helpful, and always on. Good for quick questions, sharing patterns, and learning what others are building.",
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConnectorDetailPage() {
  const router = useRouter();
  const name = router.query.name as string | undefined;

  const [connector, setConnector] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    const raw = sessionStorage.getItem("selectedConnector");
    if (raw) {
      const base: Connector = JSON.parse(raw);
      if (base.name === name) {
        setConnector(base);
        setLoading(false);
      }
    }
  }, [name]);

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
        className="container"
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

        <div className="relative pt-10 pb-20">
          {/* ── Back link ──────────────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 font-semibold text-white/70 hover:text-white transition-colors mb-5"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              cursor: "pointer",
              marginBottom: "16px",
            }}
          >
            <CaretLeftIcon />
            Back to all connectors
          </button>

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
              <div className="flex gap-4 items-start mb-8  rounded-lg  shrink-0 w-full">
                {connector ? (
                  <ConnectorLogo
                    url={connector.logoUrl}
                    label={label}
                    size={46}
                  />
                ) : (
                  <Skeleton className="w-[46px] h-[46px] rounded shrink-0" />
                )}

                <div className="flex flex-col min-w-0">
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
                  </div>

                  {/* Technical name / variant */}
                  {connector ? (
                    <p
                      className="text-[14px] text-white leading-normal"
                      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    >
                      {connector.name} ({variant} variant)
                    </p>
                  ) : (
                    <Skeleton className="h-4 w-52" />
                  )}
                </div>
              </div>
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
                  border: "1px solid rgba(156,95,224,0.15)",
                }}
              >
                <span
                  className="text-[20px] font-semibold text-white"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.4px",
                    lineHeight: 1.2,
                  }}
                >
                  Support
                </span>

                {isCloud ? (
                  <div className="flex flex-col gap-4">
                    {CLOUD_SUPPORT_ITEMS.map((item) => (
                      <div
                        key={item.title}
                        className="flex gap-2.5 items-start"
                      >
                        <div>
                          <SupportCheckIcon />
                        </div>
                        <div className="flex flex-col gap-1 mt-0.5">
                          <span
                            className="text-[16px] font-semibold text-white"
                            style={{
                              fontFamily: "'Hanken Grotesk', sans-serif",
                            }}
                          >
                            {item.title}
                          </span>
                          <span
                            className="text-[14px] text-white/80 leading-relaxed"
                            style={{
                              fontFamily: "'Hanken Grotesk', sans-serif",
                            }}
                          >
                            {item.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-2.5 items-start">
                    <div className="pt-0.5">
                      <CommunityPeopleIcon />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span
                        className="text-[16px] font-semibold text-white"
                        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                      >
                        {COMMUNITY_SUPPORT_ITEM.title}
                      </span>
                      <span
                        className="text-[14px] text-white/80 leading-relaxed"
                        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                      >
                        {COMMUNITY_SUPPORT_ITEM.description}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Links card (docs / repo) — cloud only, community shows these in primary card */}
              {(connector?.docs || connector?.repo) && (
                <div
                  className="flex flex-col gap-3 p-5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(156,95,224,0.15)",
                  }}
                >
                  <span
                    className="text-[15px] font-semibold text-white tracking-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Resources
                  </span>
                  <div className="flex flex-col gap-2">
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
