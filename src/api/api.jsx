import axios from "../configs/axios";

export const registerFunction = (form) => axios.post('/auth/register', form)

export const loginFunction = (form) => axios.post('/auth/login', form)

export const getUsers = (token) => axios.get('/auth/get-user',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getCategory = () => axios.get('/category')

export const getCategoryRestaurant = () => axios.get('/category/restaurant')

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

export const editPhoto = (file,token) => axios.patch('/auth/edit/photo',file,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const editPhotoStore = (file,token) => axios.patch('/store/edit/photo',file,{
    headers:{
        Authorization:`Bearer ${token}`
    }
})

export const previewPhoto = (file,token) => axios.post('/menu/photo',file,{
    headers:{
        Authorization:`Bearer ${token}`
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

export const createOrder = (form,token,id) => axios.post(`/order/add/${id}`,form,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getCustomerOrder = (token) => axios.get('/order/customer-order',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getOwnerOrder = (token) => axios.get('/order/owner-order',{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getMyOrder = (id,token) => axios.get(`/order/my-order/${id}`,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
export const changeStatusToDoneFunction = (token,id) => axios.patch(`/order/done`,{id},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
export const changeStatusToCancelFunction = (token,id) => axios.patch(`/order/cancel`,{id},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})
export const changeStatusToConfirmFunction = (token,id) => axios.patch(`/order/confirm`,{id},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const searchFunction = (query) => axios.get(`/store/search?search=${query}`)