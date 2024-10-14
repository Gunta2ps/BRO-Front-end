import { buttonNav } from "../style/Style"
import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"


function Navbar() {

  const {logout,isLogin} = useUser()

  return (
    <div className="bg-[#FFDC7F] text-[#16325B] flex h-12 w-full justify-between items-center px-4 gap-4">
      <a><Link to={'/'}><img className="h-20 w-20" src="/src/assets/original.png"/></Link></a>
        <ul className="flex gap-4">
        {
            isLogin
                ? <li className={buttonNav} onClick={()=>logout()}> <Link to={'/'}>Logout</Link></li>
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