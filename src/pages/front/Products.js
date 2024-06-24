import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";

function Products() {
  const [, setProducts] = useState([]);
  const [pagination , setPagination] = useState({});

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async(page = 1) => {
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  }

  return (
    <>
      <main>
        <div className="container mx-auto mb-7 mt-5 p-6">
          <h2>購買課程</h2>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-4">
              <div className="card border-0 relative mb-4">
                <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                <a className="text-dark">
                  <i className="far fa-heart absolute right-4 top-4"></i>
                </a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3"><a>Lorem ipsum</a></h4>
                  <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-500 mt-3">NT$ 1,200</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-4">
              <div className="card border-0 relative mb-4">
                <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                <a className="text-dark">
                  <i className="far fa-heart absolute right-4 top-4"></i>
                </a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3"><a>Lorem ipsum</a></h4>
                  <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-500 mt-3">NT$ 1,200</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-4">
              <div className="card border-0 relative mb-4">
                <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                <a className="text-dark">
                  <i className="far fa-heart absolute right-4 top-4"></i>
                </a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3"><a>Lorem ipsum</a></h4>
                  <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-500 mt-3">NT$ 1,200</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-4">
              <div className="card border-0 relative mb-4">
                <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                <a className="text-dark">
                  <i className="far fa-heart absolute right-4 top-4"></i>
                </a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3"><a>Lorem ipsum</a></h4>
                  <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-500 mt-3">NT$ 1,200</p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 px-3 mb-4">
              <div className="card border-0 relative mb-4">
                <img src="https://images.unsplash.com/photo-1591843336741-9f1238f66758?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" className="w-full rounded-none" alt="..." />
                <a className="text-dark">
                  <i className="far fa-heart absolute right-4 top-4"></i>
                </a>
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-3"><a>Lorem ipsum</a></h4>
                  <p className="card-text text-gray-500 mb-0">Lorem ipsum dolor sit amet</p>
                  <p className="text-gray-500 mt-3">NT$ 1,200</p>
                </div>
              </div>
            </div>
          </div>
          <Pagination pagination={pagination} changePage={getProducts} />
        </div>
      </main>
    </>
  )
}

export default Products;