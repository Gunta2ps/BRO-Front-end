/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {editProfileFunction, getUsers, loginFunction, registerFunction, createMenu, editMenu} from '../api/api'
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

function UserContextProvider(props) {
    const navigate = useNavigate()

    const [isLogin,setLogin] = useState(false)
    const [isUser,setIsUser] = useState({})
    const [token,setToken] = useState('')

    useEffect(()=>{
        const storeLogin = localStorage.getItem('login')
        const storeToken = localStorage.getItem('token')
        const storeUser = localStorage.getItem('user')

        if(storeLogin && storeToken && storeUser){
            setLogin(JSON.parse(storeLogin))
            setIsUser(JSON.parse(storeUser))
            setToken(storeToken)
        }
    },[])

    useEffect(()=>{
        if(isLogin){
            localStorage.setItem('login',JSON.stringify(isLogin))
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(isUser))
        }
    },[isLogin,isUser,token])

    useEffect(() => {
        if (isLogin && isUser.role === 'OWNER') {
          navigate('/owner');
        }else if(isLogin && isUser.role === 'CUSTOMER'){
            navigate('/customer');
        }else if(isLogin && isUser.role === 'ADMIN'){
            navigate('/admin');
        }else{
            navigate('/');
        }
      }, [isUser, token, isLogin, navigate]);
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
            setToken(response.data.result.token)
            setIsUser(response.data.result.user.user)
            setLogin(true)
        } catch (error) {
            console.log(error.message);
        }
    }
    const logout = () =>{
        setLogin(false)
        setIsUser(null)
        setToken('')
        localStorage.removeItem('login');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    const editProfile = async (form) =>{
        try {
            const response = await editProfileFunction(form,token)
            const responseUser = await getUsers(token)
            setIsUser(responseUser.data.member)
            if(isUser.role === 'CUSTOMER'){
                navigate('/customer/profile')
            }else{
                navigate('/owner/profile')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addMenu = async (form) =>{
        try {
            const response = await createMenu(form,token)
            navigate('/owner')
        } catch (error) {
            console.log(error);
        }
    }

    const editMenuFunction = async(form,id) =>{
        try {
            const response = await editMenu(form,token,id)
            navigate('/owner')
        } catch (error) {
            console.log(error);
        }
    }
    
    return(
        <UserContext.Provider value={{register,login,isLogin,
            editMenuFunction,setLogin,logout,isUser,token,editProfile,addMenu}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContextProvider}
export default UserContext