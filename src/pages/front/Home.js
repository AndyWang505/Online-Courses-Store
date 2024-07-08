import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Swiper Module
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [newProducts, setNewProducts] = useState([]);

  const getProducts = async() => {
    const productAllRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
    // console.log(productAllRes.data.products);
    setNewProducts(productAllRes.data.products.slice(0, 10));
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <>
      <main className="min-h-screen">
        <div className="main-bg bg-cover bg-center flex items-center justify-center" style={{ height: `calc(90vh - 72px)` }}>
          <div className="text-white text-center p-8 bg-black bg-opacity-50 rounded-lg">
            <h1 className="text-4xl font-bold">LearnSphere 學習天地</h1>
            <p className="mt-4 text-lg">知識無界限，學習無所不在<br/>在 LearnSphere，我們為您提供多元化的學習資源，讓學習變得簡單而有趣。</p>
          </div>
        </div>
        <div className="container max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold text-center my-6">精選課程</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={5}
            className="mySwiper"
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
            }}
          >
            {newProducts.map((product) => {
              return (
                <SwiperSlide className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3 product-hover-link" key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <div className="mb-4 overflow-hidden">
                      <div className="rounded-md overflow-hidden h-52">
                        <img src={product.imageUrl} className="w-full h-full rounded-md border border-inherit object-cover product-hover-img" alt={product.title} />
                      </div>
                      <div className="p-0">
                        <h3 className="mb-0 mt-3 text-lg text-left font-bold">
                          <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{product.category}</div>
                          {product.title}
                        </h3>
                        <p className="text-base text-gray-500 text-left mt-2 mb-0 max-h-20 line-clamp-2">{product.content}</p>
                        <p className="text-sm text-right text-gray-400 border-b-2 mt-1 px-1 mb-0">by {product.description}</p>
                        <div className="flex mt-2 items-baseline">
                          <p className="text-lg text-gray-500 font-bold mr-3">NT$ {product.price}</p>
                          <p className="text-sm text-gray-400 line-through font-bold">NT$ {product.origin_price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="container max-w-7xl mx-auto p-6">
          <h2 className="text-4xl font-bold text-center my-6">最新上架</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={3}
            className="mySwiper"
            breakpoints={{
              1024: {
                slidesPerView: 4,
                spaceBetween: 3,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 5,
              },
              320: {
                slidesPerView: 1,
                spaceBetween: 5,
              },
            }}
          >
            {newProducts.map((product) => {
              return (
                <SwiperSlide className="w-full mb-4 p-3 product-hover-link" key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <div className="mb-4 overflow-hidden">
                      <div className="rounded-md overflow-hidden h-48">
                        <img src={product.imageUrl} className="w-full h-full rounded-md border border-inherit object-cover product-hover-img" alt={product.title} />
                      </div>
                      <div className="p-0">
                        <h3 className="mb-0 mt-3 text-lg text-left font-bold">
                          <div className="inline-block p-1 text-sm border rounded-md bg-slate-300 text-rose-500 font-bold mr-3">{product.category}</div>
                          {product.title}
                        </h3>
                        <p className="text-base text-gray-500 text-left mt-2 mb-0 max-h-20 line-clamp-2">{product.content}</p>
                        <p className="text-sm text-right text-gray-400 border-b-2 mt-1 px-1 mb-0">by {product.description}</p>
                        <div className="flex mt-2 items-baseline">
                          <p className="text-lg text-gray-500 font-bold mr-3">NT$ {product.price}</p>
                          <p className="text-sm text-gray-400 line-through font-bold">NT$ {product.origin_price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
          
        </div>
        <div>
          <div className="mb-24 bg-stone-100 rounded-full py-12 px-6 leading-6">
            <h3 className="text-4xl text-center font-bold mb-3 text-cyan-500 mb-6">
              聯絡我們
            </h3>
            <div className="text-xl text-center">
              <p className="mb-3">
                我們很高興您對LearnSphere (學習天地) 感興趣！<br />如果您有任何疑問、建議或需要進一步的幫助，請隨時與我們聯繫。<br />我們的團隊隨時準備好為您提供協助。
              </p>
              <p><FontAwesomeIcon icon={faEnvelope} /> learn505@learnsphere.com</p>
              <p className='mb-2'><FontAwesomeIcon icon={faPhone} /> +123-456-7890</p>
              <p>關注我們的社交媒體帳號，了解最新的課程資訊和優惠活動。</p>
              <ul className='flex justify-center items-center space-x-4 mt-6'>
                <li><FontAwesomeIcon icon={faFacebook} size='2x' /></li>
                <li><FontAwesomeIcon icon={faInstagram} size='2x' /></li>
                <li><FontAwesomeIcon icon={faTwitter} size='2x' /></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;