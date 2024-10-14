import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import SideBarAdmin from "../components/SideBarAdmin"


function AdminLayout() {
  return (
    <div className='h-screen w-screen'>
    <div className="h-[5%]">
        <Navbar/>
    </div>
    <div className="flex h-[95%] ">
        <SideBarAdmin/>
    <div className="bg-gray-500  h-[95vh] w-[calc(100%-240px)] flex flex-1 justify-center items-center">
        <Outlet/>
    </div>
    </div>
</div>
  )
}

export default AdminLayout