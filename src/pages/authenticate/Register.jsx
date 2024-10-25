import ToggleButton from "../../components/ToogleButton";
import { useState } from "react";
import RegisterCustomerForm from "../../components/RegisterCustomerForm";
import RegisterOwnerForm from "../../components/RegisterOwnerForm";


function RegisterCustomer() {

  const [isChecked,setIsChecked] = useState(false)
  const handleToggle = () => {
    console.log('Before Click '+isChecked);
    setIsChecked(!isChecked);
  };
  console.log('After Click '+isChecked);

  return (
    <>
    <div className=" my-28 mx-auto w-2/4 h-[98%] flex flex-col justify-start items-center bg-white rounded-lg gap-4">
       
       <div className="w-full flex justify-between items-center pt-4 px-4">
        {isChecked
          ?<p className="text-4xl ">Sign Up Owner</p>
          :<p className="text-4xl ">Sign Up Customer</p>
        }
         
         <p>Customer <span> <ToggleButton handleToggle={handleToggle} isChecked={isChecked} />Owner</span></p>
       </div>
       
      {isChecked ? (
        <RegisterOwnerForm/>
      ) : (
        <RegisterCustomerForm/>
      )}
       
     </div>
    </>
  );
}
export default RegisterCustomer