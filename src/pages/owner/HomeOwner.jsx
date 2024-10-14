/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { changeStatusMenu, deleteMenu, getMenuOwner } from "../../api/api";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { button } from "../../style/Style";


function HomeOwner() {

    const [menu,setMenu] = useState([])
    const {token} = useUser()
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const responseMenu = await getMenuOwner(token)
            setMenu(responseMenu.data.menu)
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddButton = () => {
        navigate('/owner/addmenu')
    }

    const handleEditButton = (item) => {
      navigate(`/owner/editmenu/${item.id}`,{state:item})
    }

    const handleActive = async(id) =>{
      try {
        const response = await changeStatusMenu(token,id)
        getData()
      } catch (error) {
        console.log(error);
      }
    }

    const handleDelete = async(id) =>{
      try {
        const response = await deleteMenu(token,id)
        getData()
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() =>{
        getData()
    },[])

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start items-center bg-white rounded-lg gap-4 ">
      <div className="flex items-start w-full">
        <p className="text-4xl font-bold m-4">Menu</p>
        <button onClick={handleAddButton} className="bg-transparent text-[#16325B] border border-[#16325B] px-3 py-1 rounded-lg ml-auto mr-4 hover:bg-[#16325B] hover:text-white">Add Menu</button>
      </div>
      <div className="w-full overflow-auto scrollbar-hidden">
        <table className="table-auto w-full mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Menu</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
              menu.map((item,index)=>(
              <tr className="hover:bg-gray-100" key= {index}>
                      <td className="px-4 py-2 text-center">{item.name}</td>
                      <td className="px-4 py-2 text-center">{item.category.name}</td>
                      <td className="px-4 py-2 text-center"><span className={
                        item.status === "ACTIVE" ? "text-[#00B112] bg-[#ECFFEE] px-3 py-1 rounded-lg" : "text-[#B10000] bg-[#FFECEC] px-3 py-1 rounded-lg"}>{item.status}</span></td>
                      <td className="px-4 py-2 text-center">$ {item.price}</td>            
                      <td className="flex items-center justify-center pt-2 gap-2"><button className={`${button}`} onClick={() => handleActive(item.id)}>{item.status === "ACTIVE" ? "Inactive" : "Active"}</button><button onClick={() => handleEditButton(item)} className={`${button}`}>Edit</button><button onClick={()=>handleDelete(item.id)} className={`${button}`}>Delete</button></td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HomeOwner