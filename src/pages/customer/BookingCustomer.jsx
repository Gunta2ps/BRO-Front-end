import { statusBlue, statusGreen, statusRed, statusYellow } from "../../style/Style"

function BookingCustomer() {
    const bookingData = [
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"DONE"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"PENDING"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CANCEL"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"CONFIRM"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"DONE"},
        {bookingId:15426,date:"20/10/67",store:'Hybrid',table:1,guest:10,status:"DONE"},
    ]
  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
          <div className="flex items-start w-full">
            <p className="text-4xl font-bold m-4">Booking</p>
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
                    {
                        bookingData.map((item,index)=>(

                            <tr className="hover:bg-gray-100" key={index}>
                                <td className="px-4 py-2 text-center">{item.bookingId}</td>
                                <td className="px-4 py-2 text-center">{item.date}</td>
                                <td className="px-4 py-2 text-center">{item.store}</td>
                                <td className="px-4 py-2 text-center">{item.table}</td>
                                <td className="px-4 py-2 text-center">{item.guest}</td>
                                <td className="px-4 py-2 text-center"><span className={
                                     item.status === "CONFIRM"  ? `${statusGreen}` :item.status === "DONE" ? `${statusBlue}` :item.status === "PENDING" ? `${statusYellow}` : `${statusRed}` }>{item.status}</span></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
          </div>
        </div>
  )
}

export default BookingCustomer