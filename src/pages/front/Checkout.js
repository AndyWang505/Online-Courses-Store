import { useForm } from "react-hook-form"
import { useOutletContext } from "react-router-dom";
import { Input, Select, CheckboxRadio } from "../../components/FormElements";
import axios from "axios";

function Checkout() {
  const { cartData } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onSubmit = async(data) => {
    const { name, email, tel, address } = data;    
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
  };

  return (
    <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
      <h2 className="text-xl font-bold mb-4">結帳</h2>
      <h2 className="text-xl font-bold mb-4">帳單地址</h2>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
          id="phone"
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
          labelText="信箱"
          register={register}
          rules={{
            required: 'Email 為必填',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email 格式不正確',
            },
          }}
        />

        <h2 className="text-xl font-bold mb-4">付款方式</h2>
        
        <Select
          id="paymentMethod"
          labelText="付款方式"
          register={register}
          errors={errors}
          rules={{ required: '付款方式為必填項' }}
        >
          <option value="creditCard">信用卡</option>
          <option value="paypal">PayPal</option>
          <option value="bankTransfer">銀行轉帳</option>
        </Select>

        <CheckboxRadio
          type='checkbox'
          name='isCheckForm'
          id='isCheckForm'
          value={true}
          register={register}
          errors={errors}
          rules={{ required: true }}
          labelText="確認同意本文件"
        ></CheckboxRadio>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          提交
        </button>

      </form>
      帳單地址
      付款方式
      訂單詳細資料
      勾選確認

      右邊完成結帳
    </div>
  )
}

export default Checkout;