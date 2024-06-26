import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import logo from '../assets/mainlogo.png';

function Navbar() {
  return (
    <header className="bg-neutral-50 bg-opacity-75 sticky top-0 z-10 shadow-md w-full py-2">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink className={({ isActive }) => 'default-class'} to="/">
          <img src={logo} alt="logo" className='h-16' />
        </NavLink>
        <nav>
          <ul className="flex h-full">
            <li className="mx-2 rounded-md transform hover:-translate-y-1 hover:bg-neutral-600 hover:bg-opacity-50 navbar navbar-hover">
              <NavLink className={({ isActive }) => 'default-class block p-3 text-neutral-600 hover:text-slate-50 navbar navbar-hover'}>師資介紹</NavLink>
            </li>
            <li className="mx-2 rounded-md transform hover:-translate-y-1 hover:bg-neutral-600 hover:bg-opacity-50 navbar navbar-hover">
              <NavLink className={({ isActive }) => 'default-class block p-3 text-neutral-600 hover:text-slate-50 navbar navbar-hover'}>線上直播</NavLink>
            </li>
            <li className="mx-2 rounded-md transform hover:-translate-y-1 hover:bg-neutral-600 hover:bg-opacity-50 navbar navbar-hover">
              <NavLink className={({ isActive }) => 'default-class block p-3 text-neutral-600 hover:text-slate-50 navbar navbar-hover'} to="/products">購買課程</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink className={({ isActive }) => 'default-class'}>
          <FontAwesomeIcon icon={faCartShopping} className='text-2xl' />
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar;