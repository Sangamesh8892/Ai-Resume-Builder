import React from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom"

const NavBar = () => {

    const user={name: "Jhone Doe"}
    const navigate=useNavigate();

    const logoutUser= () =>{
        navigate('/')
    }

  return (
    <div className='shadow bg-gradient-to-l from-white to to-[#caf0f8]' >
        
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
        <img src='/logo.png' alt="logo" className='h-15 w-auto ' />
        </Link>
        <div className='flex items-center gap-4 text-sm'>
            <p className='max-sm:hidden'>Hi, {user?.name}</p> 
            <button className='bg-white hover:bg-rose-100 border border-gray-300 px-7
             py-1.5 rounded-full active:scale-95 transition-all' onClick={logoutUser}>Logout</button>

        </div>

        </nav>

        
    
        
        
        
        
     </div>
  )
}

export default NavBar