import React, { useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import MountBack from "../../assets/img/Mountainsback.svg";
import MountFront from "../../assets/img/Mountainsfront.svg";

const IndexHero = ({ data }) => {
  const lCloudRef = useRef(null);
  const rCloudRef = useRef(null);
  const castleRef = useRef(null);
  const waterfallRef = useRef(null);
  const bgRef = useRef(null);
  const bgFrontRef = useRef(null);

  const titleRef = useRef(null);

  const parallaxEffectHandler = () => {
    const scrollTop = window.scrollY;
    const movement = scrollTop * 0.7;

    const isDesktop =
      window.innerWidth / window.innerHeight > 1 && window.innerWidth > 768;

    const bgTranslateY = isDesktop ? movement / 8 : movement / 8;
    const bgScale = 1 + (isDesktop ? movement / 1200 : movement / 100);
    const bgFrontTranslateY = isDesktop ? movement / 20 : movement / 2;
    const castleTranslateX = isDesktop ? -movement / 2 : -movement;
    const waterfallTranslateX = isDesktop ? movement / 2 : movement;
    const frontTranslateY = isDesktop ? movement / 200 : movement / 1000;
    const cloudMove = isDesktop ? movement / 50 : movement / 10;

    lCloudRef.current.style.marginLeft = `-${cloudMove}vw`;
    rCloudRef.current.style.marginRight = `-${cloudMove}vw`;
    lCloudRef.current.style.marginTop = `-${cloudMove}vw`;
    rCloudRef.current.style.marginTop = `-${cloudMove}vw`;
    bgRef.current.style.transform = `translateY(${bgTranslateY}%) scale(${bgScale})`;
    bgFrontRef.current.style.transform = `translateY(${bgFrontTranslateY}%) scale(${bgScale})`;
    castleRef.current.style.transform = `translateX(${castleTranslateX}px) scale(${bgScale}) translateY(-${frontTranslateY}%) `;
    waterfallRef.current.style.transform = `translateX(${waterfallTranslateX}px) scale(${bgScale}) translateY(-${frontTranslateY}%) `;
  };

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    if (!isBrowser) return;

    setTimeout(() => {
      setTimeout(() => {
        lCloudRef.current.classList.add("show");
        rCloudRef.current.classList.add("show");
        castleRef.current.classList.add("show");
        waterfallRef.current.classList.add("show");
      }, 100);

      setTimeout(() => {
        bgRef.current.classList.add("show");
        bgFrontRef.current.classList.add("show");
      }, 300);
    }, 200);

    window.addEventListener("scroll", parallaxEffectHandler);
    return () => {
      window.removeEventListener("scroll", parallaxEffectHandler);
    };
  }, []);

  useEffect(() => {
    const titleTag = titleRef.current;

    if (titleTag) {
      const emContainers = Array.from(titleTag.querySelectorAll("span"));
      if (emContainers.length) {
        emContainers.forEach((emContainer, index) => {
          const emTagsCount = emContainer.querySelectorAll("em").length;
          if (emTagsCount > 1) {
            go(emContainer);
          } else if (emTagsCount === 1) {
            emContainer.querySelector("em").style.display = "inline-block";
          }
        });
      } else {
        const emTagsCount = titleTag.querySelectorAll("em").length;
        if (emTagsCount > 1) {
          go(titleTag);
        } else if (emTagsCount === 1) {
          titleTag.querySelector("em").style.display = "inline-block";
        }
      }
    }
  }, [data.heroTitle]);

  let offset = 0;
  function go(container) {
    const emTags = Array.from(container.querySelectorAll("em"));
    const texts = emTags.map((tag) => tag.textContent);
    emTags.forEach((tag, index) => {
      let _a;
      if (index !== 0) {
        (_a = tag.parentNode) === null || _a === void 0
          ? void 0
          : _a.removeChild(tag);
      }
    });
    let currentIndex = 0;
    const currentText = texts[currentIndex];
    let targetText = texts[currentIndex];
    let textLength = currentText.length;
    const emTag = container.querySelector("em");
    emTag.style.display = "inline-block";
    emTag.innerHTML = Array.from(currentText)
      .map((char, i) => `<span>${char}</span>`)
      .join("");
    function animate() {
      const spans = Array.from(emTag.children);
      if (spans.length > 0) {
        if (spans.length > 1) {
          emTag.removeChild(spans[spans.length - 1]);
        }
        emTag.removeChild(spans[0]);
        setTimeout(animate, 30);
      } else {
        currentIndex = (currentIndex + 1) % texts.length;
        targetText = texts[currentIndex];
        textLength = 0;
        emTag.innerHTML = "";
        loadText();
      }
    }
    function loadText() {
      if (textLength < targetText.length) {
        const nextChar = targetText[textLength];
        const span = document.createElement("span");
        span.style.animation = "fadeIn 0.5s ease both";
        span.textContent = nextChar;
        emTag.appendChild(span);
        textLength += 1;
        setTimeout(loadText, 30);
      } else {
        setTimeout(() => {
          emTag.classList.add("blink");
          setTimeout(() => {
            emTag.classList.remove("blink");
            animate();
          }, 600);
        }, 2500);
      }
    }
    setTimeout(() => {
      emTag.classList.add("blink");
      setTimeout(() => {
        emTag.classList.remove("blink");
        animate();
      }, 600);
    }, 2500 + (offset % 3) * (2500 / 3));
    offset += 1;
  }

  return (
    <div className="hero hero-scene section">
      <div className="container">
        <div className="hero-info ml-margins">
          <h1
            ref={titleRef}
            className={`hero-title align-${data.heroAlign}`}
            dangerouslySetInnerHTML={{ __html: data.heroTitle }}
          />
          <p
            className={`hero-description p1 align-${data.heroAlign}`}
            dangerouslySetInnerHTML={{ __html: data.heroText }}
          />
          <div className="hero-buttons">
            <a
              href={data.heroButton1.url}
              className="btn main-btn"
              target={data.heroButton1.target}
              rel="noopener noreferrer"
            >
              {data.heroButton1.title}
            </a>

            <a
              href={data.heroButton2.url}
              className="btn colorful-btn"
              target={data.heroButton2.target}
              rel="noopener noreferrer"
            >
              <span />
              {data.heroButton2.title}
            </a>
          </div>
        </div>

        <div className="background-elements">
          <div ref={lCloudRef} className="cloud-left ready">
            <StaticImage
              alt="cloud left"
              src="../../assets/img/clouds-1.webp"
              layout="fullWidth"
            />
          </div>
          <div ref={rCloudRef} className="cloud-right ready">
            <StaticImage
              alt="cloud right"
              src="../../assets/img/clouds-2.webp"
              layout="fullWidth"
            />
          </div>
          <div ref={castleRef} className="hero-castle ready">
            <StaticImage
              alt="castle"
              src="../../assets/img/hero-castle.webp"
              layout="fullWidth"
            />
          </div>
          <div ref={waterfallRef} className="hero-waterfall ready">
            <StaticImage
              alt="waterfall"
              src="../../assets/img/hero-waterfall.webp"
              layout="fullWidth"
            />
          </div>
          <div ref={bgRef} className="hero-bg ready">
            <img alt="" src={MountBack} className="full-width-img" />
          </div>
          <div ref={bgFrontRef} className="hero-bg ready">
            <img alt="" src={MountFront} className="full-width-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexHero;
