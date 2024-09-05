import { useCallback, useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { getOrderData, postPay } from "../../api/front";
// Slice
import { useDispatch, useSelector } from "react-redux";
import { setIsCouponCleared } from "../../slice/orderSlice";

function Success() {
  const { orderId } = useParams();
  const [ userData, setUserData ] = useState({
    address: '',
    email: '',
    name: '',
    tel: '',
  })
  const [ orderData, setOrderData ] = useState({});
  const { cartData, getCart } = useOutletContext();
  const [ finalTotal, setFinalTotal] = useState(cartData.final_total);
  // get orderSlice isCouponCleared
  const isCouponCleared = useSelector((state) => state.order.isCouponCleared);
  console.log(isCouponCleared);
  // const order = useSelector((state) => state.order);
  // console.log(order);
  const dispatch = useDispatch();
  
  const getOrder = useCallback(async(orderId, isCouponCleared) => {
    try {
      const res = await getOrderData(orderId);
      setOrderData(res.data.order);
      // dispatch(storeOrder(res.data.order));
      console.log(res);
      setUserData(res.data.order.user)
      if (isCouponCleared) {
        setFinalTotal(res.data.order.products[orderId].total);
      } else {
        setFinalTotal(res.data.order.products[orderId].final_total);
      }
      dispatch(setIsCouponCleared(true))
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const paying = useCallback(async (orderId) => {
    try {
      // console.log(orderId);
      await postPay(orderId);
      getCart();
    } catch (error) {
      console.log(error);
    }
  },[getCart]);

  useEffect(() => {    
    getOrder(orderId, isCouponCleared);
    if(paying) {
      paying(orderId);
    }
  }, [getOrder, orderId, paying, isCouponCleared]);

  return (
    <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
      <h2 className="text-4xl font-bold mb-6">購買完成</h2>
      <div className="md:flex md:flex-row-reverse">
        <div className="md:w-2/4 h-2/4 p-6 rounded-md bg-neutral-50 mb-6 md:ml-6 drop-shadow">
          <h2 className="text-xl font-bold mb-4">訂單細節</h2>
          <ul>
            {Object.values(orderData?.products || {}).map((item) => {
              return (
                <li className="md:flex md:grid md:grid-cols-3 w-full py-6 border-t" key={item.id}>
                  <div className="md:mr-3">
                    <img
                      src={item.product.imageUrl}
                      className="md:w-50 md:h-24 rounded-md border"
                      alt={item.product.title}
                    />
                  </div>
                  <h3 className="w-full mb-0 mt-3 text-md font-bold">
                    <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{item.product.category}</div>
                    <br />
                    {item.product.title}
                  </h3>
                  <div className="flex justify-between items-center md:text-center">
                    <div className="w-full">
                      <p>NT$ {item.product.price}</p>
                    </div>
                  </div>
                </li>
              );
            })}
            <li className="w-full py-6 border-t">
              <h3>姓名：{userData.name}</h3>
              <p>Email：{userData.email}</p>
              <p>電話：{userData.tel}</p>
              <p>地址：{userData.address}</p>
              <hr className="my-3" />
              <p>已付款</p>
              <p>{isCouponCleared ? '' : '已用優惠券折價'}</p>
              <p>總計 NT$ {Math.floor(finalTotal)}</p>
            </li>
          </ul>
        </div>
        <div className="md:w-2/4">
          <div className="p-6 rounded-md bg-neutral-50 drop-shadow">
            感謝您的購買！開始您的學習之旅吧！
          </div>
          <div className="flex justify-between p-6">
            <Link to="/products" className="">← 繼續選購</Link>
            <Link to="/">返回首頁 →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Success;