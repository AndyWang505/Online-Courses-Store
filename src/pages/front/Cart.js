import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deleteCartItem, postCoupon } from "../../api/front"

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [couponCode, setCouponCode] = useState('');
  const [finalTotal, setFinalTotal] = useState(null);
  const [message, setMessage] = useState('');
  const [isCouponCleared, setIsCouponCleared] = useState(false);

  const removeCartItem = async (id) => {
    try {
      await deleteCartItem(id);
      getCart();
      localStorage.setItem('coupon', JSON.stringify({
        code: "",
        finalTotal: cartData.total,
        isCouponCleared : true,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  const getCoupon = async () => {
    try {
      const res = await postCoupon(couponCode);
      setFinalTotal(res.data.data.final_total);
      setMessage("已套用優惠券");
      getCart();
      localStorage.setItem('coupon', JSON.stringify({
        code: couponCode,
        finalTotal: Math.floor(res.data.data.final_total),
        isCouponCleared : false,
      }));
      setIsCouponCleared(false);
    } catch (error) {
      localStorage.setItem('coupon', JSON.stringify({
        code: "",
        finalTotal: cartData.total,
        isCouponCleared : true,
      }));
      setMessage("優惠碼有誤");
      console.log(error);
    }
  }

  const clearCoupon = async () => {
    localStorage.setItem('coupon', JSON.stringify({
      code: "",
      finalTotal: cartData.total,
      isCouponCleared : true,
    }));
    setCouponCode('');
    setFinalTotal(cartData.total);
    setMessage("");
    setIsCouponCleared(true);
    getCart();
  }

  useEffect(() => {
    const savedCoupon = localStorage.getItem('coupon');
    if (savedCoupon) {
      const { code, finalTotal, isCouponCleared } = JSON.parse(savedCoupon);
      setCouponCode(code);
      setFinalTotal(isCouponCleared ? cartData.total : finalTotal);
      setIsCouponCleared(isCouponCleared);
      setMessage(isCouponCleared ? '' : '優惠券已套用');
    }
  }, [cartData.total]);

  return (
    <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
      <h2 className="text-4xl font-bold mb-6">購物車</h2>
      {cartData?.carts && cartData.carts.length > 0 ? (
        <div className="md:flex md:flex-row-reverse">
          <div className="md:w-1/3 h-2/4 p-6 rounded-md bg-neutral-50 mb-6 md:mb-0 md:ml-6 drop-shadow">
            <h2 className="text-xl font-bold pb-6 border-b">訂單明細</h2>
            <div className="p-3">
              <div className="mb-2">
                <p>優惠券：</p>
                <input type="text"
                  className="p-1 rounded-md border"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="輸入優惠券碼" />
                <button type="button" className="p-1 ml-2 rounded-md bg-orange-300" onClick={getCoupon}>使用</button>
                <button type="button" className="p-1 ml-2 rounded-md bg-red-300" onClick={clearCoupon}>清除</button>
              </div>
              <p>{message}</p>
              <p>{cartData.carts.length} 件商品</p>
              <p>{!isCouponCleared && `折扣 NT$ ${cartData.total} - ${cartData.total - Math.floor(finalTotal)}`}</p>
              <p className="text-lg font-bold">總計NT$ {Math.floor(finalTotal)}</p>
            </div>
            <div className="w-full bg-orange-300 text-center rounded-md">
              <Link className="block p-3" to={"/checkout"}>
                前往結帳
              </Link>
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="pt-6 px-6 rounded-md bg-neutral-50 drop-shadow">
              <div>
                <h3 className="text-xl font-bold mb-6">商品資訊</h3>
              </div>
              <ul>
                {cartData?.carts?.map((item) => {
                  return (
                    <li className="md:flex w-full py-6 border-t" key={item.id}>
                      <Link to={`/products`} className="md:flex md:w-2/3">
                        <div className="md:mr-3">
                          <img
                            src={item.product.imageUrl}
                            className="md:w-60 md:h-28 rounded-md border"
                            alt={item.product.title}
                          />
                        </div>
                        <h3 className="w-full mb-0 mt-3 text-lg font-bold">
                          <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{item.product.category}</div>
                          {item.product.title}
                        </h3>
                      </Link>
                      <div className="flex md:w-1/3 justify-between items-center">
                        <div className="w-1/2">
                          <p>NT$ {item.product.price}</p>
                        </div>
                        <div className="w-1/2 flex flex-row-reverse md:block">
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
            <div className="flex justify-between p-6">
              <Link to="/products" className="">← 繼續選購</Link>
              <Link to="/">返回首頁 →</Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="text-center">您未加入任何商品</p>
          <div className="flex justify-between p-6">
            <Link to="/products" className="">← 前往購物</Link>
            <Link to="/">返回首頁 →</Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;