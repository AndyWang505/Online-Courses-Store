function Pagination({pagination, changePage}) {
  return (
    <nav className='flex justify-center' aria-label='Page navigation example'>
      <ul className='pagination flex'>
        <li className={`page-item ${!pagination.has_pre ? 'disabled' : ''}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page - 1);
            }}
            className='page-link px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50'
            aria-label='Previous'
            disabled={!pagination.has_pre}
          >
            <span aria-hidden='true'>&laquo;</span>
          </button>
        </li>
        {[...Array(pagination.total_pages)].map((_, i) => (
          <li key={i} className='page-item'>
            <button
              onClick={(e) => {
                e.preventDefault();
                changePage(i + 1);
              }}
              className={`page-link px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 ${i + 1 === pagination.current_page ? 'bg-gray-200' : ''}`}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${!pagination.has_next ? 'disabled' : ''}`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              changePage(pagination.current_page + 1);
            }}
            className='page-link px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50'
            aria-label='Next'
            disabled={!pagination.has_next}
          >
            <span aria-hidden='true'>&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;