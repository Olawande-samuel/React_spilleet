import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../Footer/Footer"
import Nav from "../Navbar/Nav"
const Layout = ({children}) => {
  return (
    <>
    <Nav />
    {/* {children} */}
    <Outlet />

    <Footer />
    </>
  )
}

export default Layout