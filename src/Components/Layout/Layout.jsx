import React from 'react'
import Footer from "../Footer/Footer"
import Nav from "../Navbar/Nav"
const Layout = ({children}) => {
  return (
    <>
    <Nav />
    {children}
    <Footer />
    </>
  )
}

export default Layout