import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { getAllArticles, getArticlePage } from "../../api/front"
// React Loading Skeleton
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Articles() {
  const [articles , setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [pagination , setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { tag } = useParams();

  const getTagsArr = async() => {
    try {
      const tagsAllRes = await getAllArticles();
      const tagsArr = ["全部", ...new Set(tagsAllRes.data.articles.map(article => article.tag))];
      setTags(tagsArr);
    } catch (error) {
      console.log(error);
    }
  }

  const getArticles = async(page = 1) => {
    try {
      if(tag !== "全部") {
        const articleAllRes = await getAllArticles();
        const filterArticles = articleAllRes.data.articles.filter(article => article.tag === tag);
        const totalPage = Math.ceil(filterArticles.length / 10);
        const start = (page - 1) * 10;
        const end = page * 10;
        setArticles(filterArticles.slice(start, end));
        // console.log(category);
        setPagination({
          category: '',
          current_page: page,
          has_pre: page !== 1,
          has_next: page < totalPage,
          total_pages: totalPage
        });
      }else {
        const articlePageRes = await getArticlePage(page);
        setArticles(articlePageRes.data.articles);
        setPagination(articlePageRes.data.pagination);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const skeletonCount = articles.length || 8;

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      await getTagsArr();
      await getArticles(1);
      if(!tag) {
        navigate("/articles/全部");
      }
      setLoading(false);
    }
    fetchData();
  }, [tag, navigate]);

  return (
    <main className="bg-neutral-100">
      <div className="container min-h-screen max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold mb-6">心得牆</h2>
        <div className="md:flex md:flex-row-reverse">
          <ul className="md:w-1/4 p-6">
            {tags.map((tag) => {
              return (
                <li className="inline-block border bg-white rounded-lg mr-2 mb-2" key={tag}>
                  <NavLink className="block p-2" to={tag}>
                    #{tag}
                  </NavLink>
                </li>
              )
            })}
          </ul>
          <div className="md:w-3/4">
            <ul>
              {loading ? (
                Array(skeletonCount).fill().map((_, index) => (
                  <li className="w-full rounded-md bg-white drop-shadow mb-6" key={index}>
                    <div className="block p-3">
                      <div className="flex w-full">
                        <div className="rounded-md overflow-hidden mr-3 w-1/4">
                          <Skeleton height="100%" />
                        </div>
                        <div className="w-3/4 px-2">
                          <div className="flex mb-2">
                            <h3 className="w-full mb-0 text-xl font-bold">
                              <Skeleton width="80%" />
                            </h3>
                          </div>
                          <div className="flex justify-between mb-2 text-neutral-600">
                            <Skeleton width="40%" />
                            <Skeleton width="20%" />
                          </div>
                          <p className="line-clamp-2 text-neutral-600">
                            <Skeleton count={2} />
                          </p>
                          <h4 className="mt-2 text-right">
                            <Skeleton width="30%" />
                          </h4>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                articles.map((article) => (
                  <li className="w-full rounded-md bg-white drop-shadow mb-6 product-hover-link" key={article.id}>
                    <Link to={`/article/${article.id}`} className="block p-3">
                      <div className="md:flex w-full">
                        <div className="rounded-md overflow-hidden md:mr-3 md:w-1/4">
                          <img
                            src={article.image}
                            className="h-full rounded-md border border-inherit object-cover product-hover-img"
                            alt={article.title}
                          />
                        </div>
                        <div className="md:w-3/4 pt-2 md:pt-0 px-2">
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
                ))
              )}
            </ul>
            <Pagination pagination={pagination} changePage={getArticles} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Articles;