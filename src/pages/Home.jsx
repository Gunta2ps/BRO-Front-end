import { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import { getCategory, getStore } from "../api/api";
import { useNavigate } from "react-router-dom";

function Home() {

  const [category,setCategory] = useState([])
  const [store,setStore] = useState([])
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const responseCategory = await getCategory()
      const responseStore = await getStore()
      setCategory(responseCategory.data)
      setStore(responseStore.data)
    } catch (error) {
      console.log(error);
    }
  }

  const handleStore =(id) =>{
    console.log(id);
    navigate(`/store/${id}`)
  }

  useEffect(() => {
    getData()
  },[])
  
  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start items-center bg-white rounded-lg gap-4 ">
      <SearchInput />
        <div className=" flex w-full h-[60%] justify-between items-center px-4 gap-4 overflow-x-scroll custom-scrollbar">
            {category.map((item,index)=>(
                <div key={index} className={`w-[48px] h-[48px] rounded-full flex justify-center items-center cursor-pointer bg-[#FFDC7F]`}>
                 <p className="w-[48px] h-[48px] text-[12px] text-center flex items-center justify-center">{item.name}</p>
                </div>
            ))}
        </div>
        <div className="flex gap-2 flex-wrap justify-center overflow-auto scrollbar-hidden">
            {store.map((item,index)=>(
              <div key={index} className="cursor-pointer w-1/4" onClick={()=>{handleStore(item.id)}}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"/>
                <p>{item.name}</p>
                <p>{item.address}</p>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Home