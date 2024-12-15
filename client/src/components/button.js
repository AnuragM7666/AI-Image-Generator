import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Button({ onClick, children, style = {}, disabled = false, leftIcon, text, navigateTo }) {
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (navigateTo) {
            navigate(navigateTo);
        } else if (onClick) {
            onClick(event);
        }
    };

    return (
        <button 
            onClick={handleClick} 
            style={{ padding: '8px 16px', cursor: 'pointer', ...style }} 
            disabled={disabled}
        >
            {leftIcon && <span style={{ marginRight: '8px' }}>{leftIcon}</span>}
            {text || children}
        </button>
    );
}
