/* eslint-disable no-inner-declarations */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "gatsby";

const Header = () => {
  const [shrinkMenu, setShrinkMenu] = useState(false);

  const [menuOpened, setMenuOpened] = useState(false);

  const hamburgerMenuRef = useRef(null);
  const mainNavRef = useRef(null);

  const handleMenuClick = () => {
    if (typeof window !== "undefined") {
      const hamburgerMenu = hamburgerMenuRef.current;
      const mainNav = mainNavRef.current;
      const { body } = document;

      if (menuOpened) {
        hamburgerMenu.innerHTML =
          "<svg width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M20 3H0' stroke='white' stroke-width='2'/><path d='M20 10H0' stroke='white' stroke-width='2'/><path d='M20 17H0' stroke='white' stroke-width='2'/></svg>";
        hamburgerMenu.classList.remove("menu-opened");
        body.classList.remove("modal-opened");
        body.classList.remove("menu-opened");
        mainNav.classList.remove("main-nav-active");
      } else {
        hamburgerMenu.innerHTML =
          "<svg width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M18 18L2 2' stroke='white' stroke-width='2'/><path d='M18 2L2 18' stroke='white' stroke-width='2'/></svg>";
        hamburgerMenu.classList.add("menu-opened");
        body.classList.add("modal-opened");
        body.classList.add("menu-opened");
        mainNav.classList.add("main-nav-active");
      }
    }

    setMenuOpened(!menuOpened);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      const { body } = document;
      if (
        html.getBoundingClientRect().top <= -2 ||
        body.getBoundingClientRect().top <= -2
      ) {
        setShrinkMenu(true);
      } else {
        setShrinkMenu(false);
      }
      const handleScroll = () => {
        if (
          html.getBoundingClientRect().top <= -2 ||
          body.getBoundingClientRect().top <= -2
        ) {
          setShrinkMenu(true);
        } else {
          setShrinkMenu(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mainNav = document.querySelector(".main-nav");
      const extrasItems = document.querySelector(".menu-extras");
      const menuItems = mainNav.querySelectorAll("ul > li.has-sub-items");
      const hopItems = mainNav.querySelectorAll(".hop");
      const cupItemOne = extrasItems.querySelector(
        'a[data-tooltip="View code and issue tracker"]'
      );
      const cupItemTwo = extrasItems.querySelector(
        'a[data-tooltip="Join our 4,500+ community"]'
      );
      const arrow = mainNav.querySelector(".subcontainer-arrow");
      const arrowWidth = arrow.getBoundingClientRect().width;

      function handleArrowVisibility() {
        const isHovering = [...menuItems, ...hopItems].some((el) =>
          el.matches(":hover")
        );

        arrow.classList.toggle("show-arrow", isHovering);

        if (!isHovering) {
          hopItems.forEach((hop) => {
            hop.classList.remove("menu-container--active");
          });
        }
      }

      menuItems.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
          const menuItem = e.currentTarget;
          const menuItemRect = menuItem.getBoundingClientRect();
          const menuItemCenter = menuItemRect.left + menuItemRect.width / 2;
          const mainNavRect = mainNav.getBoundingClientRect();

          arrow.style.transform = `translateX(${
            menuItemCenter - mainNavRect.left - arrowWidth / 2
          }px) translateY(-50%)`;

          hopItems.forEach((hop) => {
            hop.classList.remove("menu-container--active");
          });

          const hoveredHop = menuItem.querySelector(".hop");
          if (hoveredHop) {
            hoveredHop.classList.add("menu-container--active");
          }
        });
      });

      function cupItemOneMouseEnterHandler(e) {
        const menuItem = e.currentTarget;
        const menuItemRect = menuItem.getBoundingClientRect();
        const menuItemCenter = menuItemRect.left + menuItemRect.width / 2;
        const mainNavRect = mainNav.getBoundingClientRect();

        arrow.style.transform = `translateX(${
          menuItemCenter - mainNavRect.left - arrowWidth / 2
        }px) translateY(-50%)`;

        const isHovering = cupItemOne.matches(":hover");

        arrow.classList.toggle("show-arrow", isHovering);
      }

      function cupItemOneMouseLeaveHandler() {
        const isHovering = cupItemOne.matches(":hover");
        arrow.classList.toggle("show-arrow", isHovering);
      }

      function cupItemTwoMouseEnterHandler(e) {
        const menuItem = e.currentTarget;
        const menuItemRect = menuItem.getBoundingClientRect();
        const menuItemCenter = menuItemRect.left + menuItemRect.width / 2;
        const mainNavRect = mainNav.getBoundingClientRect();

        arrow.style.transform = `translateX(${
          menuItemCenter - mainNavRect.left - arrowWidth / 2
        }px) translateY(-50%)`;

        const isHovering = cupItemTwo.matches(":hover");

        arrow.classList.toggle("show-arrow", isHovering);
      }

      function cupItemTwoMouseLeaveHandler() {
        const isHovering = cupItemOne.matches(":hover");
        arrow.classList.toggle("show-arrow", isHovering);
      }

      cupItemOne &&
        cupItemOne.addEventListener("mouseenter", cupItemOneMouseEnterHandler);
      cupItemOne &&
        cupItemOne.addEventListener("mouseleave", cupItemOneMouseLeaveHandler);
      cupItemTwo &&
        cupItemTwo.addEventListener("mouseenter", cupItemTwoMouseEnterHandler);
      cupItemTwo &&
        cupItemTwo.addEventListener("mouseleave", cupItemTwoMouseLeaveHandler);

      mainNav && mainNav.addEventListener("mouseover", handleArrowVisibility);
      mainNav && mainNav.addEventListener("mouseout", handleArrowVisibility);

      const subListItems = document.querySelectorAll(".sub > li");

      subListItems.forEach((listItem) => {
        listItem.addEventListener("mouseover", () => {
          const parentContainer = listItem.closest(".menu-container--active");
          if (parentContainer) {
            const activeItems =
              parentContainer.querySelectorAll(".menu-item--active");
            activeItems.forEach((item) =>
              item.classList.remove("menu-item--active")
            );
          } else {
            subListItems.forEach((li) =>
              li.classList.remove("menu-item--active")
            );
          }
          listItem.classList.add("menu-item--active");
        });
      });

      function activateMobileMenu() {
        if (window.innerWidth < 768) {
          const mobileMenuItems = document.querySelectorAll("nav > ul > li");

          mobileMenuItems.forEach((item) => {
            item.addEventListener("click", () => {
              mobileMenuItems.forEach((i) => {
                i.classList.remove("mobile-menu-item--active");
              });
              item.classList.add("mobile-menu-item--active");
            });
          });
        } else if (window.innerWidth > 1024) {
          if (
            document
              .querySelector("#hamburger-menu")
              .classList.contains("menu-opened")
          ) {
            document.querySelector("#hamburger-menu").click();
          }
        }
      }

      activateMobileMenu();

      window.addEventListener("resize", () => {
        activateMobileMenu();
      });

      return () => {
        mainNav.removeEventListener("mouseover", handleArrowVisibility);
        mainNav.removeEventListener("mouseout", handleArrowVisibility);
        cupItemOne.removeEventListener(
          "mouseenter",
          cupItemOneMouseEnterHandler
        );
        cupItemOne.removeEventListener(
          "mouseleave",
          cupItemOneMouseLeaveHandler
        );
        cupItemTwo.removeEventListener(
          "mouseenter",
          cupItemTwoMouseEnterHandler
        );
        cupItemTwo.removeEventListener(
          "mouseleave",
          cupItemTwoMouseLeaveHandler
        );
      };
    }
  }, []);

  return (
    <header className={shrinkMenu ? "shrink-menu" : ""}>
      <div className="container">
        <div className="menu ml-margins">
          <svg
            className="menu-logo"
            xmlns="http://www.w3.org/2000/svg"
            width="179"
            height="46"
            viewBox="0 0 179 46"
            fill="none"
          >
            <a href="https://arch.dev/" target="_blank" rel="noreferrer">
              <g>
                <rect
                  x="50"
                  y="27"
                  width="129"
                  height="26"
                  fill="transparent"
                />
                <path
                  d="M52.5612 28.9741V34.5339H52.6166C53.1704 33.297 54.6473 32.3002 56.4595 32.3002C58.8594 32.3002 61.2255 34.017 61.2255 37.2877C61.2255 40.5583 58.8625 42.2752 56.4595 42.2752C54.6503 42.2752 53.1735 41.2783 52.6166 40.0414H52.5612V42.0906H51.4351V28.9772H52.5612V28.9741ZM56.3087 41.2383C58.1918 41.2383 60.0963 39.946 60.0963 37.2877C60.0963 34.6293 58.1948 33.334 56.3087 33.334C54.4227 33.334 52.5212 34.6447 52.5212 37.2877C52.5212 39.9307 54.4227 41.2383 56.3087 41.2383Z"
                  fill="#311772"
                />
                <path
                  d="M65.7669 42.0138L61.7024 32.4849H62.8839L66.3176 40.6477L69.7544 32.4849H70.9359L66.8345 42.0876L65.2838 45.5952H64.1762L65.7638 42.0138H65.7669Z"
                  fill="#311772"
                />
                <path
                  d="M74.2404 37.3216C74.2404 34.0079 76.6311 32.3218 78.908 32.3218C80.6648 32.3218 81.8894 33.2848 82.2432 34.0417H82.2986V32.5064H84.3355V42.1337H82.2986V40.5984H82.2432C81.8925 41.3584 80.671 42.3184 78.908 42.3184C76.6311 42.3184 74.2404 40.6323 74.2404 37.3185V37.3216ZM79.2987 40.4661C80.8556 40.4661 82.354 39.3923 82.354 37.3216C82.354 35.2509 80.8525 34.1771 79.2987 34.1771C77.7449 34.1771 76.2588 35.2509 76.2588 37.3216C76.2588 39.3923 77.7603 40.4661 79.2987 40.4661Z"
                  fill="#311772"
                />
                <path
                  d="M86.077 32.5064H88.0954V34.9832C88.4246 33.5402 89.3815 32.3218 91.1229 32.3218C91.3414 32.3218 91.5291 32.3402 91.7291 32.3925V34.334C91.526 34.2971 91.3629 34.2786 91.1414 34.2786C89.323 34.2786 88.0954 35.6078 88.0954 37.6231V42.1153H86.077V32.5002V32.5064Z"
                  fill="#311772"
                />
                <path
                  d="M92.5414 37.3216C92.5414 34.0817 95.0367 32.3218 97.535 32.3218C99.2058 32.3218 100.75 33.1187 101.63 34.6909L100.126 35.6355C99.575 34.7463 98.6365 34.1925 97.5535 34.1925C96.0089 34.1925 94.5413 35.3401 94.5413 37.3216C94.5413 39.3031 96.0089 40.4507 97.5535 40.4507C98.6365 40.4507 99.5719 39.8938 100.126 39.0046L101.63 39.9492C100.75 41.5061 99.2058 42.3184 97.535 42.3184C95.0398 42.3184 92.5414 40.5584 92.5414 37.3185V37.3216Z"
                  fill="#311772"
                />

                <path
                  d="M103.11 29.6724H105.141V33.9461C105.655 33.0599 106.673 32.3184 108.224 32.3184C110.199 32.3184 111.898 33.5584 111.898 36.4598V42.1181H109.852V36.7952C109.852 35.1122 108.932 34.1707 107.507 34.1707C106.082 34.1707 105.147 35.1122 105.147 36.7952V42.1181H103.116V29.6724H103.11Z"
                  fill="#311772"
                />
              </g>
            </a>
            <Link to="/">
              <g>
                <rect x="50" y="0" width="129" height="26" fill="transparent" />
                <path
                  d="M102.184 25.1268C101.652 24.5204 101.268 23.8263 101.034 23.0425C100.796 22.2586 100.682 21.2007 100.682 19.8755V0H105.08V19.4061C105.08 20.9154 105.246 22.0766 105.58 22.8987C105.915 23.7006 106.346 24.3856 106.879 24.9539V25.1313H102.184L102.189 25.1268H102.184Z"
                  fill="#080216"
                />
                <path
                  d="M112.092 25.1262C111.638 24.5961 111.276 23.9627 111 23.2215C110.744 22.478 110.616 21.3617 110.616 19.8748V10.9894H108.195V7.52143H110.674V2.64746H114.958V7.52143H117.878V10.9894H114.985V19.3762C114.985 20.9395 115.164 22.1344 115.517 22.9542C115.87 23.7561 116.296 24.4231 116.786 24.951V25.1284H112.092V25.1239V25.1262Z"
                  fill="#080216"
                />
                <path
                  d="M51.441 7.50146H55.6187V9.64421H55.8523C56.6272 8.30331 58.2466 7.06348 60.6724 7.06348C63.0981 7.06348 64.9175 8.10341 65.9327 9.74304H66.2022C67.4173 7.90126 69.1693 7.06348 71.4625 7.06348C75.3729 7.06348 77.9312 9.7116 77.9312 13.4266V25.1197H73.5514V14.936C73.5514 12.5237 72.4373 11.1468 70.3507 11.1468C68.2641 11.1468 66.912 12.6562 66.912 15.0348V25.1174H62.5276V14.6642C62.5276 12.5214 61.2474 11.1446 59.2259 11.1446C57.2044 11.1446 55.8231 12.7528 55.8231 14.9966V25.1174H51.4433V7.49922H51.4388L51.441 7.50146Z"
                  fill="#080216"
                />
                <path
                  d="M80.4581 16.4139C80.4581 10.8526 84.2 7.06348 89.3907 7.06348C95.0867 7.06348 98.1863 11.2524 98.1863 16.2117V17.5841H84.7054C84.8379 20.2637 86.6954 22.074 89.5254 22.074C91.6794 22.074 93.3348 21.0655 93.9412 19.6258H98.0179C97.1419 23.2127 93.9727 25.5554 89.3884 25.5554C84.1663 25.5554 80.4558 21.6674 80.4558 16.4071L80.4603 16.4116L80.4581 16.4139ZM94.0086 14.5047C93.8065 12.1261 91.9535 10.5516 89.3907 10.5516C86.8279 10.5516 85.0445 12.2923 84.7728 14.5047H94.0086Z"
                  fill="#080216"
                />
                <path
                  d="M119.919 16.4139C119.919 10.884 123.291 7.06348 128.14 7.06348C131.208 7.06348 132.926 8.87382 133.533 9.77674H133.766V7.49697H138.151V25.1197H133.836V22.8758H133.602C133.097 23.6148 131.511 25.5554 128.279 25.5554C123.327 25.5554 119.919 21.8718 119.919 16.4071V16.4116V16.4139ZM133.872 16.3443C133.872 13.0246 131.85 11.0143 129.086 11.0143C126.321 11.0143 124.367 13.2245 124.367 16.3443C124.367 19.464 126.287 21.636 129.117 21.636C131.947 21.636 133.867 19.2933 133.867 16.3443H133.872Z"
                  fill="#080216"
                />
                <path
                  d="M141.796 7.50146H145.974V9.64421H146.207C146.913 8.337 148.669 7.06348 151.196 7.06348C155.171 7.06348 157.597 9.84412 157.597 13.5951V25.1197H153.217V14.7316C153.217 12.5888 151.836 11.1446 149.815 11.1446C147.692 11.1446 146.174 12.8224 146.174 15.0325V25.1152H141.794V7.50146H141.796Z"
                  fill="#080216"
                />
                <path
                  d="M160.128 16.3128C160.128 11.0839 163.972 7.06348 169.564 7.06348C175.157 7.06348 179 11.0839 179 16.3128C179 21.5417 175.09 25.5621 169.564 25.5621C164.039 25.5621 160.128 21.5731 160.128 16.3128ZM174.553 16.3128C174.553 13.2626 172.462 11.0211 169.564 11.0211C166.667 11.0211 164.576 13.2649 164.576 16.3128C164.576 19.3607 166.667 21.6045 169.564 21.6045C172.462 21.6045 174.553 19.3944 174.553 16.3128Z"
                  fill="#080216"
                />
              </g>
            </Link>
            <Link to="/">
              <g>
                <rect x="0" y="0" width="50" height="46" fill="transparent" />
                <path
                  d="M43.7573 10.9428C42.0772 13.2159 38.4633 13.7257 38.059 12.3713C37.6502 11.017 39.7525 10.0803 40.8598 9.95007C34.4653 8.20937 35.6242 12.8408 32.0867 13.2877C34.0408 14.2536 36.0712 15.8572 37.4436 16.0527C39.7997 16.3918 43.0969 15.0936 43.7573 10.9406"
                  fill="#080216"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.5316 5.12563C18.4081 4.40689 17.9094 4.17779 17.1121 3.85885H17.1076C22.3005 1.41737 25.6135 3.17829 26.9476 4.27886C27.6888 4.8898 27.9696 5.47153 28.2346 6.02182C28.448 6.46205 28.6502 6.88206 29.0724 7.27961C29.7058 7.87707 30.8828 8.72833 31.3567 9.07198C31.4038 9.10567 31.4443 9.13488 31.4757 9.15958C31.8284 9.41564 31.9766 10.1254 31.6554 10.6083C31.3365 11.0912 30.4874 12.084 29.47 11.9178C28.4525 11.7516 26.2222 11.3675 24.3849 11.0485C22.5476 10.7296 21.2718 9.70313 21.2718 9.70313C21.0405 10.9924 21.8176 12.1379 23.282 12.5197C23.5651 12.5938 23.9065 12.6702 24.2905 12.7578C26.0133 13.1486 28.5918 13.7326 30.7233 15.0937C33.6185 16.9445 35.9095 19.8644 36.8034 24.3543C37.6973 28.8442 36.581 38.354 28.6344 42.26C20.6878 46.1636 13.159 43.1404 13.159 43.1404C20.2813 42.808 24.4522 39.9151 26.0447 37.9947C27.161 36.647 28.2167 34.2213 27.5743 31.4227C26.8713 28.359 24.2838 26.0321 21.6469 26.4229C19.01 26.8137 17.8937 29.6617 17.3996 31.0453C16.9054 32.4289 16.135 33.4508 15.4612 33.5632C14.7874 33.6755 13.8216 33.7114 12.9726 31.663C12.1236 29.6168 9.85952 25.949 6.85652 27.3258C3.85352 28.7027 3.30997 35.077 3.30997 35.077C-0.366852 29.2013 -1.30346 21.6612 2.15549 14.339C5.61444 7.01683 12.8311 4.31929 12.8311 4.31929C11.5396 5.99262 10.1133 11.0575 11.5643 15.6148C13.0152 20.1698 16.5977 22.4541 18.6529 22.764C20.7058 23.074 23.154 21.8566 23.0215 19.3567C22.9114 17.3038 21.146 15.8461 19.2773 14.9926C17.9431 14.3839 16.6224 12.9802 16.5304 10.8217C16.4383 8.6632 17.3839 7.29759 17.8465 6.75628C18.2082 6.32953 18.6372 5.73881 18.5338 5.12788L18.5316 5.12563ZM23.7402 7.19651C22.2241 7.19651 21.5346 7.96692 21.5346 7.96692C21.5391 7.92874 21.5458 7.88381 21.5503 7.83215C21.6155 7.28636 21.748 6.15209 22.3028 5.59956C22.907 4.99536 23.9357 4.5439 25.3776 5.59956C26.8196 6.65521 27.2733 8.57784 27.2733 8.57784C26.768 8.15109 25.2586 7.19651 23.7425 7.19651H23.7402Z"
                  fill="#080216"
                />
              </g>
            </Link>
          </svg>

          <nav className="main-nav" ref={mainNavRef}>
            <ul>
              <li className="has-sub has-sub-items mobile-menu-item--active">
                <Link to="/product/">Product</Link>
                <div className="hop">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          The only EL tool{" "}
                          <span className="brackets">built for</span> data
                          engineers
                        </p>
                        <p className="submenu-subtitle title-inline">
                          No more point-and-click-and-cross-your-fingers. Build
                          data pipelines that fit exactly to your needs.
                        </p>
                      </div>
                      <Link to="/product/">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <rect width="36" height="36" rx="18" fill="#E9E5FB" />
                          <path
                            d="M29 13.7473C25.8336 18.2623 19.0204 19.2751 18.2595 16.5854C17.488 13.8957 21.4504 12.0334 23.5368 11.7737C11.4813 8.31605 13.6659 17.5166 7 18.4032C10.6819 20.3212 14.511 23.508 17.0988 23.8976C21.5381 24.5728 27.7552 21.9907 29 13.7399"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Overview</p>
                          <p className="header-list-info">
                            The only EL tool built for data engineers
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Build a <span className="brackets">connector</span>{" "}
                          for any data source
                        </p>
                        <p className="submenu-subtitle title-inline">
                          The Meltano SDK lets you easily built Singer
                          connectors for custom, niche, and internal sources
                        </p>
                      </div>
                      <a
                        href="https://sdk.meltano.com/en/latest/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <rect width="36" height="36" rx="18" fill="#E9E5FB" />
                          <path
                            d="M25.9167 22.8072V13.6024L17.9586 9L10 13.6024V22.8072L17.9586 27.4096L25.9167 22.8072Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Meltano/SDK</p>
                          <p className="header-list-info">
                            Build a connector for any data source under the sun
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          <span className="brackets">Integrate</span> any
                          existing data tool for any data source
                        </p>
                        <p className="submenu-subtitle title-inline">
                          The Meltano EDK is the fastest way to build custom
                          extensions and utilities for Meltano.
                        </p>
                      </div>
                      <a
                        href="https://edk.meltano.com/en/latest/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <rect width="36" height="36" rx="18" fill="#E9E5FB" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.9704 22.2426C25.7515 23.0237 25.7515 24.29 24.9704 25.0711C24.1894 25.8521 22.9231 25.8521 22.142 25.0711L21.4349 24.364L19.3136 26.4853C18.5325 27.2663 17.2662 27.2663 16.4852 26.4853L14.3638 24.364L15.0709 23.6569C15.852 22.8758 15.852 21.6095 15.0709 20.8284C14.2899 20.0474 13.0236 20.0474 12.2425 20.8284L11.5354 21.5355L9.41409 19.4142C8.63304 18.6332 8.63304 17.3668 9.41409 16.5858L11.5354 14.4645L12.2425 15.1716C13.0236 15.9526 14.2899 15.9526 15.0709 15.1716C15.852 14.3905 15.852 13.1242 15.0709 12.3431L14.3638 11.636L16.4852 9.51472C17.2662 8.73367 18.5325 8.73367 19.3136 9.51472L21.4349 11.636L22.142 10.9289C22.9231 10.1479 24.1894 10.1479 24.9704 10.9289C25.7515 11.71 25.7515 12.9763 24.9704 13.7574L24.2633 14.4645L26.3846 16.5858C27.1657 17.3668 27.1657 18.6332 26.3846 19.4142L24.2633 21.5355L24.9704 22.2426Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Meltano/EDK</p>
                          <p className="header-list-info">
                            Integrate any existing data tool for any data source
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          The <span className="brackets">joy</span> of creating
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Everything you need and more to move, transform, and
                          explore your data. Connectors for 600+ sources and
                          destinations.
                        </p>
                      </div>
                      <a
                        href="https://hub.meltano.com/extractors/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <rect width="36" height="36" rx="18" fill="#E9E5FB" />
                          <path
                            d="M18.5731 26.9243C19.1441 26.7713 19.6227 26.3973 19.9166 25.8831C20.5253 24.8122 20.1643 23.4438 19.1063 22.8234C18.8922 22.6959 18.657 22.6194 18.4219 22.5726L18.4219 18.7394L21.7009 20.656C21.6211 20.8898 21.5749 21.1363 21.5749 21.387C21.5749 21.7652 21.6715 22.1519 21.8688 22.5046C22.1627 23.0231 22.6413 23.3928 23.2123 23.5458C23.7833 23.6988 24.3794 23.6223 24.8916 23.3206C25.4038 23.0189 25.7691 22.5386 25.9202 21.9607C26.0714 21.3827 25.9958 20.7793 25.6977 20.2608C25.089 19.1899 23.7329 18.8244 22.6749 19.4406C22.4566 19.5681 22.2718 19.7296 22.1123 19.9166L18.8334 18L22.1165 16.0792C22.5237 16.5509 23.1115 16.8568 23.7791 16.8568C25.005 16.8568 26 15.8539 26 14.6215C26 13.3891 25.005 12.3819 23.7875 12.3819C22.5699 12.3819 21.5749 13.3849 21.5749 14.6215C21.5749 14.8765 21.6253 15.1187 21.7051 15.3482L18.4219 17.2648V13.4274C18.4723 13.4189 18.5227 13.4146 18.5731 13.4019C19.1441 13.2489 19.6227 12.8749 19.9166 12.3607C20.2104 11.8422 20.2902 11.2388 20.1391 10.6608C19.9879 10.0829 19.6185 9.59842 19.1105 9.30094C18.6025 9.00347 18.0021 8.92272 17.4311 9.07571C16.8601 9.2287 16.3815 9.60267 16.0876 10.1169C15.8903 10.4611 15.7896 10.8436 15.7896 11.2345C15.7896 11.43 15.8147 11.6255 15.8651 11.8167C16.0163 12.3947 16.3857 12.8792 16.8937 13.1766C17.1078 13.3041 17.343 13.3806 17.5781 13.4274V17.2606L14.2949 15.344C14.3117 15.293 14.3369 15.2505 14.3495 15.1952C14.5007 14.6173 14.4251 14.0138 14.127 13.4954C13.8331 12.9769 13.3545 12.6072 12.7835 12.4542C12.2125 12.3012 11.6164 12.3777 11.1042 12.6794C10.592 12.9811 10.2267 13.4614 10.0756 14.0393C10.0252 14.2305 10 14.426 10 14.6215C10 15.0082 10.1008 15.3907 10.2981 15.7392C10.592 16.2576 11.0706 16.6274 11.6416 16.7803C12.2125 16.9333 12.8087 16.8568 13.3209 16.5551C13.535 16.4276 13.7198 16.2661 13.8793 16.0792L17.1624 17.9958L13.8793 19.9166C13.4721 19.4449 12.8843 19.1389 12.2167 19.1389C10.995 19.1389 10.0042 20.1418 10.0042 21.3785C10.0042 22.6151 10.995 23.6181 12.2167 23.6181C13.4385 23.6181 14.4293 22.6151 14.4293 21.3785C14.4293 21.1235 14.3789 20.8813 14.2991 20.6518L17.5823 18.7352V22.5726C17.5319 22.5811 17.4815 22.5854 17.4311 22.5981C16.8601 22.7511 16.3815 23.1251 16.0876 23.6393C15.8903 23.9835 15.7896 24.366 15.7896 24.757C15.7896 24.9524 15.8147 25.1479 15.8651 25.3392C16.0163 25.9171 16.3857 26.4016 16.8937 26.6991C17.4017 26.9965 18.0021 27.0773 18.5731 26.9243Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Meltano/Hub</p>
                          <p className="header-list-info">
                            Connectors for 600+ sources and destinations
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="hide-m">
                <Link to="/pricing/">Pricing</Link>
              </li>

              <li className="has-sub hide-d has-one-sub">
                <a>Pricing</a>
                <div className="hop">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          <span className="brackets">Pricing</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Meltano is an open source project by Arch
                        </p>
                      </div>
                      <Link to="/pricing/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                        >
                          <rect
                            y="0.5"
                            width="36"
                            height="36"
                            rx="18"
                            fill="#E9E5FB"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.7385 14.3703C13.2713 14.7501 13 15.3202 13 15.9223V26.5C13 27.6046 13.8954 28.5 15 28.5H22C23.1046 28.5 24 27.6046 24 26.5V15.9223C24 15.3202 23.7287 14.7501 23.2615 14.3703L19.7615 11.5254C19.0266 10.9281 17.9734 10.9281 17.2385 11.5254L13.7385 14.3703ZM18.5 16.5C19.3284 16.5 20 15.8284 20 15C20 14.1716 19.3284 13.5 18.5 13.5C17.6716 13.5 17 14.1716 17 15C17 15.8284 17.6716 16.5 18.5 16.5Z"
                            fill="#311772"
                          />
                          <path
                            d="M18.5 14.5C20.433 14.5 22 12.933 22 11C22 9.067 20.433 7.5 18.5 7.5C16.567 7.5 15 9.067 15 11"
                            stroke="#311772"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Pricing</p>
                          <p className="header-list-info">
                          Open source and free to use, with paid support options
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>


              <li className="has-sub has-sub-items">
                <a
                  href="https://docs.meltano.com/?__hstc=165702497.60212c7701354a96f8b2b56a231656f9.1679956833281.1679959328336.1679989419063.3&__hssc=165702497.18.1679989419063&__hsfp=179051687"
                  target="_blank"
                  rel="noreferrer"
                >
                  Resources
                </a>
                <div className="hop">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Meltano at a <span className="brackets">glance</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Learn how to use Meltano, how Meltano is built, and
                          where to get started
                        </p>
                      </div>
                      <a
                        href="https://docs.meltano.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                        >
                          <rect
                            y="0.257812"
                            width="36"
                            height="36"
                            rx="18"
                            fill="#E9E5FB"
                          />
                          <path
                            d="M24.9868 10.2578H11.0132C10.4519 10.2578 10 10.7097 10 11.271V25.2446C10 25.8022 10.4519 26.2578 11.0132 26.2578H24.9868C25.5444 26.2578 26 25.8059 26 25.2446V11.271C26 10.7134 25.5481 10.2578 24.9868 10.2578ZM19.8624 23.4259H13.3385C12.7335 23.4259 12.2451 22.9375 12.2451 22.3325C12.2451 21.7275 12.7335 21.2391 13.3385 21.2391H19.8624C20.4674 21.2391 20.9558 21.7275 20.9558 22.3325C20.9558 22.9375 20.4674 23.4259 19.8624 23.4259ZM13.3385 18.9867C12.7335 18.9867 12.2451 18.4984 12.2451 17.8933C12.2451 17.2883 12.7335 16.8 13.3385 16.8H22.6141C23.2191 16.8 23.7075 17.2883 23.7075 17.8933C23.7075 18.4984 23.2191 18.9867 22.6141 18.9867H13.3385ZM13.3385 14.5476C12.7335 14.5476 12.2451 14.0592 12.2451 13.4542C12.2451 12.8492 12.7335 12.3608 13.3385 12.3608H22.6141C23.2191 12.3608 23.7075 12.8492 23.7075 13.4542C23.7075 14.0592 23.2191 14.5476 22.6141 14.5476H13.3385Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Documentation</p>
                          <p className="header-list-info">
                            Learn how to use Meltano and where to get started
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          <span className="brackets">Join</span> the Melty Crew!
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Join 4,500+ data professionals on Slack and GitHub
                        </p>
                      </div>
                      <Link to="/community/" target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                        >
                          <rect
                            y="0.257812"
                            width="36"
                            height="36"
                            rx="18"
                            fill="#E9E5FB"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 14.2578C13.6569 14.2578 15 12.9147 15 11.2578C15 9.60096 13.6569 8.25781 12 8.25781C10.3431 8.25781 9 9.60096 9 11.2578C9 12.9147 10.3431 14.2578 12 14.2578ZM12 14.2578C9.23858 14.2578 7 15.8248 7 17.7578C7 17.9276 7.01727 18.0945 7.05063 18.2578H16.9494C16.9827 18.0945 17 17.9276 17 17.7578C17 15.8248 14.7614 14.2578 12 14.2578ZM18 25.2578C19.6569 25.2578 21 23.9147 21 22.2578C21 20.601 19.6569 19.2578 18 19.2578C16.3431 19.2578 15 20.601 15 22.2578C15 23.9147 16.3431 25.2578 18 25.2578ZM18 25.2578C15.2386 25.2578 13 26.8248 13 28.7578C13 28.9276 13.0173 29.0945 13.0506 29.2578H22.9494C22.9827 29.0945 23 28.9276 23 28.7578C23 26.8248 20.7614 25.2578 18 25.2578ZM27 11.2578C27 12.9147 25.6569 14.2578 24 14.2578C22.3431 14.2578 21 12.9147 21 11.2578C21 9.60096 22.3431 8.25781 24 8.25781C25.6569 8.25781 27 9.60096 27 11.2578ZM19 17.7578C19 15.8248 21.2386 14.2578 24 14.2578C26.7614 14.2578 29 15.8248 29 17.7578C29 17.9276 28.9827 18.0945 28.9494 18.2578H19.0506C19.0173 18.0945 19 17.9276 19 17.7578Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Community</p>
                          <p className="header-list-info">
                            Join 4,500+ data professionals on Slack and GitHub
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          <span className="brackets">The latest</span> in
                          Meltano & data engineering
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Meltano updates, data engineering trends, tutorials,
                          and other data musings
                        </p>
                      </div>
                      <Link to="/blog/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                        >
                          <rect
                            y="0.257812"
                            width="36"
                            height="36"
                            rx="18"
                            fill="#E9E5FB"
                          />
                          <path
                            d="M11.013 10.2578C10.4518 10.2578 10 10.7238 10 11.3024V26.2277C10 27.0694 10.9255 27.5541 11.5851 27.0581L15.4584 24.1385H20.7748C23.6607 24.1385 26 21.7261 26 18.75V11.3024C26 10.7275 25.5482 10.2578 24.987 10.2578H11.013ZM19.8602 19.945H13.3377C12.7329 19.945 12.2446 19.4414 12.2446 18.8177C12.2446 18.1939 12.7329 17.6904 13.3377 17.6904H19.8602C20.465 17.6904 20.9533 18.1939 20.9533 18.8177C20.9533 19.4414 20.465 19.945 19.8602 19.945ZM13.3377 15.3682C12.7329 15.3682 12.2446 14.8647 12.2446 14.2409C12.2446 13.6171 12.7329 13.1136 13.3377 13.1136H22.6113C23.2161 13.1136 23.7044 13.6171 23.7044 14.2409C23.7044 14.8647 23.2161 15.3682 22.6113 15.3682H13.3377Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Blog</p>
                          <p className="header-list-info">
                            Stay up to date on Meltano & data engineering
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Meltano <span className="brackets">Partners</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Bring in help to build connectors and take Meltano
                          into production
                        </p>
                      </div>
                      <Link to="/partners/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                        >
                          <rect
                            y="0.257812"
                            width="36"
                            height="36"
                            rx="18"
                            fill="#E9E5FB"
                          />
                          <path
                            d="M26.9421 17.4376C26.8361 16.5094 25.6668 16.1297 24.9951 16.7899L18.8384 22.8403C18.3914 23.2795 17.6641 23.2795 17.2171 22.8403L15.51 21.1626C15.063 20.7234 14.3357 20.7234 13.8887 21.1626L11.6866 23.3267C11.3129 23.694 11.3003 24.297 11.674 24.6668L11.6816 24.6743C15.1867 28.1189 20.8687 28.1189 24.3739 24.6743C26.3865 22.6963 27.2401 20.0161 26.9421 17.4401V17.4376Z"
                            fill="#311772"
                          />
                          <path
                            d="M14.9039 15.8945L17.1615 13.6756C17.6085 13.2363 18.3358 13.2363 18.7828 13.6756L20.4899 15.3534C20.9369 15.7927 21.6642 15.7927 22.1112 15.3534L24.3133 13.1892C24.687 12.8219 24.6997 12.2187 24.3259 11.8489L24.3183 11.8415C20.8132 8.39659 15.1312 8.39659 11.626 11.8415C9.62592 13.8097 8.76983 16.4703 9.05267 19.0341C9.15621 19.9822 10.3204 20.4016 11.0073 19.7266L14.9064 15.8945H14.9039Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Partners</p>
                          <p className="header-list-info">
                            Bring in help to build connectors and take Meltano
                            into production
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="has-sub has-one-sub">
                <a
                  href="https://arch.dev/about"
                  target="_blank"
                  rel="noreferrer"
                >
                  Company
                </a>
                <div className="hop hide-d">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          <span className="brackets">About</span> Meltano
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Meltano is an open source project by Arch
                        </p>
                      </div>
                      <a
                        href="https://arch.dev/about"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="37"
                          viewBox="0 0 36 37"
                          fill="none"
                        >
                          <rect
                            y="0.257812"
                            width="36"
                            height="36"
                            rx="18"
                            fill="#E9E5FB"
                          />
                          <path
                            d="M29 12.2526C28.1938 13.3443 26.4591 13.5892 26.2654 12.9389C26.0689 12.2885 27.0778 11.8381 27.609 11.7753C24.5396 10.9393 25.0958 13.164 23.3986 13.3784C24.336 13.8422 25.311 14.6128 25.9698 14.707C27.1001 14.8703 28.6831 14.2459 29 12.2508"
                            fill="#311772"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.8927 9.45815C16.8338 9.11277 16.5946 9.00243 16.2115 8.84903L16.2089 8.84993C18.7007 7.67564 20.2907 8.5216 20.9318 9.05088C21.2875 9.34462 21.4225 9.624 21.55 9.88793C21.6522 10.0996 21.7496 10.3013 21.9522 10.4925C22.2558 10.7796 22.8213 11.189 23.0484 11.3534C23.0711 11.3698 23.0904 11.3838 23.1057 11.395C23.2745 11.5179 23.3459 11.8588 23.1923 12.0911C23.0388 12.3234 22.6317 12.7998 22.1433 12.72C21.6549 12.6401 20.5845 12.4553 19.7024 12.3019C18.8203 12.1485 18.2087 11.656 18.2087 11.656C18.098 12.2759 18.4712 12.8258 19.1738 13.0097C19.3103 13.0453 19.4738 13.0824 19.6577 13.1241C20.4848 13.3116 21.7225 13.5921 22.745 14.2468C24.1342 15.1358 25.2342 16.5388 25.6636 18.6963C26.093 20.8538 25.5565 25.4227 21.7424 27.2985C17.9284 29.1743 14.3152 27.721 14.3152 27.721C17.7338 27.5613 19.7354 26.1717 20.4997 25.2486C21.0353 24.6009 21.5424 23.4356 21.2335 22.0909C20.8961 20.6188 19.6542 19.501 18.3891 19.6885C17.124 19.876 16.5883 21.2449 16.3508 21.9097C16.1133 22.5744 15.7437 23.0651 15.4205 23.119C15.0973 23.1728 14.6331 23.1898 14.226 22.2066C13.8188 21.2234 12.7314 19.4615 11.2904 20.1227C9.84946 20.7838 9.58877 23.8465 9.58877 23.8465C7.8237 21.0234 7.37463 17.4009 9.03434 13.8835C10.6941 10.366 14.1581 9.06971 14.1581 9.06971C13.5385 9.8735 12.8537 12.3073 13.5501 14.4962C14.2465 16.6851 15.966 17.7822 16.9517 17.9311C17.9373 18.08 19.1122 17.4951 19.048 16.2939C18.9953 15.308 18.148 14.6074 17.2508 14.1975C16.6106 13.905 15.9767 13.2304 15.9321 12.1934C15.8875 11.1563 16.3419 10.5006 16.5633 10.2404C16.7374 10.035 16.9427 9.7515 16.8927 9.45815ZM19.3926 10.453C18.6649 10.453 18.3337 10.8226 18.3337 10.8226H18.3328C18.3352 10.8038 18.3377 10.7823 18.3406 10.7584C18.3714 10.4965 18.4356 9.95151 18.7015 9.686C18.9917 9.39624 19.4854 9.17915 20.1773 9.686C20.8692 10.1929 21.0871 11.1169 21.0871 11.1169C20.8442 10.9114 20.1202 10.453 19.3926 10.453Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">About</p>
                          <p className="header-list-info">
                            Meltano is an open source project by Arch
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <svg
              className="subcontainer-arrow"
              width="22"
              height="14"
              viewBox="0 0 13 8"
              fill="none"
            >
              <path
                d="M7.31799 1.16814C6.91983 0.600205 6.07851 0.600203 5.68035 1.16814L0.890625 8.00018H12.1077L7.31799 1.16814Z"
                fill="white"
                fillOpacity="1"
              />
            </svg>
          </nav>
          <div className="menu-extras">
            <a
              href="https://meltano.com/get-started"
              target="_blank"
              id="get-started-btn"
              className="btn clear-btn"
              rel="noreferrer"
            >
              Get started
            </a>
            <a
              href="https://github.com/meltano/meltano"
              target="_blank"
              data-tooltip="View code and issue tracker"
              rel="noreferrer"
              className="cup"
            >
              <svg viewBox="0 0 26 24" fill="none">
                <path
                  d="M12.6 0C5.64047 0 0 5.37188 0 12C0 18.6281 5.64047 24 12.6 24C19.5595 24 25.2 18.6281 25.2 12C25.2 5.37188 19.5595 0 12.6 0ZM23.5216 12C23.5216 16.7531 20.1797 20.7609 15.6073 22.0031L15.5285 22.0219V18.1312C15.5285 17.2078 15.2677 16.5328 14.7509 16.1063C15.3267 16.05 15.8534 15.9609 16.3603 15.8344L16.2865 15.8484C16.823 15.7078 17.2905 15.5156 17.7237 15.2766L17.6941 15.2906C18.1716 15.0422 18.5702 14.7234 18.9049 14.3484L18.9098 14.3438C19.2347 13.9688 19.5005 13.4672 19.7023 12.8438C19.909 12.2203 20.0074 11.5031 20.0074 10.6969C20.0074 9.54375 19.6137 8.56406 18.8213 7.75781C19.1904 6.89062 19.151 5.92031 18.7031 4.84688C18.4226 4.7625 18.019 4.81406 17.4874 5.00156C16.9559 5.18906 16.503 5.4 16.0748 5.64844L16.1093 5.62969L15.5384 5.97188C14.677 5.7375 13.6828 5.60156 12.6591 5.60156C11.6353 5.60156 10.646 5.7375 9.70594 5.99063L9.77977 5.97188C9.12023 4.77187 7.44188 4.69219 6.60023 4.84219C6.03914 5.69063 6.10805 7.03125 6.49688 7.75312C5.70938 8.56406 5.3107 9.54375 5.3107 10.6922C5.3107 11.5031 5.41406 12.2156 5.61586 12.8344C5.82258 13.4531 6.08344 13.95 6.40336 14.3344C6.73313 14.7234 7.13672 15.0422 7.58953 15.2812L7.60922 15.2906C8.01281 15.5156 8.48039 15.7078 8.97258 15.8391L9.01688 15.8484C9.45492 15.9609 9.97664 16.05 10.5082 16.1016L10.5525 16.1063C10.1538 16.4484 9.90773 16.9406 9.81914 17.5781C9.62719 17.6672 9.40078 17.7422 9.16453 17.7891L9.14484 17.7938C8.90367 17.8406 8.62805 17.8641 8.3475 17.8641H8.29336C7.96359 17.8641 7.63383 17.7609 7.30898 17.5547C6.98414 17.3484 6.70852 17.0531 6.47719 16.6641C6.29016 16.3641 6.04898 16.1156 5.75859 15.9281L5.74875 15.9234C5.45344 15.7313 5.20734 15.6187 5.00555 15.5812L4.86773 15.5531L4.79391 15.5438C4.66102 15.5438 4.54289 15.6141 4.48383 15.7219L4.46414 15.7547L4.42477 15.9047C4.42477 16.0359 4.50844 16.1531 4.62656 16.2047C4.84805 16.2984 5.06461 16.4812 5.27625 16.7484C5.45344 16.9594 5.61094 17.1984 5.73891 17.4562L5.74875 17.4797L5.90133 17.8078C6.0293 18.1641 6.2557 18.4641 6.55594 18.6844L6.56086 18.6891C6.84141 18.9 7.18102 19.05 7.55016 19.1156H7.56492C7.875 19.1719 8.2343 19.2094 8.60344 19.2141H8.74617C8.99227 19.2141 9.22852 19.1953 9.46477 19.1578L9.44016 19.1625L9.78469 19.1063C9.78469 19.4672 9.78961 19.8891 9.79453 20.3766C9.79945 20.6719 9.79945 21.4734 9.79945 22.0641C5.09906 20.8406 1.68328 16.8 1.68328 12C1.68328 7.72031 4.40016 4.04062 8.27859 2.44219L8.3475 2.41875C9.60258 1.89844 11.0644 1.59844 12.6 1.59844C18.6293 1.59844 23.5167 6.25312 23.5167 11.9953L23.5216 12Z"
                  fill="#080216"
                />
              </svg>
            </a>
            <a
              href="https://meltano.com/slack"
              target="_blank"
              data-tooltip="Join our 4,500+ community"
              rel="noreferrer"
              className="cup"
            >
              <svg viewBox="0 0 22 22" fill="none" target="_blank">
                <path
                  d="M8.06724 0C6.85027 0 5.86982 0.983984 5.86982 2.2C5.86982 2.78008 6.10203 3.34297 6.51055 3.75547C6.92338 4.16797 7.48241 4.4 8.06724 4.4H10.2647V2.2C10.2647 0.988281 9.28421 0.00429688 8.06724 0ZM8.06724 5.86523H2.19742C0.980453 5.86523 0 6.84922 0 8.06523C0 9.28125 0.984754 10.2652 2.19742 10.2652H8.06294C9.27991 10.2652 10.2604 9.28125 10.2604 8.06523C10.2647 6.85352 9.27991 5.86523 8.06724 5.86523ZM13.9328 10.2652C15.1497 10.2652 16.1345 9.28125 16.1302 8.06523V2.2C16.1302 0.983984 15.1454 0 13.9328 0C12.7201 0 11.7353 0.983984 11.7353 2.2V8.06523C11.7353 9.28555 12.7158 10.2652 13.9328 10.2652ZM22 8.06523C22 6.84922 21.0152 5.86523 19.8026 5.86523C18.5899 5.86523 17.6052 6.84922 17.6052 8.06523V10.2652H19.8026C21.0152 10.2652 22 9.28125 22 8.06523ZM19.7983 11.7348H13.9328C12.7158 11.7348 11.7353 12.7187 11.7353 13.9348C11.7353 14.5148 11.9676 15.0777 12.3761 15.4902C12.7889 15.9027 13.3479 16.1348 13.9328 16.1348H19.7983C21.0152 16.1348 21.9957 15.1508 21.9957 13.9348C22 12.7187 21.0152 11.7348 19.7983 11.7348ZM13.9328 17.6H11.7353V19.8C11.7353 21.016 12.7201 22 13.9328 22C15.1454 22 16.1345 21.016 16.1302 19.8C16.1345 18.584 15.1497 17.6043 13.9328 17.6ZM8.06724 11.7348C6.85027 11.7348 5.86982 12.7187 5.86982 13.9348V19.8C5.86982 21.016 6.85457 22 8.06724 22C9.27991 22 10.269 21.016 10.2647 19.8V13.9348C10.2647 13.3547 10.0324 12.7918 9.62393 12.3793C9.2111 11.9668 8.64777 11.7348 8.06724 11.7348ZM0 13.9348C0 14.5148 0.232213 15.0777 0.640735 15.4902C1.05356 15.9027 1.61259 16.1348 2.19742 16.1348C3.41439 16.1348 4.39914 15.1508 4.39484 13.9348V11.7348H2.19742C0.984754 11.7348 0 12.7187 0 13.9348Z"
                  fill="#080216"
                />
              </svg>
            </a>
            <div className="menu-triggers">
              <button
                id="hamburger-menu"
                ref={hamburgerMenuRef}
                className="menu-closed"
                onClick={handleMenuClick}
                type="button"
                aria-label="hamburger menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M20 3H0" stroke="white" strokeWidth="2" />
                  <path d="M20 10H0" stroke="white" strokeWidth="2" />
                  <path d="M20 17H0" stroke="white" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;