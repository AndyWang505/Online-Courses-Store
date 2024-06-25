import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-green-200 sticky top-0 z-10 shadow-sm w-full">
      <div className="container mx-auto flex justify-between p-6">
        <NavLink className={({ isActive }) => 'default-class'} to="/">LOGO</NavLink>
        <nav>
          <ul className="flex">
            <li className="mx-5">
              <NavLink className={({ isActive }) => 'default-class'}>師資介紹</NavLink>
            </li>
            <li className="mx-5">
              <NavLink className={({ isActive }) => 'default-class'}>線上直播</NavLink>
            </li>
            <li className="mx-5">
              <NavLink className={({ isActive }) => 'default-class'} to="/products">購買課程</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink className={({ isActive }) => 'default-class'}>
          <FontAwesomeIcon icon={faCartShopping} className='text-xl' />
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar;