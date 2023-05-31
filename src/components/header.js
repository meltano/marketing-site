/* eslint-disable no-inner-declarations */
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'gatsby'

const Header = () => {
  const [shrinkMenu, setShrinkMenu] = useState(false)

  const [menuOpened, setMenuOpened] = useState(false)

  const hamburgerMenuRef = useRef(null)
  const mainNavRef = useRef(null)

  const handleMenuClick = () => {
    if (typeof window !== 'undefined') {
      const hamburgerMenu = hamburgerMenuRef.current
      const mainNav = mainNavRef.current
      const { body } = document

      if (menuOpened) {
        hamburgerMenu.innerHTML =
          "<svg width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M20 3H0' stroke='white' stroke-width='2'/><path d='M20 10H0' stroke='white' stroke-width='2'/><path d='M20 17H0' stroke='white' stroke-width='2'/></svg>"
        hamburgerMenu.classList.remove('menu-opened')
        body.classList.remove('modal-opened')
        body.classList.remove('menu-opened')
        mainNav.classList.remove('main-nav-active')
      } else {
        hamburgerMenu.innerHTML =
          "<svg width='20' height='20' viewBox='0 0 20 20' fill='none'><path d='M18 18L2 2' stroke='white' stroke-width='2'/><path d='M18 2L2 18' stroke='white' stroke-width='2'/></svg>"
        hamburgerMenu.classList.add('menu-opened')
        body.classList.add('modal-opened')
        body.classList.add('menu-opened')
        mainNav.classList.add('main-nav-active')
      }
    }

    setMenuOpened(!menuOpened)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const html = document.documentElement
      const { body } = document
      if (
        html.getBoundingClientRect().top <= -2 ||
        body.getBoundingClientRect().top <= -2
      ) {
        setShrinkMenu(true)
      } else {
        setShrinkMenu(false)
      }
      const handleScroll = () => {
        if (
          html.getBoundingClientRect().top <= -2 ||
          body.getBoundingClientRect().top <= -2
        ) {
          setShrinkMenu(true)
        } else {
          setShrinkMenu(false)
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mainNav = document.querySelector('.main-nav')
      const menuItems = mainNav.querySelectorAll('ul > li.has-sub')
      const hopItems = mainNav.querySelectorAll('.hop')
      const arrow = mainNav.querySelector('.subcontainer-arrow')
      const arrowWidth = arrow.getBoundingClientRect().width

      function handleArrowVisibility() {
        const isHovering = [...menuItems, ...hopItems].some(el =>
          el.matches(':hover')
        )
        arrow.classList.toggle('show-arrow', isHovering)

        if (!isHovering) {
          hopItems.forEach(hop => {
            hop.classList.remove('menu-container--active')
          })
        }
      }

      menuItems.forEach(item => {
        item.addEventListener('mouseenter', e => {
          const menuItem = e.currentTarget
          const menuItemRect = menuItem.getBoundingClientRect()
          const menuItemCenter = menuItemRect.left + menuItemRect.width / 2
          const mainNavRect = mainNav.getBoundingClientRect()

          arrow.style.transform = `translateX(${
            menuItemCenter - mainNavRect.left - arrowWidth / 2
          }px) translateY(-50%)`

          hopItems.forEach(hop => {
            hop.classList.remove('menu-container--active')
          })

          const hoveredHop = menuItem.querySelector('.hop')
          if (hoveredHop) {
            hoveredHop.classList.add('menu-container--active')
          }
        })
      })

      mainNav.addEventListener('mouseover', handleArrowVisibility)
      mainNav.addEventListener('mouseout', handleArrowVisibility)

      const subListItems = document.querySelectorAll('.sub > li')

      subListItems.forEach(listItem => {
        listItem.addEventListener('mouseover', () => {
          const parentContainer = listItem.closest('.menu-container--active')
          if (parentContainer) {
            const activeItems =
              parentContainer.querySelectorAll('.menu-item--active')
            activeItems.forEach(item =>
              item.classList.remove('menu-item--active')
            )
          } else {
            subListItems.forEach(li => li.classList.remove('menu-item--active'))
          }
          listItem.classList.add('menu-item--active')
        })
      })

      function activateMobileMenu() {
        if (window.innerWidth < 768) {
          const mobileMenuItems = document.querySelectorAll('nav > ul > li')

          mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
              mobileMenuItems.forEach(i => {
                i.classList.remove('mobile-menu-item--active')
              })
              item.classList.add('mobile-menu-item--active')
            })
          })
        } else if (window.innerWidth > 1024) {
          if (
            document
              .querySelector('#hamburger-menu')
              .classList.contains('menu-opened')
          ) {
            document.querySelector('#hamburger-menu').click()
          }
        }
      }

      activateMobileMenu()

      window.addEventListener('resize', () => {
        activateMobileMenu()
      })

      return () => {
        mainNav.removeEventListener('mouseover', handleArrowVisibility)
        mainNav.removeEventListener('mouseout', handleArrowVisibility)
      }
    }
  }, [])

  return (
    <header className={shrinkMenu ? 'shrink-menu' : ''}>
      <div className="container">
        <div className="menu ml-margins">
          <Link to="/">
            <svg
              className="menu-logo"
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="42"
              viewBox="0 0 180 42"
              fill="none"
            >
              <path
                d="M102.85 31.9901C102.316 31.3784 101.929 30.6793 101.695 29.8882C101.455 29.0972 101.34 28.0301 101.34 26.6918V6.63916H105.756V26.218C105.756 27.7404 105.922 28.9132 106.258 29.741C106.594 30.5505 107.027 31.2404 107.561 31.8153V31.9947H102.846L102.85 31.9901Z"
                fill="#ffffff"
              />
              <path
                d="M112.802 31.9903C112.346 31.4568 111.983 30.8175 111.706 30.0678C111.448 29.3182 111.319 28.1914 111.319 26.692V17.7281H108.888V14.2281H111.379V9.31156H115.68V14.2281H118.614V17.7281H115.708V26.1907C115.708 27.7682 115.888 28.9732 116.242 29.8011C116.597 30.6105 117.025 31.282 117.518 31.8155V31.9949H112.802V31.9903Z"
                fill="#ffffff"
              />
              <path
                d="M51.8896 14.2095H56.0849V16.3711H56.3198C57.0981 15.0189 58.7237 13.768 61.1598 13.768C63.5959 13.768 65.4242 14.8166 66.4419 16.4723H66.7136C67.934 14.6142 69.6932 13.768 71.9957 13.768C75.9239 13.768 78.4936 16.4401 78.4936 20.1885V31.9855H74.0957V21.7108C74.0957 19.2778 72.9766 17.8889 70.8813 17.8889C68.786 17.8889 67.4274 19.4112 67.4274 21.812V31.9855H63.0249V21.4395C63.0249 19.2778 61.7401 17.8889 59.7092 17.8889C57.6783 17.8889 56.2922 19.5124 56.2922 21.7752V31.9855H51.8943V14.2095H51.8896Z"
                fill="#ffffff"
              />
              <path
                d="M81.0313 23.201C81.0313 17.5899 84.7891 13.768 90.0021 13.768C95.7217 13.768 98.8348 17.9946 98.8348 22.9986V24.383H85.2956C85.4292 27.0873 87.2943 28.9132 90.1357 28.9132C92.3001 28.9132 93.9625 27.8968 94.5704 26.4434H98.6644C97.7848 30.063 94.6027 32.427 89.9975 32.427C84.7522 32.427 81.0267 28.5039 81.0267 23.1964L81.0313 23.201ZM94.6395 21.2739C94.4369 18.8731 92.5764 17.2864 90.0021 17.2864C87.4278 17.2864 85.6364 19.0433 85.3647 21.2739H94.6395Z"
                fill="#ffffff"
              />
              <path
                d="M120.663 23.201C120.663 17.6221 124.048 13.768 128.92 13.768C132.001 13.768 133.728 15.5938 134.336 16.5045H134.571V14.2049H138.973V31.9855H134.64V29.7226H134.405C133.898 30.4677 132.305 32.427 129.058 32.427C124.085 32.427 120.663 28.7108 120.663 23.1964V23.201ZM134.677 23.132C134.677 19.7837 132.646 17.7555 129.869 17.7555C127.092 17.7555 125.13 19.9861 125.13 23.132C125.13 26.2778 127.06 28.4717 129.901 28.4717C132.742 28.4717 134.672 26.1077 134.672 23.132H134.677Z"
                fill="#ffffff"
              />
              <path
                d="M142.634 14.2095H146.83V16.3711H147.064C147.774 15.0511 149.537 13.768 152.075 13.768C156.068 13.768 158.504 16.5735 158.504 20.3586V31.9855H154.106V21.5038C154.106 19.3422 152.72 17.8843 150.689 17.8843C148.557 17.8843 147.032 19.5768 147.032 21.8074V31.9809H142.634V14.2095Z"
                fill="#ffffff"
              />
              <path
                d="M161.046 23.0998C161.046 17.8245 164.905 13.768 170.523 13.768C176.141 13.768 180 17.8245 180 23.0998C180 28.3751 176.072 32.4316 170.523 32.4316C164.974 32.4316 161.046 28.4073 161.046 23.0998ZM175.533 23.0998C175.533 20.0229 173.434 17.7601 170.523 17.7601C167.613 17.7601 165.513 20.0229 165.513 23.0998C165.513 26.1766 167.613 28.4395 170.523 28.4395C173.434 28.4395 175.533 26.2088 175.533 23.0998Z"
                fill="#ffffff"
              />
              <path
                d="M43.9452 8.38927C42.2581 10.6819 38.628 11.1962 38.2226 9.83044C37.8116 8.46462 39.9228 7.51892 41.0344 7.38705C34.6112 5.63127 35.7752 10.3033 32.2235 10.7535C34.1852 11.7275 36.2254 13.3458 37.6042 13.5436C39.9695 13.8864 43.282 12.5752 43.9452 8.3855"
                fill="#ffffff"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.6092 2.52096C18.4859 1.79566 17.9852 1.56395 17.1837 1.2418L17.1781 1.24369C22.3925 -1.22231 25.72 0.554189 27.0614 1.66568C27.8059 2.28254 28.0883 2.86923 28.3551 3.4235C28.569 3.86792 28.7728 4.2915 29.1969 4.69307C29.8321 5.29592 31.0155 6.15568 31.4907 6.50091C31.5382 6.53542 31.5786 6.56479 31.6107 6.58825C31.9638 6.84634 32.1133 7.56221 31.7919 8.05014C31.4706 8.53806 30.6186 9.5384 29.5967 9.37074C28.5747 9.20307 26.3346 8.81499 24.4888 8.49285C22.6429 8.17071 21.3631 7.13646 21.3631 7.13646C21.1314 8.43822 21.9124 9.59303 23.3827 9.97923C23.6682 10.0539 24.0105 10.1318 24.3953 10.2194C26.126 10.6131 28.7161 11.2023 30.8559 12.5771C33.763 14.444 36.0647 17.3904 36.9634 21.9211C37.862 26.4519 36.7392 36.0464 28.7578 39.9856C20.7765 43.9248 13.2155 40.8729 13.2155 40.8729C20.3692 40.5376 24.5579 37.6195 26.1571 35.681C27.2781 34.3208 28.3393 31.8737 27.6929 29.0497C26.9867 25.9583 24.3879 23.611 21.7405 24.0047C19.0931 24.3984 17.9721 27.2732 17.4752 28.6692C16.9782 30.0651 16.2047 31.0956 15.5284 31.2086C14.8521 31.3217 13.8806 31.3575 13.0286 29.2927C12.1767 27.228 9.9011 23.5281 6.88567 24.9165C3.87024 26.3049 3.3247 32.7365 3.3247 32.7365C-0.368922 26.8079 -1.30867 19.2008 2.16449 11.8141C5.63765 4.42744 12.8866 1.70524 12.8866 1.70524C11.59 3.39319 10.1571 8.50415 11.6143 13.1008C13.0716 17.6975 16.6699 20.0015 18.7325 20.3142C20.7951 20.6269 23.2538 19.3986 23.1193 16.8761C23.0091 14.8057 21.2361 13.3344 19.3584 12.4735C18.0188 11.8593 16.6924 10.4427 16.5989 8.2649C16.5055 6.08714 17.4565 4.71002 17.9198 4.1637C18.2841 3.73229 18.7139 3.13699 18.6092 2.52096ZM23.8404 4.61016C22.3177 4.61016 21.6246 5.38631 21.6246 5.38631H21.6227C21.6277 5.3469 21.633 5.30162 21.6389 5.25138C21.7035 4.70139 21.8379 3.557 22.3943 2.99944C23.0015 2.39095 24.0347 1.93505 25.4826 2.99944C26.9305 4.06383 27.3864 6.00422 27.3864 6.00422C26.8782 5.57282 25.363 4.61016 23.8404 4.61016Z"
                fill="#ffffff"
              />
            </svg>
          </Link>
          <nav className="main-nav" ref={mainNavRef}>
            <ul>
              <li className="has-sub mobile-menu-item--active">
                <Link to="/product/">Product</Link>
                <div className="hop">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          The only EL tool{' '}
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
                          Meltano <span className="brackets">Cloud</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          You build the pipelines, we manage the infrastructure
                        </p>
                      </div>
                      <Link to="/cloud/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <rect width="36" height="36" rx="18" fill="#E9E5FB" />
                          <path
                            d="M8 19.25C8 22.4256 10.5744 25 13.75 25L24 25C26.2091 25 28 23.2091 28 21C28 19.7368 27.4145 18.7331 26.5 18C26.5 14.134 23.366 11 19.5001 11C17.3476 11 15.5341 11.993 14.25 13.5214C14.0852 13.5072 13.9185 13.5 13.75 13.5C10.5744 13.5 8 16.0744 8 19.25Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Meltano/Cloud</p>
                          <p className="header-list-info">
                            You build the pipelines, we manage the
                            infrastructure
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Build a <span className="brackets">connector</span>{' '}
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
                    <li className="hide-d">
                      <a href="/pricing/">
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
                            Pay only for the workloads you run, no matter how
                            much the data volume grows
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="pricing-menu hide-m has-sub">
                <a href="/pricing/">Pricing</a>
                <div className="hop">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Meltano Cloud{' '}
                          <span className="brackets">Pricing</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Meltano and its connectors are open source, and can be
                          deployed on Meltano Cloud or on self-managed
                          infrastructure. Either way, you only pay for the
                          workloads you run, no matter how much the data volume
                          grows.
                        </p>
                      </div>
                      <a href="/pricing">
                        <div className="header-list-item">
                          <p className="header-list-title"></p>
                          <p className="header-list-info"></p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="has-sub">
                <a
                  href="https://docs.meltano.com/?__hstc=165702497.60212c7701354a96f8b2b56a231656f9.1679956833281.1679959328336.1679989419063.3&__hssc=165702497.18.1679989419063&__hsfp=179051687"
                  target="_blank"
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
                      <a href="https://docs.meltano.com/" target="_blank">
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
                        <p className="submenu-subtitle title-inline" />
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
                            Join 3,500+ data professionals on Slack and GitHub
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
              <li className="has-sub">
                <Link to="/about/">Company</Link>
                <div className="hop">
                  <ul className="sub">
                    <li className="menu-item--active">
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          <span className="brackets">About</span> Meltano
                        </p>
                        <p className="submenu-subtitle title-inline">
                          We bring together data, software development
                          workflows, and dragons!
                        </p>
                      </div>
                      <Link to="/about/">
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
                            We bring together data, software development
                            workflows, and dragons!
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Join the <span className="brackets">team</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Join Melty & team on our mission to unshackle data
                          engineers everywhere!
                        </p>
                      </div>
                      <a
                        href="https://meltano.com/careers"
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
                            d="M18 18.2578C20.2091 18.2578 22 16.467 22 14.2578C22 12.0487 20.2091 10.2578 18 10.2578C15.7909 10.2578 14 12.0487 14 14.2578C14 16.467 15.7909 18.2578 18 18.2578Z"
                            fill="#311772"
                          />
                          <path
                            d="M19.9105 19.2578L18 23.5456L16.0895 19.2578C13.3829 19.7873 11.1767 21.4276 10.1608 23.5779C9.55427 24.863 10.7446 26.2578 12.3746 26.2578H23.6254C25.2554 26.2578 26.4457 24.863 25.8392 23.5779C24.8233 21.4276 22.6171 19.7873 19.9105 19.2578Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Careers</p>
                          <p className="header-list-info">
                            Join Melty & team on our mission to unshackle data
                            engineers everywhere!
                          </p>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Let’s start a{' '}
                          <span className="brackets">conversation</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          The Meltano team is here to help. Ask us anything, or
                          give us your feedback!
                        </p>
                      </div>
                      <Link to="/contact/">
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
                            d="M18.6068 19.5762L26.6515 13.3207C26.8729 13.1485 26.9959 12.9158 26.9959 12.6702V12.1442C26.9959 11.6564 26.4875 11.2578 25.856 11.2578H10.1399C9.50843 11.2578 9 11.6532 9 12.1442V13.0273C9 13.2697 9.12301 13.5056 9.34442 13.6778L16.9339 19.5762C17.3973 19.9365 18.1435 19.9365 18.6068 19.5762Z"
                            fill="#311772"
                          />
                          <path
                            d="M18.6396 22.2544C18.3977 22.4425 18.0861 22.535 17.7704 22.535C17.4547 22.535 17.139 22.4425 16.9011 22.2544L11.0173 17.6823C10.2711 17.102 9 17.5133 9 18.3327V24.3715C9 24.8593 9.50843 25.2578 10.1399 25.2578H25.8601C26.4875 25.2578 27 24.8625 27 24.3715V17.9756C27 17.1562 25.7248 16.7449 24.9827 17.3252L18.6437 22.2544H18.6396Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Contact</p>
                          <p className="header-list-info">
                            The Meltano team is here to help. Ask us anything,
                            or give us your feedback!
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="submenu-info">
                        <p className="submenu-title title-inline">
                          Meltano <span className="brackets">Press</span>
                        </p>
                        <p className="submenu-subtitle title-inline">
                          Meltano related news, press releases, and logos
                        </p>
                      </div>
                      <Link to="/press/">
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
                            d="M24.9868 10.2578H11.0132C10.4519 10.2578 10 10.7097 10 11.271V25.2446C10 25.8022 10.4519 26.2578 11.0132 26.2578H24.9868C25.5444 26.2578 26 25.8059 26 25.2446V11.271C26 10.7134 25.5481 10.2578 24.9868 10.2578ZM12.2451 13.8223C12.2451 13.2173 12.7371 12.7252 13.3421 12.7252H15.9189C16.5239 12.7252 17.0159 13.2173 17.0159 13.8223V18.2542C17.0159 18.8592 16.5239 19.3512 15.9189 19.3512H13.3421C12.7371 19.3512 12.2451 18.8592 12.2451 18.2542V13.8223ZM22.6141 23.7904H13.3385C12.7335 23.7904 12.2451 23.302 12.2451 22.697C12.2451 22.092 12.7335 21.6036 13.3385 21.6036H22.6141C23.2191 21.6036 23.7075 22.092 23.7075 22.697C23.7075 23.302 23.2191 23.7904 22.6141 23.7904ZM22.6141 19.3512H19.5854C18.9804 19.3512 18.492 18.8628 18.492 18.2578C18.492 17.6528 18.9804 17.1644 19.5854 17.1644H22.6141C23.2191 17.1644 23.7075 17.6528 23.7075 18.2578C23.7075 18.8628 23.2191 19.3512 22.6141 19.3512ZM22.6141 14.912H19.5854C18.9804 14.912 18.492 14.4236 18.492 13.8186C18.492 13.2136 18.9804 12.7252 19.5854 12.7252H22.6141C23.2191 12.7252 23.7075 13.2136 23.7075 13.8186C23.7075 14.4236 23.2191 14.912 22.6141 14.912Z"
                            fill="#311772"
                          />
                        </svg>
                        <div className="header-list-item">
                          <p className="header-list-title">Press</p>
                          <p className="header-list-info">
                            Related news, press releases, and logos
                          </p>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <svg
              className="subcontainer-arrow"
              width="13"
              height="8"
              viewBox="0 0 13 8"
              fill="none"
            >
              <path
                d="M7.31799 1.16814C6.91983 0.600205 6.07851 0.600203 5.68035 1.16814L0.890625 8.00018H12.1077L7.31799 1.16814Z"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
          </nav>
          <div className="menu-extras">
            <a
              href="https://docs.meltano.com/getting-started/installation"
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
              data-tooltip="Join our 3,500+ community"
              rel="noreferrer"
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
  )
}

export default Header
