import React from 'react'
import Header from './header'
import Footer from './footer'
import Preheader from './preheader'

const Layout = ({ children }) => (
  <>
    <Preheader />
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)

export default Layout
