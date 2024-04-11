import React, { useEffect, useRef } from "react";
import { StaticImage } from "gatsby-plugin-image";
import MountBack from "../../assets/img/Mountainsback.svg";
import MountFront from "../../assets/img/Mountainsfront.svg";
import { gsap } from 'gsap';

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
    if (typeof window !== 'undefined') {
      const portalElement = document.querySelector('.portal-top');
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 10) {
          gsap.to(portalElement, { y: -20, duration: 0.4, ease: "none" });
        } else {
          gsap.to(portalElement, { y: 0, duration: 0.4, ease: "none" });
        }
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

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

      <a href="https://www.arch.dev" target='_blank' className='portal-top portal-meltano'>
        <div className='portal-wrap'>
          <div className='portal-image'>
          </div>
        </div>
        <div className='portal-logo'>
          <svg xmlns="http://www.w3.org/2000/svg" width="73" height="20" viewBox="0 0 73 20" fill="none" className="portal-logo-arch">
            <path d="M22.7598 10.2348C22.7598 5.80046 25.9489 3.54749 28.9881 3.54749C31.3337 3.54749 32.9684 4.83761 33.4375 5.85014H33.5118V3.79441H36.2304V16.6767H33.5118V14.621H33.4375C32.9669 15.6379 31.3381 16.9236 28.9881 16.9236C25.9489 16.9236 22.7598 14.6692 22.7598 10.2348ZM29.5067 14.4442C31.5843 14.4442 33.5832 13.0094 33.5832 10.2348C33.5832 7.46024 31.5799 6.02546 29.5067 6.02546C27.4335 6.02546 25.4521 7.46024 25.4521 10.2348C25.4521 13.0094 27.4554 14.4442 29.5067 14.4442Z" fill="#080216"/>
            <path d="M38.5543 3.79295H41.2496V7.10812C41.6896 5.17804 42.9644 3.54749 45.2896 3.54749C45.581 3.54749 45.8301 3.57378 46.0997 3.64392V6.2417C45.8301 6.19349 45.6116 6.16719 45.3159 6.16719C42.8916 6.16719 41.2496 7.94824 41.2496 10.6425V16.6518H38.5543V3.78856V3.79295Z" fill="#080216"/>
            <path d="M47.1761 10.2348C47.1761 5.89835 50.5067 3.54749 53.8372 3.54749C56.0662 3.54749 58.1263 4.61261 59.3006 6.71801L57.293 7.98184C56.5572 6.79253 55.3072 6.04884 53.8619 6.04884C51.8033 6.04884 49.8438 7.58589 49.8438 10.2363C49.8438 12.8867 51.8033 14.4237 53.8619 14.4237C55.3072 14.4237 56.5572 13.68 57.293 12.4907L59.3006 13.7545C58.1249 15.8366 56.0662 16.9251 53.8372 16.9251C50.5067 16.9251 47.1761 14.5698 47.1761 10.2363V10.2348Z" fill="#080216"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M9.59667 7.20154L7.12866 9.67513L10.6544 13.1992L7.12866 16.7219L9.59667 19.1955L15.5977 13.1992L9.59667 7.20154Z" fill="#080216"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.52136 9.67525C3.52136 6.31624 6.23705 3.5928 9.58649 3.5928C12.9359 3.5928 15.6516 6.31624 15.6516 9.67525C15.6516 9.6957 15.6516 9.7147 15.6502 9.73515H19.173C19.173 4.39055 14.8809 0.0570068 9.58649 0.0570068C4.29207 0.0570068 0 4.39055 0 9.73515H3.52282C3.52282 9.7147 3.52136 9.6957 3.52136 9.67525Z" fill="#080216"/>
            <path d="M61.2791 0H63.9875V5.71864C64.6737 4.53225 66.03 3.54164 68.1003 3.54164C70.7344 3.54164 72.9999 5.1985 72.9999 9.08203V16.6533H70.2697V9.53058C70.2697 7.27906 69.04 6.01816 67.1417 6.01816C65.2433 6.01816 63.9918 7.28052 63.9918 9.53058V16.6533H61.2834L61.2791 0.00146111V0Z" fill="#080216"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="portal-out">
            <g clipPath="url(#clip0_486_2561)">
              <path d="M10 0C9.44687 0 9 0.446875 9 1C9 1.55313 9.44687 2 10 2H12.5844L6.29375 8.29375C5.90312 8.68437 5.90312 9.31875 6.29375 9.70938C6.68437 10.1 7.31875 10.1 7.70937 9.70938L14 3.41563V6C14 6.55312 14.4469 7 15 7C15.5531 7 16 6.55312 16 6V1C16 0.446875 15.5531 0 15 0H10ZM2.5 1C1.11875 1 0 2.11875 0 3.5V13.5C0 14.8813 1.11875 16 2.5 16H12.5C13.8813 16 15 14.8813 15 13.5V10C15 9.44687 14.5531 9 14 9C13.4469 9 13 9.44687 13 10V13.5C13 13.775 12.775 14 12.5 14H2.5C2.225 14 2 13.775 2 13.5V3.5C2 3.225 2.225 3 2.5 3H6C6.55312 3 7 2.55312 7 2C7 1.44687 6.55312 1 6 1H2.5Z" fill="#080216"/>
            </g>
            <defs>
              <clipPath id="clip0_486_2561">
                <rect width="16" height="16" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </a>

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
