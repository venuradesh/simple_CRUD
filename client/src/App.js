import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import UserRegistration from "./Components/UserRegistration";
import ViewUsers from "./Components/ViewUsers";

function App() {
  return (
    <Container>
      <Router>
        <Heading>Simple CRUD Application - Assesment 4 - CS3122 - 2018COM03</Heading>
        <Routes>
          <Route exact path="/" element={<ViewUsers />} />
          <Route exact path="/register" element={<UserRegistration />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: var(--bg-clr);
`;

const Heading = styled.div`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: var(--clr-dark);
  opacity: 0.4;
`;
