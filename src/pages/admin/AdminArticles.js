import { useContext, useEffect, useState } from "react";
import ArticleModal from "../../components/ArticleModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { getAllArticle, getAllArticleItem, deleteArticleItem } from "../../api/admin";
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../../store/messageStore";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [pagination , setPagination] = useState({});

  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});

  const [, dispatch] = useContext(MessageContext);

  const articleModal = document.querySelector('#articleModal');
  const deleteModal = document.querySelector('#deleteModal');
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async(page = 1) => {
    const articleRes = await getAllArticle(page);
    setArticles(articleRes.data.articles);
    setPagination(articleRes.data.pagination);
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
  
  const openProductModal = async(type, product) => {
    const articleRes = await getAllArticleItem(product.id);
    setType(type);
    if(type === "create"){
      setTempProduct(product);
    }else {
      setTempProduct(articleRes.data.article);
    }
    modalShow(articleModal);
  }
  const closeProductModal = () => {
    modalHide(articleModal);
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
      const res = await deleteArticleItem(id);
      console.log(res);
      if(res.data.success) {
        getProducts();
        modalHide(deleteModal);
        handleSuccessMessage(dispatch, '已刪除資料');
      }
    }catch(error) {
      console.error(error);
      handleErrorMessage(dispatch, error);
    }
  }

  return (
    <div className='p-3'>
      <ArticleModal 
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
            <th className='py-2 px-4'>日期</th>
            <th className='py-2 px-4'>作者</th>
            <th className='py-2 px-4'>文章標題</th>
            <th className='py-2 px-4'>標籤</th>
            <th className='py-2 px-4'>公開狀態</th>
            <th className='py-2 px-4'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className='border-b'>
              <td className='py-2 px-4 text-center'>{new Date(article.create_at ).toLocaleDateString()}</td>
              <td className='py-2 px-4 text-center'>{article.author}</td>
              <td className='py-2 px-4 text-center'>{article.title}</td>
              <td className='py-2 px-4 text-center'>{article.tag}</td>
              <td className='py-2 px-4 text-center'>{article.isPublic ? '啟用' : '未啟用'}</td>
              <td className='py-2 px-4 flex space-x-2 justify-center'>
                <button 
                  type='button' 
                  className='bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600'
                  onClick={() => openProductModal('edit', article)}
                >
                  編輯
                </button>
                <button
                  type='button'
                  className='bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600'
                  onClick={() => openDeleteModal(article)}
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

export default AdminArticles;