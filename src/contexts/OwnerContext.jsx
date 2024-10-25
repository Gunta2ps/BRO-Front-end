/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { createMenu, editMenu, getMyStore } from "../api/api";
import { toast } from "react-toastify";

const OwnerContext = createContext()

function OwnerContextProvider(props) {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [store,setStore] = useState([])

    const addMenu = async (form) =>{
        try {
            const response = await createMenu(form,token)
            toast.success('Add Menu Successfully')
            navigate('/owner')
        } catch (error) {
            console.log(error);
        }
    }

    const editMenuFunction = async(form,id) =>{
        try {
            const response = await editMenu(form,token,id)
            toast.success('Edit Menu Successfully')
            navigate('/owner')
        } catch (error) {
            console.log(error);
        }
    }

    const getMyStoreFunction = async () => {
        try {
            const response = await getMyStore(token)
            console.log(response.data,"wwwwwww");
            setStore(response.data)
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <OwnerContext.Provider value={{addMenu,editMenuFunction,store,getMyStoreFunction}}>
            {props.children}
        </OwnerContext.Provider>
    )
}

export default OwnerContext
export {OwnerContextProvider}