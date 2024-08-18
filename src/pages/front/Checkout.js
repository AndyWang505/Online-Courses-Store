import { useForm } from "react-hook-form"
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Input, Select, CheckboxRadio } from "../../components/FormElements";
import axios from "axios";
import { useEffect, useState } from "react";

function Checkout() {
  const { cartData, getCart } = useOutletContext();
  const [ finalTotal, setFinalTotal] = useState(cartData.final_total);

  useEffect(() => {
    const savedCoupon = localStorage.getItem('coupon');
    if (savedCoupon) {
      const { finalTotal, isCouponCleared } = JSON.parse(savedCoupon);
      setFinalTotal(isCouponCleared ? cartData.total : finalTotal);
    }
    getCart();
  }, [getCart, cartData.final_total, cartData.total]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;
    console.log(name, email, tel, address);
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
      },
    };
    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form,
    );
    console.log(res);
    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
      {cartData.carts?.length > 0 ? (
        <>
          <h2 className="text-4xl font-bold mb-6">結帳</h2>
          <div className="md:flex md:flex-row-reverse">
            <div className="md:w-2/4 h-2/4 p-6 rounded-md bg-neutral-50 mb-6 md:mb-0 md:ml-6 drop-shadow">
              <h2 className="text-xl font-bold mb-4">訂單資訊</h2>
              <ul>
                {cartData?.carts?.map((item) => {
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
              </ul>
              <div>總額 NT$ {Math.floor(finalTotal)}</div>
            </div>
            <form action="" className="md:w-2/4 p-6 rounded-md bg-neutral-50 drop-shadow" onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-xl font-bold mb-4">購買人資訊</h2>
              <Input
                id="name"
                type="text"
                errors={errors}
                labelText="名稱"
                register={register}
                rules={{
                  required: '名稱為必填',
                  maxLength: {
                    value: 10,
                    message: '名稱長度不超過 10',
                  },
                }}
              />

              <Input
                id="address"
                type="text"
                errors={errors}
                labelText="地址"
                register={register}
                rules={{ required: '地址為必填項' }}
              />

              <Input
                id="tel"
                type="tel"
                errors={errors}
                labelText="電話"
                register={register}
                rules={{
                  required: '電話為必填',
                  minLength: {
                    value: 6,
                    message: '電話不少於 6 碼',
                  },
                  maxLength: {
                    value: 12,
                    message: '電話不超過 12 碼',
                  },
                }}
              />

              <Input
                id="email"
                type="email"
                errors={errors}
                labelText="Email"
                register={register}
                rules={{
                  required: 'Email 為必填',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email 格式不正確',
                  },
                }}
              />

              <h2 className="text-xl font-bold py-6 border-t">付款方式</h2>

              <Select
                id="paymentMethod"
                labelText="付款方式"
                register={register}
                errors={errors}
                rules={{ required: '付款方式為必填項' }}
              >
                <option value="creditCard">信用卡</option>
                <option value="linepay">Line Pay</option>
                <option value="bankTransfer">ATM轉帳</option>
                <option value="storepay">超商付款</option>
              </Select>

              <CheckboxRadio
                type='checkbox'
                name='isCheckForm'
                id='isCheckForm'
                value={true}
                register={register}
                errors={errors}
                labelText="確認同意本文件"
                rules={{ required: '必須勾選確認同意本文件' }}
              ></CheckboxRadio>

              <button type="submit" className="bg-orange-400 text-white p-2 rounded">
                送出
              </button>

            </form>

          </div>
        </>
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

export default Checkout;