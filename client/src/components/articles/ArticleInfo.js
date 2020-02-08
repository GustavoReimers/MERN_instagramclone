import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ArticleInfo(props) {
  const [article, setArticle] = useState([]);
  useEffect(
    function() {
      async function getArticle() {
        try {
          const response = await axios.post(
            `/api/getarticles?id=${props.match.params._id}`
          );
          setArticle(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getArticle();
    },
    [props]
  );

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `/api/articles?id=${props.match.params._id}`
      );
      console.log(response.data);
      props.history.push("/articles");
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>Source: {article.source}</p>
      <p>Likes: {article.likes}</p>
      <p>Comments: {article.comments}</p>
      <p>IsVideo: {article.isVideo}</p>
      <div className="btn-group">
        <Link
          to={`/articles/${props.match.params._id}/edit`}
          className="btn btn-primary"
        >
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
        <Link to={`/articles`} className="btn btn-secondary">
          Close
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default ArticleInfo;
