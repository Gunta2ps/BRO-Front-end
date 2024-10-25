import { Receipt, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getMyOrder } from "../../api/api"
import PaymentCredit from "../../components/PaymentCredit"


function Payment() {

    const token = localStorage.getItem('token')
    const [order,setOrder] = useState(null)
    const params = useParams()
    const orderId = params.orderId

    const getOrder = async() =>{
        try {
            const responseOrder = await getMyOrder(orderId,token)
            setOrder(responseOrder.data.order)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(order);

    useEffect(()=>{
        getOrder()
    },[])

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex  bg-white rounded-lg gap-4 ">
        <div className="w-2/4 m-6">
        <div className="flex gap-3">
          <div className="bg-[#16325B] rounded-xl w-10 h-10 flex justify-center items-center">
            <Wallet size={32} color="white" />
          </div>
          <span className="text-2xl font-bold">Payment</span>
        </div>
        
          {order && <PaymentCredit amount={Math.round(order?.totalPrice*100)}/>}
        
      </div>
      <div className="w-2/4 m-6 flex justify-center">
        <div className="bg-[#BDE7FF] w-3/4 h-3/4 rounded-xl flex flex-col">
          <div className="p-6 text-2xl font-bold text-[#253058]">Order Detail</div>
            <div className="w-3/4 flex justify-between self-center gap-2 text-[#253058]"><span>Menu</span> <span>Quantity</span> <span>Price</span></div>
          <div className=" bg-[#8FD9FF] w-3/4 h-2/4 rounded-xl flex self-center">
            <div className="w-full flex flex-col gap-2 overflow-auto scrollbar-hidden">
                {order && order.orderItem.map(item =>(
                    <div key={item.id} className="flex justify-between p-2 text-[#253058]">
                        <span className="w-1/3 text-start">{item?.menu.name}</span> <span className="w-1/3 text-center">{item?.quantity}</span> <span className="w-1/3 text-end">฿ {item?.menu.price * item?.quantity}</span>
                    </div>
                ))}
            </div>
          </div>
          <div className="p-6 text-[#253058]">Total Price</div>
          <div className="flex w-full justify-between px-6">
            <div className="text-4xl font-semibold text-[#253058]">฿ {order?.totalPrice}</div>
            <div><Receipt size={48} color="#253058"/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment