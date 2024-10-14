import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


function Layout() {
   
  return (
    <div className='h-screen w-screen'>
        <div className="h-[5%]">
            <Navbar/>
        </div>
        <div className="bg-gray-500 h-[95vh] w-screen flex justify-center items-center">
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout