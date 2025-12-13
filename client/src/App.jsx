import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import Layout from "./pages/Layout.jsx";
import { useDispatch } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Ats from "./pages/Ats.jsx";

export default function App(){

  const dispatch= useDispatch();

  const getUserData= async()=>{
    const token = localStorage.getItem('token')
    try{
      if(token){
        const {data}= await api.get('/api/users/data',{
          headers: {
            Authorization: token
           }
        })

        if(data.user){
          dispatch(login({token, user: data.user}))
        }

        dispatch(setLoading(false))
      }
      else{
        dispatch(setLoading(false))
      }
    }catch(e){
      dispatch(setLoading(false))
      console.log(e.message)
    }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return(
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="app" element={<Layout/>}>
          <Route index element={<Dashboard />} />
          <Route path="ats" element={<Ats/>} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview/>} />
       
      </Routes>
    </>
  )


}
