import { useEffect, useState } from "react"
import { showAllMenu, showStore } from "../../api/api"
import { useParams } from "react-router-dom"
import Counter from "../../components/Counter"
import { button } from "../../style/Style"


function StoreCustomer() {
    const params = useParams()
    const storeId = params.storeId
    const [menu,setMenu] = useState([])
    const [store,setStore] = useState([])
    const [quantities,setQuantities] = useState({})
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
        const categoryName = typeof item.category === 'string' ? item.category : item.category.name; // Adjust this based on how your API gives the category
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

    useEffect(()=>{
        getData()
    },[])

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
        <div className="flex">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"/>
            <div>
                <div className="text-3xl font-bold p-6">{store.name}</div>
                <div className="p-6 text-gray-500">{store.address}</div>
                <div className="px-6"><button className={`${button}`}>Booking</button></div>
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
                                    <div><img className="w-20 h-20 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"/></div>
                                </div>
                                <div className="w-2/4 flex flex-col justify-center">
                                    <p>{item.name}</p>
                                    <p>$ {item.price}</p>
                                </div>
                                <div className="w-2/4 flex justify-center">
                                    <Counter quantity={quantities[item.id]|| 0} setQuantity={(newQuantity) => setQuantity(item.id, newQuantity)} id={item.id} />
                                </div>
                                <div className="w-2/4 flex justify-center items-center">
                                    <div>$ {(item.price*(quantities[item.id]|| 0)).toFixed(2)}</div>
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