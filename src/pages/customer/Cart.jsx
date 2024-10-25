import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMyOrder } from "../../api/api";
import { button } from "../../style/Style";


function Cart() {

    const token = localStorage.getItem('token')
    const params = useParams()
    const orderId = params.orderId
    const [order,setOrder] = useState(null)
    const navigate = useNavigate()

    const getOrder = async () => {
        try {
            const responseOrder = await getMyOrder(orderId,token)
            setOrder(responseOrder.data.order);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePay = () =>{
        navigate(`/customer/payment/${order.id}`)
    }

    useEffect(()=>{
        getOrder()
    },[])
  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
        <div>
            <p className="text-4xl font-bold p-6 w-full">Summary</p>
        </div>
        <div className="w-full flex">
            <div className="w-2/4 pl-6">
                { order &&  order.orderItem.map(item =>(
                    <div key={item.index} className="w-full flex justify-start gap-10 py-3 ">
                        <div className="w-1/4"><img className="w-12 h-12 rounded-full" src={`${item?.menu.image}`}/></div>
                        <div className="flex flex-col w-1/4"><span>{item?.menu.name}</span>฿{item?.menu.price}</div>
                        <div className="flex gap-2 items-center w-1/4">
                           {item?.quantity}
                        </div>
                        <div className="flex gap-2 items-center w-1/4">
                           ฿ {item?.quantity*item?.menu.price}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-2/4 pr-6">
                <div className="text-2xl font-bold">Your Total</div>
                <div className=" pt-3 text-xl font-semibold">Total ฿ {order?.totalPrice}</div>
                {order && order.status === 'PENDING'
                    ?<button className={`${button}`} onClick={handlePay}>Pay</button>
                    :<div></div>
                }
            </div>
        </div>
    </div>
  )
}

export default Cart