import axios from "axios";
import { useEffect, useState } from "react";

function Tags() {
  const [articles , setArticles] = useState([]);

  const getArticles = async() => {
    try {
      const articleRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/articles`);
      setArticles(articleRes.data.articles);
      // console.log(articles);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {articles.map((item) => {
        return (
          <li className="inline-block p-2 border bg-white rounded-lg mr-3" key={item.tag}>#{item.tag}</li>
        )
      })}
    </>
  )
}

export default Tags;