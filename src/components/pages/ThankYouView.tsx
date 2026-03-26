"use client";

import React, { useEffect, useRef } from "react";

import StaticImage from "@/components/compat/StaticImage";
import BodyClass from "@/components/BodyClass";
import Seo from "@/components/seo";

type Props = {
  data: {
    thankyou: {
      nodes: {
        metadata?: { metaTitle?: string; metaDescription?: string };
        featuredImage?:
          | { node?: { localFile?: { publicURL?: string } } }
          | null;
        themePicker?: { themePicker?: string };
        thankYouHero?: { thankYouHeroTitle?: string; thankYouHeroText?: string };
      }[];
    };
  };
};

export default function ThankYouView({ data }: Props) {
  const { metadata, featuredImage, themePicker, thankYouHero } =
    data.thankyou.nodes[0];
  const metaImage = featuredImage?.node?.localFile?.publicURL;

  const lCloudRef = useRef<HTMLDivElement>(null);
  const rCloudRef = useRef<HTMLDivElement>(null);
  const castleRef = useRef<HTMLDivElement>(null);
  const waterfallRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setTimeout(() => {
        lCloudRef.current?.classList.add("show");
        rCloudRef.current?.classList.add("show");
        castleRef.current?.classList.add("show");
        waterfallRef.current?.classList.add("show");
      }, 100);

      setTimeout(() => {
        bgRef.current?.classList.add("show");
      }, 300);
    }, 200);
    return () => {};
  }, []);

  return (
    <>
      <BodyClass className={`light ${themePicker?.themePicker ?? ""}`} />
      <Seo
        title={metadata?.metaTitle}
        description={metadata?.metaDescription}
        image={metaImage}
      />
      <div className="hero hero-scene section">
        <div className="container">
          <div className="hero-info ml-margins">
            <h1
              className="hero-title"
              dangerouslySetInnerHTML={{
                __html: thankYouHero?.thankYouHeroTitle || "",
              }}
            />
            <div
              className="hero-description p1"
              dangerouslySetInnerHTML={{
                __html: thankYouHero?.thankYouHeroText || "",
              }}
            />
          </div>

          <div className="background-elements">
            <div ref={lCloudRef} className="cloud-left ready">
              <StaticImage alt="cloud left" src="../assets/img/clouds-1.webp" />
            </div>
            <div ref={rCloudRef} className="cloud-right ready">
              <StaticImage alt="cloud right" src="../assets/img/clouds-2.webp" />
            </div>
            <div ref={castleRef} className="hero-castle ready">
              <StaticImage alt="castle" src="../assets/img/hero-castle.webp" />
            </div>
            <div ref={waterfallRef} className="hero-waterfall ready">
              <StaticImage alt="waterfall" src="../assets/img/hero-waterfall.webp" />
            </div>
            <div ref={bgRef} className="hero-bg ready">
              <StaticImage alt="mountain" src="../assets/img/hero-mountain.webp" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
