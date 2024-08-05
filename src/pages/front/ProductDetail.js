import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useOutletContext, useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState();
  const { id } = useParams();
  const { cartData, getCart } = useOutletContext();

  const addToCart = async() => {
    const data = {
      data: {
        product_id: product.id,
        qty: 1
      }
    };
    setIsLoading(true);
    try {
      const targetProduct = cartData.carts.find( cartItem => cartItem.product.id === product.id);
      setIsInCart(targetProduct);
      if(targetProduct !== undefined) {
        return;
      }else {
        // cart api issues: the backend quantity has already been added.
        await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
        getCart();
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getProduct = async(id) => {
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    // console.log(productRes);
    setProduct(productRes.data.product);
  }

  useEffect(() => {
    getProduct(id);
  }, [id])

  return (
    <div className="container min-h-screen mx-auto pb-6 px-6">
      <div
        className="min-h-96 bg-center bg-cover"
        style={{
          backgroundImage: `url(${product.imageUrl})`
        }}
      ></div>
      <div className="flex flex-wrap justify-between mt-7 mb-7 px-6">
        <div className="w-full md:w-7/12">
          <h2 className="mb-0 text-2xl font-bold mb-5">關於課程</h2>
          <h3 className="mb-0 text-xl font-bold mb-3">{product.title}</h3>
          <p className="font-bold">NT$ {product.price}</p>
          <p>{product.content}</p>
          <div className="my-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="img-fluid mt-4"
            />
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <div className="flex mt-3">
            <Link className="bg-orange-300 border rounded-md p-3 w-2/3 mr-3 text-center"
              onClick={() => {
                addToCart();
              }}
              to="/cart"
              disabled={isLoading}
            >
              立即購買
            </Link>
            <button type="button" className="border rounded-md p-3 w-1/3 hover:bg-neutral-100"
              onClick={() => {
                addToCart();
              }}
              disabled={isLoading}
            >
              { isInCart !== undefined ? "已加入購物車" : "加入購物車" }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;