import { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination , setPagination] = useState({});

  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});

  const productModal = document.querySelector('#productModal');
  const deleteModal = document.querySelector('#deleteModal');
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async(page = 1) => {
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
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
  
  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    modalShow(productModal);
  }
  const closeProductModal = () => {
    modalHide(productModal);
  }
  const openDeleteModal = (product) => {
    setTempProduct(product);
    modalShow(deleteModal);
  }
  const closeDeleteModal = () => {
    modalHide(deleteModal);
  }
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`);
      console.log(res);
      if(res.data.success) {
        getProducts();
        deleteModal.classList.remove('d-block');
        deleteModal.classList.add('d-none');
      }
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <div className='p-3'>
      <ProductModal 
        closeProductModal={closeProductModal} 
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type} 
      />
      <DeleteModal 
        close={closeDeleteModal}
        text={tempProduct.title}
        handleDelete={deleteProduct}
        id={tempProduct.id} 
      />
      <h3 className='text-xl font-semibold'>產品列表</h3>
      <hr className='my-4' />
      <div className='text-right mb-4'>
        <button 
          type='button' 
          className='bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600'
          onClick={() => openProductModal('create', {})}
        >
          建立新商品
        </button>
      </div>
      <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4'>
        <thead className='bg-gray-100'>
          <tr>
            <th className='py-2 px-4'>分類</th>
            <th className='py-2 px-4'>課程名稱</th>
            <th className='py-2 px-4'>售價</th>
            <th className='py-2 px-4'>啟用狀態</th>
            <th className='py-2 px-4'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className='border-b'>
              <td className='py-2 px-4 text-center'>{product.category}</td>
              <td className='py-2 px-4 text-center'>{product.title}</td>
              <td className='py-2 px-4 text-center'>{product.price}</td>
              <td className='py-2 px-4 text-center'>{product.is_enabled ? '啟用' : '未啟用'}</td>
              <td className='py-2 px-4 flex space-x-2 justify-center'>
                <button 
                  type='button' 
                  className='bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600'
                  onClick={() => openProductModal('edit', product)}
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
      <Pagination pagination={pagination} changePage={getProducts} />
    </div>
  );
};

export default AdminProducts;