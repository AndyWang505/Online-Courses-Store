import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../api/front";
// Swiper Module
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
// FontAwesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [newProducts, setNewProducts] = useState([]);
  const [copied, setCopied] = useState(false);
  const couponCode = "DA2ASD28NF19NF";

  const teachers = [
    {
      id: new Date(),
      name: "王美玲 (Meiling Wang)",
      imageURL: "https://plus.unsplash.com/premium_photo-1661505218403-c684557a824d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "畢業於劍橋大學，擁有15年以上教學經驗，同時也是跨文化專家，擅長商務英語、語音學、跨文化溝通。"
    },
    {
      id: new Date(),
      name: "Alex Johnson",
      imageURL: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "畢業於史丹佛大學，曾任職於Google和Microsoft的資深軟體工程師，擅長AI、大數據分析，以及資料安全。"
    },
    {
      id: new Date(),
      name: "Lucas Mitchell",
      imageURL: "https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "畢業於牛津大學，曾任職於facebook，目前於InnovaCore公司擔任CTO，擅長軟體工程與底層系統架構設計。"
    },
    {
      id: new Date(),
      name: "張偉明 (Wei-Ming Chang)",
      imageURL: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "畢業於台灣大學，曾任職於Amazon的資深軟體工程師及團隊領導，並擁有超過5年的教育經驗，擅長前後端開發及系統設計。"
    }
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('複製失敗:', err);
      });
  }

  const getProducts = async() => {
    const productAllRes = await getAllProducts();
    setNewProducts(productAllRes.data.products.slice(0, 10));
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <>
      <main className="min-h-screen">
        <div className="relative md:hidden">
          <img className="block md:hidden w-full h-auto"
            src="https://images.unsplash.com/photo-1619852182277-79aa23f82c8e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="banner" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-center p-12 backdrop-blur-sm bg-black bg-opacity-20 md:bg-opacity-30 rounded-lg">
            <div>
              <h1 className="text-xl md:text-4xl font-bold typing">知識無界限，學習無所不在</h1>
              <p className="mt-4 text-lg">在 LearnSphere，我們為您提供多元化的學習資源，讓學習變得簡單而有趣。</p>
            </div>
          </div>
        </div>
        <div className="main-bg bg-cover px-6 bg-center flex items-center justify-center hidden md:flex md:h-[calc(90vh-72px)]">
          <div className="text-white text-center p-12 backdrop-blur-sm bg-black bg-opacity-30 rounded-lg">
            <div className="w-full flex justify-center">
              <h1 className="text-xl md:text-4xl font-bold typing">知識無界限，學習無所不在</h1>
            </div>
            <p className="mt-4 text-lg">在 LearnSphere，我們為您提供多元化的學習資源，讓學習變得簡單而有趣。</p>
          </div>
        </div>
        <div className="sm:flex justify-center items-center text-sm md:text-base p-6 text-center bg-rose-50">
          <p className="p-1">現在輸入優惠碼</p>
          <span className="p-1 mx-1 rounded border bg-gray-400 text-white">{couponCode}</span>
          <p className="p-1">即可享有 9 折課程優惠</p>
          <button type="button" className="p-1 ml-2 rounded-md border bg-slate-300" onClick={handleCopy}>
            {copied ? '已複製' : '複製'}
          </button>
        </div>
        <div className="container max-w-7xl mx-auto p-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center my-6">精選課程</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={5}
            pagination={{ clickable: true }}
            modules={[Pagination]}
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
          <h2 className="text-2xl md:text-4xl font-bold text-center my-6">最新上架</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={3}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
            autoplay={{
              delay: 500,
              disableOnInteraction: false
            }}
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
        <div className="bg-zinc-100">
          <div className="container max-w-7xl mx-auto mb-24 mt-6 py-12 px-6 md:flex md:grid md:grid-cols-2">
            <div className="px-4">
              <h2 className="text-4xl font-bold mb-12">盡情探索你的個人興趣</h2>
              <p className="text-lg">不論是學習新技能、深入了解特定主題，還是尋找靈感來豐富生活，這個區塊將成為你展開探索之旅的起點。</p>
            </div>
            <ul className="p-6 flex flex-wrap">
              <li className="p-4 m-2 bg-white rounded-md shadow-md">平面設計</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">電腦繪圖</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">語言</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">程式設計</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">攝影</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">心理學</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">數據分析</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">投資理財</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">行銷策略</li>
              <li className="p-4 m-2 bg-white rounded-md shadow-md">人文</li>
            </ul>
          </div>
        </div>
        <div className="container max-w-7xl mx-auto mb-24 mt-6">
          <h3 className="text-2xl md:text-4xl font-bold text-center text-rose-300 mb-6">
            授課講師
          </h3>
          <p className="text-md md:text-xl text-center text-neutral-700 mb-12">
            我們邀請各行各業的專家及世界一流學校的畢業生擔任講者，提供前沿知識和實用技能。
          </p>
          <div className="md:flex justify-between md:space-x-4">
            <Swiper
              slidesPerView={4}
              spaceBetween={10}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              className="mySwiper"
              autoplay={{
                delay: 500,
                disableOnInteraction: false
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 4,
                },
                768: {
                  slidesPerView: 3,
                },
                640: {
                  slidesPerView: 2,
                },
                320: {
                  slidesPerView: 1,
                },
              }}
            >
              {teachers.map((item) => (
                <SwiperSlide className="pb-16" key={item.name}>
                  <div className="w-full px-3 mb-4">
                    <div className="border-0 relative">
                      <img src={item.imageURL} className="aspect-w-4 aspect-h-3 object-cover w-full rounded-xl" alt={item.name} />
                      <div className="p-4 mr-4 bg-white border rounded-xl shadow-md absolute -bottom-16 -left-4 z-100">
                        <h4 className="mb-2">{item.name}</h4>
                        <hr />
                        <p className="card-text text-gray-500 pt-2 mb-0">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>
        </div>
        <div>
          <div className="mt-12 bg-stone-100 py-20 px-6 leading-6">
            <h3 className="text-4xl text-center font-bold text-cyan-500 mb-6">
              聯絡我們
            </h3>
            <div className="text-xl text-center">
              <p className="mb-3">
                我們很高興您對 LearnSphere (學習天地) 感興趣！<br />如果您有任何疑問、建議或需要進一步的幫助，請隨時與我們聯繫。<br />我們的團隊隨時準備好為您提供協助。
              </p>
              <p><FontAwesomeIcon icon={faEnvelope} /> learn505@learnsphere.com</p>
              <p className='mb-2'><FontAwesomeIcon icon={faPhone} /> +123-456-7890</p>
              <p>關注我們的社交媒體帳號，了解最新的課程資訊和優惠活動。</p>
              <ul className='flex justify-center items-center space-x-4 mt-6'>
                <li>
                  <Link><FontAwesomeIcon icon={faFacebook} size='2x' /></Link>
                  </li>
                <li>
                  <Link><FontAwesomeIcon icon={faInstagram} size='2x' /></Link>
                </li>
                <li>
                  <Link><FontAwesomeIcon icon={faTwitter} size='2x' /></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;