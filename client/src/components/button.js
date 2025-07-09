import styled from "styled-components";

const ModernButton = styled.button`
  padding: 10px 28px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 ${({ theme }) => theme.primary + '22'};
  transition: background 0.18s, transform 0.15s;
  outline: none;
  &:hover {
    background: linear-gradient(90deg, ${({ theme }) => theme.accent}, ${({ theme }) => theme.primary});
    transform: scale(1.04);
    box-shadow: 0 4px 18px 0 ${({ theme }) => theme.accent + '33'};
  }
`;

const Button = ({ text, leftIcon, rightIcon, ...props }) => (
  <ModernButton {...props}>
    {leftIcon && <span style={{ marginRight: 8 }}>{leftIcon}</span>}
    {text}
    {rightIcon && <span style={{ marginLeft: 8 }}>{rightIcon}</span>}
  </ModernButton>
);

export default Button;
