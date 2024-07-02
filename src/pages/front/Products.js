import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
// React Loading Skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Products() {
  const [products, setProducts] = useState([]);
  const [pagination , setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  const getProducts = async(page = 1) => {
    try {
      const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
      const categoriesArr = ["全部", ...new Set(productRes.data.products.map(product => product.category))];
      setProducts(productRes.data.products);
      setCategories(categoriesArr);
      setPagination(productRes.data.pagination);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const skeletonCount = products.length || 8;

  useEffect(() => {
    getProducts(1);
  }, []);

  useEffect(() => {
    if(!category){
      navigate("/products/全部");
    }
  }, [category, navigate]);

  const filteredProducts = category === "全部" ? products : products.filter(product => product.category === category);

  return (
    <>
      <main>
        <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
          <h2 className="text-4xl font-bold text-center mb-12">所有課程</h2>
          <ul className="flex border-b-2 mb-3">
            {categories.map(category => {
              return (
                <li className="mr-2" key={category}>
                  <NavLink className="p-3 rounded-t-lg block hover:scale-105" to={category}>{category}</NavLink>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-wrap -mx-3">
            {loading ? (
              Array(skeletonCount).fill().map((_, index) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3" key={index}>
                  <div className="mb-4 overflow-hidden">
                    <div className="rounded-md overflow-hidden h-48">
                      <Skeleton height={192} />
                    </div>
                    <div className="p-0">
                      <h3 className="mb-0 mt-3 text-lg font-bold">
                        <Skeleton width="60%" />
                      </h3>
                      <p className="text-base text-gray-500 mt-3 mb-0 max-h-20">
                        <Skeleton count={3} />
                      </p>
                      <div className="flex mt-3 items-baseline">
                        <Skeleton width="50%" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts.map((product) => (
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
              ))
            )}
          </div>
          <Pagination pagination={pagination} changePage={getProducts} />
        </div>
      </main>
    </>
  )
}

export default Products;