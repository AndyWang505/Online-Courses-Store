import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Tags from "../../components/Tags";

function Article() {
  const [articles , setArticles] = useState([]);
  const [pagination , setPagination] = useState({});

  const getArticles = async(page = 1) => {
    try {
      const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles`);
      setArticles(articleRes.data.articles);
      const totalPage = Math.ceil(articleRes.data.articles.length / 10);
      setPagination({
        category: '',
        current_page: page,
        has_pre: page !== 1,
        has_next: page < totalPage,
        total_pages: totalPage
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticles(1);
  }, []);

  return (
    <main className="bg-neutral-100">
      <div className="container min-h-screen max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold mb-6">學員回饋</h2>
        <div className="flex">
          <div className="w-3/4">
            <ul>
              {articles.map((article) => {
                return (
                  <li className="w-full rounded-md bg-white drop-shadow mb-6 product-hover-link" key={article.id}>
                    <Link to={`/article/${article.id}`} className="block p-3">
                      <div className="flex w-full">
                        <div className="rounded-md overflow-hidden mr-3 w-1/4">
                          <img
                            src={article.image}
                            className="h-full rounded-md border border-inherit object-cover product-hover-img"
                            alt={article.title}
                          />
                        </div>
                        <div className="w-3/4 px-2">
                          <div className="flex mb-2">
                            <h3 className="w-full mb-0 text-xl font-bold">
                              {article.title}
                            </h3>
                          </div>
                          <div className="flex justify-between mb-2 text-neutral-600">
                            <span><FontAwesomeIcon icon={faCalendarDays} /> {new Date(article.create_at).toLocaleDateString()}</span>
                            <p>#{article.tag}</p>
                          </div>
                          <p className="line-clamp-2 text-neutral-600">
                            {article.description}
                          </p>
                          <h4 className="mt-2 text-right">by {article.author}</h4>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Pagination pagination={pagination} changePage={getArticles} />
          </div>
          <ul className="w-1/4 p-6">
            <Tags></Tags>
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Article;