import { useEffect, useRef, useState } from "react";
import axios from "axios";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination , setPagination] = useState({});

  const [type, setType] = useState('create');
  const [tempCoupon, setTempCoupon] = useState({});

  const couponModal = useRef(null);
  const deleteModal = useRef(null);
  useEffect(() => {
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static'
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static'
    });
    getCoupons();
  }, [])

  const getCoupons = async(page = 1) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
  }

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  }
  const closeModal = () => {
    couponModal.current.hide();
  }
  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  }
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  }
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`);
      // console.log(res);
      if(res.data.success) {
        getCoupons();
        deleteModal.current.hide();
      }
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <div className='p-3'>
      <CouponModal 
        closeModal={closeModal} 
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type} 
      />
      <DeleteModal 
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id} 
      />
      <h3 className='text-xl font-semibold'>優惠券列表</h3>
      <hr className='my-4' />
      <div className='text-right mb-4'>
        <button 
          type='button' 
          className='bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600'
          onClick={() => openCouponModal('create', {})}
        >
          建立新優惠券
        </button>
      </div>
      <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='py-2 px-4'>標題</th>
            <th className='py-2 px-4'>折扣%</th>
            <th className='py-2 px-4'>到期日</th>
            <th className='py-2 px-4'>優惠碼</th>
            <th className='py-2 px-4'>啟用狀態</th>
            <th className='py-2 px-4'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((product) => (
            <tr key={product.id} className='border-b'>
              <td className='py-2 px-4'>{product.title}</td>
              <td className='py-2 px-4'>{product.percent}</td>
              <td className='py-2 px-4'>{new Date(product.due_date).toDateString()}</td>
              <td className='py-2 px-4'>{product.code}</td>
              <td className='py-2 px-4'>{product.is_enabled ? '啟用' : '未啟用'}</td>
              <td className='py-2 px-4 flex space-x-2'>
                <button 
                  type='button' 
                  className='bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600'
                  onClick={() => openCouponModal('edit', product)}
                >
                  編輯
                </button>
                <button
                  type='button'
                  className='bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600'
                  onClick={() => openDeleteModal(product)}
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  );
};

export default AdminCoupons;