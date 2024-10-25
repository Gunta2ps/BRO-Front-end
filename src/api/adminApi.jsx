import axios from "../configs/axios";

export const adminGetStore = (token) => axios.get('/admin/store',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const adminChangeStatusStore = (token,id) => axios.patch('/admin/store/status',{id},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const adminDeleteStore = (token,id) => axios.delete(`/admin/store/${id}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const adminGetUser = (token) => axios.get('/admin/user',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const adminChangeStatusUser = (token,id) => axios.patch('/admin/user/status',{id},{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const adminDeleteUser = (token,id) => axios.delete(`/admin/user/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const adminGetMenu = (token) => axios.get('/admin/menu',{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const adminChangeStatusMenu = (token,id) => axios.patch('/admin/menu/status',{id},{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const adminDeleteMenu = (token,id) => axios.delete(`/admin/menu/${id}`,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const adminGetOrder = (token) => axios.get('/admin/order',{
    headers:{
        Authorization:`Bearer ${token}`
    }
})