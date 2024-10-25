import { useEffect, useRef, useState } from "react"
import Input from "../../components/Input"
import { getCategory, previewPhoto } from "../../api/api"
import { useLocation } from "react-router-dom"
import useOwner from "../../hooks/useOwner";
import { Camera } from "lucide-react";
import { toast } from "react-toastify";

function EditMenu() {

    const location = useLocation()
    const {editMenuFunction} = useOwner()
    const [category,setCategory] = useState([])
    const [url,setUrl] = useState("")
    const token = localStorage.getItem('token')
    const [form, setForm] = useState({
        name: location.state.name,
        price: location.state.price,
        categoryId: location.state.category.id,
        image:''
      });

    const getData = async () => {
      try {
        const responseCategory = await getCategory()
        setCategory(responseCategory.data)
      } catch (error) {
        console.log(error);
      }
    }

    
  const handleSubmit = async (e) => {
    e.preventDefault(e)
    if (form.price > 0 && form.name != "") {
      setForm({ ...form, image: url });
      await editMenuFunction({ ...form, image: url },location.state.id)
    }else{
      toast.error('Edit Menu Failed')
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
    }
  
    console.log(location.state);
    useEffect(() => {
      getData()
    },[])
  
    return (
        <div className=" my-28 w-[98%] h-[98%] p-4 flex flex-col bg-white rounded-lg gap-4 ">
          <form onSubmit={handleSubmit}>
            <div className="flex w-full">
             
              <div className="px-6 w-full py-10">
              <div className=" pb-6 flex justify-center">
                <img src={url ?`${url}`:`${location.state.image}`} />
              </div>
                <Input label={"Menu Name"} name={"name"} type={"text"} handleChange={handleChange} value={form.name} />
                <Input label={"Price"} name={"price"} type={"text"} handleChange={handleChange} value={form.price}/>
                <div className="bg-white p-2 rounded-lg w-full">
                  <div className="relative bg-inherit w-full">
                    <select onChange={handleChange} value={form.categoryId} name="categoryId" className="bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-[#16325B] focus:outline-none scrollbar-hidden">
                      {category.map((item) => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div onClick={handleCameraClick} className="bg-[#16325B] text-white flex  px-2 py-2 rounded-full relative cursor-pointer">
                  <Camera color="white"/> Add Photo
                  <input type="file" ref={fileInputRef} onChange={handleImage} name="image" className="hidden" />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="py-1 px-24  bg-[#16325B] text-white rounded-md hover:bg-[#1D5E8C]">
                Edit Menu
              </button>
            </div>
          </form>
        </div>
      );
    }
  

export default EditMenu