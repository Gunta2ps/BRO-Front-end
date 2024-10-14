import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../Layout/Layout"
import Home from "../pages/Home"
import Login from "../pages/authenticate/Login"
import Register from "../pages/authenticate/Register"
import Unauthorized from "../pages/Unauthorized"
import NotFound from "../pages/NotFound"
import { UserContextProvider } from "../contexts/UserContext"
import CustomerLayout from "../Layout/CustomerLayout"
import OwnerLayout from "../Layout/OwnerLayout"
import AdminLayout from "../Layout/AdminLayout"
import ProtectRoute from "./ProtectRoute"
import HomeOwner from "../pages/owner/HomeOwner"
import ProfileOwner from "../pages/owner/ProfileOwner"
import EditProfileOwner from "../pages/owner/EditProfileOwner"
import AddMenu from "../pages/owner/AddMenu"
import BookingOwner from "../pages/owner/BookingOwner"
import OrderOwner from "../pages/owner/OrderOwner"
import ProfileCustomer from "../pages/customer/ProfileCustomer"
import EditProfileCustomer from "../pages/customer/EditProfileCustomer"
import Store from "../pages/Store"
import HomeCustomer from "../pages/customer/HomeCustomer"
import StoreCustomer from "../pages/customer/StoreCustomer"
import BookingCustomer from "../pages/customer/BookingCustomer"
import OrderCustomer from "../pages/customer/OrderCustomer"
import EditMenu from "../pages/owner/EditMenu"
import StoreAdmin from "../pages/admin/StoreAdmin"
import BookingAdmin from "../pages/admin/BookingAdmin"
import OrderAdmin from "../pages/admin/OrderAdmin"
import MenuAdmin from "../pages/admin/MenuAdmin"
import UserAdmin from "../pages/admin/UserAdmin"



const router = createBrowserRouter([
    {
        path:'/',
        element: <UserContextProvider><Layout/></UserContextProvider>,
        children:[
            {index:true,element: <Home/>},
            {path:'login',element: <Login/>},
            {path:'register',element: <Register/>},
            {path:'unauthorized',element: <Unauthorized/>},
            {path:'*',element: <NotFound/>},
            {path:'store/:storeId',element:<Store/>}
        ]
    },
    {
        path:'/customer',
        element: <UserContextProvider><ProtectRoute element={<CustomerLayout/>} allow={['CUSTOMER']}/></UserContextProvider>,
        children:[
            {index:true,element: <HomeCustomer/>},
            {path:'profile',element: <ProfileCustomer/>},
            {path:'editprofile',element: <EditProfileCustomer/>},
            {path:'store/:storeId',element: <StoreCustomer/>},
            {path:'booking',element: <BookingCustomer/>},
            {path:'order',element: <OrderCustomer/>},

            
        ]
    },
    {
        path:'/owner',
        element: <UserContextProvider><ProtectRoute element={<OwnerLayout/>} allow={['Owner']}/></UserContextProvider>,
        children:[
            {index:true,element: <HomeOwner/>},
            {path:'profile',element: <ProfileOwner/>},
            {path:'booking',element: <BookingOwner/>},
            {path:'order',element: <OrderOwner/>},
            {path:'editprofile',element: <EditProfileOwner/>},
            {path:'addmenu',element: <AddMenu/>},
            {path:'editmenu/:menuId',element: <EditMenu/>},
        ]
    },
    {
        path:'/admin',
        element: <UserContextProvider><ProtectRoute element={<AdminLayout/>} allow={['ADMIN']}/></UserContextProvider>,
        children:[
            {index:true,element: <StoreAdmin/>},
            {path:'booking',element: <BookingAdmin/>},
            {path:'order',element: <OrderAdmin/>},
            {path:'menu',element: <MenuAdmin/>},
            {path:'user',element: <UserAdmin/>},
        ]
    },
])



function AppRoute() {
  return (
    <div>
        <RouterProvider router = {router}/>
    </div>
  )
}

export default AppRoute