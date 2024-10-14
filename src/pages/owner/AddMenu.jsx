import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { getCategory } from "../../api/api";
import useUser from "../../hooks/useUser";

function AddMenu() {
  const [category, setCategory] = useState([]);
  const {addMenu} = useUser()
  const [form, setForm] = useState({
    name: "",
    price: 0,
    categoryId: 1,
  });

  const getData = async () => {
    try {
      const responseCategory = await getCategory();
      setCategory(responseCategory.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(e)
    addMenu(form)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full">
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s" />
          </div>
          <div className="px-6 w-full py-10">
            <Input label={"Menu Name"} name={"name"} type={"text"} handleChange={handleChange} value={form.name} />
            <Input label={"Price"} name={"price"} type={"text"} handleChange={handleChange} value={form.price}/>
            <div className="bg-white p-2 rounded-lg w-full">
              <div className="relative bg-inherit w-full">
                <select onChange={handleChange} name={form.categoryId} className="bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-[#16325B] focus:outline-none scrollbar-hidden">
                  {category.map((item) => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="py-1 px-24  bg-[#16325B] text-white rounded-md hover:bg-[#1D5E8C]">
            Add Menu
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMenu;
