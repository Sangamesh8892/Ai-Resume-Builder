import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {data, Link, Navigate, useNavigate} from "react-router-dom"
import { logout } from '../app/features/authSlice';

const NavBar = () => {

    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const logoutUser= () =>{
        navigate('/')
        dispatch(logout());
        toast.success("User Logged out successfully")
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