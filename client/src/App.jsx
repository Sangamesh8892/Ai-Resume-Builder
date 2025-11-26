import { Route, Routes } from "react-router-dom";
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import Layout from "./pages/Layout.jsx";

export default function App(){

  return(
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="app" element={<Layout/>}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
        <Route path="view/:resumeId" element={<Preview/>} />
        <Route path="login" element={<Login/>} />
      </Routes>
    </>
  )


}
