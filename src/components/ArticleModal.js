import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MessageContext, handleSuccessMessage, handleErrorMessage } from "../store/messageStore";

function ArticleModal({ closeProductModal, getProducts, type, tempProduct }) {
  const [tempData, setTempData] = useState({
    "title": "",
    "description": "",
    "image": "",
    "tag": [],
    "create_at": Date.now(),
    "author": "",
    "content": "",
    "isPublic": false,
  });
  const [, dispatch] = useContext(MessageContext);

  useEffect(() => {
    if (type === 'create'){
      setTempData({
        "title": "",
        "description": "",
        "image": "",
        "tag": [],
        "create_at": Date.now(),
        "author": "",
        "content": "",
        "isPublic": false,
      })
    } else{
      setTempData(tempProduct);
    }
  }, [type, tempProduct]);

  const handleChange = (e) => {
    console.log(tempData);
    const { value, name } = e.target;
    if(name === 'isPublic') {
      setTempData({
        ...tempData,
        [name]: e.target.checked
      })
    }else {
      setTempData({
        ...tempData,
        [name]: value
      })
    }
  };

  const submit = async() => {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article`;
      let method = 'post';
      if(type === 'edit'){
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${tempProduct.id}`;
        method = 'put';
      }
      const res = await axios[method](
        api,
        {
          data: tempData
        }
      );
      console.log(res);
      handleSuccessMessage(dispatch, res);
      closeProductModal();
      getProducts();
    } catch (error) {
      console.error(error.response.data.message);
      handleErrorMessage(dispatch, error);
    }
  };

  const uploadFile = async (file) => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('file-to-upload', file)
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`, formData);
      setTempData({ ...tempData, imageUrl: res.data.imageUrl });
    } catch(error){
      console.error(error);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 hidden opacity-0 transition-opacity duration-300 ease-in-out'
      tabIndex='-1'
      id='articleModal'
    >
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='relative bg-white rounded-lg shadow-xl w-full max-w-4xl'>
          <div className='flex items-start justify-between p-4 border-b rounded-t'>
            <h1 className='text-lg font-medium text-gray-900' id='exampleModalLabel'>
              {type === 'create' ? '建立新商品' : `編輯 ${tempData.title}`}
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
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='space-y-4'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='image'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                      onChange={handleChange}
                      value={tempData.image}
                    />
                  </label>
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      type='file'
                      id='customFile'
                      className='mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-1'
                      onChange={(e) => {
                        uploadFile(e.target.files[0]);
                      }}
                    />
                  </label>
                  <hr className='my-4' />
                  {tempData.image && (
                    <img src={tempData.image} className='img-fluid' alt='Not Found imageUrl' />
                  )}
                </div>
              </div>
              <div className='space-y-4 md:col-span-2'>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700' htmlFor='author'>
                      作者
                      <input
                        type='text'
                        id='author'
                        name='author'
                        placeholder='請輸入作者'
                        className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                        onChange={handleChange}
                        value={tempData.author}
                      />
                    </label>
                  </div>
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700' htmlFor='tag'>
                      標籤
                      <input
                        type='text'
                        id='tag'
                        name='tag'
                        placeholder='請輸入標籤'
                        className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                        onChange={handleChange}
                        value={tempData.tag}
                      />
                    </label>
                  </div>
                </div>
                <hr className='my-4' />
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700' htmlFor='description'>
                    描述
                    <textarea
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='mb-4'>
                  <label className='block text-sm font-medium text-gray-700' htmlFor='content'>
                    說明內容
                    <textarea
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2'
                      onChange={handleChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='mb-4'>
                  <div className='flex items-center'>
                    <label
                      className='block text-sm font-medium text-gray-700'
                      htmlFor='isPublic'
                    >
                      是否公開
                    </label>
                    <div className='ml-2 flex items-center'>
                      <input
                        type='checkbox'
                        id='isPublic'
                        name='isPublic'
                        className='h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                        onChange={handleChange}
                        checked={!!tempData.isPublic}
                      />
                    </div>
                  </div>
                </div>
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

export default ArticleModal;