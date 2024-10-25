import { buttonNav } from "../style/Style"
import { Link, useNavigate } from "react-router-dom"
import useUser from "../hooks/useUser"


function Navbar() {
  const navigate = useNavigate()
  const {logout,isUser} = useUser()
  const handleLogo = () =>{
    navigate('/')
  }

  return (
    <div className="bg-[#FFDC7F] text-[#16325B] flex h-12 w-full justify-between items-center px-4 gap-4">
      <a onClick={handleLogo}><img className="h-20 w-20" src="/src/assets/original.png"/></a>
        <ul className="flex gap-4">
        {
            isUser
                ? <li className={buttonNav} onClick={()=>logout()}> Logout</li>
                :(<>
                    <li className={buttonNav}><Link to={'/register'}>Sign Up</Link></li>
                    <li className={buttonNav}><Link to={'/login'}>Login</Link></li>
                </>)
        }
        </ul>
    </div>
  )
}

export default Navbar