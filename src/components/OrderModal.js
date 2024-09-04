import { useEffect, useState } from "react";
import { editOrderItem } from "../api/admin";
// Slice
import { useDispatch } from "react-redux";
import { createMessage } from "../slice/messageSlice";

function OrderModal({ closeProductModal, getOrders, tempOrder }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    is_paid: '',
    status: 0,
    ...tempOrder,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      status: tempOrder.status,
    });
    console.log(tempOrder);
  }, [tempOrder]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (['is_paid'].includes(name)) {
      setTempData((preState) => ({ ...preState, [name]: checked }));
    } else {
      setTempData((preState) => ({ ...preState, [name]: value }));
    }
  };

  const submit = async() => {
    setIsLoading(true);
    try {
      const res = await editOrderItem(tempOrder.id, { ...tempData });
      // console.log(tempData);
      dispatch(createMessage(res.data));
      setIsLoading(false);
      closeProductModal();
      getOrders();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      dispatch(createMessage(error.response.data));
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 hidden opacity-0 transition-opacity duration-300 ease-in-out'
      tabIndex='-1'
      id='orderModal'
    >
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='relative bg-white rounded-lg shadow-xl w-full max-w-4xl'>
          <div className='flex items-start justify-between p-4 border-b rounded-t'>
            <h1 className='text-lg font-medium text-gray-900' id='exampleModalLabel'>
              {`編輯 ${tempData.id}`}
            </h1>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
              aria-label='Close'
              onClick={closeProductModal}
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
              <label className='block text-sm font-medium text-gray-700' htmlFor='email'>
                Email
                <input
                  type='email'
                  readOnly
                  id='email'
                  className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2'
                  defaultValue={tempOrder?.user?.email}
                />
              </label>
            </div>
            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700' htmlFor='name'>
                訂購者
                <input
                  type='text'
                  readOnly
                  id='name'
                  className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2'
                  defaultValue={tempOrder?.user?.name}
                />
              </label>
            </div>
            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700' htmlFor='address'>
                地址
                <input
                  type='text'
                  readOnly
                  id='address'
                  className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2'
                  defaultValue={tempOrder?.user?.address}
                />
              </label>
            </div>
            <div className='mb-2'>
              <label className='block text-sm font-medium text-gray-700' htmlFor='message'>
                留言
                <textarea
                  readOnly
                  id='message'
                  className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 p-2'
                  defaultValue={tempOrder.message}
                />
              </label>
            </div>
            {tempOrder.products && (
              <table className='table-auto w-full mb-4'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='py-2 px-4 text-left'>品項名稱</th>
                    <th className='py-2 px-4 text-left'>數量</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(tempOrder.products).map((cart) => (
                    <tr key={cart.id} className='border-b'>
                      <td className='py-2 px-4'>{cart.product.title}</td>
                      <td className='py-2 px-4'>{cart.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className='border-t-2 border-gray-200 py-2 px-4 text-right' colSpan='2'>
                      總金額 ${tempOrder.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
            <div>
              <h5 className='text-lg font-semibold mt-4'>修改訂單狀態</h5>
              <div className='mb-4'>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox'
                    name='is_paid'
                    checked={!!tempData.is_paid}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className='ml-2'>
                    付款狀態 ({tempData.is_paid ? '已付款' : '未付款'})
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-end p-4 border-t border-gray-200 rounded-b'>
            <button
              type='button'
              className='px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600'
              onClick={closeProductModal}
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
  );  
};

export default OrderModal;