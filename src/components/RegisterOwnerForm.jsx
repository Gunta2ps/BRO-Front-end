import {  useState } from "react";
import Input from "./Input";

import useUser from "../hooks/useUser";

function RegisterOwnerForm() {

    const {register} = useUser()


    const[form,setForm] = useState({
        email:'',
        password:'',
        confirmPassword:'',
        username:'',
        storeName:'',
        address:'',
        firstName:'',
        lastName:'',
        phone:''
    })

    const intialState = {
        email:'',
        password:'',
        confirmPassword:'',
        username:'',
        storeName:'',
        address:'',
        firstName:'',
        lastName:'',
        phone:''
    }

    const handleSubmit = (e) => {
        e.preventDefault(e)
        register(form)
        setForm(intialState)
    }

    const handleChange = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full px-4 my-6 flex flex-col gap-6">
        <Input label={"Username"} name={"username"} type={"text"} handleChange={handleChange} value={form.username}/>
        <Input label={"Store Name"} name={"storeName"} type={"text"} handleChange={handleChange} value={form.storeName}/>
        <Input label={"Address"} name={"address"} type={"text"}  handleChange={handleChange} value={form.address}/>
        <div className="flex">
          <Input label={"First Name"} name={"firstName"} type={"text"}  handleChange={handleChange} value={form.firstName}/>
          <Input label={"Last Name"} name={"lastName"} type={"text"}  handleChange={handleChange} value={form.lastName}/>
        </div>
        <div className="flex">
          <Input label={"E-mail"} name={"email"} type={"text"}  handleChange={handleChange} value={form.email}/>
          <Input label={"Phone Number"} name={"phone"} type={"text"} handleChange={handleChange} value={form.phone}/>
        </div>
        <Input label={"Password"} name={"password"} type={"password"} handleChange={handleChange} value={form.password}/>
        <Input label={"Confirm Password"} name={"confirmPassword"} type={"password"} handleChange={handleChange} value={form.confirmPassword}/>
      </div>
      <div className="w-full flex justify-center mt-8">
        <button type="submit"
        className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 w-3/4 flex items-center justify-center hover:bg-[#16325B] hover:text-white ">
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default RegisterOwnerForm;
