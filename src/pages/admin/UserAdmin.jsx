/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { button, statusGreen, statusRed } from "../../style/Style";

import {
  adminChangeStatusUser,
  adminDeleteUser,
  adminGetUser,
} from "../../api/adminApi";

function UserAdmin() {
  const [user, setUser] = useState([]);
  const  token  = localStorage.getItem('token')

  const getData = async () => {
    try {
      const responseUser = await adminGetUser(token);
      setUser(responseUser.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActive = async (id) => {
    try {
      const response = await adminChangeStatusUser(token, id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await adminDeleteUser(token, id);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col justify-start bg-white rounded-lg gap-4 ">
      <div className="flex items-start w-full">
        <p className="text-4xl font-bold m-4">Users</p>
      </div>
      <div className=" overflow-auto scrollbar-hidden">
        <table className="table-auto w-full mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {user.map((item, index) => (
              <tr className="hover:bg-gray-100" key={index}>
                <td className="px-4 py-2 text-center">{item.id}</td>
                <td className="px-4 py-2 text-center">{item.username}</td>
                <td className="px-4 py-2 text-center">
                  {item.firstName} {item.lastName}
                </td>
                <td className="px-4 py-2 text-center">{item.email}</td>
                <td className="px-4 py-2 text-center">{item.phone}</td>
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
                  {item.role !== "ADMIN" && (
                    <>
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
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserAdmin;
