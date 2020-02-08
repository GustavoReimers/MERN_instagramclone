import React, { useState, useEffect } from "react";
import { patch, get } from "axios";

function ArticleEdit(props) {
  const initialState = {
    title: "",
    source: "",
    likes: "",
    comments: "",
    isVideo: ""
  };
  const [article, setArticle] = useState(initialState);
  useEffect(
    function() {
      async function getArticle() {
        try {
          const response = await get(
            `/api/articles?id=${props.match.params._id}`
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

  function handleChange(event) {
    console.log(event.target.value);
    var checkedElement = document.getElementById("checkVideo");
    if (checkedElement.checked === true) {
      event.target.value = "true";
    } else {
      event.target.value = "false";
    }
    setArticle({ ...article, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!article.title || !article.likes) return;
    async function postArticle() {
      try {
        const response = await patch(
          `/api/articles?id=${article._id}`,
          article
        );
        console.log("-->", response.data);
        props.history.push(`/articles/${article._id}`);
      } catch (error) {
        console.log("error", error);
      }
    }
    postArticle();
  }

  function handleCancel() {
    props.history.push(`/articles/${article._id}`);
  }

  return (
    <div>
      <h1>Edit {article.title}</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={article.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Source</label>
          <input
            name="source"
            type="text"
            value={article.source}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Likes</label>
          <input
            name="likes"
            type="text"
            value={article.likes}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Comments</label>
          <input
            name="comments"
            type="text"
            value={article.comments}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>IsVideo?</label>
          <input
            name="isVideo"
            type="checkbox"
            id="checkVideo"
            // value={article.isVideo}
            onChange={handleChange}
            className="form-control"
            checked={article.isVideo === "true" ? true : false}
          />
        </div>
        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" />
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ArticleEdit;
