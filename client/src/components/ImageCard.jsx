import React from 'react';
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Avatar from '@mui/material/Avatar';
import { DownloadRounded, Delete } from '@mui/icons-material';
import FileSaver from "file-saver";

const Card = styled.div`
    position: relative;
    display: flex;
    border-radius: 18px;
    box-shadow: 0 4px 32px 0 ${({ theme }) => theme.black + '30'};
    border: 1.5px solid ${({ theme }) => theme.card_light || '#e5e7eb'};
    background: ${({ theme }) => theme.card};
    cursor: pointer;
    transition: box-shadow 0.25s, transform 0.18s;
    overflow: hidden;
    &:hover {
        box-shadow: 0 8px 40px 0 ${({ theme }) => theme.primary + '50'};
        transform: translateY(-4px) scale(1.03);
    }
`;

const HoverOverlay = styled.div`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    backdrop-filter: blur(2.5px);
    background: linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%);
    color: ${({ theme }) => theme.white};
    transition: opacity 0.25s;
    border-radius: 18px;
    justify-content: flex-end;
    padding: 18px 14px;
    ${Card}:hover & {
        opacity: 1;
    }
`;

const Prompt = styled.div`
    font-weight: 400;
    font-size: 15px;
    color: ${({ theme }) => theme.white};
    text-shadow: 0 1px 4px rgba(0,0,0,0.18);
`;

const Author = styled.div`
    font-weight: 600;
    font-size: 14px;
    display: flex;
    gap: 8px;
    align-items: center;
    color: ${({ theme }) => theme.white};
`;

const DownloadIcon = styled(DownloadRounded)`
    && {
        color: ${({ theme }) => theme.accent || theme.primary};
        background: ${({ theme }) => theme.white};
        border-radius: 50%;
        padding: 4px;
        font-size: 2rem;
        box-shadow: 0 2px 8px 0 ${({ theme }) => theme.primary + '20'};
        transition: background 0.2s, color 0.2s;
        cursor: pointer;
        &:hover {
            background: ${({ theme }) => theme.accent};
            color: ${({ theme }) => theme.white};
        }
    }
`;

const DeleteIcon = styled(Delete)`
    && {
        color: #fff;
        background: #e74c3c;
        border-radius: 50%;
        padding: 4px;
        font-size: 2rem;
        box-shadow: 0 2px 8px 0 #e74c3c33;
        transition: background 0.2s, color 0.2s;
        cursor: pointer;
        margin-left: 8px;
        &:hover {
            background: #fff;
            color: #e74c3c;
        }
    }
`;

const StyledImage = styled(LazyLoadImage)`
    border-radius: 14px;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    background: ${({ theme }) => theme.bgLight};
    @media (max-width: 600px) {
        aspect-ratio: 1 / 1;
    }
`;

const ImageCard = ({ item, onDelete }) => {
    const handleDownload = () => {
        if (item?.photo) {
            FileSaver.saveAs(item.photo, "download.jpg");
        }
    };
    const handleDelete = () => {
        if (onDelete && item?._id) {
            onDelete(item._id);
        }
    };

    return (
        <Card>
            <StyledImage alt={item?.prompt || "Image"} src={item?.photo} />
            <HoverOverlay>
                <Prompt>{item?.prompt || "Default prompt text"}</Prompt>
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Author>
                        <Avatar sx={{ width: "32px", height: "32px" }}>{item?.name?.[0] || "A"}</Avatar>
                        {item?.name || "Anonymous"}
                    </Author>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <DownloadIcon onClick={handleDownload} />
                        <DeleteIcon onClick={handleDelete} />
                    </div>
                </div>
            </HoverOverlay>
        </Card>
    );
};

export default ImageCard;
