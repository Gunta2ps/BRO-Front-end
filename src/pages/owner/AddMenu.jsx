import { useEffect, useRef, useState } from "react";
import Input from "../../components/Input";
import { getCategory, previewPhoto } from "../../api/api";
import useOwner from "../../hooks/useOwner";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

function AddMenu() {

  const [category, setCategory] = useState([]);
  const {addMenu} = useOwner()
  const [url,setUrl] = useState("")
  const token = localStorage.getItem('token')
  const [form, setForm] = useState({
    name: "",
    price: 0,
    categoryId: 1,
    image:'',
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
    if (form.price > 0 && form.name != "") {
      setForm({...form,image:url})
      addMenu({...form,image:url})
    }else{
      toast.error('Add Menu Failed')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const fileInputRef = useRef(null);

    const handleCameraClick = () => {
      fileInputRef.current.click();
    };

    const handleImage = async(e) =>{
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      const url = await previewPhoto(formData,token)
      setUrl(url.data.photo);
      console.log(form);
    }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full">
        <div className="px-6 w-full py-10">
              <div className=" pb-6 flex justify-center">
                <img src={url ?`${url}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUqjQa7JXYZuqmiRPcQeuvyU0k8f-S-zGwA&s"} />
              </div>
              <div onClick={handleCameraClick} className="bg-[#16325B] text-white flex  px-2 py-2 mb-6 rounded-full relative cursor-pointer">
                  <Camera color="white"/> Add Photo
                  <input type="file" ref={fileInputRef} onChange={handleImage} name="image" className="hidden" />
                </div>
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
