import { button, disableButton, statusBlue, statusGreen, statusRed, statusYellow } from "../../style/Style"

function OrderAdmin() {
  const bookingData = [
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"DONE"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CONFIRM"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CANCEL"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"PENDING"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CANCEL"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CONFIRM"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CANCEL"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CONFIRM"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CANCEL"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"CONFIRM"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"DONE"},
    {bookingId:15426,date:"20/10/67",customer:'John Doe',table:'Papaya salad, Burger, Wine',guest:350.00,status:"DONE"},
]
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
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
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
                            <td className="px-4 py-2 text-center">{item.guest.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center"><span className={
                                 item.status === "CONFIRM"  ? `${statusGreen}` :item.status === "DONE" ? `${statusBlue}` :item.status === "PENDING" ? `${statusYellow}` : `${statusRed}` }>{item.status}</span></td>
                            <td className="flex items-center justify-center pt-2 gap-2"><button className={item.status === "DONE" || item.status === "CANCEL" || item.status === "CONFIRM" ? `${disableButton}` :`${button}`}>Confirm</button><button className={item.status === "DONE" || item.status === "CANCEL" || item.status === "CONFIRM" ? `${disableButton}` :`${button}`}>Cancel</button></td>
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