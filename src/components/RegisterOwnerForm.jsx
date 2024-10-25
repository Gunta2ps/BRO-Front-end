import { useEffect, useState } from "react";
import Input from "./Input";
import useUser from "../hooks/useUser";
import useGuest from "../hooks/useGuest";
import { validateRegister } from "../utils/Validator";

function RegisterOwnerForm() {
  const { register } = useUser();
  const { categoryRestaurant, getCategoryRestaurantGuest } = useGuest();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    storeName: "",
    address: "",
    firstName: "",
    lastName: "",
    phone: "",
    categoryRestaurantId: 1,
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(form);
    if (validationErrors) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log(form);
      register(form);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategoryRestaurantGuest();
  }, []);

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full px-4 my-3 flex flex-col gap-6">
        <Input
          label="Username"
          name="username"
          type="text"
          handleChange={handleChange}
          value={form.username}
          error={errors.username}
        />
        <Input
          label="Store Name"
          name="storeName"
          type="text"
          handleChange={handleChange}
          value={form.storeName}
          error={errors.storeName}
        />
        <Input
          label="Address"
          name="address"
          type="text"
          handleChange={handleChange}
          value={form.address}
          error={errors.address}
        />
        <select
          onChange={handleChange}
          value={form.categoryRestaurantId}
          name="categoryId"
          className="bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-[#16325B] focus:outline-none scrollbar-hidden"
        >
          {categoryRestaurant.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="flex">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            handleChange={handleChange}
            value={form.firstName}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            handleChange={handleChange}
            value={form.lastName}
            error={errors.lastName}
          />
        </div>
        <div className="flex">
          <Input
            label="E-mail"
            name="email"
            type="text"
            handleChange={handleChange}
            value={form.email}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            name="phone"
            type="text"
            handleChange={handleChange}
            value={form.phone}
            error={errors.phone}
          />
        </div>
        <Input
          label="Password"
          name="password"
          type="password"
          handleChange={handleChange}
          value={form.password}
          error={errors.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          handleChange={handleChange}
          value={form.confirmPassword}
          error={errors.confirmPassword}
        />
      </div>
      <div className="w-full flex justify-center mt-4">
        <button
          type="submit"
          className="border border-[#16325B] rounded-lg transition-all text-[#16325B] text-sm py-2.5 w-3/4 flex items-center justify-center hover:bg-[#16325B] hover:text-white "
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default RegisterOwnerForm;