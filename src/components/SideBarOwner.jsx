import {  ChevronFirst, ChevronLast, Package, Store, UserCircle } from 'lucide-react'
import SidebarItem from './SidebarItem';
import { useState } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const sidebarItems = [
    {icon: <Store size={24} />,text: "Store",name: "store",},
    {icon: <UserCircle size={24} />,text: "Profile",name: "profile",},
    {icon: <Package size={24} />,text: "Orders",name: "orders",},
];

function SideBarOwner() {

    const navigate = useNavigate()
    const {isUser} = useUser()
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState("store");
    const handleClickSidebar = () => {
        setOpen(!open);
    };

    const handleClickMenu = (name) => {
        setActive(name);
        switch (name) {
            case "store":
                navigate('/owner')
                break;
            case "profile":
                navigate('/owner/profile')
                break;
            case "orders":
                navigate('/owner/order')
                break;
        
            default:
                break;
        }
    };

  return (
    <aside className={`h-full transition duration-500 ${open ? "w-60" : "w-min"} `}>
            <nav className="h-full flex flex-col bg-[#16325B] border-gray-700 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-end items-center">
                    <button className="p-1.5 rounded-lg bg-gray-50 transition duration-500 hover:bg-gray-300" onClick={handleClickSidebar} >
                        {open ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <ul className="flex-1 px-3">
                    {sidebarItems.map((sidebarItem) => (
                        <SidebarItem
                            key={sidebarItem.name}
                            icon={() => sidebarItem.icon}
                            text={open && sidebarItem.text}
                            active={sidebarItem.name === active}
                            onClick={() => handleClickMenu(sidebarItem.name)}
                        />
                    ))}
                </ul>

                <div className="border-t flex p-3 bg-[#FFDC7F]">
                    <img src={`${isUser?.profileImage}`||"https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"} className="w-10 h-10 rounded-full cursor-pointer" />
                    <div className={`flex justify-between items-center  overflow-hidden ml-3 ${open ? "w-52" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold">{isUser?.firstName} {isUser?.lastName}</h4>
                            <span className="text-sm text-gray-600">
                            {isUser?.email}
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </aside>
  )
}

export default SideBarOwner