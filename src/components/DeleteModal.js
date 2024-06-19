function DeleteModal({close, text, handleDelete, id}) {
  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center hidden opacity-0 transition-opacity duration-300 ease-in-out'
      id='deleteModal'
    >
      <div className='bg-white w-96 rounded-lg'>
        <div className='bg-red-500 text-white py-2 px-4 rounded-t-lg flex justify-between items-center'>
          <h1 className='text-lg' id='exampleModalLabel'>
            刪除確認
          </h1>
          <button
            type='button'
            className='btn-close'
            aria-label='Close'
            onClick={close}
          />
        </div>
        <div className='p-4'>刪除 {text}</div>
        <div className='flex justify-end p-4'>
          <button
            type='button'
            className='bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300 focus:outline-none focus:bg-gray-300'
            onClick={close}
          >
            取消
          </button>
          <button
            type='button'
            className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600'
            onClick={() => handleDelete(id)}
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default DeleteModal;