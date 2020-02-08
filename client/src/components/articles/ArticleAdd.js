import React, { useState } from "react";
import { post } from "axios";

function ArticleAdd(props) {
  const initialState = {
    title: "",
    source: "",
    likes: "",
    comments: "",
    isVideo: ""
  };
  const [article, setArticle] = useState(initialState);

  function handleChange(event) {
    setArticle({ ...article, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!article.source) return;
    async function postArticle() {
      try {
        const response = await post("/api/articles", article);
        props.history.push(`/articles/${response.data._id}`);
      } catch (error) {
        console.log("error", error);
      }
    }
    postArticle();
  }

  function handleCancel() {
    props.history.push("/articles");
  }

  return (
    <div>
      <h1>Create Article</h1>
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
          <label>Video?</label>
          <input
            name="isVideo"
            type="text"
            value={article.isVideo}
            onChange={handleChange}
            className="form-control"
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

export default ArticleAdd;
