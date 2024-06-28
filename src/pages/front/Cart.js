import axios from "axios";
import { Link, useOutletContext } from "react-router-dom";

function Cart() {
  const { cartData, getCart } = useOutletContext();

  const removeCartItem = async(id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
      getCart();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
      <h2 className="text-4xl font-bold mb-6">購物車</h2>
      <div className="flex">
        <div className="w-2/3 pt-6 px-6 rounded-md bg-neutral-50 drop-shadow">
          <div>
            <h3 className="text-xl mb-6">商品資訊</h3>
          </div>
          <ul>
            {cartData?.carts?.map((item) => {
              return (
                <li className="flex w-full py-6 border-t" key={item.id}>
                  <a href="/" className="flex w-2/3">
                    <div className="mr-3">
                      <img
                        src={item.product.imageUrl}
                        className="w-60 h-28 rounded-md border"
                        alt={item.product.title}
                      />
                    </div>
                    <h3 className="w-full mb-0 mt-3 text-lg font-bold">
                      <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{item.product.category}</div>
                      {item.product.title}
                    </h3>
                  </a>
                  <div className="flex w-1/3 justify-between items-center">
                    <div className="w-1/2">
                      <p>NT$ {item.final_total}</p>
                    </div>
                    <div className="w-1/2">
                      <button className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={() => removeCartItem(item.id)}>
                        刪除
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-1/3 h-2/4 p-6 rounded-md bg-neutral-50 ml-6 drop-shadow">
          <h2 className="text-xl pb-6 border-b">訂單明細</h2>
          <div className="p-3">
            <p>優惠券</p>
            <p>折扣</p>
            <p>3 件商品</p>
            <p className="text-lg font-bold">總計NT$ {cartData.final_total}</p>
          </div>
          <div className="w-full bg-orange-300 p-3 text-center rounded-md">
            <Link className="block" to={"/checkout"}>
              前往結帳
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;