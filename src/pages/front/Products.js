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
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  const getCategoryArr = async() => {
    try {
      const productAllRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      const categoriesArr = ["全部", ...new Set(productAllRes.data.products.map(product => product.category))];
      setCategories(categoriesArr);
    } catch (error) {
      console.log(error);
    }
  }

  const getProducts = async(page = 1) => {
    try {
      if(category !== "全部") {
        const productAllRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
        const filterProducts = productAllRes.data.products.filter(product => product.category === category);
        const totalPage = Math.ceil(filterProducts.length / 10);
        const start = (page - 1) * 10;
        const end = page * 10;
        setProducts(filterProducts.slice(start, end));
        setPagination({
          category: '',
          current_page: page,
          has_pre: page !== 1,
          has_next: page < totalPage,
          total_pages: totalPage
        });
      }else {
        const productPageRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
        setProducts(productPageRes.data.products);
        setPagination(productPageRes.data.pagination);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const skeletonCount = products.length || 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCategoryArr();
      await getProducts(1);
      if (!category) {
        navigate("/products/全部");
      }
      setLoading(false);
    };
    fetchData();
  }, [category, navigate]);

  return (
    <>
      <main>
        <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-5 p-6">
          <h2 className="text-4xl font-bold text-center mb-12">所有課程</h2>
          <ul className="flex whitespace-nowrap overflow-x-auto md:overflow-hidden border-b-2 mb-3">
            {categories.map(category => {
              return (
                <li className="mr-2" key={category}>
                  <NavLink className="p-3 rounded-t-lg block hover:scale-105" to={category}>{category}</NavLink>
                </li>
              )
            })}
          </ul>
          <div className="flex flex-wrap mx-3">
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
              products.map((product) => (
                <Link className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3 product-hover-link" to={`/product/${product.id}`} key={product.id}>
                  <div className="mb-4 overflow-hidden">
                    <div className="rounded-md overflow-hidden h-48">
                      <img src={product.imageUrl} className="w-full h-full rounded-md border border-inherit object-cover product-hover-img" alt={product.title} />
                    </div>
                    <div className="p-0">
                      <h3 className="mb-0 mt-3 text-lg font-bold">
                        <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{product.category}</div>
                        {product.title}
                      </h3>
                      <p className="text-base text-gray-500 mt-2 mb-0 max-h-20 line-clamp-2">{product.content}</p>
                      <p className="text-sm text-right text-gray-400 border-b-2 mt-1 px-1 mb-0">by {product.description}</p>
                      <div className="flex mt-2 items-baseline">
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