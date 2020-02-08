import React from "react";
import styled from "styled-components";
import { ReactComponent as Comment } from "../../assets/comment.svg";
import { ReactComponent as Play } from "../../assets/play.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
const ImgContainer = styled.div`
  position: relative;
  flex-basis: 100%;
  flex-basis: calc(33.333% - 20px);
  margin: 10px;
  cursor: pointer;
  transition: 0.5s all ease-in;
`;
const ImgIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-right: 20px;
  svg {
    margin-right: 10px;
  }
`;
const ImgMeta = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${ImgContainer}:hover & {
    display: flex !important;
  }
`;
const Img = styled.img`
  cursor: pointer;
  width: 100%;
`;
function Image({ image }) {
  return (
    <ImgContainer>
      <Img src={image.source} />
      <ImgMeta>
        <ImgIcons>
          {image.isVideo === "true" ? <Play /> : <Heart />} {image.likes}
        </ImgIcons>
        <ImgIcons>
          <Comment /> {image.comments}
        </ImgIcons>
      </ImgMeta>
    </ImgContainer>
  );
}
export default Image;
