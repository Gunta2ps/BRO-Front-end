/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {editProfileFunction, getUsers, loginFunction, registerFunction} from '../api/api'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContext = createContext()

function UserContextProvider(props) {
    const navigate = useNavigate()

    const [isUser,setIsUser] = useState(null)
    const [isRefresh,setIsRefresh] = useState(false)

    const register = async(form) =>{
        try {
            const response = await registerFunction(form)
            console.log(response.data);
            navigate('/')
        } catch (error) {
            console.log(error.message);
        }
    }

    const login = async (form) =>{
        try {
            const response = await loginFunction(form)
            setIsUser(response.data.result.user.user)
            localStorage.setItem('token',response.data.result.token)
            const role = response.data.result.user.user.role
            console.log(role);
            switch (role) {
                case 'CUSTOMER':
                    toast.success('Login Success as Customer')
                    navigate('/customer')
                    break;
                case 'OWNER':
                    toast.success('Login Success as Owner')
                    navigate('/owner')
                    break;
                case 'ADMIN':
                    toast.success('Login Success as Admin')
                    navigate('/admin')
                    break;
            }
   
       
        } catch (error) {
            console.log(error.response);
            toast.error('Login Fail Try again');
        }
    }
    const logout = () =>{
    
        setIsUser(null)
        localStorage.removeItem('token');
        toast.success('Log Out')
        navigate('/')
    }

    const editProfile = async (form) =>{
        try {
            const storeToken = localStorage.getItem('token')
            const response = await editProfileFunction(form,storeToken)
            const responseUser = await getUsers(storeToken)
            setIsUser(responseUser.data.member)
            toast.success('Edit Profile Successfully')
            if(isUser.role === 'CUSTOMER'){  
                navigate('/customer/profile')
            }else{
                navigate('/owner/profile')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
            const storeToken = localStorage.getItem('token')
            const responseUser = await getUsers(storeToken);
            setIsUser(responseUser.data.member);
            return responseUser.data.member
        } catch (error) {
          console.log(error);
        }
    };

    const checkUser = async () => {
        try {
            const token = localStorage.getItem('token')
          
            if(token){
               const res = await getData()
                switch (res.role) {
                    case "CUSTOMER":
                        navigate('/customer')
                        break;
                    case "OWNER":
                        navigate('/owner')
                        break;
                    case "ADMIN":
                        navigate('/admin')
                        break;
                    default:
                        navigate('/')
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        checkUser()
    },[])
    
    return(
        <UserContext.Provider value={{register,login,setIsUser,checkUser,
            logout,isUser,editProfile,isRefresh,setIsRefresh,getData}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider}
export default UserContext