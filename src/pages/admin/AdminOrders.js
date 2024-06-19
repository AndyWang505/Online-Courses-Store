import { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination , setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});

  const orderModal = document.querySelector('#orderModal');
  const deleteModal = document.querySelector('#deleteModal');
  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async(page = 1) => {
    const orderRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`);
    console.log(orderRes);
    setOrders(orderRes.data.orders);
    setPagination(orderRes.data.pagination);
  }
  // Modal Controller
  function modalShow(modalTarget) {
    modalTarget.classList.remove('hidden');
    setTimeout(() => {
      modalTarget.classList.add('opacity-100');
    }, 20);
  }

  function modalHide(modalTarget) {
    modalTarget.classList.add('opacity-0');
    modalTarget.classList.remove('opacity-100');
    setTimeout(() => {
      modalTarget.classList.add('hidden');
    }, 300);
  }
  
  const openOrderModal = (product) => {
    setTempOrder(product);
    modalShow(orderModal);
  }
  const closeOrderModal = () => {
    modalHide(orderModal);
  }
  const closeDeleteModal = () => {
    modalHide(deleteModal);
  }
  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`);
      console.log(res);
      if(res.data.success) {
        getOrders();
        modalHide(deleteModal);
      }
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <div className='p-3'>
      <OrderModal 
        closeProductModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteModal 
        close={closeDeleteModal}
        text={tempOrder.title}
        handleDelete={deleteOrder}
        id={tempOrder.id} 
      />
      <h3 className='text-xl font-semibold'>訂單列表</h3>
      <hr className='my-4' />
      <div className='text-right mb-4'>
      </div>
      <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='py-2 px-4'>訂單 ID</th>
            <th className='py-2 px-4'>購買用戶</th>
            <th className='py-2 px-4'>訂單金額</th>
            <th className='py-2 px-4'>付款狀態</th>
            <th className='py-2 px-4'>付款日期</th>
            <th className='py-2 px-4'>留言訊息</th>
            <th className='py-2 px-4'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id} className='border-b'>
                <td className='py-2 px-4 text-center'>{order.id}</td>
                <td className='py-2 px-4 text-center'>{order.user?.name} {order.user?.email}</td>
                <td className='py-2 px-4 text-center'>${order.total}</td>
                <td className='py-2 px-4 text-center'>
                  {order.is_paid ? (
                      <span className='text-success fw-bold'>付款完成</span>
                    ) : (
                      '未付款'
                    )}</td>
                <td className='py-2 px-4 text-center'>{order.paid_date
                      ? new Date(order.paid_date * 1000).toLocaleString()
                      : '未付款'}</td>
                <td className='py-2 px-4 text-center'>{order.message}</td>
                <td className='py-2 px-4 flex space-x-2 justify-center'>
                  <button 
                    type='button' 
                    className='bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600'
                    onClick={() => openOrderModal('edit', order)}
                  >
                    查看
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
  );
};

export default AdminOrders;