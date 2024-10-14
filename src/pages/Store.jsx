import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { showAllMenu, showStore } from "../api/api"


function Store() {
    const params = useParams()
    const storeId = params.storeId
    const [menu,setMenu] = useState([])
    const [store,setStore] = useState([])
    const getData = async () => {
        try {
            const responseMenu = await showAllMenu(storeId)
            const responseStore = await showStore(storeId)
            setStore(responseStore.data)
            setMenu(responseMenu.data.menu)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const categorizedMenu = menu.reduce((acc, item) => {
        const categoryName = typeof item.category === 'string' ? item.category : item.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(item);
        return acc;
    }, {});


  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
        <div className="flex">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"/>
            <div>
                <div className="text-3xl font-bold p-6">{store.name}</div>
                <div className="p-6 text-gray-500">{store.address}</div>
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
                            </div>
                        ))}
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Store

