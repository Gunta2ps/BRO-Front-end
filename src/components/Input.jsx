/* eslint-disable react/prop-types */

function Input({label,name,type,handleChange,value}) {
  return (
    <div className="bg-white p-2 rounded-lg w-full">
        <div className="relative bg-inherit w-full">
            <input type={type} name={name} placeholder={label} onChange={handleChange} value={value}
            className="peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2
             ring-gray-300 focus:ring-[#16325B] focus:outline-none" />
            <label className='absolute cursor-text left-0 -top-3 text-sm text-gray-300 bg-inherit mx-1 px-1  
            peer-placeholder-shown:text-base peer-placeholder-shown:text-[#16325B] 
            peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all duration-300'>
                {label}
            </label>
        </div>
    </div>
  )
}

export default Input