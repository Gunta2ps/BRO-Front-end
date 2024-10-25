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
import OrderOwner from "../pages/owner/OrderOwner"
import ProfileCustomer from "../pages/customer/ProfileCustomer"
import EditProfileCustomer from "../pages/customer/EditProfileCustomer"
import Store from "../pages/Store"
import HomeCustomer from "../pages/customer/HomeCustomer"
import StoreCustomer from "../pages/customer/StoreCustomer"
import OrderCustomer from "../pages/customer/OrderCustomer"
import EditMenu from "../pages/owner/EditMenu"
import StoreAdmin from "../pages/admin/StoreAdmin"
import OrderAdmin from "../pages/admin/OrderAdmin"
import MenuAdmin from "../pages/admin/MenuAdmin"
import UserAdmin from "../pages/admin/UserAdmin"
import { OwnerContextProvider } from "../contexts/OwnerContext"
import { GuestContextProvider } from "../contexts/GusetContext"
import Cart from "../pages/customer/Cart"
import Payment from "../pages/customer/Payment"



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
            {path:'order',element: <OrderCustomer/>},
            {path:'order/:orderId',element: <Cart/>},
            {path:'payment/:orderId',element: <Payment/>},

            
        ]
    },
    {
        path:'/owner',
        element: <UserContextProvider>
            <OwnerContextProvider>
                <ProtectRoute element={<OwnerLayout/>} allow={['Owner']}/>
                </OwnerContextProvider>
                </UserContextProvider>,
        children:[
            {index:true,element: <HomeOwner/>},
            {path:'profile',element: <ProfileOwner/>},
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
            {path:'order',element: <OrderAdmin/>},
            {path:'menu',element: <MenuAdmin/>},
            {path:'user',element: <UserAdmin/>},
        ]
    },
])



function AppRoute() {
  return (
    <div>
        <GuestContextProvider>
            <RouterProvider router = {router}/>
        </GuestContextProvider>
    </div>
  )
}

export default AppRoute