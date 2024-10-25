/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { getCategory, getCategoryRestaurant, getStore } from "../api/api";

const GuestContext = createContext()

function GuestContextProvider(props) {

    const [category,setCategory] = useState([])
    const [categoryRestaurant,setCategoryRestaurant] = useState([])
    const [store,setStore] = useState([])

    const getStoreGuest = async () =>{
        try {
            const responseStore = await getStore()
            setStore(responseStore.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCategoryGuest = async () =>{
        try {
            const responseCategory = await getCategory()
            setCategory(responseCategory.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getCategoryRestaurantGuest = async () =>{
        try {
            const responseCategory = await getCategoryRestaurant()
            setCategoryRestaurant(responseCategory.data)
        } catch (error) {
            console.log(error);
        }
    }



    return(
        <GuestContext.Provider value={{store,category,getStoreGuest,getCategoryGuest,categoryRestaurant,getCategoryRestaurantGuest}}>
            {props.children}
        </GuestContext.Provider>
    )
}

export {GuestContextProvider}
export default GuestContext