import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination , setPagination] = useState({});

  const getProducts = async(page = 1) => {
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
    console.log(products);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  }

  useEffect(() => {
    getProducts(1);
  }, [])

  return (
    <>
      <main>
        <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
          <h2 className="text-4xl font-bold text-center mb-6">所有課程</h2>
          <ul className="flex border-b-2 mb-3">
            <li className="p-3">全部</li>
            <li className="p-3">程式設計</li>
            <li className="p-3">美術</li>
            <li className="p-3">管理</li>
          </ul>
          <div className="flex flex-wrap -mx-3">
            {products.map((product) => {
              return (
                <Link className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3 product-hover-link" to={`/product/${product.id}`} key={product.id}>
                  <div className="mb-4 overflow-hidden">
                    <div className="rounded-md overflow-hidden h-48">
                      <img src={product.imageUrl} className="w-full rounded-md border border-inherit object-cover product-hover-img" alt={product.title} />
                    </div>
                    <div className="p-0">
                      <h3 className="mb-0 mt-3 text-lg font-bold">
                        <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{product.category}</div>
                        {product.title}
                      </h3>
                      <p className="text-base text-gray-500 mt-3 mb-0 max-h-20 line-clamp-3">{product.content}</p>
                      <div className="flex mt-3 items-baseline">
                        <p className="text-lg text-gray-500 font-bold mr-3">NT$ {product.price}</p>
                        <p className="text-sm text-gray-400 line-through font-bold">NT$ {product.origin_price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <Pagination pagination={pagination} changePage={getProducts} />
        </div>
      </main>
    </>
  )
}

export default Products;