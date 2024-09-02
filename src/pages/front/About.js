import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
// Swiper Module
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

function About() {
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

  return (
    <main>
      <div className="container min-h-screen max-w-7xl mx-auto mb-7 mt-12 p-6">
        <h2 className="text-4xl font-bold mb-12">關於我們</h2>
        <div className="block md:flex justify-between mb-24">
          <div className="mb-6 md:w-1/2 leading-loose">
            <p className="text-xl font-bold mb-6 text-neutral-400">
              歡迎來到 LearnSphere 學習天地！<br />我們致力於提供多元化的學習資源，讓學習變得簡單而有趣。
            </p>
            <p className="text-neutral-700">
              不論你身在何處，都能透過我們的平台自我學習、精進自己。我們的課程涵蓋廣泛的主題，從語言學習到技術培訓，滿足不同學習者的需求。透過創新的學習方式和豐富的教學內容，我們希望激發你的學習熱情，幫助你在職業和個人生活中不斷成長。加入我們，探索無限的學習可能性，讓知識無界限，學習無所不在！
            </p>
          </div>
          <div className="md:w-96 md:ml-6">
            <img src="https://images.unsplash.com/photo-1560523159-94c9d18bcf27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
             className="overflow-hidden rounded-md" alt="" />
          </div>
        </div>
        <div className="mb-24">
          <h3 className="text-4xl text-center font-bold mb-3 text-orange-300">- 我們的使命 -</h3>
          <p className="text-xl text-center mb-3 text-neutral-700 py-6">
            提供優質的教育資源，幫助學習者在知識和技能上持續成長，實現職業和個人目標。
          </p>
          <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
           className="w-full h-96 object-cover" alt="" />
        </div>
        <div className="mb-24">
          <h3 className="text-4xl text-center font-bold mb-3 text-rose-300 mb-6">
            授課講師
          </h3>
          <p className="text-xl text-center mb-3 text-neutral-700 mb-6">
            我們邀請各行各業的專家及世界一流學校的畢業生擔任講者，提供前沿知識和實用技能。
          </p>
          <div className="md:flex justify-between md:space-x-4">
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
              {teachers.map((item) => {
                return (
                  <SwiperSlide className="pb-16" key={item.name}>
                    <div className="w-full px-3 mb-4">
                      <div className="border-0 relative">
                        <img src={item.imageURL} className="h-96 object-cover sm:h-auto w-full rounded-xl relative" alt="..." />
                        <div className="p-4 mr-4 bg-white border rounded-xl shadow-md absolute -bottom-16 -left-4 z-100">
                          <h4 className="mb-2">{item.name}</h4>
                          <hr />
                          <p className="card-text text-gray-500 pt-2 mb-0">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
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
  )
}

export default About;