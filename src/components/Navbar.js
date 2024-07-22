import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import logo from '../assets/mainlogo.png';

function Navbar({ cartData }) {
  return (
    <header className="bg-neutral-50 bg-opacity-75 sticky top-0 z-10 shadow-md w-full py-2">
      <div className="container mx-auto flex items-center justify-between px-6">
        <NavLink className={({ isActive }) => 'default-class'} to="/">
          <img src={logo} alt="logo" className='h-12 md:h-16' />
        </NavLink>
        <nav>
          <ul className="flex h-full">
            <li className="mx-2 text-sm md:text-base rounded-md transform hover:-translate-y-1 hover:bg-neutral-600 hover:bg-opacity-50 navbar navbar-hover">
              <NavLink className={({ isActive }) => 'default-class block p-2 md:p-3 text-neutral-600 hover:text-slate-50 navbar navbar-hover'} to="/about">關於我們</NavLink>
            </li>
            <li className="mx-2 text-sm md:text-base rounded-md transform hover:-translate-y-1 hover:bg-neutral-600 hover:bg-opacity-50 navbar navbar-hover">
              <NavLink className={({ isActive }) => 'default-class block p-2 md:p-3 text-neutral-600 hover:text-slate-50 navbar navbar-hover'} to="/products">所有課程</NavLink>
            </li>
            <li className="mx-2 text-sm md:text-base rounded-md transform hover:-translate-y-1 hover:bg-neutral-600 hover:bg-opacity-50 navbar navbar-hover">
              <NavLink className={({ isActive }) => 'default-class block p-2 md:p-3 text-neutral-600 hover:text-slate-50 navbar navbar-hover'} to="/articles">心得牆</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink className={({ isActive }) => 'default-class group hidden md:block'} to="/cart">
          <FontAwesomeIcon icon={faCartShopping} className='text-2xl relative transform group-hover:-translate-y-1 navbar navbar-hover' />
          {
            cartData?.carts?.length > 0 && (
              <span className='w-5 h-5 rounded-full bg-red-500 text-slate-50 text-xs absolute top-3 translate-x-3/4 flex items-center justify-center group-hover:-translate-y-1 navbar navbar-hover'>
                {cartData?.carts?.length}
              </span>
            )
          }
        </NavLink>
        {/* mobile */}
        <NavLink className={({ isActive }) => 'default-class group fixed bottom-5 right-5 md:hidden'} to="/cart">
          <FontAwesomeIcon icon={faCartShopping} className='text-2xl relative transform group-hover:-translate-y-1 navbar navbar-hover' />
          {
            cartData?.carts?.length > 0 && (
              <span className='w-5 h-5 rounded-full bg-red-500 text-slate-50 text-xs absolute top-3 translate-x-3/4 flex items-center justify-center group-hover:-translate-y-1 navbar navbar-hover'>
                {cartData?.carts?.length}
              </span>
            )
          }
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar;