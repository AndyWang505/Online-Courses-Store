import { useEffect, useState } from "react";
import CouponModal from "../../components/CouponModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { getAllCoupons, deleteCouponItem } from "../../api/admin";
// Slice
import { useDispatch } from "react-redux";
import { createMessage } from "../../slice/messageSlice";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination , setPagination] = useState({});

  const [type, setType] = useState('create');
  const [tempCoupon, setTempCoupon] = useState({});

  const dispatch = useDispatch();

  const couponModal = document.querySelector('#couponModal');
  const deleteModal = document.querySelector('#deleteModal');
  useEffect(() => {
    getCoupons();
  }, [])

  const getCoupons = async(page = 1) => {
    const res = await getAllCoupons(page);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
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

  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    modalShow(couponModal);
  }
  const closeModal = () => {
    modalHide(couponModal);
  }
  const openDeleteModal = (product) => {
    setTempCoupon(product);
    modalShow(deleteModal);
  }
  const closeDeleteModal = () => {
    modalHide(deleteModal);
  }
  const deleteCoupon = async (id) => {
    try {
      const res = await deleteCouponItem(id);
      // console.log(res);
      if(res.data.success) {
        dispatch(createMessage(res.data));
        getCoupons();
        modalHide(deleteModal);
      }
    }catch(error) {
      console.error(error);
      dispatch(createMessage(error.response.data));
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
              <td className='py-2 px-4 text-center'>{product.title}</td>
              <td className='py-2 px-4 text-center'>{product.percent}</td>
              <td className='py-2 px-4 text-center'>{new Date(product.due_date).toDateString()}</td>
              <td className='py-2 px-4 text-center'>{product.code}</td>
              <td className='py-2 px-4 text-center'>{product.is_enabled ? '啟用' : '未啟用'}</td>
              <td className='py-2 px-4 flex space-x-2 justify-center'>
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