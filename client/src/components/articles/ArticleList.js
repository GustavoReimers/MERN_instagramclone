import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  float: right;
  color: ${props => (props.primary ? "violet" : "palevioletred")};
  border: ${props =>
    props.primary ? "2px solid violet" : "2px solid palevioletred"};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: ${props => (props.primary ? "violet" : "palevioletred")};
    color: white;
  }
`;

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(function() {
    async function getArticles() {
      try {
        const response = await axios.post(`/api/getarticles`);
        console.log("response", response);
        setArticles(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  }, []);

  return (
    <div>
      <h2>
        Articles
        <Link to="/articles/new">
          <Button primary>Create Article</Button>
        </Link>
        <Link to="/">
          <Button>Go to Home..</Button>
        </Link>
      </h2>
      <hr />
      {articles.map(article => {
        return (
          <div key={article._id}>
            <h4>
              <Link to={`/articles/${article._id}`}>{article.title}</Link>
            </h4>
            <small>Article Source: {article.source}</small>
            <br />
            <small>Likes: {article.likes}</small>
            <br />
            <small>Comments: {article.comments}</small>
            <br />
            <small>isVideo: {article.isVideo}</small>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default ArticleList;
