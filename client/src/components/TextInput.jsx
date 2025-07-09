import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: ${({ theme }) => theme.text_primary || '#f0f0f0'};
`;

const TextArea = styled.textarea`
    padding: 12px;
    border: 1.5px solid ${({ theme }) => theme.accent || theme.primary || '#7c3aed'}33;
    border-radius: 8px;
    font-size: 1rem;
    background: ${({ theme }) => theme.card || '#23233a'};
    color: ${({ theme }) => theme.text_primary || '#f4f4f5'};
    box-shadow: 0 1px 4px 0 #0001;
    transition: border 0.18s, box-shadow 0.18s;
    outline: none;
    resize: vertical;
    &:focus {
        border: 1.5px solid ${({ theme }) => theme.accent || theme.primary || '#7c3aed'};
        box-shadow: 0 2px 8px 0 ${({ theme }) => theme.accent + '22' || theme.primary + '22' || '#7c3aed22'};
        background: ${({ theme }) => theme.bgLight || '#23233a'};
    }
`;

const Input = styled.input`
    padding: 12px;
    border: 1.5px solid ${({ theme }) => theme.accent || theme.primary || '#7c3aed'}33;
    border-radius: 8px;
    font-size: 1rem;
    background: ${({ theme }) => theme.card || '#23233a'};
    color: ${({ theme }) => theme.text_primary || '#f4f4f5'};
    box-shadow: 0 1px 4px 0 #0001;
    transition: border 0.18s, box-shadow 0.18s;
    outline: none;
    &:focus {
        border: 1.5px solid ${({ theme }) => theme.accent || theme.primary || '#7c3aed'};
        box-shadow: 0 2px 8px 0 ${({ theme }) => theme.accent + '22' || theme.primary + '22' || '#7c3aed22'};
        background: ${({ theme }) => theme.bgLight || '#23233a'};
    }
`;

const TextInput = ({ label, placeholder, name, value, handleChange, textArea = false, rows = "1" }) => (
    <InputContainer>
        <Label>{label}</Label>
        {textArea ? (
            <TextArea
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                rows={rows}
            />
        ) : (
            <Input
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        )}
    </InputContainer>
);

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    textArea: PropTypes.bool,
    rows: PropTypes.string,
};

export default TextInput;
