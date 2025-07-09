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
    border-radius: 0 0 32px 32px;
    overflow: hidden;
    /* Sliding border effect */
    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
        border-radius: 0 0 32px 32px;
        transition: width 0.7s cubic-bezier(0.77,0,0.175,1);
        z-index: 101;
        animation: slideInBorder 1.2s cubic-bezier(0.77,0,0.175,1) forwards;
    }
    @keyframes slideInBorder {
        from { width: 0%; }
        to { width: 100%; }
    }
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

const LogoIcon = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 12px;
    object-fit: cover;
    margin-right: 10px;
    box-shadow: 0 2px 8px 0 ${({ theme }) => theme.primary + '22'};
    background: #fff;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');

  return (
    <Nav>
      <Logo>
        <LogoIcon src="/mainLogo.png" alt="Main Logo" />
        GenAI
      </Logo>
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
