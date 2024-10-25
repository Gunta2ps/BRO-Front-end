import { Camera } from "lucide-react";
import { useEffect, useRef, useState} from "react";
import useOwner from "../../hooks/useOwner";
import { useNavigate } from "react-router-dom";
import { editPhoto, editPhotoStore, getOwnerOrder } from "../../api/api";
import useUser from "../../hooks/useUser";

function ProfileOwner() {

    const token = localStorage.getItem('token')
    const {store,getMyStoreFunction} = useOwner()
    const {getData} = useUser()
    const [order,setOrder] = useState(null)
    const navigate = useNavigate()

    const handleEditButton = () =>{
        navigate('/owner/editprofile')
    }

    const fileInputRef = useRef(null);

    const handleCameraClick = () => {
      fileInputRef.current.click();
    };

    const handleImage = async(e) =>{
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      await editPhotoStore(formData,token)
      await getMyStoreFunction()
  
    }

    const fileInputRef2 = useRef(null);

    const handleCameraClick2 = () => {
      fileInputRef2.current.click();
    };

    const handleProfileImage = async(e) =>{
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      await editPhoto(formData,token)
      await getData()
    }

    const getOrder = async() =>{
      try {
        const responseOrder = await getOwnerOrder(token)
        setOrder(responseOrder.data)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getMyStoreFunction()
      getOrder()
    },[])

    console.log(store,"PROFILE OWNER");

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
          <div className="flex items-start w-full">
            <p className="text-4xl font-bold m-4">Store Profile</p>
          </div>
          <div className="flex">
          <div className="flex items-start mx-16">
            <div onClick={handleCameraClick} className="bg-[#16325B] flex  px-2 py-2 rounded-full relative translate-x-[160px] translate-y-[120px] cursor-pointer">
              <Camera color="white"/>
              <input type="file" ref={fileInputRef} onChange={handleImage} name="image" className="hidden" />
              </div>
            <img className="w-40 h-40 rounded-full" src={`${store?.profileImage}` ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"}/>
          </div>
          <div className="flex flex-col gap-4 items-start mx-16">
            <p className="font-bold">Store Name : <span className="font-normal"> {store?.name} </span></p>
            <p className="font-bold">Address : <span className="font-normal">{store?.address} </span></p>
            <div onClick={handleCameraClick2} className="bg-[#16325B] text-white flex  px-2 py-2 rounded-full relative  cursor-pointer">
              <Camera color="white"/> Edit Profile User
              <input type="file" ref={fileInputRef2} onChange={handleProfileImage} name="image" className="hidden" />
              </div>
            </div>
          </div>
          <div className=" overflow-auto scrollbar-hidden">
            <table className="table-auto w-full mb-4">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2">Order ID</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Menu</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Status</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                    {order &&
                        order.map((item,index)=>(

                            <tr className="hover:bg-gray-100" key={index}>
                                <td className="px-4 py-2 text-center">{item.id}</td>
                                <td className="px-4 py-2 text-center">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-center">{item.user.firstName} {item.user.lastName}</td>
                                <td className="px-4 py-2 text-center">{item.orderItem.map((el,index) => {  
                                   if(index !== item.orderItem.length-1){
                                   return el.menu.name +" x " + el.quantity+ ", "
                                   }
                                   return el.menu.name +" x " + el.quantity
                                })}</td>
                                <td className="px-4 py-2 text-center">฿ {item.totalPrice}</td>
                                <td className="px-4 py-2 text-center"><span className={
                                     item.status === "CONFIRM" 
                                     ? "text-[#00B112] bg-[#ECFFEE] px-3 py-1 rounded-lg font-bold" 
                                     :item.status === "DONE"
                                     ? "text-[#166EDF] bg-[#BDE7FF] px-3 py-1 rounded-lg font-bold"
                                     :item.status === "PENDING"
                                     ? "text-[#DA8F18] bg-[#FFDD94] px-3 py-1 rounded-lg font-bold"
                                     : "text-[#B10000] bg-[#FFECEC] px-3 py-1 rounded-lg font-bold" }>{item.status}</span></td>
                            </tr>
                        ))
                    }
                
                </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button className="px-20 py-2 border bg-[#16325B] text-white hover:bg-[#1D5E8C] rounded-lg" onClick={handleEditButton}>Edit Profile</button>
          </div>
        </div>
      );
    }

export default ProfileOwner