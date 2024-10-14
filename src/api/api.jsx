import axios from "../configs/axios";

export const registerFunction = (form) => axios.post('/auth/register', form)

export const loginFunction = (form) => axios.post('/auth/login', form)

export const getUsers = (token) => axios.get('/auth/get-user',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getCategory = () => axios.get('/category')

export const getStore = () => axios.get('/store')

export const getMenuOwner = (token) => axios.get('/menu',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getMyStore = (token) => axios.get('/store/my-store',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const editProfileFunction = (form,token) => axios.patch('/auth/edit',form,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const showAllMenu = (id) => axios.get(`/menu/${id}`)
export const showStore = (id) => axios.get(`/store/${id}`)
export const createMenu = (form,token) => axios.post('/menu/add',form,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const editMenu = (form,token,id) => axios.patch(`/menu/${id}`,form,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const changeStatusMenu = (token,id) => axios.patch(`/menu/status/menu`,{id},{
    headers:{
        Authorization: `Bearer ${token}`
    }
}) 

export const deleteMenu = (token,id) => axios.delete(`/menu/delete/${id}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})