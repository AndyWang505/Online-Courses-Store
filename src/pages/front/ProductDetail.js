import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  // const [cartQuantity, setCartQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const addToCart = async() => {
    const data = {
      data: {
        product_id: product.id,
        qty: 1
      }
    };
    setIsLoading(true);
    console.log(data);
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const getProduct = async(id) => {
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    console.log(productRes);
    setProduct(productRes.data.product);
  }

  useEffect(() => {
    getProduct(id);
  }, [id])

  return (
    <div className="container mx-auto p-6">
      <div
        className="min-h-96 bg-center bg-cover"
        style={{
          backgroundImage: `url(${product.imageUrl})`
        }}
      ></div>
      <div className="flex flex-wrap justify-between mt-7 mb-7">
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
            <button type="button" className="bg-orange-300 border rounded-md p-3 w-2/3 mr-3">立即購買</button>
            <button type="button" className="border rounded-md p-3 w-1/3 hover:bg-neutral-100"
              onClick={() => {
                addToCart();
              }}
              disabled={isLoading}
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;