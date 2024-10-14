import { useState } from "react"
import Input from "../../components/Input"
import useUser from "../../hooks/useUser"


function Login() {

  const {login} = useUser()

  const [form,setForm] = useState({
    identity:'',
    password:''
  })

  const handleSubmit = async (e) =>{
    e.preventDefault(e)
    await login(form)
  }

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
}

  return (
    <div className=" w-1/5 h-2/4 flex flex-col justify-center items-center bg-white rounded-lg gap-5">
    <div className=" flex justify-between mb-10">
    <p className="text-4xl font-bold w-full text-center">Login</p>
    </div>
    <form className="w-3/4 flex flex-col items-center gap-4" onSubmit={handleSubmit}>
      <Input label={'Username or Email'} name={'identity'} type={'text'} handleChange={handleChange} value={form.identity}/>
      <Input label={'Password'} name={'password'} type={'password'} handleChange={handleChange} value={form.password}/>
      <button className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 w-3/4 flex items-center justify-center hover:bg-[#16325B] hover:text-white ">Login</button>
    </form>
    </div>
  )
}

export default Login