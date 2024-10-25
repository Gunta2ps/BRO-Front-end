/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import {getUsers} from '../api/api'
import { Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";


function ProtectRoute({element,allow}) {

    const [isAllowed,setIsAllowed] = useState(null)
    const {setIsUser} = useUser()


    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            checkRole()
        }
    },[])

    const checkRole = async() =>{
        try {
            const storeToken = localStorage.getItem('token')
            const response = await getUsers(storeToken)
            setIsUser(response.data.member)
            const role = response.data.member.role
            const status = response.data.member.status

            if(allow.includes(role) && status !== 'INACTIVE'){
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