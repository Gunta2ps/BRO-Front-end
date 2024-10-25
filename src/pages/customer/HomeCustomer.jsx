import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchInput from "../../components/SearchInput"
import axios from "axios"
import { TypeAnimation } from "react-type-animation"

function HomeCustomer() {

    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState('');
    const [storeResults, setStoreResults] = useState([]);

    const getStore = async() =>{
      try {
        const response = await axios.get(`/store/search?search=${searchQuery}`)
        setStoreResults(response.data)
      } catch (error) {
        console.log(error);
      }
    }
  
    const handleStore =(id) =>{
      console.log(id);
      navigate(`/customer/store/${id}`)
    }
  
    useEffect(() => {
      getStore()
    },[])
    
    return (
      <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start items-center bg-white rounded-lg gap-4 ">
        <div className="flex items-start w-full">
        <SearchInput searchQuery={searchQuery} handleSearch={setSearchQuery}  getStore={getStore} />
        </div>
        <div className="w-full h-[100px]">
        <div className=" flex w-full h-full text-4xl font-bold text-center px-4">
        <span className="text-center">You Can Select Your {" "}</span>              
        <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Your Food By Your Self',
                        2000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Your Restaurant By Your Self',
                        2000,
                        'Your Order By Your Self',
                        2000,
                        'Your Booking By Your Self',
                        2000,
                      ]}
                      speed={50}
                      repeat={Infinity}
                    />              
        </div>
        </div>
          <div className="flex gap-2 flex-wrap justify-center overflow-auto scrollbar-hidden">
              {storeResults.map((item,index)=>(
                <div key={index} className="cursor-pointer" onClick={()=>{handleStore(item.id)}}>
                  <img  className="w-[300px] h-[200px]"  src={ `${item.profileImage}` || "https://via.placeholder.com/300x200"}/>
                  <p>{item.name}</p>
                  <p>{item.address}</p>
                </div>
              ))}
          </div>
      </div>
    )
  }

export default HomeCustomer