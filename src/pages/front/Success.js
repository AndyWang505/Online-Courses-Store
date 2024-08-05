import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";

function Success() {
  const { orderId } = useParams();
  const [ orderData, setOrderData ] = useState({});
  const { getCart } = useOutletContext();

  const getOrder = async(orderId) => {
    try {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`);
      console.log(res);
      setOrderData(res.data.order);
    } catch (error) {
      console.log(error);
    }
  };

  const paying = useCallback(async (orderId) => {
    try {
      await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/pay/${orderId}`);
      getCart();
    } catch (error) {
      console.log(error);
    }
  },[getCart]);

  useEffect(() => {
    getOrder(orderId);
    if(paying) {
      paying(orderId);
    }
  }, [orderId, paying]);

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
              <p>已付款</p>
              <p>總計 NT$ {orderData.total}</p>
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