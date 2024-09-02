import { Link, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { getCartData } from "../../api/front"

function Layout() {
  const [cartData, setCartData] = useState({});
  
  const getCart = async() => {
    try {
      const res = await getCartData();
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getCart();
  }, [])

  return (
    <>
    <Navbar cartData={cartData} />
    <Outlet context={{ getCart, cartData }}></Outlet>
    <footer className="bg-slate-800">
      <div className="container mx-auto flex justify-around text-white text-center p-6">
        <div>
          <h3>關於</h3>
          <ul>
            <li>我們的使命</li>
            <li>授課講師</li>
            <li>聯絡我們</li>
          </ul>
        </div>
        <div>
          <h3>幫助</h3>
          <ul>
            <li>電話</li>
            <li>信箱</li>
            <li>社群</li>
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
      <p className="pb-6 text-center text-white">© 2024 AndyWang. 本網站為技術練習用途，不具任何商業行為。</p>
    </footer>
    </>
  )
}

export default Layout;