import styled from "styled-components";
import { darkTheme } from "./utils/Theme";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, ${({ theme }) => theme.bg}, ${({ theme }) => theme.bgLight});
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.2s ease;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
  padding: 32px 16px 16px 16px;
`;

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post" element={<CreatePost />} />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
