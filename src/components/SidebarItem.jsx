/* eslint-disable react/prop-types */
const SidebarItem = ({ icon, text = "", active, onClick }) => {
    return (
        <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md transition duration-500
            ${
                active
                    ? "bg-[#FFDC7F] text-black cursor-pointer"
                    : text
                    ? "hover:bg-[#FFDC7F] hover:text-black text-white cursor-pointer"
                    : "hover:bg-[#FFDC7F] hover:text-black text-white cursor-pointer"
            }`}
            onClick={onClick}
        >
            {icon()}
            {text && <span className="w-52 ml-3">{text}</span>}
        </li>
    );
};

export default SidebarItem