/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { createOrder, showAllMenu, showStore } from "../../api/api"
import { useNavigate, useParams } from "react-router-dom"
import Counter from "../../components/Counter"
import { button } from "../../style/Style"
import { toast } from "react-toastify"


function StoreCustomer() {
    const params = useParams()
    const navigate = useNavigate()
    const storeId = params.storeId
    const token = localStorage.getItem('token')
    const [menu,setMenu] = useState([])
    const [store,setStore] = useState([])
    const [quantities,setQuantities] = useState({})
    const [form, setForm] = useState({
        totalPrice:0,
        items:null,
      })

    const getData = async () => {
        try {
            const responseMenu = await showAllMenu(storeId)
            const responseStore = await showStore(storeId)
            setStore(responseStore.data)
            setMenu(responseMenu.data.menu)
            const initialQuantities = menu.reduce((acc, item) => {
                acc[item.id] = 0;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        } catch (error) {
            console.log(error);
        }
    }

    const categorizedMenu = menu.reduce((acc, item) => {
        const categoryName = typeof item.category === 'string' ? item.category : item.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
    }, {});
    
    const setQuantity = (id, newQuantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: newQuantity,
        }));
    };

    const menuQuantities = Object.keys(quantities).filter(id=>quantities[id] > 0).map(id => ({
        menuId: id,
        quantity: quantities[id]
    }));


    const totalPrice = menuQuantities.reduce((total, item) => {
        const menuItem = menu.find(menuItem => menuItem.id === parseInt(item.menuId));
        return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);

    const handleBookingButton = async(e) =>{
        e.preventDefault(e)
        setForm({
            totalPrice:totalPrice,
            items:menuQuantities,
        })
        if(totalPrice > 1){
            const id = await createOrder({
                totalPrice:totalPrice,
                items:menuQuantities,
            },token,storeId)
            toast.success('Order Successfully')
             navigate(`/customer/order/${id.data.order.id}`)
        }else{
            return alert("Please add at least 1 menu")
        }
    }


    useEffect(()=>{
        getData()
    },[])

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
        <div className="flex">
            <div className="w-[300px] h-[200px]" >
            <img className="w-[300px] h-[200px]"  src={store ?`${store.profileImage}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"}/>
            </div>
            <div>
                <div className="text-3xl font-bold p-6">{store.name}</div>
                <div className="p-6 text-gray-500">{store.address}</div>
                <div className="px-6 flex items-center justify-between">
                    <button className={`${button}`} onClick={handleBookingButton}>Booking</button> 
                    <span>Total Price : ฿ {totalPrice}</span>
                </div>
            </div>
        </div>
        <div className="w-full flex overflow-auto scrollbar-hidden">
            <div className="w-full pl-6">
            {Object.keys(categorizedMenu).map(category => (
                <div key={category}>
                    <h2 className="text-2xl font-bold mt-4 border-t">{category}</h2>
                        {categorizedMenu[category].map(item => (
                            
                            <div key={item.id} className="py-2 flex">
                                <div className="w-2/4 flex justify-center">
                                    <div><img className="w-20 h-20 rounded-full" src={item.image ?item.image :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s'}/></div>
                                </div>
                                <div className="w-2/4 flex flex-col justify-center">
                                    <p>{item.name}</p>
                                    <p>฿ {item.price}</p>
                                </div>
                                <div className="w-2/4 flex justify-center">
                                    <Counter quantity={quantities[item.id]|| 0} setQuantity={(newQuantity) => setQuantity(item.id, newQuantity)} id={item.id} />
                                </div>
                                <div className="w-2/4 flex justify-center items-center">
                                    <div>฿ {(item.price*(quantities[item.id]|| 0)).toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default StoreCustomer