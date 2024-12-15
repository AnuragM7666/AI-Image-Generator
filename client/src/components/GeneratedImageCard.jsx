import React from 'react';
import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
    flex: 1;
    display: flex;
    min-height: 300px;
    gap: 16px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border: 2px dashed ${({ theme }) => theme.yellow};
    color: ${({ theme }) => theme.arrow + 80};
    border-radius: 20px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
    background: ${({ theme }) => theme.black + 80};
`;

const GeneratedImageCard = ({ src, loading }) => {
    return (
        <Container>
            {loading ? (
                <>
                    <CircularProgress style={{ color: "inherit", width: "24px", height: "24px" }} />
                    Generating Your Image ...
                </>
            ) : (
                <>
                    {src ? <Image src={src} alt="Generated AI Image" /> : <>Write a prompt to generate the image</>}
                </>
            )}
        </Container>
    );
};

export default GeneratedImageCard;
