/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { button, statusGreen, statusRed } from "../../style/Style";

import { adminChangeStatusMenu, adminDeleteMenu, adminGetMenu } from "../../api/adminApi";

function MenuAdmin() {
  const [menu, setMenu] = useState([]);
  const  token  = localStorage.getItem('token')

  const getData = async () => {
    try {
      const responseMenu = await adminGetMenu(token);
      setMenu(responseMenu.data.menu);
      console.log(responseMenu.data.menu);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = async (id) => {
    try {
      const response = await adminChangeStatusMenu(token, id);
      getData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await adminDeleteMenu(token, id);
      getData()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
      <div className="flex items-start w-full">
        <p className="text-4xl font-bold m-4">Menu</p>
      </div>
      <div className=" overflow-auto scrollbar-hidden">
        <table className="table-auto w-full mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Menu ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Store Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {menu.map((item, index) => (
              <tr className="hover:bg-gray-100" key={index}>
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">{item.name}</td>
                <td className="px-4 py-2 text-center">{item.category.name}</td>
                <td className="px-4 py-2 text-center">฿ {item.price}</td>
                <td className="px-4 py-2 text-center">{item.store.name}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={
                      item.status === "ACTIVE"
                        ? `${statusGreen}`
                        : `${statusRed}`
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="flex items-center justify-center pt-2 gap-2">
                  <button
                    className={`${button}`}
                    onClick={() => handleActive(item.id)}
                  >
                    {item.status === "ACTIVE" ? "Inactive" : "Active"}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={`${button}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MenuAdmin;
