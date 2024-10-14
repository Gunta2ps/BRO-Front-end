/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import useUser from "../hooks/useUser";
import {getUsers} from '../api/api'
import { Navigate } from "react-router-dom";


function ProtectRoute({element,allow}) {

    const [isAllowed,setIsAllowed] = useState(null)
    const {token} = useUser()

    useEffect(()=>{
        checkRole()
    },[])

    const checkRole = async() =>{
        try {
            const response = await getUsers(token)
            const role = response.data.member.role

            if(allow.includes(role)){
                setIsAllowed(true)
            }else{
                setIsAllowed(false)
            }
        } catch (error) {
            console.log(error);
            setIsAllowed(false)
        }
        if(isAllowed === null){
            return <div>Loading ......</div>
        }

        if(!isAllowed){
            return <Navigate to={'/unauthorized'} />
        }
    }

  return (
    element
  )
}

export default ProtectRoute