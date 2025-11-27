import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
  return (
    <div>
      <div className='min-h-screen bg-gray-50'>
        <NavBar />
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout