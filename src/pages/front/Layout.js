import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet></Outlet>
    <footer className="bg-[#4b3537]">
      <div className="container mx-auto flex justify-around text-white text-center p-6">
        <div>
          <h3>關於</h3>
          <ul>
            <li>leosdf dsfsw.</li>
            <li>leosdf dsfsw.</li>
            <li>leosdf dsfsw.</li>
          </ul>
        </div>
        <div>
          <h3>幫助</h3>
          <ul>
            <li>leosdf dsfsw.</li>
            <li>leosdf dsfsw.</li>
            <li>leosdf dsfsw.</li>
          </ul>
        </div>
        <div>
          <h3>其他連結</h3>
          <ul>
            <li>
              <Link to={"/login"}>
                後台
              </Link>
            </li>
            <li>前台</li>
            <li>購物</li>
          </ul>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Layout;