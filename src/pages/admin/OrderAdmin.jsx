import { useEffect, useState } from "react"
import { button, disableButton, statusBlue, statusGreen, statusRed, statusYellow } from "../../style/Style"
import { adminGetOrder } from "../../api/adminApi"

function OrderAdmin() {

  const [order,setOrder] = useState(null)
  const token = localStorage.getItem('token')

  const getOrder = async() =>{
    const responseOrder = await adminGetOrder(token)
    setOrder(responseOrder.data.order)
  }
  console.log(order);

  useEffect(()=>{
    getOrder()
  },[])


return (
<div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
      <div className="flex items-start w-full">
        <p className="text-4xl font-bold m-4">Order</p>
      </div>
      <div className=" overflow-auto scrollbar-hidden">
        <table className="table-auto w-full mb-4">
            <thead className="bg-gray-50">
            <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Store</th>
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
            </tr>
            </thead>
            <tbody className="bg-white">
                {order &&
                    order.map((item,index)=>(

                        <tr className="hover:bg-gray-100" key={index}>
                            <td className="px-4 py-2 text-center">{item.id}</td>
                            <td className="px-4 py-2 text-center">{new Date(item.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 text-center">{item.user.firstName} {item.user.lastName}</td>
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
                            <td className="flex items-center justify-center pt-2 gap-2"><button className={item.status === "DONE" || item.status === "CANCEL" ? `${disableButton}` :`${button}`}>Done</button><button className={item.status === "DONE" || item.status === "CANCEL" ? `${disableButton}` :`${button}`}>Cancel</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
)
}

export default OrderAdmin