import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import TextInput from "./TextInput";
import Button from "./button";
import { CreatePost, GenerateImage } from '../api';
import { useNavigate } from 'react-router-dom';

const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content: center;
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const Title = styled.div`
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(90deg, #7c3aed, #38bdf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-family: 'Inter', 'Poppins', 'Montserrat', sans-serif;
    margin-bottom: 10px;
`;

const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`;

const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading,
    setGenerateImageLoading,
    generateImageLoading,
    setCreatePostLoading,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const generateImageFun = async () => {
        setGenerateImageLoading(true);
        setError("");  // Reset error state
        try {
            console.log("Prompt being sent:", post.prompt); // Debug log
            const res = await GenerateImage({ prompt: post.prompt });
            setPost({ ...post, photo: `data:image/jpg;base64,${res?.data?.photo}` });
        } catch (error) {
            setError(error?.response?.data?.message || "Error generating image");
        } finally {
            setGenerateImageLoading(false);
        }
    };

    const createPostFun = async () => {
        setCreatePostLoading(true);
        setError("");  // Reset error state
        try {
            await CreatePost(post);
            navigate("/");
        } catch (error) {
            setError(error?.response?.data?.message || "Error posting image");
        } finally {
            setCreatePostLoading(false);
        }
    };

    return (
        <Form>
            <Top>
                <Title>Generate Image with Prompt</Title>
                <Desc>Write your prompt according to the image you want</Desc>
            </Top>
            <Body>
                <TextInput
                    label="Author"
                    placeholder="Enter your name ..."
                    name="author"
                    value={post.name}
                    handleChange={(e) => setPost({ ...post, name: e.target.value })}
                />
                <TextInput
                    label="Image Prompt"
                    placeholder="Write a detailed prompt about the image you want to generate"
                    name="prompt"
                    rows="8"
                    textArea
                    value={post.prompt}
                    handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
                <div>** You can post the AI Generated Image to the Community **</div>
            </Body>
            <Actions>
                <Button
                    text="Generate Image"
                    leftIcon={<AutoAwesome />}
                    disabled={generateImageLoading || post.prompt === ""}
                    onClick={generateImageFun}
                />
                <Button
                    text="Post Image"
                    leftIcon={<CreateRounded />}
                    disabled={createPostLoading || post.name === "" || post.prompt === "" || post.photo === ""}
                    onClick={createPostFun}
                />
            </Actions>
        </Form>
    );
};

export default GenerateImageForm;
