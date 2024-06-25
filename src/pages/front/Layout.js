import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

function Layout() {
  return (
    <>
    <Navbar />
    <Outlet></Outlet>
    <footer className="bg-gray-800">
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
            <li>後台</li>
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