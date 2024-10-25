import { Receipt, Wallet } from "lucide-react"
import { button } from "../../style/Style"


function Payment() {
  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex  bg-white rounded-lg gap-4 ">
        <div className="w-2/4 m-6">
        <div className="flex gap-3">
          <div className="bg-[#16325B] rounded-xl w-10 h-10 flex justify-center items-center">
            <Wallet size={32} color="white" />
          </div>
          <span className="text-2xl font-bold">Payment</span>
        </div>
        <div className="flex items-center justify-center my-10">
          
        </div>
        <button className={`${button}`}>Payment</button>
      </div>
      <div className="w-2/4 m-6 flex justify-center">
        <div className="bg-[#BDE7FF] w-3/4 h-3/4 rounded-xl flex flex-col">
          <div className="p-6 text-2xl font-bold text-[#253058]">Order Detail</div>
            <div className="w-3/4 flex justify-between self-center gap-2 text-[#253058]"><span>Menu</span> <span>Quantity</span> <span>Price</span></div>
          <div className=" bg-[#8FD9FF] w-3/4 h-2/4 rounded-xl flex self-center">
            <div className="w-full flex flex-col gap-2 overflow-auto scrollbar-hidden">
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div>
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div>
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div>
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div>
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div>
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div> 
              <div className="flex justify-between p-2 text-[#253058]"><span>Cake</span> <span>1</span> <span>10.00$</span></div> 
            </div>
          </div>
          <div className="p-6 text-[#253058]">Total Price</div>
          <div className="flex w-full justify-between px-6">
            <div className="text-4xl font-semibold text-[#253058]">$ 70.00</div>
            <div><Receipt size={48} color="#253058"/></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment