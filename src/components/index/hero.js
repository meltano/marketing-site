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

      <a href="https://www.matatika.com" target='_blank' className='portal-top portal-meltano'>
        <div className='portal-wrap'>
          <div className='portal-image'>
          </div>
        </div>
        <div className='portal-logo'>
          <svg xmlns="http://www.w3.org/2000/svg" width="134.8" height="20" viewBox="0 0 134.8 20" fill="none" className="portal-logo-arch">
            <g
              id="g4592"
              transform="matrix(1.0668094,0,0,1.0668094,-34.788946,-5.0830586)">
              <path
                fill="#080216"
                id="path2"
                d="M 33.507765,5.9553284 H 38.47379 L 42.945334,16.409061 47.418058,5.9553284 h 4.85509 V 22.417182 h -3.922781 v -8.971466 c 0,-0.383548 0.08261,-1.646303 0.109751,-1.756057 l -0.60423,1.756057 -3.704453,8.971466 h -2.63289 l -3.704453,-8.971466 c -0.165221,-0.383548 -0.548768,-1.563693 -0.603051,-1.756057 0,0.109754 0.109753,1.372509 0.109753,1.756057 v 8.971466 h -3.813029 z" />
              <path
                fill="#080216"
                id="path4"
                d="m 64.976188,16.025514 -1.974385,-5.18556 -1.975564,5.18556 z M 61.190279,5.9553284 h 3.758764 l 6.914475,16.4618536 h -4.417286 l -1.398474,-3.512113 h -6.09191 l -1.371323,3.512113 H 54.27702 Z" />
              <polygon
                transform="matrix(1.1801455,0,0,1.1801455,-22.777942,-12.806625)"
                fill="#080216"
                id="polygon6"
                points="83.381,18.735 78.895,18.735 78.895,15.898 91.633,15.898 91.633,18.735 87.147,18.735 87.147,29.848 83.381,29.848 " />
              <path
                fill="#080216"
                id="path8"
                d="m 94.525851,16.025514 -1.975563,-5.18556 -1.975566,5.18556 z M 90.739943,5.9553284 h 3.758765 l 6.914472,16.4618536 h -4.418465 l -1.398472,-3.512113 h -6.090732 l -1.371331,3.512113 h -4.30753 z" />
              <polygon
                transform="matrix(1.1801455,0,0,1.1801455,-22.777942,-12.806625)"
                fill="#080216"
                id="polygon10"
                points="108.42,18.735 103.933,18.735 103.933,15.898 116.672,15.898 116.672,18.735 112.186,18.735 112.186,29.848 108.42,29.848 " />
              <rect
                fill="#080216"
                id="rect12"
                height="16.461851"
                width="4.4467883"
                y="5.9553332"
                x="116.96955" />
              <polygon
                transform="matrix(1.1801455,0,0,1.1801455,-22.777942,-12.806625)"
                fill="#080216"
                id="polygon14"
                points="132.459,22.548 138.806,29.848 134.271,29.848 128.971,23.548 128.971,29.848 125.205,29.848 125.205,15.898 128.971,15.898 128.971,22.06 133.83,15.898 137.875,15.898 " />
              <path
                fill="#080216"
                id="path16"
                d="m 151.62247,16.025514 -1.97438,-5.18556 -1.97557,5.18556 z M 147.83656,5.9553284 h 3.75877 l 6.91447,16.4618536 h -4.4161 l -1.40084,-3.512113 h -6.09073 l -1.37132,3.512113 h -4.30754 z" />
            </g>
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
