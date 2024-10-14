import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { getMyStore, getUsers } from "../../api/api";
import { useNavigate } from "react-router-dom";

function ProfileOwner() {

    const bookingData = [
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"DONE"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"DONE"},
        {bookingId:15426,date:"20/10/67",customer:'John Doe',table:1,guest:10,status:"DONE"},
    ]

    const [store,setStore] = useState([])
    const [isUser,setIsUser] = useState({})
    const {token} = useUser()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const responseStore = await getMyStore(token)
            const responseUser = await getUsers(token)
            setIsUser(responseUser.data.member)
            setStore(responseStore.data)
            console.log(responseUser.data.member);
        } catch (error) {
            console.log(error);
        }
    }

    const dataToSend = {user: isUser,store:store }

    const handleEditButton = () =>{
        navigate('/owner/editprofile',{state:dataToSend})
    }

    useEffect(() => {
        getData()
    },[])

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
          <div className="flex items-start w-full">
            <p className="text-4xl font-bold m-4">Store Profile</p>
          </div>
          <div className="flex">
          <div className="flex items-start mx-16">
            <div className="bg-[#16325B] flex  px-2 py-2 rounded-full relative translate-x-[160px] translate-y-[120px] cursor-pointer"><Camera color="white"/></div>
            <img className="w-40 h-40 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"/>
          </div>
          <div className="flex flex-col gap-4 items-start mx-16">
            <p className="font-bold">Store Name : <span className="font-normal"> {store.name} </span></p>
            <p className="font-bold">Address : <span className="font-normal">{store.address} </span></p>
            </div>
          </div>
          <div className=" overflow-auto scrollbar-hidden">
            <table className="table-auto w-full mb-4">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2">Booking ID</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Table</th>
                    <th className="px-4 py-2">Number of Guest</th>
                    <th className="px-4 py-2">Status</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                    {
                        bookingData.map((item,index)=>(

                            <tr className="hover:bg-gray-100" key={index}>
                                <td className="px-4 py-2 text-center">{item.bookingId}</td>
                                <td className="px-4 py-2 text-center">{item.date}</td>
                                <td className="px-4 py-2 text-center">{item.customer}</td>
                                <td className="px-4 py-2 text-center">{item.table}</td>
                                <td className="px-4 py-2 text-center">{item.guest}</td>
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