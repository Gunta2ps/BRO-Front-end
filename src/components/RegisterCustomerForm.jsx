import { useState } from "react";
import Input from "./Input";
import useUser from "../hooks/useUser";
import { validateRegisterCustomer } from "../utils/Validator";
import { toast} from "react-toastify";

function RegisterCustomerForm() {
    const { register } = useUser();

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        firstName: '',
        lastName: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateRegisterCustomer(form);
        if (validationErrors) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            toast.success('Register Customer Successfully');
            register(form);
            console.log(form);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full px-4 my-6 flex flex-col gap-6">
                <Input label="Username" name="username" type="text" handleChange={handleChange} value={form.username} error={errors.username} />

                <div className="flex">
                    <Input label="First Name" name="firstName" type="text" handleChange={handleChange} value={form.firstName} error={errors.firstName}/>
                    <Input label="Last Name" name="lastName" type="text" handleChange={handleChange} value={form.lastName} error={errors.lastName}/>
                </div>
                <div className="flex">
                    <Input label="E-mail" name="email" type="text" handleChange={handleChange} value={form.email} error={errors.email} />
                    <Input label="Phone Number" name="phone" type="text" handleChange={handleChange} value={form.phone} error={errors.phone}/>
                </div>
                <Input label="Password" name="password" type="password" handleChange={handleChange} value={form.password} error={errors.password} />
                <Input label="Confirm Password" name="confirmPassword" type="password" handleChange={handleChange} value={form.confirmPassword} error={errors.confirmPassword} />
            </div>
            <div className="w-full flex justify-center mt-8">
                <button type='submit'
                    className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 w-3/4 flex items-center justify-center hover:bg-[#16325B] hover:text-white ">
                    Sign Up
                </button>
            </div>
        </form>
    );
}

export default RegisterCustomerForm;
