import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import { editPhoto, getCustomerOrder } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { statusBlue, statusGreen, statusRed, statusYellow } from "../../style/Style";

function ProfileCustomer() {

  const { isUser,getData } = useUser();
  const [order,setOrder] = useState(null);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  const handleEditButton = () => {
    navigate("/customer/editprofile");
  };

  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };


  const handleImage = async(e) =>{
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    
    await editPhoto(formData,token)
    await getData()
  }

  const getOrderData = async() => {
    try {
    const responseOrder = await getCustomerOrder(token)
    setOrder(responseOrder.data.order)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    getOrderData()
  }, []);

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
      <div className="flex items-start w-full">
        <p className="text-4xl font-bold m-4">My Profile</p>
      </div>
      <div className="flex">
        <div className="flex items-start mx-16">
          <div
            onClick={handleCameraClick}
            className="bg-[#16325B] flex  px-2 py-2 rounded-full relative translate-x-[160px] translate-y-[120px] cursor-pointer"
          >
            <Camera color="white" />
            <input type="file" ref={fileInputRef} onChange={handleImage} name="image" className="hidden" />
          </div>
          <img
            className="w-40 h-40 rounded-full bg-slate-500 object-cover"
            src={ `${isUser?.profileImage}` || ""}
          />
        </div>
        <div className="flex flex-col gap-4 items-start mx-16">
          <p className="font-bold">
            Full Name : <span className="font-normal">{isUser?.firstName} {isUser?.lastName} </span>
          </p>
          <p className="font-bold">
            E-mail : <span className="font-normal"> {isUser?.email} </span>
          </p>
          <p className="font-bold">
            Phone Number : <span className="font-normal">{isUser?.phone} </span>
          </p>
        </div>
      </div>
      <div className=" overflow-auto scrollbar-hidden">
        <table className="table-auto w-full mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Store</th>
              <th className="px-4 py-2">Table</th>
              <th className="px-4 py-2">Number of Guest</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {order &&order.map((item,index)=>(
              <tr className="hover:bg-gray-100" key={index}>
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-center">{item.store.name}</td>
                <td className="px-4 py-2 text-center">{item.orderItem.map((el,index) => {  
                   if(index !== item.orderItem.length-1){
                    return el.menu.name +" x " + el.quantity+ ", "
                    }
                    return el.menu.name +" x " + el.quantity
                    })}</td>
                <td className="px-4 py-2 text-center">฿ {item.totalPrice}</td>
                <td className="px-4 py-2 text-center"><span className={
                  item.status === "CONFIRM"  ? `${statusGreen}` :item.status === "DONE" ? `${statusBlue}` :item.status === "PENDING" ? `${statusYellow}` : `${statusRed}` }>{item.status}</span></td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button
          className="px-20 py-2 border bg-[#16325B] text-white hover:bg-[#1D5E8C] rounded-lg"
          onClick={handleEditButton}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCustomer;
