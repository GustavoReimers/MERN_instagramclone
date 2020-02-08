import React, { Fragment } from "react";
import styled from "styled-components";
import Header from "./Header";
import Profile from "./Profile";
import GlobalStyle from "../../theme/globalStyle";
const AppWrapper = styled.div`
  background-color: #fafafa;
`;
function Home() {
  return (
    <Fragment>
      <GlobalStyle />
      <AppWrapper>
        <Header />
        <Profile />
      </AppWrapper>
    </Fragment>
  );
}
export default Home;
