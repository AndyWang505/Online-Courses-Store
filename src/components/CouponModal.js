import axios from "axios";
import { useEffect, useState } from "react";

function CouponModal({ closeModal, getCoupons, type, tempCoupon }) {
  const [tempData, setTempData] = useState({
    title: '',
    is_enabled: 0,
    percent: 0,
    due_date: 0,
    code: '',
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (type === 'create'){
      setTempData({
        title: '',
        is_enabled: 0,
        percent: 0,
        due_date: 0,
        code: '',
      });
      setDate(new Date());
    } else if (type === 'edit') {
      setTempData(tempCoupon);
      setDate(new Date(tempCoupon.due_date));
    }
  }, [type, tempCoupon])

  const handleChange = (e) => {
    const { value, name } = e.target;
    if(['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value)
      })
    }else if(name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: +e.target.checked //boolean
      })
    }else {
      setTempData({
        ...tempData,
        [name]: value
      })
    }
  }

  const submit = async () => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = 'post';
      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = 'put';
      }
      const res = await axios[method](
        api,
        {
          data: {
            ...tempData,
            due_date: date.getTime()
          },
        },
      );
      console.log(res);
      closeModal();
      getCoupons();
    } catch (error) {
      console.error(error.response.data.message[0]);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 hidden opacity-0 transition-opacity duration-300 ease-in-out'
      tabIndex='-1'
      id='couponModal'
    >
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='relative bg-white rounded-lg shadow-xl w-full max-w-4xl'>
          <div className='flex items-start justify-between p-4 border-b rounded-t'>
            <h1 className='text-lg font-medium text-gray-900' id='exampleModalLabel'>
              {type === 'create' ? '建立新優惠券' : `編輯 ${tempData.title}`}
            </h1>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
              aria-label='Close'
              onClick={closeModal}
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='p-6 space-y-6'>
            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700' htmlFor='title'>
                標題
                <input
                  type='text'
                  id='title'
                  placeholder='請輸入標題'
                  name='title'
                  className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                  value={tempData.title}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='col-span-1 mb-2'>
                <label className='block text-sm font-medium text-gray-700' htmlFor='percent'>
                  折扣（%）
                  <input
                    type='text'
                    name='percent'
                    id='percent'
                    placeholder='請輸入折扣（%）'
                    className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                    value={tempData.percent}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className='col-span-1 mb-2'>
                <label className='block text-sm font-medium text-gray-700' htmlFor='due_date'>
                  到期日
                  <input
                    type='date'
                    id='due_date'
                    name='due_date'
                    placeholder='請輸入到期日'
                    className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                    value={`${date.getFullYear().toString()}-${(
                      date.getMonth() + 1
                    )
                      .toString()
                      .padStart(2, 0)}-${date
                      .getDate()
                      .toString()
                      .padStart(2, 0)}`}
                    onChange={(e) => {
                      setDate(new Date(e.target.value));
                    }}
                  />
                </label>
              </div>
              <div className='col-span-1 mb-2'>
                <label className='block text-sm font-medium text-gray-700' htmlFor='code'>
                  優惠碼
                  <input
                    type='text'
                    id='code'
                    name='code'
                    placeholder='請輸入優惠碼'
                    className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                    value={tempData.code}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <label className='form-check-label' htmlFor='is_enabled'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
                checked={!!tempData.is_enabled}
                onChange={handleChange}
              />
              是否啟用
            </label>
          </div>
          <div className='flex items-center justify-end p-4 border-t border-gray-200 rounded-b'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
              onClick={closeModal}
            >
              關閉
            </button>
            <button
              type='button'
              className='ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              onClick={submit}
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>

  )

};

export default CouponModal;