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
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.border_color || '#ccc'};
    border-radius: 4px;
    font-size: 1rem;
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.border_color || '#ccc'};
    border-radius: 4px;
    font-size: 1rem;
`;

const TextInput = ({ label, placeholder, name, value, handleChange, textArea, rows }) => (
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

TextInput.defaultProps = {
    textArea: false,
    rows: "1",
};

export default TextInput;
