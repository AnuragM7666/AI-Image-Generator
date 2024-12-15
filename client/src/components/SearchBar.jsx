import React from 'react';
import { SearchOutlined } from '@mui/icons-material';
import styled from "styled-components";

const SearchBarContainer = styled.div`
    max-width: 550px;
    display: flex;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.text_secondary + 90};
    color: ${({ theme }) => theme.text_primary};
    border-radius: 8px;
    padding: 12px 16px;
    gap: 6px;
    align-items: center;
`;

const SearchInput = styled.input`
    width: 100%;
    border: none;
    outline: none;
    color: inherit;
    background: transparent;
    font-size: 16px;
`;

const SearchBar = ({ search, setSearch }) => {
    return (
        <SearchBarContainer>
            <SearchOutlined />
            <SearchInput
                placeholder="Search with prompt or name ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </SearchBarContainer>
    );
};

export default SearchBar;
