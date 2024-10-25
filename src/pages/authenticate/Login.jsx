/* eslint-disable no-unused-vars */
import { useState } from "react"
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Input from "../../components/Input"
import useUser from "../../hooks/useUser"
import { validateLogin } from "../../utils/Validator"

function Login() {
  const { login } = useUser()
  const [formErrors, setFormErrors] = useState({})
  const [form, setForm] = useState({
    identity: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateLogin(form)
    if (errors) {
      setFormErrors(errors)
      toast.error('Please correct the errors in the form')
      return
    }
    try {
      await login(form)
    } catch (error) {
      toast.error('Login failed. Please try again.')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // Clear the error for this field when the user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' })
    }
  }

  return (
    <div className="w-1/5 h-2/4 flex flex-col justify-center items-center bg-white rounded-lg gap-5">
      <div className="flex justify-between mb-10">
        <p className="text-4xl font-bold w-full text-center">Login</p>
      </div>
      <form className="w-3/4 flex flex-col items-center gap-4" onSubmit={handleSubmit}>
        <Input 
          label={'Username or Email'} 
          name={'identity'} 
          type={'text'} 
          handleChange={handleChange} 
          value={form.identity} 
          error={formErrors.identity}
        />
        <Input 
          label={'Password'} 
          name={'password'} 
          type={'password'} 
          handleChange={handleChange} 
          value={form.password} 
          error={formErrors.password}
        />
        <button className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 w-3/4 flex items-center justify-center hover:bg-[#16325B] hover:text-white ">Login</button>
      </form>
    </div>
  )
}

export default Login
