import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log(id);

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
      <div className="flex flex-wrap justify-between mt-4 mb-7">
        <div className="w-full md:w-7/12">
          <h2 className="mb-0 text-2xl font-bold">{product.title}</h2>
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
          <div className="flex border mt-3">
            <button
              className="btn btn-outline-dark border-0 py-3"
              type="button"
              id="button-addon1"
            >
              <i className="fas fa-minus"></i>
            </button>
            <input
              type="text"
              className="flex-grow border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
            <button
              className="btn btn-outline-dark border-0 py-3"
              type="button"
              id="button-addon2"
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;