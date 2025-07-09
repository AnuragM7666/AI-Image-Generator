import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { AddRounded, ExploreRounded } from '@mui/icons-material';
import Button from './button';

const Nav = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 16px;
    background: rgba(24, 24, 36, 0.85);
    box-shadow: 0 2px 16px 0 ${({ theme }) => theme.primary + '18'};
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
`;

const Logo = styled.div`
    font-size: 2.1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.accent};
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');

  return (
    <Nav>
      <Logo>GenAI</Logo>
      {path[1] === "post" ? (
        <Button
          onClick={() => navigate("/")}
          text="Explore posts"
          leftIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
          type="secondary"  // Make sure this type is supported in Button component
        />
      ) : (
        <Button
          onClick={() => navigate("/post")}
          text="Create new post"
          leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
        />
      )}
    </Nav>
  );
};

export default Navbar;
