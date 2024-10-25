import { useState } from "react"
import Input from "../../components/Input"
import useUser from "../../hooks/useUser"

function EditProfileCustomer() {

    const {editProfile, isUser} = useUser()

    const[form,setForm] = useState({
        password:'',
        confirmPassword:'',
        firstName:isUser.firstName ,
        lastName:isUser.lastName,
        phone:isUser.phone
    }) 

    const handleSubmit = (e) => {
        e.preventDefault(e)
        editProfile(form)
    }

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
  return (
    <div className=" my-28 mx-auto w-2/4 h-[90%] flex flex-col justify-start items-center bg-white rounded-lg gap-4">
       
       <div className="w-full flex justify-between items-center pt-4 px-4">
          <p className="text-4xl ">Edit My Profile</p>
       </div>
       <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full px-4 my-6 flex flex-col gap-6">
                <div className="flex">
                    <Input label={"First Name"} name={"firstName"} type={"text"}  handleChange={handleChange} value={form.firstName}/>
                    <Input label={"Last Name"} name={"lastName"} type={"text"}  handleChange={handleChange} value={form.lastName}/>
                </div>
                <div className="flex">
                    <Input label={"Phone Number"} name={"phone"} type={"text"} handleChange={handleChange} value={form.phone}/>
                </div>
                <Input label={"Password"} name={"password"} type={"password"} handleChange={handleChange} value={form.password}/>
                <Input label={"Confirm Password"} name={"confirmPassword"} type={"password"} handleChange={handleChange} value={form.confirmPassword}/>
            </div>
            <div className="w-full flex justify-center mt-8">
                <button type="submit"
                className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 w-3/4 flex items-center justify-center hover:bg-[#16325B] hover:text-white ">
                Edit Profile
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditProfileCustomer