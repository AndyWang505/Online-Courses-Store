import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ArticleDetail() {
  const [article , setArticle] = useState([]);
  const { id } = useParams();

  const getArticle = async (id) => {
    try {
      const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/article/${id}`);
      setArticle(articleRes.data.article);
      console.log(articleRes.data.article);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticle(id);
  }, [id])

  return (
    <main className="bg-neutral-100">
      <div className="container min-h-screen max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold mb-6">學員回饋</h2>
        <div className="flex">
          <div className="w-full">
            <div className="bg-white rounded-md drop-shadow p-6">
              <img src={article.image} alt={article.title} className="w-full"/>
              <h3 className="w-full my-6 text-3xl font-bold">
                {article.title}
              </h3>
              <div className="flex my-6 text-xl">
                <p className="mr-6">{new Date(article.create_at).toLocaleDateString()}</p>
                <p>#{article.tag}</p>
              </div>
              <p className="text-xl leading-8">
                {article.content}
              </p>
              <p className="text-right text-xl mt-9">
                by {article.author}
              </p>
            </div>
            <div className="flex justify-between p-6">
              <Link to={-1} className="">← 回上一頁</Link>
              <Link to="/">返回首頁 →</Link>
            </div>
          </div>
          {/* <ul className="w-1/4 p-6">
            {tags.map((tag) => {
              return (
                <li className="inline-block border bg-white rounded-lg mr-2 mb-2" key={tag}>
                  <NavLink className="block p-2" to={tag}>
                    #{tag}
                  </NavLink>
                </li>
              )
            })}
          </ul> */}
        </div>
      </div>
    </main>
  )
}

export default ArticleDetail;